import { EnrollmentStatus, OnboardingStatus, PaymentStatus, UserRole } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getEnrollmentCompletionSnapshot } from "@/lib/services/certificates";

export async function getEnrollmentDashboardData() {
  const enrollments = await prisma.enrollment.findMany({
    include: {
      student: {
        include: {
          parent: true,
        },
      },
      cohort: {
        include: {
          course: true,
          instructor: true,
        },
      },
      onboardingChecklist: true,
      payments: true,
      certificate: true,
    },
    orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
  });

  const total = enrollments.length;
  const pending = enrollments.filter((entry) => entry.status === EnrollmentStatus.PENDING).length;
  const approved = enrollments.filter((entry) => entry.status === EnrollmentStatus.ACCEPTED).length;
  const needsFollowUp = enrollments.filter(
    (entry) =>
      entry.status === EnrollmentStatus.PENDING ||
      entry.paymentStatus === PaymentStatus.UNPAID ||
      entry.onboardingStatus !== OnboardingStatus.COMPLETED,
  ).length;

  const conversionRate = total ? Math.round(((approved + enrollments.filter((entry) => entry.status === EnrollmentStatus.COMPLETED).length) / total) * 100) : 0;

  const queueRows = enrollments.map((entry) => ({
    student: `${entry.student.firstName} ${entry.student.lastName}`,
    track: entry.cohort.course.title,
    guardian: entry.student.parent.email ?? "No email",
    stage: describeEnrollmentStage(entry),
    status: `status:${describeEnrollmentStatus(entry)}`,
  }));

  return {
    stats: {
      pending,
      approved,
      conversionRate,
      needsFollowUp,
      paidReady: enrollments.filter(
        (entry) =>
          entry.paymentStatus === PaymentStatus.PAID &&
          entry.status === EnrollmentStatus.ACCEPTED &&
          entry.onboardingStatus !== OnboardingStatus.COMPLETED,
      ).length,
      missingInfo: enrollments.filter((entry) =>
        entry.onboardingChecklist
          ? !entry.onboardingChecklist.parentConsentSigned ||
            !entry.onboardingChecklist.profileCompleted ||
            !entry.onboardingChecklist.techSetupVerified
          : true,
      ).length,
      manualReview: enrollments.filter(
        (entry) => entry.status === EnrollmentStatus.PENDING && entry.paymentStatus === PaymentStatus.PAID,
      ).length,
      atRisk: enrollments.filter((entry) => entry.learnerRisk === "AT_RISK").length,
    },
    queueRows,
    feed: enrollments.slice(0, 4).map((entry) => ({
      title: `${entry.student.firstName} ${entry.student.lastName}`,
      detail: `${describeEnrollmentStage(entry)} for ${entry.cohort.name}.`,
      time: entry.updatedAt.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    })),
    enrollments,
  };
}

export async function getCertificateDashboardData(userId: string, role: UserRole) {
  if (role === UserRole.STUDENT) {
    const student = await prisma.student.findUnique({
      where: { userId },
      include: {
        certificates: {
          include: {
            enrollment: {
              include: {
                cohort: {
                  include: {
                    course: true,
                  },
                },
              },
            },
          },
          orderBy: { issuedAt: "desc" },
        },
      },
    });

    return {
      mode: "student" as const,
      certificates: student?.certificates ?? [],
      subjectLabel: student ? `${student.firstName} ${student.lastName}` : "Learner",
    };
  }

  if (role === UserRole.PARENT) {
    const students = await prisma.student.findMany({
      where: { parentId: userId },
      include: {
        certificates: {
          include: {
            enrollment: {
              include: {
                cohort: {
                  include: {
                    course: true,
                  },
                },
              },
            },
          },
          orderBy: { issuedAt: "desc" },
        },
      },
      orderBy: { createdAt: "asc" },
    });

    return {
      mode: "parent" as const,
      certificates: students.flatMap((student) =>
        student.certificates.map((certificate) => ({
          ...certificate,
          studentName: `${student.firstName} ${student.lastName}`,
        })),
      ),
      subjectLabel: "Family",
    };
  }

  const certificates = await prisma.certificate.findMany({
    where:
      role === UserRole.INSTRUCTOR
        ? {
            enrollment: {
              cohort: {
                instructorId: userId,
              },
            },
          }
        : {},
    include: {
      student: true,
      enrollment: {
        include: {
          cohort: {
            include: {
              course: true,
            },
          },
        },
      },
      issuedBy: true,
    },
    orderBy: { issuedAt: "desc" },
  });

  return {
    mode: "admin" as const,
    certificates: certificates.map((certificate) => ({
      ...certificate,
      studentName: `${certificate.student.firstName} ${certificate.student.lastName}`,
    })),
    subjectLabel: "Platform",
  };
}

export async function getCertificateByVerificationCode(verificationCode: string) {
  return prisma.certificate.findUnique({
    where: { verificationCode },
    include: {
      student: true,
      enrollment: {
        include: {
          cohort: {
            include: {
              course: true,
            },
          },
        },
      },
      issuedBy: true,
    },
  });
}

