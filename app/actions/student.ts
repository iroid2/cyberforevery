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
  const [course, student] = await Promise.all([
    prisma.tutorCourse.findFirst({
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
    }),
    prisma.courseStudent.findFirst({
      where: { id: studentId, courseId },
      include: { submission: true },
    }),
  ]);
  return { course, student };
}

export async function submitQuiz(
  courseId: string,
  studentId: string,
  answers: Record<string, number>
) {
  const existing = await prisma.submission.findUnique({
    where: { studentId },
  });
  if (existing) return existing.id;

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
      score,
      totalQuestions: questions.length,
      answers: { create: answerRows },
    },
  });

  return submission.id;
}

export async function getStudentResult(submissionId: string, courseId: string) {
  return prisma.submission.findFirst({
    where: { id: submissionId, courseId },
    include: {
      student: { select: { name: true } },
      answers: {
        include: {
          question: { select: { text: true, options: true, correctIndex: true } },
        },
        orderBy: { question: { order: "asc" } },
      },
    },
  });
}
