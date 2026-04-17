import { prisma } from "@/lib/prisma";
import { EnrollmentStatus, PaymentStatus, Prisma, UserRole } from "@prisma/client";
import { sendAdminEnrollmentNotification, sendOnboardingFlow } from "@/lib/emails/actions";
import { issuePasswordSetupToken } from "@/lib/account-setup";
import { enrollmentSchema, type EnrollmentInput } from "@/lib/validation/enrollment";

export type EnrollmentData = EnrollmentInput;

export async function processEnrollment(data: EnrollmentData) {
  const parsed = enrollmentSchema.parse(data);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || "http://localhost:3000";

  console.log(`[Service] Processing enrollment for student ${parsed.studentFirstName} via parent ${parsed.parentEmail}`);

  const result = await prisma.$transaction(async (tx) => {
    const cohort = await resolveEnrollmentCohort(tx, parsed);

    let parent = await tx.user.findUnique({
      where: { email: parsed.parentEmail },
    });

    let requiresPasswordSetup = false;

    if (!parent) {
      console.log("[Service] Registering new parent account...");
      parent = await tx.user.create({
        data: {
          name: parsed.parentFullName,
          email: parsed.parentEmail,
          role: UserRole.PARENT,
        },
      });
      requiresPasswordSetup = true;
    }

    const student = await tx.student.create({
      data: {
        firstName: parsed.studentFirstName,
        lastName: parsed.studentLastName,
        dob: parsed.studentDob,
        age: parsed.studentAge,
        gender: parsed.studentGender,
        grade: parsed.currentGrade,
        school: parsed.schoolName,
        parentId: parent.id,
        additionalInfo: {
          parentPhone: parsed.parentPhone,
          relationship: parsed.relationship,
          preferredContact: parsed.preferredContact,
          cityState: parsed.cityState,
          techExperience: parsed.techExperience,
          formatPreference: parsed.formatPreference,
          sessionPreference: parsed.sessionPreference,
          techAccess: {
            hasComputer: parsed.hasComputer,
            operatingSystem: parsed.operatingSystem,
            hasInternet: parsed.hasInternet,
            hasEmail: parsed.hasEmail,
          },
          emergency: {
            name: parsed.emergencyName,
            phone: parsed.emergencyPhone,
            relation: parsed.emergencyRelation,
          },
          needs: {
            accommodations: parsed.accommodations,
            medicalConditions: parsed.medicalConditions,
          },
          intent: {
            studentGoal: parsed.studentGoal,
            parentExpectation: parsed.parentExpectation,
            referralSource: parsed.referralSource,
          },
          selection: {
            plan: parsed.planSelection,
            promo: parsed.promoCode,
          },
        },
      },
    });

    const enrollment = await tx.enrollment.create({
      data: {
        studentId: student.id,
        cohortId: cohort.id,
        status: EnrollmentStatus.PENDING,
        paymentStatus: PaymentStatus.UNPAID,
      },
    });

    return {
      parentId: parent.id,
      studentId: student.id,
      enrollmentId: enrollment.id,
      cohortId: cohort.id,
      parentEmail: parent.email ?? parsed.parentEmail,
      parentName: parent.name ?? parsed.parentFullName,
      requiresPasswordSetup,
    };
  }, {
    maxWait: 15000,
    timeout: 30000,
  });

  console.log("[Service] Dispatching enrollment notifications...");
  try {
    let setupUrl: string | null = null;

    if (result.requiresPasswordSetup && result.parentEmail) {
      const token = await issuePasswordSetupToken(result.parentEmail);
      setupUrl = `${appUrl}/set-password?token=${token.rawToken}`;
    }

    const onboardingResult = await sendOnboardingFlow(result.parentEmail, result.parentName, {
      setupUrl,
    });
    const adminResult = await sendAdminEnrollmentNotification({
      ...parsed,
      requiresPasswordSetup: result.requiresPasswordSetup,
      setupUrlIssued: Boolean(setupUrl),
    });

    if (!onboardingResult.success || !adminResult.success) {
      console.warn("[Service] Enrollment notifications were not fully delivered.", {
        onboarding: onboardingResult,
        admin: adminResult,
      });
    }
  } catch (commError) {
    console.warn("[Service] Enrollment succeeded but notifications had issues:", commError);
  }

  return result;
}

