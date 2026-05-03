import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const courses = await prisma.tutorCourse.findMany({
    where: { isLive: true },
    orderBy: { updatedAt: "desc" },
    include: {
      tutor: { select: { name: true } },
      _count: { select: { questions: true, students: true } },
    },
  });

  return NextResponse.json({ courses });
}
