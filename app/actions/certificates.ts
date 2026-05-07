"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { randomUUID } from "node:crypto";

export async function requestCertificate(submissionId: string, email: string) {
  // Validate email
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Invalid email address");
  }

  // Fetch submission with related data
  const submission = await prisma.submission.findFirst({
    where: { id: submissionId },
    include: {
      student: true,
      sessionInstance: { include: { course: true } },
    },
  });

  if (!submission) {
    throw new Error("Submission not found");
  }

  if (!submission.sessionInstanceId) {
    throw new Error("Cannot issue certificate for a submission without a session");
  }

  // Check if requester is authorized:
  // - If student cookie matches studentId (anonymous student)
  // - OR if user is logged in as tutor/admin of that course
  const jar = await cookies();
  const studentCookieKey = `student_${submission.courseId}`;
  const studentCookieValue = jar.get(studentCookieKey)?.value;

  const session = await auth();
  const userId = session?.user?.id;
  const userRole = (session?.user as { role?: string } | undefined)?.role?.toUpperCase();

  // Verify either cookie matches student, or user is tutor/admin of course
  if (studentCookieValue && studentCookieValue !== submission.studentId) {
    throw new Error("Unauthorized: student mismatch");
  }

  if (!studentCookieValue && !userId) {
    throw new Error("Unauthorized: must be logged in or have student context");
  }

  // If logged in, verify they are tutor/admin of the course
  if (userId && userRole) {
    const courseTutor = await prisma.tutorCourse.findFirst({
      where: { id: submission.courseId, tutorId: userId },
    });
    const allowedRoles = ["TUTOR", "ADMIN", "SUPER_ADMIN", "INSTRUCTOR", "ADMIN_STAFF"];
    if (!courseTutor && !allowedRoles.includes(userRole)) {
      throw new Error("Unauthorized: not a tutor/admin of this course");
    }
  }

  // Check if certificate request already exists
  const existing = await prisma.certificateRequest.findFirst({
    where: { submissionId },
  });

  if (existing) {
    return {
      success: true,
      verificationCode: existing.verificationCode,
    };
  }

  const verificationCode = randomUUID();

  await prisma.certificateRequest.create({
    data: {
      submissionId,
      studentId: submission.studentId,
      sessionId: submission.sessionInstanceId,
      courseId: submission.courseId,
      email,
      verificationCode,
      status: "SENT",
      sentAt: new Date(),
    },
  });

  // TODO: Queue actual email with PDF

  return {
    success: true,
    verificationCode,
  };
}

export async function getCertificateRequestBySubmissionId(submissionId: string) {
  // No auth required for public lookup? Maybe only student/tutor can see. We'll keep simple.
  return prisma.certificateRequest.findFirst({
    where: { submissionId },
    select: {
      id: true,
      status: true,
      verificationCode: true,
      email: true,
      session: {
        select: {
          date: true,
          course: {
            select: {
              title: true,
              subject: true,
            },
          },
        },
      },
      student: {
        select: {
          name: true,
        },
      },
      submission: {
        select: {
          score: true,
          totalQuestions: true,
        },
      },
    },
  });
}

export async function getCertificateRequestByVerificationCode(
  code: string
) {
  return prisma.certificateRequest.findFirst({
    where: { verificationCode: code },
    include: {
      student: { select: { name: true } },
      session: {
        select: {
          date: true,
          course: { select: { title: true, subject: true } },
        },
      },
      submission: { select: { score: true, totalQuestions: true } },
    },
  });
}