type EnrollmentTx = Prisma.TransactionClient;

async function resolveEnrollmentCohort(tx: EnrollmentTx, data: EnrollmentData) {
  if (data.cohortId) {
    const existingCohort = await tx.cohort.findUnique({
      where: { id: data.cohortId },
    });

    if (existingCohort) {
      return existingCohort;
    }
  }

  const course = await tx.course.findFirst({
    where: {
      OR: [
        {
          title: {
            contains: data.bootcampTrack,
            mode: "insensitive",
          },
        },
        {
          slug: {
            contains: data.bootcampTrack.toLowerCase(),
          },
        },
      ],
    },
    orderBy: { createdAt: "asc" },
  }) ?? await tx.course.findFirst({
    orderBy: { createdAt: "asc" },
  });

  const resolvedCourse = course ?? await createStarterCourse(tx, data);

  const existingCohort = await tx.cohort.findFirst({
    where: { courseId: resolvedCourse.id },
    orderBy: { startDate: "asc" },
  });

  if (existingCohort) {
    return existingCohort;
  }

  const startDate = getFallbackCohortStartDate(data.cohortDate ?? data.cohortId ?? data.bootcampTrack);
  const endDate = new Date(startDate);
  endDate.setUTCDate(endDate.getUTCDate() + 14);

  console.log(`[Service] No cohort found for ${resolvedCourse.title}. Creating starter cohort.`);

  return tx.cohort.create({
    data: {
      courseId: resolvedCourse.id,
      name: `${resolvedCourse.title} ${formatCohortLabel(startDate)}`,
      startDate,
      endDate,
    },
  });
}

async function createStarterCourse(tx: EnrollmentTx, data: EnrollmentData) {
  const starterCourse = getStarterCourseDefinition(data.bootcampTrack);

  console.log(`[Service] No course found for ${data.bootcampTrack}. Creating starter course ${starterCourse.title}.`);

  return tx.course.create({
    data: starterCourse,
  });
}

function getFallbackCohortStartDate(selection?: string) {
  const normalizedSelection = selection?.toLowerCase() ?? "";
  const year = new Date().getUTCFullYear();

  if (normalizedSelection.includes("july")) {
    return new Date(Date.UTC(year, 6, 1));
  }

  if (normalizedSelection.includes("june")) {
    return new Date(Date.UTC(year, 5, 15));
  }

  const nextMonth = new Date();
  nextMonth.setUTCDate(1);
  nextMonth.setUTCMonth(nextMonth.getUTCMonth() + 1);
  nextMonth.setUTCHours(0, 0, 0, 0);

  return nextMonth;
}

function formatCohortLabel(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function getStarterCourseDefinition(track: string) {
  const normalizedTrack = track.toLowerCase();

  if (normalizedTrack.includes("hardware")) {
    return {
      title: "Intro to Computer Hardware",
      slug: "intro-to-computer-hardware",
      description: "Starter bootcamp course automatically created during enrollment setup.",
    };
  }

  if (normalizedTrack.includes("network")) {
    return {
      title: "Intro to Networking",
      slug: "intro-to-networking",
      description: "Starter networking course automatically created during enrollment setup.",
    };
  }

  if (normalizedTrack.includes("web")) {
    return {
      title: "Intro to Web Development",
      slug: "intro-to-web-development",
      description: "Starter web development course automatically created during enrollment setup.",
    };
  }

  if (normalizedTrack.includes("ai")) {
    return {
      title: "Intro to AI & Current Trends",
      slug: "intro-to-ai-current-trends",
      description: "Starter AI course automatically created during enrollment setup.",
    };
  }

  return {
    title: "Intro to Cybersecurity",
    slug: "intro-to-cybersecurity",
    description: "Starter cybersecurity course automatically created during enrollment setup.",
  };
}
