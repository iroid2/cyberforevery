"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function getActiveCourses() {
  return prisma.tutorCourse.findMany({
    where: { isLive: true },
    orderBy: { updatedAt: "desc" },
    include: {
      tutor: { select: { name: true } },
      _count: { select: { questions: true, students: true } },
    },
  });
}

export async function getCourseForJoin(courseId: string) {
  return prisma.tutorCourse.findFirst({
    where: { id: courseId, isLive: true },
    include: { tutor: { select: { name: true } } },
  });
}

export async function joinCourse(courseId: string, formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) throw new Error("Name is required");

  const course = await prisma.tutorCourse.findFirst({
    where: { id: courseId, isLive: true },
  });
  if (!course) throw new Error("Course not found or not live");

  const student = await prisma.courseStudent.create({
    data: { name, courseId },
  });

  // Record attendance for the active session (if any)
  const activeSession = await prisma.sessionInstance.findFirst({
    where: { courseId, status: "LIVE" },
  });

  if (activeSession) {
    await prisma.sessionInstanceAttendance.upsert({
      where: { sessionId_studentId: { sessionId: activeSession.id, studentId: student.id } },
      update: { attended: true },
      create: { sessionId: activeSession.id, studentId: student.id, attended: true },
    });
  }

  const jar = await cookies();
  jar.set(`student_${courseId}`, student.id, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
  });

  redirect(`/learn/${courseId}`);
}

export async function getCourseForLearn(courseId: string, studentId: string) {
  // Sequential queries — concurrent pool.query() calls can race on Neon HTTP pooler
  const course = await prisma.tutorCourse.findFirst({
    where: { id: courseId, isLive: true },
    include: {
      lessons: { orderBy: { order: "asc" } },
      questions: {
        orderBy: { order: "asc" },
        select: {
          id: true,
          text: true,
          options: true,
          order: true,
        },
      },
      sessionQuestions: {
        orderBy: { createdAt: "desc" },
        take: 12,
        select: {
          id: true,
          text: true,
          resolved: true,
          createdAt: true,
          student: { select: { name: true } },
        },
      },
    },
  });

  const student = await prisma.courseStudent.findFirst({
    where: { id: studentId, courseId },
  });

  // Record attendance if there's an active LIVE session and not yet attended
  if (course && student) {
    const activeSession = await prisma.sessionInstance.findFirst({
      where: { courseId, status: "LIVE" },
    });

    if (activeSession) {
      await prisma.sessionInstanceAttendance.upsert({
        where: {
          sessionId_studentId: {
            sessionId: activeSession.id,
            studentId: student.id,
          },
        },
        update: { attended: true },
        create: {
          sessionId: activeSession.id,
          studentId: student.id,
          attended: true,
        },
      });
    }
  }

  return { course, student };
}

export async function submitQuiz(
  courseId: string,
  studentId: string,
  answers: Record<string, number>,
  timeSpentSeconds?: number,
  sessionInstanceId?: string
) {
  // Prevent duplicate submissions for the same session
  if (sessionInstanceId) {
    const existing = await prisma.submission.findFirst({
      where: { studentId, sessionInstanceId },
    });
    if (existing) {
      // Optionally update timeSpentSeconds if missing
      if (
        typeof timeSpentSeconds === "number" &&
        Number.isFinite(timeSpentSeconds) &&
        existing.timeSpentSeconds == null
      ) {
        await prisma.submission.update({
          where: { id: existing.id },
          data: { timeSpentSeconds: Math.max(0, Math.floor(timeSpentSeconds)) },
        });
      }
      return existing.id;
    }
  } else {
    // Legacy fallback: one submission per student total
    const existing = await prisma.submission.findUnique({
      where: { studentId },
    });
    if (existing) {
      if (
        typeof timeSpentSeconds === "number" &&
        Number.isFinite(timeSpentSeconds) &&
        existing.timeSpentSeconds == null
      ) {
        await prisma.submission.update({
          where: { id: existing.id },
          data: { timeSpentSeconds: Math.max(0, Math.floor(timeSpentSeconds)) },
        });
      }
      return existing.id;
    }
  }

  const questions = await prisma.question.findMany({
    where: { courseId },
    select: { id: true, correctIndex: true },
  });

  let score = 0;
  const answerRows = questions.map((q) => {
    const selected = answers[q.id] ?? -1;
    const isCorrect = selected === q.correctIndex;
    if (isCorrect) score++;
    return { questionId: q.id, selectedIndex: selected, isCorrect };
  });

  const submission = await prisma.submission.create({
    data: {
      studentId,
      courseId,
      sessionInstanceId: sessionInstanceId ?? null,
      score,
      totalQuestions: questions.length,
      timeSpentSeconds:
        typeof timeSpentSeconds === "number" && Number.isFinite(timeSpentSeconds)
          ? Math.max(0, Math.floor(timeSpentSeconds))
          : null,
    },
  });

  // Create answer records
  for (const row of answerRows) {
    await prisma.answer.create({
      data: {
        submissionId: submission.id,
        questionId: row.questionId,
        selectedIndex: row.selectedIndex,
        isCorrect: row.isCorrect,
      },
    });
  }

  return submission.id;
}

export async function getStudentResult(submissionId: string, courseId: string) {
  const result = await prisma.submission.findFirst({
    where: { id: submissionId, courseId },
    include: {
      student: { select: { name: true } },
      answers: {
        include: {
          // Fetch order field so we can sort in JS — avoids relational orderBy
          // which can trigger a complex query path on Neon serverless.
          question: {
            select: { text: true, options: true, correctIndex: true, order: true },
          },
        },
      },
    },
  });

  if (!result) return null;

  // Sort by question.order in JavaScript instead of SQL JOIN-order
  result.answers.sort((a, b) => a.question.order - b.question.order);

  return result;
}
