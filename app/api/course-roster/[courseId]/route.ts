import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ courseId: string }> },
) {
  const { courseId } = await params;

  const course = await prisma.tutorCourse.findUnique({
    where: { id: courseId },
    select: {
      id: true,
      isLive: true,
      _count: { select: { students: true } },
      students: {
        orderBy: { joinedAt: "desc" },
        select: {
          id: true,
          name: true,
          joinedAt: true,
          submission: { select: { id: true } },
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

  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  return NextResponse.json({ course });
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> },
) {
  const { courseId } = await params;
  const body = (await req.json().catch(() => null)) as { text?: string } | null;
  const text = body?.text?.trim() ?? "";

  if (!text) {
    return NextResponse.json({ error: "Question text is required" }, { status: 400 });
  }

  const jar = await cookies();
  const studentId = jar.get(`student_${courseId}`)?.value;

  if (!studentId) {
    return NextResponse.json({ error: "Join the session first" }, { status: 401 });
  }

  const [course, student] = await Promise.all([
    prisma.tutorCourse.findFirst({
      where: { id: courseId, isLive: true },
      select: { id: true },
    }),
    prisma.courseStudent.findFirst({
      where: { id: studentId, courseId },
      select: { id: true, name: true },
    }),
  ]);

  if (!course || !student) {
    return NextResponse.json({ error: "Session not available" }, { status: 404 });
  }

  const question = await prisma.sessionQuestion.create({
    data: {
      courseId,
      studentId: student.id,
      text,
    },
    select: {
      id: true,
      text: true,
      resolved: true,
      createdAt: true,
      student: { select: { name: true } },
    },
  });

  return NextResponse.json({ question });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> },
) {
  const { courseId } = await params;
  const session = await auth();
  const role = String((session?.user as { role?: string })?.role ?? "").toUpperCase();
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const isAdmin = role === "ADMIN" || role === "SUPER_ADMIN";
  const course = await prisma.tutorCourse.findFirst({
    where: isAdmin ? { id: courseId } : { id: courseId, tutorId: userId },
    select: { id: true },
  });

  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  const body = (await req.json().catch(() => null)) as {
    questionId?: string;
    resolved?: boolean;
  } | null;
  const questionId = body?.questionId?.trim() ?? "";

  if (!questionId) {
    return NextResponse.json({ error: "Question id is required" }, { status: 400 });
  }

  const resolved = Boolean(body?.resolved ?? true);

  const question = await prisma.sessionQuestion.updateMany({
    where: { id: questionId, courseId },
    data: { resolved },
  });

  if (question.count === 0) {
    return NextResponse.json({ error: "Question not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, resolved });
}