export async function getCertificateIssuanceCandidates(userId: string, role: UserRole) {
  if (role !== UserRole.SUPER_ADMIN && role !== UserRole.ADMIN_STAFF && role !== UserRole.INSTRUCTOR) {
    return [];
  }

  const enrollments = await prisma.enrollment.findMany({
    where: {
      certificate: null,
      status: {
        in: [EnrollmentStatus.ACCEPTED, EnrollmentStatus.COMPLETED],
      },
      ...(role === UserRole.INSTRUCTOR
        ? {
            cohort: {
              instructorId: userId,
            },
          }
        : {}),
    },
    include: {
      student: true,
      cohort: {
        include: {
          course: true,
        },
      },
    },
    orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
  });

  const candidates = await Promise.all(
    enrollments.map(async (enrollment) => {
      const snapshot = await getEnrollmentCompletionSnapshot(enrollment.id);

      return {
        enrollment,
        snapshot,
      };
    }),
  );

  return candidates.filter((candidate) => candidate.snapshot);
}

export async function getRosterDashboardData(userId: string, role: UserRole) {
  if (role !== UserRole.INSTRUCTOR && role !== UserRole.SUPER_ADMIN) {
    return null;
  }

  const enrollments = await prisma.enrollment.findMany({
    where: {
      status: {
        in: [EnrollmentStatus.ACCEPTED, EnrollmentStatus.COMPLETED],
      },
      ...(role === UserRole.INSTRUCTOR
        ? {
            cohort: {
              instructorId: userId,
            },
          }
        : {}),
    },
    include: {
      student: {
        include: {
          parent: true,
        },
      },
      cohort: {
        include: {
          course: true,
        },
      },
      certificate: true,
    },
    orderBy: [{ cohort: { startDate: "asc" } }, { createdAt: "asc" }],
  });

  const learners = await Promise.all(
    enrollments.map(async (enrollment) => {
      const snapshot = await getEnrollmentCompletionSnapshot(enrollment.id);
      const readiness = snapshot?.finalScore ?? 0;

      return {
        id: enrollment.id,
        learner: `${enrollment.student.firstName} ${enrollment.student.lastName}`,
        group: enrollment.cohort.name,
        guardian: enrollment.student.parent.name ?? enrollment.student.parent.email ?? "Guardian",
        progress: readiness,
        status: describeEnrollmentStatus(enrollment),
        learnerRisk: enrollment.learnerRisk,
        stage: describeEnrollmentStage(enrollment),
        courseTitle: enrollment.cohort.course.title,
        hasCertificate: Boolean(enrollment.certificate),
      };
    }),
  );

  const averageReadiness = learners.length
    ? Math.round(learners.reduce((sum, learner) => sum + learner.progress, 0) / learners.length)
    : 0;

  return {
    learners,
    stats: {
      assignedLearners: learners.length,
      activeGroups: new Set(learners.map((learner) => learner.group)).size,
      needsAttention: learners.filter((learner) => learner.status === "At Risk" || learner.status === "Review").length,
      averageReadiness,
      onTrack: learners.filter((learner) => learner.status === "Healthy" || learner.status === "Certified").length,
      watchlist: learners.filter((learner) => learner.status === "Review").length,
      guardianTouchpoints: learners.filter((learner) => learner.stage !== "Certificate issued").length,
      urgentSupport: learners.filter((learner) => learner.status === "At Risk").length,
    },
    feed: learners.slice(0, 4).map((learner) => ({
      title: learner.learner,
      detail: `${learner.stage} in ${learner.group}.`,
      time: learner.status,
    })),
  };
}

export async function getAttendanceDashboardData(userId: string, role: UserRole) {
  if (role !== UserRole.INSTRUCTOR && role !== UserRole.SUPER_ADMIN) {
    return null;
  }

  const sessions = await prisma.campSession.findMany({
    where: role === UserRole.INSTRUCTOR ? { cohort: { instructorId: userId } } : {},
    include: {
      cohort: {
        include: {
          instructor: true,
          enrollments: true,
        },
      },
      attendance: {
        include: {
          student: true,
        },
      },
    },
    orderBy: { date: "asc" },
  });

  const sessionRows = sessions.map((session) => {
    const presentCount = session.attendance.filter((entry) => entry.present).length;
    const enrolledCount = session.cohort.enrollments.length;
    const rate = enrolledCount ? Math.round((presentCount / enrolledCount) * 100) : 0;

    return {
      id: session.id,
      session: session.topic || session.cohort.name,
      coach: session.cohort.instructor?.name ?? "Unassigned",
      presentLabel: `${presentCount} / ${enrolledCount}`,
      late: "0",
      status: rate >= 85 ? "Healthy" : rate >= 65 ? "Review" : "At Risk",
      rate,
      cohortName: session.cohort.name,
    };
  });

  const totalAttendance = sessions.flatMap((session) => session.attendance);
  const attendanceRate = totalAttendance.length
    ? Math.round((totalAttendance.filter((entry) => entry.present).length / totalAttendance.length) * 100)
    : 0;

  return {
    sessions: sessionRows,
    stats: {
      attendanceRate,
      sessionsToday: sessions.length,
      lateArrivals: 0,
      interventions: sessionRows.filter((row) => row.status === "At Risk" || row.status === "Review").length,
      presentToday: totalAttendance.filter((entry) => entry.present).length,
      absent: totalAttendance.filter((entry) => !entry.present).length,
      lateTrend: sessionRows.filter((row) => row.status === "Review").length,
      manualChecks: 0,
    },
    feed: sessionRows.slice(0, 4).map((row) => ({
      title: row.session,
      detail: `${row.presentLabel} present in ${row.cohortName}.`,
      time: row.status,
    })),
  };
}

