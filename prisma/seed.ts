import {
  AssignmentStatus,
  AssignmentSubmissionStatus,
  EnrollmentStatus,
  LearnerRiskLevel,
  OnboardingStatus,
  PaymentRecordStatus,
  PaymentStatus,
  PrismaClient,
  UserRole,
} from "@prisma/client";
import { issueCertificateForEnrollment } from "../lib/services/certificates";
import { hashPassword } from "../lib/security/password";

const prisma = new PrismaClient();
const DEFAULT_PASSWORD = "ChangeMe123!";

const staffUsers = [
  { name: "Platform Director", email: "admin@cyber.com", role: UserRole.SUPER_ADMIN },
  { name: "Ivan Instructor", email: "ivan@cyber.com", role: UserRole.INSTRUCTOR },
  { name: "Nia Instructor", email: "nia@cyber.com", role: UserRole.INSTRUCTOR },
  { name: "Marco Instructor", email: "marco@cyber.com", role: UserRole.INSTRUCTOR },
  { name: "Staff Member", email: "staff@cyber.com", role: UserRole.ADMIN_STAFF },
  { name: "Cyber Admin", email: "iradtu22@gmail.com", role: UserRole.SUPER_ADMIN },
] as const;

const familyUsers = [
  { name: "Grace Guardian", email: "grace.parent@cyber.com", role: UserRole.PARENT },
  { name: "Samuel Guardian", email: "samuel.parent@cyber.com", role: UserRole.PARENT },
  { name: "Esther Guardian", email: "esther.parent@cyber.com", role: UserRole.PARENT },
  { name: "Daniel Guardian", email: "daniel.parent@cyber.com", role: UserRole.PARENT },
  { name: "Noah Kato", email: "noah.student@cyber.com", role: UserRole.STUDENT },
  { name: "Zara Nankya", email: "zara.student@cyber.com", role: UserRole.STUDENT },
  { name: "Liam Ssenyonjo", email: "liam.student@cyber.com", role: UserRole.STUDENT },
  { name: "Ethan Tumusiime", email: "ethan.student@cyber.com", role: UserRole.STUDENT },
  { name: "Aisha Namata", email: "aisha.student@cyber.com", role: UserRole.STUDENT },
] as const;

const seedCourses = [
  {
    title: "Cyber Defense Foundations",
    slug: "seed-cyber-defense-foundations",
    description: "Seed course for active cybersecurity learners, progress tracking, and intervention workflows.",
  },
  {
    title: "Web Makers Studio",
    slug: "seed-web-makers-studio",
    description: "Seed course for waitlisted and onboarding-focused learners.",
  },
  {
    title: "AI Innovators Lab",
    slug: "seed-ai-innovators-lab",
    description: "Seed course for completion and certificate issuance scenarios.",
  },
] as const;

type SeedUser = {
  name: string;
  email: string;
  role: UserRole;
};

