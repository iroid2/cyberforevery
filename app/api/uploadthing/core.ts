import { z } from "zod";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { AssignmentSubmissionStatus, UserRole } from "@prisma/client";

const f = createUploadthing();

export const ourFileRouter = {
  assignmentSubmission: f({
    image: { maxFileSize: "8MB", maxFileCount: 1 },
    pdf: { maxFileSize: "16MB", maxFileCount: 1 },
    text: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .input(z.object({ assignmentId: z.string().cuid() }))
    .middleware(async ({ input }) => {
      const session = await auth();
      const userId = session?.user?.id;

      if (!session?.user || !userId || (session.user as { role?: UserRole }).role !== UserRole.STUDENT) {
        throw new UploadThingError("Unauthorized");
      }

      const student = await prisma.student.findUnique({
        where: { userId },
      });

      if (!student) {
        throw new UploadThingError("Student profile not found");
      }

      const assignment = await prisma.assignment.findFirst({
        where: {
          id: input.assignmentId,
          status: "PUBLISHED",
          cohort: {
            enrollments: {
              some: { studentId: student.id },
            },
          },
        },
      });

      if (!assignment) {
        throw new UploadThingError("Assignment not available for this student");
      }

      return {
        studentId: student.id,
        assignmentId: assignment.id,
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const submission = await prisma.assignmentSubmission.upsert({
        where: {
          assignmentId_studentId: {
            assignmentId: metadata.assignmentId,
            studentId: metadata.studentId,
          },
        },
        update: {
          status: AssignmentSubmissionStatus.SUBMITTED,
          fileKey: file.key,
          fileUrl: file.ufsUrl,
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
          submittedAt: new Date(),
        },
        create: {
          assignmentId: metadata.assignmentId,
          studentId: metadata.studentId,
          status: AssignmentSubmissionStatus.SUBMITTED,
          fileKey: file.key,
          fileUrl: file.ufsUrl,
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
          submittedAt: new Date(),
        },
      });

      return {
        submissionId: submission.id,
        fileUrl: file.ufsUrl,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
