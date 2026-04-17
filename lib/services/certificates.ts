import {
  AssignmentStatus,
  AssignmentSubmissionStatus,
  CertificateStatus,
  EnrollmentStatus,
  LearnerRiskLevel,
  OnboardingStatus,
} from "@prisma/client";
import { randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";

export const completionThresholds = {
  minimumAttendanceRate: 80,
  minimumAssignmentRate: 80,
  minimumAverageScore: 70,
} as const;

export type CompletionSnapshot = {
  enrollmentId: string;
  attendanceRate: number;
  assignmentRate: number;
  averageScore: number | null;
  finalScore: number;
  isEligible: boolean;
  reasons: string[];
};

export async function getEnrollmentCompletionSnapshot(enrollmentId: string): Promise<CompletionSnapshot | null> {
  const enrollment = await prisma.enrollment.findUnique({
    where: { id: enrollmentId },
    include: {
      student: true,
      cohort: {
        include: {
          assignments: {
            where: {
              status: AssignmentStatus.PUBLISHED,
            },
            include: {
              submissions: {
                where: {
                  student: {
                    enrollments: {
                      some: {
                        id: enrollmentId,
                      },
                    },
                  },
                },
              },
            },
          },
          sessions: {
            include: {
              attendance: {
                where: {
                  student: {
                    enrollments: {
                      some: {
                        id: enrollmentId,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      onboardingChecklist: true,
    },
  });

  if (!enrollment) {
    return null;
  }

  const assignments = enrollment.cohort.assignments.map((assignment) => ({
    ...assignment,
    submission: assignment.submissions.find((submission) => submission.studentId === enrollment.studentId) ?? null,
  }));

  const submittedAssignments = assignments.filter(
    (assignment) =>
      assignment.submission &&
      assignment.submission.status !== AssignmentSubmissionStatus.NOT_SUBMITTED,
  ).length;

  const reviewedScores = assignments
    .map((assignment) => assignment.submission?.score)
    .filter((score): score is number => typeof score === "number");

  const attendanceEntries = enrollment.cohort.sessions.flatMap((session) =>
    session.attendance.filter((entry) => entry.studentId === enrollment.studentId),
  );

  const attendanceRate = attendanceEntries.length
    ? Math.round((attendanceEntries.filter((entry) => entry.present).length / attendanceEntries.length) * 100)
    : 0;

  const assignmentRate = assignments.length
    ? Math.round((submittedAssignments / assignments.length) * 100)
    : 0;

  const averageScore = reviewedScores.length
    ? Math.round(reviewedScores.reduce((sum, score) => sum + score, 0) / reviewedScores.length)
    : null;

  const scoreInputs = [attendanceRate, assignmentRate];

  if (averageScore !== null) {
    scoreInputs.push(averageScore);
  }

  const finalScore = Math.round(scoreInputs.reduce((sum, score) => sum + score, 0) / scoreInputs.length);
  const reasons: string[] = [];

  if (enrollment.onboardingStatus !== OnboardingStatus.COMPLETED) {
    reasons.push("Onboarding is not fully completed.");
  }

  if (attendanceRate < completionThresholds.minimumAttendanceRate) {
    reasons.push(`Attendance is below ${completionThresholds.minimumAttendanceRate}%.`);
  }

  if (assignmentRate < completionThresholds.minimumAssignmentRate) {
    reasons.push(`Assignment completion is below ${completionThresholds.minimumAssignmentRate}%.`);
  }

  if (averageScore !== null && averageScore < completionThresholds.minimumAverageScore) {
    reasons.push(`Average score is below ${completionThresholds.minimumAverageScore}%.`);
  }

  return {
    enrollmentId: enrollment.id,
    attendanceRate,
    assignmentRate,
    averageScore,
    finalScore,
    isEligible: reasons.length === 0,
    reasons,
  };
}

export async function issueCertificateForEnrollment(enrollmentId: string, issuedById?: string) {
  const snapshot = await getEnrollmentCompletionSnapshot(enrollmentId);

  if (!snapshot) {
    throw new Error("Enrollment not found.");
  }

  if (!snapshot.isEligible) {
    throw new Error(`Enrollment is not ready for certification: ${snapshot.reasons.join(" ")}`);
  }

  const enrollment = await prisma.enrollment.findUnique({
    where: { id: enrollmentId },
    include: {
      student: true,
      cohort: {
        include: {
          course: true,
        },
      },
      certificate: true,
    },
  });

  if (!enrollment) {
    throw new Error("Enrollment not found.");
  }

  if (enrollment.certificate) {
    return enrollment.certificate;
  }

  const issuedAt = new Date();
  const certificateNumber = `CY4E-${issuedAt.getUTCFullYear()}-${randomBytes(3).toString("hex").toUpperCase()}`;
  const verificationCode = randomBytes(12).toString("hex");

  return prisma.$transaction(async (tx) => {
    await tx.enrollment.update({
      where: { id: enrollment.id },
      data: {
        status: EnrollmentStatus.COMPLETED,
        learnerRisk: LearnerRiskLevel.COMPLETED,
        completedAt: issuedAt,
        finalScore: snapshot.finalScore,
      },
    });

    return tx.certificate.create({
      data: {
        enrollmentId: enrollment.id,
        studentId: enrollment.studentId,
        certificateNumber,
        verificationCode,
        courseTitle: enrollment.cohort.course.title,
        cohortName: enrollment.cohort.name,
        issuedById,
        issuedAt,
        status: CertificateStatus.ISSUED,
      },
    });
  });
}