async function main() {
  console.log("[Seed] Building learner lifecycle dataset...");

  const users = await syncUsers([...staffUsers, ...familyUsers]);
  const courses = await syncCourses();

  await cleanupSeedDomain({
    courseSlugs: seedCourses.map((course) => course.slug),
    parentEmails: familyUsers.filter((user) => user.role === UserRole.PARENT).map((user) => user.email),
    studentEmails: familyUsers.filter((user) => user.role === UserRole.STUDENT).map((user) => user.email),
  });

  const activeCyberCohort = await prisma.cohort.create({
    data: {
      courseId: courses["seed-cyber-defense-foundations"].id,
      instructorId: users["ivan@cyber.com"].id,
      name: "Cyber Defense Cohort | May 2026",
      startDate: new Date("2026-04-27T09:00:00.000Z"),
      endDate: new Date("2026-06-05T16:00:00.000Z"),
    },
  });

  const onboardingWebCohort = await prisma.cohort.create({
    data: {
      courseId: courses["seed-web-makers-studio"].id,
      instructorId: users["nia@cyber.com"].id,
      name: "Web Makers Cohort | June 2026",
      startDate: new Date("2026-06-08T09:00:00.000Z"),
      endDate: new Date("2026-07-17T16:00:00.000Z"),
    },
  });

  const alumniAiCohort = await prisma.cohort.create({
    data: {
      courseId: courses["seed-ai-innovators-lab"].id,
      instructorId: users["marco@cyber.com"].id,
      name: "AI Innovators Cohort | January 2026",
      startDate: new Date("2026-01-12T09:00:00.000Z"),
      endDate: new Date("2026-02-20T16:00:00.000Z"),
    },
  });

  const maya = await prisma.student.create({
    data: {
      firstName: "Maya",
      lastName: "Okello",
      age: 12,
      grade: "P7",
      school: "Bright Future Primary",
      gender: "Female",
      parentId: users["grace.parent@cyber.com"].id,
      additionalInfo: {
        scenario: "pending-onboarding",
        goal: "Explore web design and digital storytelling.",
      },
    },
  });

  const noah = await prisma.student.create({
    data: {
      firstName: "Noah",
      lastName: "Kato",
      age: 13,
      grade: "S1",
      school: "Kampala Learning Hub",
      gender: "Male",
      parentId: users["grace.parent@cyber.com"].id,
      userId: users["noah.student@cyber.com"].id,
      additionalInfo: {
        scenario: "onboarding-in-progress",
        goal: "Build confidence in digital safety and cyber basics.",
      },
    },
  });

  const zara = await prisma.student.create({
    data: {
      firstName: "Zara",
      lastName: "Nankya",
      age: 14,
      grade: "S2",
      school: "Victory Secondary School",
      gender: "Female",
      parentId: users["samuel.parent@cyber.com"].id,
      userId: users["zara.student@cyber.com"].id,
      additionalInfo: {
        scenario: "active-on-track",
        goal: "Prepare for school tech club competitions.",
      },
    },
  });

  const liam = await prisma.student.create({
    data: {
      firstName: "Liam",
      lastName: "Ssenyonjo",
      age: 15,
      grade: "S3",
      school: "Horizon College",
      gender: "Male",
      parentId: users["esther.parent@cyber.com"].id,
      userId: users["liam.student@cyber.com"].id,
      additionalInfo: {
        scenario: "at-risk",
        goal: "Improve practical cyber defense skills.",
      },
    },
  });

  const ethan = await prisma.student.create({
    data: {
      firstName: "Ethan",
      lastName: "Tumusiime",
      age: 16,
      grade: "S4",
      school: "Future Leaders Academy",
      gender: "Male",
      parentId: users["daniel.parent@cyber.com"].id,
      userId: users["ethan.student@cyber.com"].id,
      additionalInfo: {
        scenario: "completion-ready",
        goal: "Create AI projects for entrepreneurship.",
      },
    },
  });

  const aisha = await prisma.student.create({
    data: {
      firstName: "Aisha",
      lastName: "Namata",
      age: 15,
      grade: "S3",
      school: "Future Leaders Academy",
      gender: "Female",
      parentId: users["daniel.parent@cyber.com"].id,
      userId: users["aisha.student@cyber.com"].id,
      additionalInfo: {
        scenario: "certified-alumni",
        goal: "Use AI tools responsibly for design and research.",
      },
    },
  });

  const mayaEnrollment = await createEnrollmentLifecycle({
    studentId: maya.id,
    cohortId: onboardingWebCohort.id,
    status: EnrollmentStatus.PENDING,
    paymentStatus: PaymentStatus.UNPAID,
    onboardingStatus: OnboardingStatus.NOT_STARTED,
    learnerRisk: LearnerRiskLevel.WATCHLIST,
    checklist: {
      profileCompleted: false,
      parentConsentSigned: false,
      welcomeEmailSent: true,
      techSetupVerified: false,
      scheduleConfirmed: false,
      orientationComplete: false,
      firstSessionAttended: false,
      status: OnboardingStatus.NOT_STARTED,
    },
  });

  const noahEnrollment = await createEnrollmentLifecycle({
    studentId: noah.id,
    cohortId: activeCyberCohort.id,
    status: EnrollmentStatus.ACCEPTED,
    paymentStatus: PaymentStatus.PAID,
    onboardingStatus: OnboardingStatus.IN_PROGRESS,
    learnerRisk: LearnerRiskLevel.ON_TRACK,
    approvedAt: new Date("2026-04-22T10:00:00.000Z"),
    checklist: {
      profileCompleted: true,
      parentConsentSigned: true,
      welcomeEmailSent: true,
      techSetupVerified: true,
      scheduleConfirmed: true,
      orientationComplete: false,
      firstSessionAttended: true,
      status: OnboardingStatus.IN_PROGRESS,
    },
    payment: {
      stripeCheckoutSessionId: "seed_checkout_noah",
      stripePaymentIntentId: "seed_pi_noah",
      amount: 14900,
      receiptEmail: "grace.parent@cyber.com",
    },
  });

  const zaraEnrollment = await createEnrollmentLifecycle({
    studentId: zara.id,
    cohortId: activeCyberCohort.id,
    status: EnrollmentStatus.ACCEPTED,
    paymentStatus: PaymentStatus.PAID,
    onboardingStatus: OnboardingStatus.COMPLETED,
    learnerRisk: LearnerRiskLevel.ON_TRACK,
    approvedAt: new Date("2026-04-20T11:30:00.000Z"),
    onboardingCompletedAt: new Date("2026-04-25T12:00:00.000Z"),
    checklist: {
      profileCompleted: true,
      parentConsentSigned: true,
      welcomeEmailSent: true,
      techSetupVerified: true,
      scheduleConfirmed: true,
      orientationComplete: true,
      firstSessionAttended: true,
      status: OnboardingStatus.COMPLETED,
      completedAt: new Date("2026-04-25T12:00:00.000Z"),
    },
    payment: {
      stripeCheckoutSessionId: "seed_checkout_zara",
      stripePaymentIntentId: "seed_pi_zara",
      amount: 14900,
      receiptEmail: "samuel.parent@cyber.com",
    },
  });

  const liamEnrollment = await createEnrollmentLifecycle({
    studentId: liam.id,
    cohortId: activeCyberCohort.id,
    status: EnrollmentStatus.ACCEPTED,
    paymentStatus: PaymentStatus.PAID,
    onboardingStatus: OnboardingStatus.COMPLETED,
    learnerRisk: LearnerRiskLevel.AT_RISK,
    approvedAt: new Date("2026-04-19T09:15:00.000Z"),
    onboardingCompletedAt: new Date("2026-04-24T14:30:00.000Z"),
    checklist: {
      profileCompleted: true,
      parentConsentSigned: true,
      welcomeEmailSent: true,
      techSetupVerified: true,
      scheduleConfirmed: true,
      orientationComplete: true,
      firstSessionAttended: true,
      status: OnboardingStatus.COMPLETED,
      completedAt: new Date("2026-04-24T14:30:00.000Z"),
    },
    payment: {
      stripeCheckoutSessionId: "seed_checkout_liam",
      stripePaymentIntentId: "seed_pi_liam",
      amount: 14900,
      receiptEmail: "esther.parent@cyber.com",
    },
  });

  const ethanEnrollment = await createEnrollmentLifecycle({
    studentId: ethan.id,
    cohortId: alumniAiCohort.id,
    status: EnrollmentStatus.ACCEPTED,
    paymentStatus: PaymentStatus.PAID,
    onboardingStatus: OnboardingStatus.COMPLETED,
    learnerRisk: LearnerRiskLevel.ON_TRACK,
    approvedAt: new Date("2026-01-07T10:00:00.000Z"),
    onboardingCompletedAt: new Date("2026-01-10T15:00:00.000Z"),
    checklist: {
      profileCompleted: true,
      parentConsentSigned: true,
      welcomeEmailSent: true,
      techSetupVerified: true,
      scheduleConfirmed: true,
      orientationComplete: true,
      firstSessionAttended: true,
      status: OnboardingStatus.COMPLETED,
      completedAt: new Date("2026-01-10T15:00:00.000Z"),
    },
    payment: {
      stripeCheckoutSessionId: "seed_checkout_ethan",
      stripePaymentIntentId: "seed_pi_ethan",
      amount: 18900,
      receiptEmail: "daniel.parent@cyber.com",
    },
  });

  const aishaEnrollment = await createEnrollmentLifecycle({
    studentId: aisha.id,
    cohortId: alumniAiCohort.id,
    status: EnrollmentStatus.ACCEPTED,
    paymentStatus: PaymentStatus.PAID,
    onboardingStatus: OnboardingStatus.COMPLETED,
    learnerRisk: LearnerRiskLevel.ON_TRACK,
    approvedAt: new Date("2026-01-06T09:30:00.000Z"),
    onboardingCompletedAt: new Date("2026-01-09T11:00:00.000Z"),
    checklist: {
      profileCompleted: true,
      parentConsentSigned: true,
      welcomeEmailSent: true,
      techSetupVerified: true,
      scheduleConfirmed: true,
      orientationComplete: true,
      firstSessionAttended: true,
      status: OnboardingStatus.COMPLETED,
      completedAt: new Date("2026-01-09T11:00:00.000Z"),
    },
    payment: {
      stripeCheckoutSessionId: "seed_checkout_aisha",
      stripePaymentIntentId: "seed_pi_aisha",
      amount: 18900,
      receiptEmail: "daniel.parent@cyber.com",
    },
  });

  const cyberSessions = await createSessions(activeCyberCohort.id, [
    ["2026-04-28T09:00:00.000Z", "Cyber safety orientation"],
    ["2026-05-01T09:00:00.000Z", "Password defense lab"],
    ["2026-05-05T09:00:00.000Z", "Phishing detection workshop"],
    ["2026-05-08T09:00:00.000Z", "Network basics challenge"],
    ["2026-05-12T09:00:00.000Z", "Incident response drill"],
  ]);

  const aiSessions = await createSessions(alumniAiCohort.id, [
    ["2026-01-14T09:00:00.000Z", "AI ethics kickoff"],
    ["2026-01-21T09:00:00.000Z", "Prompt engineering studio"],
    ["2026-01-28T09:00:00.000Z", "AI product design lab"],
    ["2026-02-04T09:00:00.000Z", "Capstone presentations"],
  ]);

  await createAttendance(cyberSessions, noah.id, [true, true, true, false, false]);
  await createAttendance(cyberSessions, zara.id, [true, true, true, true, true]);
  await createAttendance(cyberSessions, liam.id, [true, false, false, true, false]);
  await createAttendance(aiSessions, ethan.id, [true, true, true, true]);
  await createAttendance(aiSessions, aisha.id, [true, true, true, true]);

  const cyberThreatModel = await prisma.assignment.create({
    data: {
      cohortId: activeCyberCohort.id,
      title: "Threat Modeling Worksheet",
      description: "Map common digital threats that affect students and families.",
      dueDate: new Date("2026-05-04T18:00:00.000Z"),
      points: 100,
      status: AssignmentStatus.PUBLISHED,
      createdById: users["ivan@cyber.com"].id,
    },
  });

  const cyberPhishing = await prisma.assignment.create({
    data: {
      cohortId: activeCyberCohort.id,
      title: "Phishing Analysis Report",
      description: "Review sample phishing messages and explain the red flags.",
      dueDate: new Date("2026-05-11T18:00:00.000Z"),
      points: 100,
      status: AssignmentStatus.PUBLISHED,
      createdById: users["ivan@cyber.com"].id,
    },
  });

  await prisma.assignment.create({
    data: {
      cohortId: onboardingWebCohort.id,
      title: "Design Your First Portfolio Moodboard",
      description: "An upcoming starter assignment for newly onboarded learners.",
      dueDate: new Date("2026-06-15T18:00:00.000Z"),
      points: 50,
      status: AssignmentStatus.DRAFT,
      createdById: users["nia@cyber.com"].id,
    },
  });

  const aiEthics = await prisma.assignment.create({
    data: {
      cohortId: alumniAiCohort.id,
      title: "AI Ethics Reflection",
      description: "Summarize how to use AI responsibly in school and community settings.",
      dueDate: new Date("2026-01-25T18:00:00.000Z"),
      points: 100,
      status: AssignmentStatus.PUBLISHED,
      createdById: users["marco@cyber.com"].id,
    },
  });

  const aiCapstone = await prisma.assignment.create({
    data: {
      cohortId: alumniAiCohort.id,
      title: "AI Community Capstone",
      description: "Build and present a simple project that solves a real community problem.",
      dueDate: new Date("2026-02-10T18:00:00.000Z"),
      points: 100,
      status: AssignmentStatus.PUBLISHED,
      createdById: users["marco@cyber.com"].id,
    },
  });

  await createSubmission(cyberThreatModel.id, noah.id, {
    status: AssignmentSubmissionStatus.SUBMITTED,
    note: "I uploaded my first worksheet and I am still polishing the examples.",
    fileKey: "seed/noah-threat-model.pdf",
    fileUrl: "https://example.com/uploads/noah-threat-model.pdf",
    fileName: "noah-threat-model.pdf",
    fileSize: 124000,
    fileType: "application/pdf",
    submittedAt: new Date("2026-05-03T16:10:00.000Z"),
  });

  await createSubmission(cyberThreatModel.id, zara.id, {
    status: AssignmentSubmissionStatus.REVIEWED,
    note: "Included extra examples from recent scam campaigns.",
    fileKey: "seed/zara-threat-model.pdf",
    fileUrl: "https://example.com/uploads/zara-threat-model.pdf",
    fileName: "zara-threat-model.pdf",
    fileSize: 132000,
    fileType: "application/pdf",
    submittedAt: new Date("2026-05-02T17:45:00.000Z"),
    reviewedAt: new Date("2026-05-03T09:15:00.000Z"),
    reviewedById: users["ivan@cyber.com"].id,
    score: 88,
    feedback: "Clear reasoning and strong examples. Keep tightening your mitigation steps.",
  });

  await createSubmission(cyberPhishing.id, zara.id, {
    status: AssignmentSubmissionStatus.REVIEWED,
    note: "I highlighted how the sender spoofed the organization domain.",
    fileKey: "seed/zara-phishing-report.pdf",
    fileUrl: "https://example.com/uploads/zara-phishing-report.pdf",
    fileName: "zara-phishing-report.pdf",
    fileSize: 118000,
    fileType: "application/pdf",
    submittedAt: new Date("2026-05-10T12:15:00.000Z"),
    reviewedAt: new Date("2026-05-11T08:50:00.000Z"),
    reviewedById: users["ivan@cyber.com"].id,
    score: 92,
    feedback: "Excellent attention to detail and confident analysis.",
  });

  await createSubmission(cyberThreatModel.id, liam.id, {
    status: AssignmentSubmissionStatus.RETURNED,
    note: "I was not sure how to finish the family safety section.",
    fileKey: "seed/liam-threat-model.pdf",
    fileUrl: "https://example.com/uploads/liam-threat-model.pdf",
    fileName: "liam-threat-model.pdf",
    fileSize: 101000,
    fileType: "application/pdf",
    submittedAt: new Date("2026-05-04T11:20:00.000Z"),
    reviewedAt: new Date("2026-05-05T07:40:00.000Z"),
    reviewedById: users["ivan@cyber.com"].id,
    score: 52,
    feedback: "Please revise the risk ranking section and resubmit after coaching.",
  });

  await createSubmission(aiEthics.id, ethan.id, {
    status: AssignmentSubmissionStatus.REVIEWED,
    note: "I focused on misinformation, bias, and safe classroom use.",
    fileKey: "seed/ethan-ai-ethics.pdf",
    fileUrl: "https://example.com/uploads/ethan-ai-ethics.pdf",
    fileName: "ethan-ai-ethics.pdf",
    fileSize: 126000,
    fileType: "application/pdf",
    submittedAt: new Date("2026-01-23T10:30:00.000Z"),
    reviewedAt: new Date("2026-01-24T08:30:00.000Z"),
    reviewedById: users["marco@cyber.com"].id,
    score: 85,
    feedback: "Thoughtful work. Keep making your examples more specific.",
  });

  await createSubmission(aiCapstone.id, ethan.id, {
    status: AssignmentSubmissionStatus.REVIEWED,
    note: "My capstone helps local shops draft clearer marketing messages.",
    fileKey: "seed/ethan-ai-capstone.pdf",
    fileUrl: "https://example.com/uploads/ethan-ai-capstone.pdf",
    fileName: "ethan-ai-capstone.pdf",
    fileSize: 140000,
    fileType: "application/pdf",
    submittedAt: new Date("2026-02-09T13:00:00.000Z"),
    reviewedAt: new Date("2026-02-11T10:00:00.000Z"),
    reviewedById: users["marco@cyber.com"].id,
    score: 78,
    feedback: "Solid idea and delivery. Consider improving your evidence section.",
  });

  await createSubmission(aiEthics.id, aisha.id, {
    status: AssignmentSubmissionStatus.REVIEWED,
    note: "I connected AI ethics to design, accessibility, and trust.",
    fileKey: "seed/aisha-ai-ethics.pdf",
    fileUrl: "https://example.com/uploads/aisha-ai-ethics.pdf",
    fileName: "aisha-ai-ethics.pdf",
    fileSize: 144000,
    fileType: "application/pdf",
    submittedAt: new Date("2026-01-22T14:10:00.000Z"),
    reviewedAt: new Date("2026-01-24T09:00:00.000Z"),
    reviewedById: users["marco@cyber.com"].id,
    score: 95,
    feedback: "Excellent submission with mature reasoning and strong examples.",
  });

  await createSubmission(aiCapstone.id, aisha.id, {
    status: AssignmentSubmissionStatus.REVIEWED,
    note: "My project supports youth clubs with inclusive poster and messaging drafts.",
    fileKey: "seed/aisha-ai-capstone.pdf",
    fileUrl: "https://example.com/uploads/aisha-ai-capstone.pdf",
    fileName: "aisha-ai-capstone.pdf",
    fileSize: 152000,
    fileType: "application/pdf",
    submittedAt: new Date("2026-02-09T15:30:00.000Z"),
    reviewedAt: new Date("2026-02-11T11:20:00.000Z"),
    reviewedById: users["marco@cyber.com"].id,
    score: 94,
    feedback: "Outstanding finish. Your project is polished and community-centered.",
  });

  await prisma.enrollment.update({
    where: { id: ethanEnrollment.id },
    data: {
      finalScore: 84,
    },
  });

  await issueCertificateForEnrollment(aishaEnrollment.id, users["admin@cyber.com"].id);

  console.log("[Seed] Learner lifecycle dataset ready.");
  console.log(`[Seed] Enrollments created: ${[mayaEnrollment, noahEnrollment, zaraEnrollment, liamEnrollment, ethanEnrollment, aishaEnrollment].length}`);
}

