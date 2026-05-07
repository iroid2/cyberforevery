"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

async function requireTutor() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  return session.user.id;
}

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const role = String((session.user as { role?: string }).role ?? "").toUpperCase();
  if (role !== "ADMIN" && role !== "SUPER_ADMIN") redirect("/dashboard");
  return session.user.id;
}

// ─── COURSES ─────────────────────────────────────────────────────────────────

export async function createCourse(formData: FormData) {
  const tutorId = await requireTutor();
  const title = String(formData.get("title") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  if (!title || !subject) throw new Error("Title and subject are required");

  const course = await prisma.tutorCourse.create({
    data: { title, subject, tutorId },
  });

  revalidatePath("/dashboard/courses");
  redirect(`/dashboard/courses/${course.id}`);
}

export async function createCourseBundle(payload: {
  title: string;
  subject: string;
  description?: string;
  level?: string;
  tutorName?: string;
  startDate?: string;
  duration?: number;
  maxStudents?: number;
  objectives?: string[];
  lessons?: Array<{
    title: string;
    description?: string;
    type?: string;
    fileName?: string;
    fileUrl?: string;
    fileKey?: string;
    fileType?: string;
    fileSize?: number;
    durationMin?: number;
  }>;
  quiz?: {
    title?: string;
    passingScore?: number;
    maxAttempts?: number;
    shuffle?: boolean;
    showAnswers?: boolean;
    questions?: Array<{
      text: string;
      options: string[];
      correctIndex: number;
      explanation?: string;
      points?: number;
      timeLimit?: number;
    }>;
  };
}) {
  const tutorId = await requireTutor();
  const title = payload.title.trim();
  const subject = payload.subject.trim();

  if (!title || !subject) {
    throw new Error("Course title and subject are required");
  }

  // Sequential inserts over HTTP — avoids the WebSocket transaction that
  // breaks with bufferutil on serverless (poolQueryViaFetch only covers
  // pool.query(), not pool.connect()-based interactive transactions).
  const course = await prisma.tutorCourse.create({
    data: { title, subject, tutorId, isLive: false },
  });

  for (const [index, lesson] of (payload.lessons ?? []).entries()) {
    await prisma.lesson.create({
      data: {
        courseId: course.id,
        title: lesson.title.trim() || `Lesson ${index + 1}`,
        content: lesson.description?.trim() || "",
        order: index + 1,
      },
    });
  }

  for (const [index, question] of (payload.quiz?.questions ?? []).entries()) {
    await prisma.question.create({
      data: {
        courseId: course.id,
        text: question.text.trim(),
        options: question.options,
        correctIndex: question.correctIndex,
        order: index + 1,
      },
    });
  }

  revalidatePath("/dashboard/courses");
  revalidatePath(`/dashboard/courses/${course.id}`);
  return { success: true, courseId: course.id };
}

export async function updateCourse(courseId: string, formData: FormData) {
  const tutorId = await requireTutor();
  const title = String(formData.get("title") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();

  await prisma.tutorCourse.updateMany({
    where: { id: courseId, tutorId },
    data: { title, subject },
  });

  revalidatePath(`/dashboard/courses/${courseId}`);
}

export async function toggleCourseLive(courseId: string) {
  const tutorId = await requireTutor();
  const course = await prisma.tutorCourse.findFirst({
    where: { id: courseId, tutorId },
    select: { isLive: true },
  });
  if (!course) throw new Error("Course not found");

  await prisma.tutorCourse.update({
    where: { id: courseId },
    data: { isLive: !course.isLive },
  });

  revalidatePath(`/dashboard/courses/${courseId}`);
  revalidatePath("/dashboard/courses");
  revalidatePath("/dashboard/sessions");
}

export async function deleteCourse(courseId: string) {
  const tutorId = await requireTutor();
  await prisma.tutorCourse.deleteMany({ where: { id: courseId, tutorId } });
  revalidatePath("/dashboard/courses");
  redirect("/dashboard/courses");
}

// ─── LESSONS ─────────────────────────────────────────────────────────────────

export async function addLesson(courseId: string, formData: FormData) {
  const tutorId = await requireTutor();
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  if (!title || !content) throw new Error("Title and content are required");

  const lastLesson = await prisma.lesson.findFirst({
    where: { courseId },
    orderBy: { order: "desc" },
    select: { order: true },
  });
  await prisma.lesson.create({
    data: { title, content, courseId, order: (lastLesson?.order ?? 0) + 1 },
  });

  revalidatePath(`/dashboard/courses/${courseId}`);
}

export async function updateLesson(lessonId: string, courseId: string, formData: FormData) {
  await requireTutor();
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();

  await prisma.lesson.update({
    where: { id: lessonId },
    data: { title, content },
  });

  revalidatePath(`/dashboard/courses/${courseId}`);
}

export async function deleteLesson(lessonId: string, courseId: string) {
  await requireTutor();
  await prisma.lesson.delete({ where: { id: lessonId } });
  revalidatePath(`/dashboard/courses/${courseId}`);
}

export async function updateLessonPresentation(
  lessonId: string,
  courseId: string,
  data: { url: string; key: string; name: string; type: string; size: number }
) {
  await requireTutor();
  await prisma.lesson.update({
    where: { id: lessonId },
    data: {
      presentationUrl: data.url,
      presentationKey: data.key,
      presentationName: data.name,
      presentationType: data.type,
      presentationSize: data.size,
    },
  });
  revalidatePath(`/dashboard/courses/${courseId}`);
}

export async function removeLessonPresentation(lessonId: string, courseId: string) {
  await requireTutor();
  await prisma.lesson.update({
    where: { id: lessonId },
    data: {
      presentationUrl: null,
      presentationKey: null,
      presentationName: null,
      presentationType: null,
      presentationSize: null,
    },
  });
  revalidatePath(`/dashboard/courses/${courseId}`);
}

// ─── QUESTIONS ───────────────────────────────────────────────────────────────

export async function addQuestion(courseId: string, formData: FormData) {
  const tutorId = await requireTutor();
  const text = String(formData.get("text") ?? "").trim();
  const optionA = String(formData.get("optionA") ?? "").trim();
  const optionB = String(formData.get("optionB") ?? "").trim();
  const optionC = String(formData.get("optionC") ?? "").trim();
  const optionD = String(formData.get("optionD") ?? "").trim();
  const correctIndex = parseInt(String(formData.get("correctIndex") ?? "0"), 10);

  if (!text || !optionA || !optionB || !optionC || !optionD) {
    throw new Error("All fields are required");
  }

  const lastQuestion = await prisma.question.findFirst({
    where: { courseId },
    orderBy: { order: "desc" },
    select: { order: true },
  });
  await prisma.question.create({
    data: {
      text,
      options: [optionA, optionB, optionC, optionD],
      correctIndex,
      courseId,
      order: (lastQuestion?.order ?? 0) + 1,
    },
  });

  revalidatePath(`/dashboard/courses/${courseId}`);
}

export async function deleteQuestion(questionId: string, courseId: string) {
  await requireTutor();
  await prisma.question.delete({ where: { id: questionId } });
  revalidatePath(`/dashboard/courses/${courseId}`);
}

// ─── READS ───────────────────────────────────────────────────────────────────

export async function getTutorCourses() {
  const tutorId = await requireTutor();
  return prisma.tutorCourse.findMany({
    where: { tutorId },
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { students: true, lessons: true, questions: true } },
    },
  });
}

export async function getCourseForManage(courseId: string) {
  const tutorId = await requireTutor();
  return prisma.tutorCourse.findFirst({
    where: { id: courseId, tutorId },
    include: {
      lessons: { orderBy: { order: "asc" } },
      questions: { orderBy: { order: "asc" } },
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
      students: {
        orderBy: { joinedAt: "desc" },
        // submission removed - submissions now tied to session instances
      },
      _count: { select: { students: true } },
    },
  });
}

export async function getCourseResults(courseId: string) {
  const tutorId = await requireTutor();
  const course = await prisma.tutorCourse.findFirst({
    where: { id: courseId, tutorId },
    include: {
      questions: { orderBy: { order: "asc" } },
      students: {
        include: {
          submission: {
            include: { answers: true },
          },
        },
        orderBy: { joinedAt: "desc" },
      },
    },
  });
  return course;
}

export async function getAllCourses() {
  await requireAdmin();
  return prisma.tutorCourse.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      tutor: { select: { id: true, name: true, email: true } },
      _count: { select: { students: true, lessons: true, questions: true } },
    },
  });
}
