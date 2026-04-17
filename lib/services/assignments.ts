import { AssignmentStatus, AssignmentSubmissionStatus, UserRole } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function getStudentAssignmentData(userId: string) {
  const student = await prisma.student.findUnique({
    where: { userId },
    include: {
      parent: {
        select: { id: true, name: true },
      },
    },
  });

  if (!student) {
    return null;
  }

  const assignments = await prisma.assignment.findMany({
    where: {
      status: AssignmentStatus.PUBLISHED,
      cohort: {
        enrollments: {
          some: {
            studentId: student.id,
          },
        },
      },
    },
    include: {
      cohort: {
        include: {
          course: true,
        },
      },
      submissions: {
        where: {
          studentId: student.id,
        },
      },
    },
    orderBy: [
      { dueDate: "asc" },
      { createdAt: "desc" },
    ],
  });

  return {
    student,
    assignments: assignments.map((assignment) => ({
      ...assignment,
      submission: assignment.submissions[0] ?? null,
    })),
  };
}

export async function getInstructorGradeData(userId: string, role: UserRole) {
  const assignmentWhere =
    role === UserRole.SUPER_ADMIN
      ? {}
      : {
          cohort: {
            instructorId: userId,
          },
        };

  const assignments = await prisma.assignment.findMany({
    where: assignmentWhere,
    include: {
      cohort: {
        include: {
          course: true,
        },
      },
      submissions: {
        include: {
          student: true,
        },
        orderBy: { updatedAt: "desc" },
      },
    },
    orderBy: [{ dueDate: "asc" }, { createdAt: "desc" }],
  });

  const cohorts = await prisma.cohort.findMany({
    where:
      role === UserRole.SUPER_ADMIN
        ? {}
        : {
            instructorId: userId,
          },
    include: {
      course: true,
    },
    orderBy: { startDate: "asc" },
  });

  return { assignments, cohorts };
}

export async function getProgressData(userId: string, role: UserRole) {
  if (role === UserRole.STUDENT) {
    const studentData = await getStudentAssignmentData(userId);

    if (!studentData) {
      return null;
    }

    const attendance = await prisma.attendance.findMany({
      where: { studentId: studentData.student.id },
    });

    return {
      mode: "student" as const,
      learners: [
        buildLearnerProgress(studentData.student.firstName, studentData.student.lastName, studentData.assignments, attendance),
      ],
    };
  }

  if (role === UserRole.PARENT) {
    const children = await prisma.student.findMany({
      where: { parentId: userId },
      orderBy: { createdAt: "asc" },
    });

    const learners = await Promise.all(
      children.map(async (child) => {
        const assignments = await prisma.assignment.findMany({
          where: {
            status: AssignmentStatus.PUBLISHED,
            cohort: {
              enrollments: {
                some: {
                  studentId: child.id,
                },
              },
            },
          },
          include: {
            submissions: {
              where: {
                studentId: child.id,
              },
            },
          },
        });

        const attendance = await prisma.attendance.findMany({
          where: { studentId: child.id },
        });

        return buildLearnerProgress(child.firstName, child.lastName, assignments.map((assignment) => ({
          ...assignment,
          submission: assignment.submissions[0] ?? null,
        })), attendance);
      }),
    );

    return {
      mode: "parent" as const,
      learners,
    };
  }

  return null;
}

function buildLearnerProgress(
  firstName: string,
  lastName: string,
  assignments: Array<{
    title: string;
    submission?: {
      status: AssignmentSubmissionStatus;
      score: number | null;
    } | null;
  }>,
  attendance: Array<{ present: boolean }>,
) {
  const submittedCount = assignments.filter((assignment) =>
    assignment.submission?.status && assignment.submission.status !== AssignmentSubmissionStatus.NOT_SUBMITTED,
  ).length;

  const reviewedScores = assignments
    .map((assignment) => assignment.submission?.score)
    .filter((score): score is number => typeof score === "number");

  const attendanceRate = attendance.length
    ? Math.round((attendance.filter((entry) => entry.present).length / attendance.length) * 100)
    : 0;

  const assignmentRate = assignments.length
    ? Math.round((submittedCount / assignments.length) * 100)
    : 0;

  const averageScore = reviewedScores.length
    ? Math.round(reviewedScores.reduce((sum, score) => sum + score, 0) / reviewedScores.length)
    : null;

  const progress = Math.round((assignmentRate + attendanceRate + (averageScore ?? 0)) / (averageScore === null ? 2 : 3));

  return {
    name: `${firstName} ${lastName}`,
    assignmentRate,
    attendanceRate,
    averageScore,
    progress,
    openAssignments: assignments.filter((assignment) => !assignment.submission || assignment.submission.status === AssignmentSubmissionStatus.NOT_SUBMITTED).length,
  };
}