async function syncUsers(users: readonly SeedUser[]) {
  const entries = await Promise.all(
    users.map(async (user) => {
      const password = await hashPassword(DEFAULT_PASSWORD);

      const saved = await prisma.user.upsert({
        where: { email: user.email },
        update: {
          name: user.name,
          role: user.role,
          password,
        },
        create: {
          name: user.name,
          email: user.email,
          role: user.role,
          password,
        },
      });

      return [user.email, saved] as const;
    }),
  );

  return Object.fromEntries(entries);
}

async function syncCourses() {
  const entries = await Promise.all(
    seedCourses.map(async (course) => {
      const saved = await prisma.course.upsert({
        where: { slug: course.slug },
        update: {
          title: course.title,
          description: course.description,
        },
        create: course,
      });

      return [course.slug, saved] as const;
    }),
  );

  return Object.fromEntries(entries);
}

async function cleanupSeedDomain({
  courseSlugs,
  parentEmails,
  studentEmails,
}: {
  courseSlugs: string[];
  parentEmails: string[];
  studentEmails: string[];
}) {
  const courses = await prisma.course.findMany({
    where: {
      slug: {
        in: courseSlugs,
      },
    },
    select: {
      id: true,
    },
  });

  const parents = await prisma.user.findMany({
    where: {
      email: {
        in: parentEmails,
      },
    },
    select: {
      id: true,
    },
  });

  const studentUsers = await prisma.user.findMany({
    where: {
      email: {
        in: studentEmails,
      },
    },
    select: {
      id: true,
    },
  });

  const courseIds = courses.map((course) => course.id);
  const parentIds = parents.map((parent) => parent.id);
  const studentUserIds = studentUsers.map((user) => user.id);

  const cohorts = await prisma.cohort.findMany({
    where: {
      courseId: {
        in: courseIds,
      },
    },
    select: {
      id: true,
    },
  });

  const students = await prisma.student.findMany({
    where: {
      OR: [
        {
          parentId: {
            in: parentIds,
          },
        },
        {
          userId: {
            in: studentUserIds,
          },
        },
      ],
    },
    select: {
      id: true,
    },
  });

  const cohortIds = cohorts.map((cohort) => cohort.id);
  const studentIds = students.map((student) => student.id);

  const enrollments = await prisma.enrollment.findMany({
    where: {
      OR: [
        {
          cohortId: {
            in: cohortIds,
          },
        },
        {
          studentId: {
            in: studentIds,
          },
        },
      ],
    },
    select: {
      id: true,
    },
  });

  const sessions = await prisma.campSession.findMany({
    where: {
      cohortId: {
        in: cohortIds,
      },
    },
    select: {
      id: true,
    },
  });

  const assignments = await prisma.assignment.findMany({
    where: {
      cohortId: {
        in: cohortIds,
      },
    },
    select: {
      id: true,
    },
  });

  const enrollmentIds = enrollments.map((enrollment) => enrollment.id);
  const sessionIds = sessions.map((session) => session.id);
  const assignmentIds = assignments.map((assignment) => assignment.id);

  await prisma.certificate.deleteMany({
    where: {
      OR: [
        {
          enrollmentId: {
            in: enrollmentIds,
          },
        },
        {
          studentId: {
            in: studentIds,
          },
        },
      ],
    },
  });

  await prisma.onboardingChecklist.deleteMany({
    where: {
      enrollmentId: {
        in: enrollmentIds,
      },
    },
  });

  await prisma.assignmentSubmission.deleteMany({
    where: {
      OR: [
        {
          assignmentId: {
            in: assignmentIds,
          },
        },
        {
          studentId: {
            in: studentIds,
          },
        },
      ],
    },
  });

  await prisma.assignment.deleteMany({
    where: {
      id: {
        in: assignmentIds,
      },
    },
  });

  await prisma.attendance.deleteMany({
    where: {
      OR: [
        {
          sessionId: {
            in: sessionIds,
          },
        },
        {
          studentId: {
            in: studentIds,
          },
        },
      ],
    },
  });

  await prisma.campSession.deleteMany({
    where: {
      id: {
        in: sessionIds,
      },
    },
  });

  await prisma.payment.deleteMany({
    where: {
      enrollmentId: {
        in: enrollmentIds,
      },
    },
  });

  await prisma.enrollment.deleteMany({
    where: {
      id: {
        in: enrollmentIds,
      },
    },
  });

  await prisma.student.deleteMany({
    where: {
      id: {
        in: studentIds,
      },
    },
  });

  await prisma.cohort.deleteMany({
    where: {
      id: {
        in: cohortIds,
      },
    },
  });
}

