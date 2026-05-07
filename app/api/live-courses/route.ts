import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  // Fetch live sessions (status=LIVE) across all courses
  const liveSessions = await prisma.sessionInstance.findMany({
    where: { status: "LIVE" },
    include: {
      course: {
        select: {
          id: true,
          title: true,
          subject: true,
          tutor: { select: { name: true } },
          _count: { select: { questions: true } },
        },
      },
      _count: { select: { attendance: true } },
    },
    orderBy: { date: "desc" },
  });

  // Transform to expected format for attend page
  const courses = liveSessions.map((s) => ({
    id: s.course.id,
    title: s.course.title,
    subject: s.course.subject,
    isLive: true,
    updatedAt: s.createdAt.toISOString(),
    tutor: s.course.tutor,
    _count: {
      questions: s.course._count.questions,
      students: s._count.attendance,
    },
  }));

  return NextResponse.json({ courses });
}