export async function getBillingDashboardData(userId: string, role: UserRole) {
  if (role !== UserRole.SUPER_ADMIN && role !== UserRole.PARENT) {
    return null;
  }

  const enrollments = await prisma.enrollment.findMany({
    where:
      role === UserRole.PARENT
        ? {
            student: {
              parentId: userId,
            },
          }
        : {},
    include: {
      student: {
        include: {
          parent: true,
        },
      },
      cohort: {
        include: {
          course: true,
        },
      },
      payments: true,
    },
    orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
  });

  const rows = enrollments.map((enrollment) => {
    const latestPayment = enrollment.payments[0] ?? null;
    const amount = latestPayment ? latestPayment.amount / 100 : 0;
    const dueLabel =
      enrollment.paymentStatus === PaymentStatus.PAID
        ? "Paid"
        : enrollment.status === EnrollmentStatus.PENDING
          ? "Awaiting payment"
          : "Open balance";

    return {
      account:
        role === UserRole.PARENT
          ? `${enrollment.student.firstName} ${enrollment.student.lastName}`
          : `${enrollment.student.parent.name ?? enrollment.student.parent.email ?? "Family"} Family`,
      track: enrollment.cohort.course.title,
      amount: `$${amount.toFixed(2)}`,
      due: dueLabel,
      status:
        enrollment.paymentStatus === PaymentStatus.PAID
          ? "Healthy"
          : enrollment.status === EnrollmentStatus.PENDING
            ? "Pending"
            : "Overdue",
    };
  });

  const paidPayments = enrollments.flatMap((enrollment) => enrollment.payments).filter((payment) => payment.status === "SUCCEEDED");
  const outstandingEnrollments = enrollments.filter((enrollment) => enrollment.paymentStatus === PaymentStatus.UNPAID);
  const paidAmount = paidPayments.reduce((sum, payment) => sum + payment.amount, 0) / 100;
  const outstandingAmount = outstandingEnrollments.reduce((sum, enrollment) => {
    const payment = enrollment.payments[0];
    return sum + (payment?.amount ?? 0);
  }, 0) / 100;

  return {
    rows,
    stats: {
      outstandingBalance: outstandingAmount,
      paidThisMonth: paidAmount,
      invoicesDue: outstandingEnrollments.length,
      paymentSuccess: enrollments.length ? Math.round((paidPayments.length / enrollments.length) * 100) : 0,
      collectedToday: paidAmount,
      reminderBatch: outstandingEnrollments.length,
      installmentPlans: 0,
      overdueRisk: outstandingEnrollments.length,
    },
    feed: rows.slice(0, 4).map((row) => ({
      title: row.account,
      detail: `${row.track} - ${row.due}.`,
      time: row.status,
    })),
  };
}

function describeEnrollmentStage(entry: {
  status: EnrollmentStatus;
  paymentStatus: PaymentStatus;
  onboardingStatus: OnboardingStatus;
  certificate: unknown | null;
}) {
  if (entry.certificate) {
    return "Certificate issued";
  }

  if (entry.status === EnrollmentStatus.PENDING && entry.paymentStatus === PaymentStatus.UNPAID) {
    return "Awaiting payment";
  }

  if (entry.status === EnrollmentStatus.PENDING) {
    return "Pending review";
  }

  if (entry.onboardingStatus === OnboardingStatus.NOT_STARTED) {
    return "Ready for onboarding";
  }

  if (entry.onboardingStatus === OnboardingStatus.IN_PROGRESS) {
    return "Onboarding in progress";
  }

  if (entry.onboardingStatus === OnboardingStatus.COMPLETED) {
    return "Active learner";
  }

  return "In progress";
}

function describeEnrollmentStatus(entry: {
  status: EnrollmentStatus;
  paymentStatus: PaymentStatus;
  onboardingStatus: OnboardingStatus;
  learnerRisk: string;
  certificate: unknown | null;
}) {
  if (entry.certificate) {
    return "Certified";
  }

  if (entry.learnerRisk === "AT_RISK") {
    return "At Risk";
  }

  if (entry.status === EnrollmentStatus.PENDING) {
    return "Pending";
  }

  if (entry.paymentStatus === PaymentStatus.UNPAID) {
    return "Overdue";
  }

  if (entry.onboardingStatus === OnboardingStatus.COMPLETED) {
    return "Healthy";
  }

  if (entry.onboardingStatus === OnboardingStatus.IN_PROGRESS) {
    return "Review";
  }

  return "Active";
}