async function createEnrollmentLifecycle({
  studentId,
  cohortId,
  status,
  paymentStatus,
  onboardingStatus,
  learnerRisk,
  approvedAt,
  onboardingCompletedAt,
  checklist,
  payment,
}: {
  studentId: string;
  cohortId: string;
  status: EnrollmentStatus;
  paymentStatus: PaymentStatus;
  onboardingStatus: OnboardingStatus;
  learnerRisk: LearnerRiskLevel;
  approvedAt?: Date;
  onboardingCompletedAt?: Date;
  checklist: {
    profileCompleted: boolean;
    parentConsentSigned: boolean;
    welcomeEmailSent: boolean;
    techSetupVerified: boolean;
    scheduleConfirmed: boolean;
    orientationComplete: boolean;
    firstSessionAttended: boolean;
    status: OnboardingStatus;
    completedAt?: Date;
  };
  payment?: {
    stripeCheckoutSessionId: string;
    stripePaymentIntentId: string;
    amount: number;
    receiptEmail: string;
  };
}) {
  const enrollment = await prisma.enrollment.create({
    data: {
      studentId,
      cohortId,
      status,
      paymentStatus,
      onboardingStatus,
      learnerRisk,
      approvedAt,
      onboardingCompletedAt,
    },
  });

  await prisma.onboardingChecklist.create({
    data: {
      enrollmentId: enrollment.id,
      ...checklist,
    },
  });

  if (payment) {
    await prisma.payment.create({
      data: {
        enrollmentId: enrollment.id,
        stripeCheckoutSessionId: payment.stripeCheckoutSessionId,
        stripePaymentIntentId: payment.stripePaymentIntentId,
        amount: payment.amount,
        currency: "usd",
        status: PaymentRecordStatus.SUCCEEDED,
        receiptEmail: payment.receiptEmail,
      },
    });
  }

  return enrollment;
}

async function createSessions(cohortId: string, items: Array<[string, string]>) {
  return Promise.all(
    items.map(([date, topic]) =>
      prisma.campSession.create({
        data: {
          cohortId,
          date: new Date(date),
          topic,
        },
      }),
    ),
  );
}

async function createAttendance(
  sessions: Array<{ id: string }>,
  studentId: string,
  presentStates: boolean[],
) {
  await Promise.all(
    sessions.map((session, index) =>
      prisma.attendance.create({
        data: {
          sessionId: session.id,
          studentId,
          present: presentStates[index] ?? false,
        },
      }),
    ),
  );
}

async function createSubmission(
  assignmentId: string,
  studentId: string,
  data: {
    status: AssignmentSubmissionStatus;
    note: string;
    fileKey: string;
    fileUrl: string;
    fileName: string;
    fileSize: number;
    fileType: string;
    submittedAt: Date;
    reviewedAt?: Date;
    reviewedById?: string;
    score?: number;
    feedback?: string;
  },
) {
  await prisma.assignmentSubmission.create({
    data: {
      assignmentId,
      studentId,
      ...data,
    },
  });
}

main()
  .catch((error) => {
    console.error("[Seed] Global failure:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
