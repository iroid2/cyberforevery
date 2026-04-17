"use server";

import { revalidatePath } from "next/cache";
import { AssignmentSubmissionStatus, AssignmentStatus, UserRole } from "@prisma/client";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function createAssignment(formData: FormData) {
  const session = await auth();
  const role = (session?.user as { role?: UserRole } | undefined)?.role;

  if (!session?.user || (role !== UserRole.INSTRUCTOR && role !== UserRole.SUPER_ADMIN)) {
    return;
  }

  const cohortId = String(formData.get("cohortId") || "");
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const dueDateValue = String(formData.get("dueDate") || "");
  const pointsValue = String(formData.get("points") || "");

  if (!cohortId || !title) {
    return;
  }

  const cohort = await prisma.cohort.findFirst({
    where:
      role === UserRole.SUPER_ADMIN
        ? { id: cohortId }
        : { id: cohortId, instructorId: session.user.id },
  });

  if (!cohort) {
    return;
  }

  await prisma.assignment.create({
    data: {
      cohortId,
      title,
      description: description || null,
      dueDate: dueDateValue ? new Date(dueDateValue) : null,
      points: pointsValue ? Number(pointsValue) : null,
      status: AssignmentStatus.PUBLISHED,
      createdById: session.user.id,
    },
  });

  revalidatePath("/dashboard/assignments");
  revalidatePath("/dashboard/grade-portal");
  revalidatePath("/dashboard/progress");
}

export async function reviewSubmission(formData: FormData) {
  const session = await auth();
  const role = (session?.user as { role?: UserRole } | undefined)?.role;

  if (!session?.user || (role !== UserRole.INSTRUCTOR && role !== UserRole.SUPER_ADMIN)) {
    return;
  }

  const submissionId = String(formData.get("submissionId") || "");
  const scoreValue = String(formData.get("score") || "");
  const feedback = String(formData.get("feedback") || "").trim();

  if (!submissionId) {
    return;
  }

  const submission = await prisma.assignmentSubmission.findUnique({
    where: { id: submissionId },
    include: {
      assignment: {
        include: {
          cohort: true,
        },
      },
    },
  });

  if (!submission) {
    return;
  }

  if (role !== UserRole.SUPER_ADMIN && submission.assignment.cohort.instructorId !== session.user.id) {
    return;
  }

  await prisma.assignmentSubmission.update({
    where: { id: submissionId },
    data: {
      score: scoreValue ? Number(scoreValue) : null,
      feedback: feedback || null,
      status: AssignmentSubmissionStatus.REVIEWED,
      reviewedAt: new Date(),
      reviewedById: session.user.id,
    },
  });

  revalidatePath("/dashboard/grade-portal");
  revalidatePath("/dashboard/progress");
}
