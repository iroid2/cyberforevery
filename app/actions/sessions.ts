"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

async function requireTutor() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  return session.user.id;
}

async function requireOwnedSessionInstance(sessionId: string) {
  const tutorId = await requireTutor();
  const si = await prisma.sessionInstance.findFirst({
    where: { id: sessionId, course: { tutorId } },
  });
  if (!si) throw new Error("Session not found");
  return si;
}

// ─── CREATE SESSION INSTANCE ────────────────────────────────────────────────

export async function createSessionInstance(courseId: string, formData: FormData) {
  await requireTutor();
  const dateStr = String(formData.get("date") ?? "");
  const remarks = String(formData.get("remarks") ?? "").trim();

  let date: Date;
  if (dateStr) {
    date = new Date(dateStr);
  } else {
    date = new Date();
  }
  // Normalize to midnight for uniqueness
  date.setHours(0, 0, 0, 0);

  // Ensure no existing session for this course on same date
  const existing = await prisma.sessionInstance.findFirst({
    where: { courseId, date },
  });
  if (existing) {
    throw new Error("A session for this date already exists");
  }

  const sessionInstance = await prisma.sessionInstance.create({
    data: {
      courseId,
      date,
      remarks: remarks || null,
      status: "SCHEDULED",
    },
  });

  revalidatePath(`/dashboard/courses/${courseId}`);
  redirect(`/dashboard/courses/${courseId}/sessions/${sessionInstance.id}`);
}

// ─── READ SESSION INSTANCES ──────────────────────────────────────────────────

export async function getSessionInstancesByCourse(courseId: string) {
  await requireTutor();
  return prisma.sessionInstance.findMany({
    where: { courseId },
    orderBy: { date: "desc" },
    include: {
      _count: { select: { attendance: true, submissions: true } },
    },
  });
}

export async function getSessionInstanceDetails(sessionId: string) {
  await requireTutor();
  return prisma.sessionInstance.findFirst({
    where: { id: sessionId },
    include: {
      course: { select: { id: true, title: true, subject: true } },
      attendance: {
        orderBy: { createdAt: "asc" },
        include: {
          student: { select: { id: true, name: true } },
        },
      },
      submissions: {
        orderBy: { submittedAt: "desc" },
        include: {
          student: { select: { name: true } },
          _count: { select: { answers: true } },
        },
      },
      _count: { select: { attendance: true, submissions: true } },
    },
  });
}

export async function getActiveSessionInstance(courseId: string) {
  return prisma.sessionInstance.findFirst({
    where: { courseId, status: "LIVE" },
  });
}

// ─── UPDATE SESSION REMARKS ──────────────────────────────────────────────────

export async function updateSessionInstanceRemarks(sessionId: string, formData: FormData) {
  await requireTutor();
  const remarks = String(formData.get("remarks") ?? "").trim();
  const si = await requireOwnedSessionInstance(sessionId);
  await prisma.sessionInstance.update({
    where: { id: sessionId },
    data: { remarks: remarks || null },
  });
  revalidatePath(`/dashboard/courses/${si.courseId}/sessions/${sessionId}`);
}

// ─── START / END SESSION ─────────────────────────────────────────────────────

export async function startSessionInstance(sessionId: string) {
  await requireTutor();
  const si = await requireOwnedSessionInstance(sessionId);

  // Check if another session for this course is already LIVE
  const existingLive = await prisma.sessionInstance.findFirst({
    where: { courseId: si.courseId, status: "LIVE", id: { not: sessionId } },
  });
  if (existingLive) {
    throw new Error("Another session is already live. Please end it before starting a new one.");
  }

  // Update session instance
  await prisma.sessionInstance.update({
    where: { id: sessionId },
    data: {
      status: "LIVE",
      startTime: new Date(),
    },
  });

  // Mark course as live
  await prisma.tutorCourse.update({
    where: { id: si.courseId },
    data: { isLive: true },
  });

  revalidatePath(`/dashboard/courses/${si.courseId}/sessions/${sessionId}`);
  revalidatePath(`/dashboard/courses/${si.courseId}`);
}

export async function syncSessionInstanceDuration(sessionId: string, seconds: number) {
  await requireTutor();
  await requireOwnedSessionInstance(sessionId);
  await prisma.sessionInstance.updateMany({
    where: { id: sessionId, status: "LIVE" },
    data: { durationSeconds: Math.max(0, Math.floor(seconds)) },
  });
}

export async function endSessionInstance(sessionId: string, finalSeconds: number) {
  await requireTutor();
  const si = await requireOwnedSessionInstance(sessionId);
  const durationSeconds = Math.max(0, Math.floor(finalSeconds));

  await prisma.sessionInstance.update({
    where: { id: sessionId },
    data: {
      status: "COMPLETED",
      endTime: new Date(),
      durationSeconds,
    },
  });

  // Mark course as not live
  await prisma.tutorCourse.update({
    where: { id: si.courseId },
    data: { isLive: false },
  });

  revalidatePath(`/dashboard/courses/${si.courseId}/sessions/${sessionId}`);
  revalidatePath(`/dashboard/courses/${si.courseId}`);
}

// ─── DELETE SESSION ──────────────────────────────────────────────────────────

export async function deleteSessionInstance(sessionId: string) {
  await requireTutor();
  const si = await requireOwnedSessionInstance(sessionId);

  // Prevent deletion if there are submissions or attendance records
  const hasSubmissions = await prisma.submission.findFirst({
    where: { sessionInstanceId: sessionId },
  });
  if (hasSubmissions) {
    throw new Error("Cannot delete session with existing submissions");
  }

  const attendanceCount = await prisma.sessionInstanceAttendance.count({
    where: { sessionId },
  });
  if (attendanceCount > 0) {
    throw new Error("Cannot delete session with attendance records");
  }

  await prisma.sessionInstance.delete({ where: { id: sessionId } });
  revalidatePath(`/dashboard/courses/${si.courseId}/sessions`);
}

// ─── ATTENDANCE ───────────────────────────────────────────────────────────────

export async function updateSessionInstanceAttendance(
  sessionId: string,
  studentId: string,
  attended: boolean,
  remarks?: string
) {
  await requireTutor();
  // Verify ownership
  const valid = await prisma.sessionInstance.findFirst({
    where: { id: sessionId, course: { tutorId: (await requireTutor()) } },
  });
  if (!valid) throw new Error("Unauthorized");

  await prisma.sessionInstanceAttendance.upsert({
    where: { sessionId_studentId: { sessionId, studentId } },
    update: { attended, remarks: remarks ?? undefined },
    create: {
      sessionId,
      studentId,
      attended,
      remarks: remarks ?? undefined,
    },
  });
}

// ─── ACTIVE SESSION FOR JOIN FLOW ────────────────────────────────────────────

export async function getActiveSessionInstanceForCourse(courseId: string) {
  return prisma.sessionInstance.findFirst({
    where: { courseId, status: "LIVE" },
  });
}
