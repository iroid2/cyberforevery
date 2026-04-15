import { prisma } from "@/lib/prisma";
import { UserRole, EnrollmentStatus, PaymentStatus, Prisma } from "@prisma/client";
import { sendAdminEnrollmentNotification, sendOnboardingFlow } from "@/lib/emails/actions";

export interface EnrollmentData {
  parentFullName: string;
  parentEmail: string;
  parentPhone: string;
  relationship: string;
  preferredContact: string;
  cityState: string;
  studentFirstName: string;
  studentLastName: string;
  studentDob: string;
  studentAge: string;
  studentGender?: string;
  currentGrade: string;
  schoolName: string;
  techExperience: string;
  bootcampTrack: string;
  formatPreference: string;
  cohortId?: string;
  sessionPreference: string;
  hasComputer: string;
  operatingSystem: string;
  hasInternet: string;
  hasEmail: string;
  emergencyName: string;
  emergencyPhone: string;
  emergencyRelation: string;
  accommodations?: string;
  medicalConditions?: string;
  studentGoal: string;
  parentExpectation: string;
  referralSource: string;
  planSelection: string;
  promoCode?: string;
}

export async function processEnrollment(data: EnrollmentData) {
  console.log(`[Service] Processing enrollment for student ${data.studentFirstName} via parent ${data.parentEmail}`);

  const result = await prisma.$transaction(async (tx) => {
    const cohort = await resolveEnrollmentCohort(tx, data);

    let parent = await tx.user.findUnique({
      where: { email: data.parentEmail.toLowerCase() },
    });

    if (!parent) {
      console.log("[Service] Registering new parent account...");
      parent = await tx.user.create({
        data: {
          name: data.parentFullName,
          email: data.parentEmail.toLowerCase(),
          password: "password123",
          role: UserRole.PARENT,
        },
      });
    }

    const student = await tx.student.create({
      data: {
        firstName: data.studentFirstName,
        lastName: data.studentLastName,
        dob: data.studentDob ? new Date(data.studentDob) : null,
        age: parseInt(data.studentAge),
        gender: data.studentGender,
        grade: data.currentGrade,
        school: data.schoolName,
        parentId: parent.id,
        additionalInfo: {
          parentPhone: data.parentPhone,
          relationship: data.relationship,
          preferredContact: data.preferredContact,
          cityState: data.cityState,
          techExperience: data.techExperience,
          formatPreference: data.formatPreference,
          sessionPreference: data.sessionPreference,
          techAccess: {
            hasComputer: data.hasComputer,
            operatingSystem: data.operatingSystem,
            hasInternet: data.hasInternet,
            hasEmail: data.hasEmail,
          },
          emergency: {
            name: data.emergencyName,
            phone: data.emergencyPhone,
            relation: data.emergencyRelation,
          },
          needs: {
            accommodations: data.accommodations,
            medicalConditions: data.medicalConditions,
          },
          intent: {
            studentGoal: data.studentGoal,
            parentExpectation: data.parentExpectation,
            referralSource: data.referralSource,
          },
          selection: {
            plan: data.planSelection,
            promo: data.promoCode,
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
    };
  }, {
    maxWait: 15000,
    timeout: 30000,
  });

  console.log("[Service] Dispatching enrollment notifications...");
  try {
    const onboardingResult = await sendOnboardingFlow(data.parentEmail, data.parentFullName);
    const adminResult = await sendAdminEnrollmentNotification({
      ...data,
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

  const startDate = getFallbackCohortStartDate(data.cohortId ?? data.bootcampTrack);
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
