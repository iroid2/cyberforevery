# Implementation Plan: Certificate Prompt & Finished Sessions Feature

## Overview
This plan implements two major features:
1. **Certificate Email Prompt** - Students get prompted to enter their email after quiz submission to receive a certificate
2. **Finished Sessions Management** - Tutors can view completed sessions with detailed statistics and separate session instances by date

---

## Feature 1: Certificate Email Prompt on Quiz Submission

### User Flow
1. Student completes all quiz questions and clicks "Submit Quiz"
2. Instead of immediately redirecting to results, a modal/prompt appears
3. Student enters their email address
4. Certificate is generated and queued for email delivery
5. Student is redirected to results page with confirmation

### Database Changes (Prisma Schema)

#### New Model: `CertificateRequest`
```prisma
model CertificateRequest {
  id              String   @id @default(cuid())
  courseId        String
  course          TutorCourse @relation(fields: [courseId], references: [id], onDelete: Cascade)
  studentId       String
  student         CourseStudent @relation(fields: [studentId], references: [id], onDelete: Cascade)
  submissionId    String   @unique
  submission      Submission @relation(fields: [submissionId], references: [id], onDelete: Cascade)
  email           String
  score           Int
  totalQuestions  Int
  timeSpentSeconds Int?
  issuedAt        DateTime?  // null = pending, set when certificate generated
  certificateUrl  String?
  certificateNumber String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([courseId])
  @@index([studentId])
  @@index([submissionId])
  @@index([issuedAt])
}
```

### Backend Changes

#### 1. Update `submitQuiz` Action (`app/actions/student.ts`)
```typescript
export async function submitQuiz(
  courseId: string,
  studentId: string,
  answers: Record<string, number>,
  timeSpentSeconds?: number,
  email?: string  // NEW: optional email parameter
) {
  // ... existing validation and scoring logic ...

  const submission = await prisma.submission.create({
    data: {
      studentId,
      courseId,
      score,
      totalQuestions: questions.length,
      timeSpentSeconds: /* existing logic */,
    },
  });

  // NEW: Create certificate request if email provided
  if (email && email.includes('@')) {
    await prisma.certificateRequest.create({
      data: {
        courseId,
        studentId,
        submissionId: submission.id,
        email: email.toLowerCase().trim(),
        score,
        totalQuestions: questions.length,
        timeSpentSeconds: /* existing logic */,
      },
    });
  }

  return submission.id;
}
```

#### 2. New Action: `requestCertificate` (`app/actions/student.ts`)
```typescript
export async function requestCertificate(
  submissionId: string,
  email: string
) {
  const submission = await prisma.submission.findUnique({
    where: { id: submissionId },
    include: {
      student: true,
      course: true,
    },
  });

  if (!submission) throw new Error("Submission not found");

  // Check if already requested
  const existing = await prisma.certificateRequest.findUnique({
    where: { submissionId },
  });

  if (existing) {
    // Update email if different
    if (existing.email !== email.toLowerCase().trim()) {
      await prisma.certificateRequest.update({
        where: { id: existing.id },
        data: { email: email.toLowerCase().trim() },
      });
    }
    return existing;
  }

  return prisma.certificateRequest.create({
    data: {
      courseId: submission.courseId,
      studentId: submission.studentId,
      submissionId: submission.id,
      email: email.toLowerCase().trim(),
      score: submission.score,
      totalQuestions: submission.totalQuestions,
      timeSpentSeconds: submission.timeSpentSeconds,
    },
  });
}
```

#### 3. Certificate Generation Service (`lib/services/certificates.ts`)
```typescript
export async function generateSessionCertificate(
  requestId: string
): Promise<{ certificateUrl: string; certificateNumber: string }> {
  const request = await prisma.certificateRequest.findUnique({
    where: { id: requestId },
    include: {
      course: true,
      student: true,
      submission: true,
    },
  });

  if (!request) throw new Error("Request not found");
  if (request.issuedAt) throw new Error("Certificate already issued");

  const issuedAt = new Date();
  const certificateNumber = `CY4E-${issuedAt.getUTCFullYear()}-${randomBytes(3).toString("hex").toUpperCase()}`;
  const verificationCode = randomBytes(12).toString("hex");

  // Generate PDF certificate (using existing template system)
  const certificateData = {
    studentName: request.student.name,
    courseTitle: request.course.title,
    sessionSubject: request.course.subject,
    score: request.score,
    totalQuestions: request.totalQuestions,
    percentage: Math.round((request.score / request.totalQuestions) * 100),
    timeSpent: request.timeSpentSeconds ? formatDurationLabel(request.timeSpentSeconds) : "N/A",
    date: issuedAt.toLocaleDateString(),
    certificateNumber,
    verificationCode,
  };

  const certificateUrl = await generateCertificatePDF(certificateData);

  await prisma.certificateRequest.update({
    where: { id: requestId },
    data: {
      issuedAt,
      certificateUrl,
      certificateNumber,
    },
  });

  // Queue email
  await queueCertificateEmail({
    to: request.email,
    studentName: request.student.name,
    courseTitle: request.course.title,
    certificateUrl,
    certificateNumber,
  });

  return { certificateUrl, certificateNumber };
}
```

### Frontend Changes

#### 1. Certificate Prompt Modal (`components/CertificatePromptModal.tsx`)
```tsx
"use client";

import { useState } from "react";
import { requestCertificate } from "@/app/actions/student";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  submissionId: string;
  courseTitle: string;
  score: number;
  totalQuestions: number;
}

export function CertificatePromptModal({
  isOpen,
  onClose,
  submissionId,
  courseTitle,
  score,
  totalQuestions,
}: Props) {
  const [email, setEmail] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const percentage = Math.round((score / totalQuestions) * 100);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsPending(true);

    try {
      await requestCertificate(submissionId, email);
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setEmail("");
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to request certificate");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
            <svg className="h-8 w-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-bold text-slate-900">
            Congratulations on completing {courseTitle}!
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            Score: {score}/{totalQuestions} ({percentage}%)
          </p>
        </div>

        {success ? (
          <div className="mt-6 rounded-xl bg-emerald-50 p-4 text-center">
            <p className="text-sm font-medium text-emerald-700">
              ✓ Certificate requested! Check your email shortly.
            </p>
          </div>
        ) : (
          <>
            <p className="mt-4 text-sm text-slate-500">
              Enter your email to receive a digital certificate of completion.
            </p>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Skip
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                >
                  {isPending ? "Sending..." : "Send Certificate"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
```

#### 2. Update `learn-client.tsx` - Handle Certificate Prompt
```tsx
// Add to imports
import { CertificatePromptModal } from "@/components/CertificatePromptModal";

// Add to LearnClient component state
const [showCertPrompt, setShowCertPrompt] = useState(false);
const [lastSubmission, setLastSubmission] = useState<{
  id: string;
  courseTitle: string;
  score: number;
  totalQuestions: number;
} | null>(null);

// Update handleSubmit
function handleSubmit() {
  if (!allAnswered) {
    setError("Please answer all questions before submitting.");
    return;
  }
  setError("");
  startTransition(async () => {
    const submissionId = await submitQuiz(courseId, studentId, selected, elapsedSeconds);
    
    // Show certificate prompt instead of immediate redirect
    setLastSubmission({
      id: submissionId,
      courseTitle,
      score: Object.values(selected).reduce((sum, idx) => {
        const q = questions.find((q) => q.id === Object.keys(selected).find((k) => selected[k] === idx));
        return sum + (q && selected[q.id] === q.correctIndex ? 1 : 0);
      }, 0),
      totalQuestions: questions.length,
    });
    setShowCertPrompt(true);
  });
}

// Add modal to return
{showCertPrompt && lastSubmission && (
  <CertificatePromptModal
    isOpen={true}
    onClose={() => {
      setShowCertPrompt(false);
      router.push(`/learn/${courseId}/result?sid=${lastSubmission.id}`);
    }}
    submissionId={lastSubmission.id}
    courseTitle={lastSubmission.courseTitle}
    score={lastSubmission.score}
    totalQuestions={lastSubmission.totalQuestions}
  />
)}
```

---

## Feature 2: Finished Sessions Management

### Database Changes

#### New Model: `SessionInstance`
```prisma
model SessionInstance {
  id          String   @id @default(cuid())
  courseId    String
  course      TutorCourse @relation(fields: [courseId], references: [id], onDelete: Cascade)
  date        DateTime  // The specific date this instance occurred
  title       String?   // Optional custom title (e.g., "Monday Session - Firewalls")
  notes       String?   @db.Text
  startedAt   DateTime?
  completedAt DateTime?
  durationSeconds Int?   @default(0)
  isActive    Boolean   @default(false)
  
  // Separate attendance tracking per instance
  attendances SessionInstanceAttendance[]
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([courseId])
  @@index([date])
}

model SessionInstanceAttendance {
  id          String   @id @default(cuid())
  instanceId  String
  instance    SessionInstance @relation(fields: [instanceId], references: [id], onDelete: Cascade)
  studentId   String
  student     CourseStudent @relation(fields: [studentId], references: [id], onDelete: Cascade)
  present     Boolean  @default(false)
  joinedAt    DateTime?
  leftAt      DateTime?
  
  @@unique([instanceId, studentId])
  @@index([instanceId])
  @@index([studentId])
}
```

### Backend Changes

#### 1. New Actions: `app/actions/sessions.ts`
```typescript
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// Create a new session instance
export async function createSessionInstance(
  courseId: string,
  data: {
    date: string;
    title?: string;
    notes?: string;
  }
) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const course = await prisma.tutorCourse.findFirst({
    where: { id: courseId, tutorId: session.user.id },
  });
  if (!course) throw new Error("Course not found");

  const instance = await prisma.sessionInstance.create({
    data: {
      courseId,
      date: new Date(data.date),
      title: data.title,
      notes: data.notes,
    },
  });

  revalidatePath(`/dashboard/courses/${courseId}/sessions`);
  return instance;
}

// Start a session instance
export async function startSessionInstance(instanceId: string) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const instance = await prisma.sessionInstance.findFirst({
    where: {
      id: instanceId,
      course: { tutorId: session.user.id },
    },
    include: { course: true },
  });
  if (!instance) throw new Error("Session instance not found");

  await prisma.sessionInstance.update({
    where: { id: instanceId },
    data: {
      isActive: true,
      startedAt: new Date(),
    },
  });

  revalidatePath(`/dashboard/courses/${instance.courseId}/sessions`);
}

// End a session instance
export async function endSessionInstance(
  instanceId: string,
  durationSeconds: number
) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const instance = await prisma.sessionInstance.findFirst({
    where: {
      id: instanceId,
      course: { tutorId: session.user.id },
    },
    include: { course: true },
  });
  if (!instance) throw new Error("Session instance not found");

  await prisma.sessionInstance.update({
    where: { id: instanceId },
    data: {
      isActive: false,
      completedAt: new Date(),
      durationSeconds,
    },
  });

  revalidatePath(`/dashboard/courses/${instance.courseId}/sessions`);
}

// Get finished sessions for a course
export async function getFinishedSessions(courseId: string) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const course = await prisma.tutorCourse.findFirst({
    where: { id: courseId, tutorId: session.user.id },
    select: { id: true, title: true, subject: true },
  });
  if (!course) throw new Error("Course not found");

  const instances = await prisma.sessionInstance.findMany({
    where: {
      courseId,
      completedAt: { not: null },
    },
    include: {
      attendances: {
        include: {
          student: {
            include: {
              submission: {
                where: { courseId },
              },
            },
          },
        },
      },
    },
    orderBy: { date: "desc" },
  });

  return { course, instances };
}

// Get session instance details
export async function getSessionInstanceDetails(instanceId: string) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const instance = await prisma.sessionInstance.findFirst({
    where: {
      id: instanceId,
      course: { tutorId: session.user.id },
    },
    include: {
      course: true,
      attendances: {
        include: {
          student: {
            include: {
              submission: {
                where: { courseId: instance.courseId },
              },
            },
          },
        },
      },
    },
  });

  if (!instance) throw new Error("Session instance not found");
  return instance;
}
```

### Frontend Changes

#### 1. Finished Sessions Page (`app/(dashboard)/dashboard/courses/[id]/sessions/page.tsx`)
```tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getFinishedSessions } from "@/app/actions/sessions";
import Link from "next/link";
import { formatDurationLabel } from "@/lib/duration";
import {
  Calendar,
  Clock3,
  Users,
  CheckCircle2,
  ArrowLeft,
  Plus,
  BarChart2,
} from "lucide-react"

export const dynamic = "force-dynamic";

export default async function FinishedSessionsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { course, instances } = await getFinishedSessions(id);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href={`/dashboard/courses/${id}`}
              className="flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Course
            </Link>
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                {course.title} - Finished Sessions
              </h1>
              <p className="text-sm text-slate-500">
                Review and analyze completed session instances
              </p>
            </div>
          </div>
          <Link
            href={`/dashboard/courses/${id}/sessions/new`}
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            <Plus className="h-4 w-4" />
            New Session Instance
          </Link>
        </div>
      </header>

      <div className="flex-1 p-6">
        {instances.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
            <Calendar className="mx-auto mb-3 h-10 w-10 text-slate-300" />
            <p className="text-sm font-medium text-slate-500">
              No finished sessions yet
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Create and complete session instances to see them here.
            </p>
            <Link
              href={`/dashboard/courses/${id}/sessions/new`}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Create First Session
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {instances.map((instance) => (
              <SessionInstanceCard
                key={instance.id}
                instance={instance}
                courseId={id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SessionInstanceCard({
  instance,
  courseId,
}: {
  instance: any;
  courseId: string;
}) {
  const presentCount = instance.attendances.filter(
    (a: any) => a.present
  ).length;
  const totalStudents = instance.attendances.length;
  const attendanceRate =
    totalStudents > 0 ? Math.round((presentCount / totalStudents) * 100) : 0;

  const submittedCount = instance.attendances.filter(
    (a: any) => a.student.submission?.length > 0
  ).length;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
            <Calendar className="h-5 w-5 text-slate-500" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">
              {instance.title ||
                `Session on ${new Date(instance.date).toLocaleDateString()}`}
            </h3>
            <p className="text-sm text-slate-500">
              {new Date(instance.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            {instance.notes && (
              <p className="mt-1 text-sm text-slate-400 line-clamp-2">
                {instance.notes}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
              instance.completedAt
                ? "bg-emerald-100 text-emerald-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {instance.completedAt ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5" />
                Completed
              </>
            ) : (
              <>
                <Clock3 className="h-3.5 w-3.5" />
                In Progress
              </>
            )}
          </span>
          <Link
            href={`/dashboard/courses/${courseId}/sessions/${instance.id}`}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100"
          >
            View Details
          </Link>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 rounded-lg bg-slate-50 p-4">
        <div className="flex items-center gap-2">
          <Clock3 className="h-4 w-4 text-slate-400" />
          <span className="text-sm text-slate-600">
            Duration:{" "}
            <span className="font-medium text-slate-900">
              {instance.durationSeconds
                ? formatDurationLabel(instance.durationSeconds)
                : "—"}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-slate-400" />
          <span className="text-sm text-slate-600">
            Attendance:{" "}
            <span className="font-medium text-slate-900">
              {presentCount}/{totalStudents}
            </span>{" "}
            <span className="text-xs text-slate-500">
              ({attendanceRate}%)
            </span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <BarChart2 className="h-4 w-4 text-slate-400" />
          <span className="text-sm text-slate-600">
            Quiz Submissions:{" "}
            <span className="font-medium text-slate-900">
              {submittedCount}/{totalStudents}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
```

#### 2. Session Instance Detail Page (`app/(dashboard)/dashboard/courses/[id]/sessions/[instanceId]/page.tsx`)
```tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getSessionInstanceDetails } from "@/app/actions/sessions";
import Link from "next/link";
import { formatDurationLabel } from "@/lib/duration";
import {
  ArrowLeft,
  Calendar,
  Clock3,
  Users,
  CheckCircle2,
  XCircle,
  BarChart2,
  FileText,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SessionInstanceDetailPage({
  params,
}: {
  params: Promise<{ id: string; instanceId: string }>;
}) {
  const { id, instanceId } = await params;
  const instance = await getSessionInstanceDetails(instanceId);

  const presentCount = instance.attendances.filter(
    (a: any) => a.present
  ).length;
  const totalStudents = instance.attendances.length;
  const attendanceRate =
    totalStudents > 0 ? Math.round((presentCount / totalStudents) * 100) : 0;

  const submittedCount = instance.attendances.filter(
    (a: any) => a.student.submission?.length > 0
  ).length;

  const avgScore =
    submittedCount > 0
      ? Math.round(
          instance.attendances
            .filter((a: any) => a.student.submission?.length > 0)
            .reduce(
              (sum: number, a: any) =>
                sum +
                (a.student.submission[0].score /
                  a.student.submission[0].totalQuestions) *
                  100,
              0
            ) / submittedCount
        )
      : null;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href={`/dashboard/courses/${id}/sessions`}
              className="flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Sessions
            </Link>
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                {instance.title || "Session Details"}
              </h1>
              <p className="text-sm text-slate-500">
                {new Date(instance.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 p-6 max-w-4xl">
        {/* Session Overview */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm mb-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                <Calendar className="h-5 w-5 text-slate-500" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Date
                </p>
                <p className="font-semibold text-slate-900">
                  {new Date(instance.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                <Clock3 className="h-5 w-5 text-slate-500" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Duration
                </p>
                <p className="font-semibold text-slate-900">
                  {instance.durationSeconds
                    ? formatDurationLabel(instance.durationSeconds)
                    : "—"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                <Users className="h-5 w-5 text-slate-500" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Attendance
                </p>
                <p className="font-semibold text-slate-900">
                  {presentCount}/{totalStudents}
                </p>
                <p className="text-xs text-slate-500">{attendanceRate}% rate</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                <BarChart2 className="h-5 w-5 text-slate-500" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Avg Score
                </p>
                <p className="font-semibold text-slate-900">
                  {avgScore !== null ? `${avgScore}%` : "—"}
                </p>
              </div>
            </div>
          </div>

          {instance.notes && (
            <div className="mt-4 rounded-lg bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
                Session Notes
              </p>
              <p className="text-sm text-slate-600 whitespace-pre-wrap">
                {instance.notes}
              </p>
            </div>
          )}
        </div>

        {/* Attendance List */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-slate-100 px-5 py-4">
            <h2 className="font-bold text-slate-900">Attendance</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <th className="px-5 py-3 text-left">Student</th>
                  <th className="px-5 py-3 text-center">Status</th>
                  <th className="px-5 py-3 text-center">Quiz</th>
                  <th className="px-5 py-3 text-center">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {instance.attendances.map((attendance: any) => (
                  <tr key={attendance.id} className="hover:bg-slate-50">
                    <td className="px-5 py-3">
                      <p className="font-medium text-slate-900">
                        {attendance.student.name}
                      </p>
                    </td>
                    <td className="px-5 py-3 text-center">
                      {attendance.present ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                          <CheckCircle2 className="h-3 w-3" />
                          Present
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">
                          <XCircle className="h-3 w-3" />
                          Absent
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-center">
                      {attendance.student.submission?.length > 0 ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                          <CheckCircle2 className="h-3 w-3" />
                          Submitted
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-center">
                      {attendance.student.submission?.length > 0 ? (
                        <span className="font-semibold text-slate-900">
                          {Math.round(
                            (attendance.student.submission[0].score /
                              attendance.student.submission[0].totalQuestions) *
                              100
                          )}
                          %
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
```

#### 3. New Session Instance Form (`app/(dashboard)/dashboard/courses/[id]/sessions/new/page.tsx`)
```tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { createSessionInstance } from "@/app/actions/sessions";
import { useFormState } from "react-dom"

export const dynamic = "force-dynamic";

async function create(formData: FormData, courseId: string) {
  await createSessionInstance(courseId, {
    date: formData.get("date") as string,
    title: formData.get("title") as string,
    notes: formData.get("notes") as string,
  });
}

export default async function NewSessionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const action = create.bind(null, id);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center gap-4">
          <Link
            href={`/dashboard/courses/${id}/sessions`}
            className="flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Sessions
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              New Session Instance
            </h1>
            <p className="text-sm text-slate-500">
              Create a new session instance for this course
            </p>
          </div>
        </div>
      </header>

      <div className="flex-1 p-6">
        <div className="mx-auto max-w-2xl">
          <form action={action} className="space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">
                Session Details
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Session Date
                  </label>
                  <input
                    name="date"
                    type="date"
                    required
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Session Title (Optional)
                  </label>
                  <input
                    name="title"
                    type="text"
                    placeholder="e.g., Monday - Firewalls & Network Security"
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Session Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    rows={4}
                    placeholder="Notes about what was covered in this session..."
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                href={`/dashboard/courses/${id}/sessions`}
                className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-center text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="flex-1 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Create Session Instance
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
```

---

## Sidebar Navigation Update

### Update Course Sidebar (`components/sidebar.tsx` or similar)
```tsx
// Add to course navigation items
{
  label: "Finished Sessions",
  href: `/dashboard/courses/${courseId}/sessions`,
  icon: Calendar,
}
```

---

## Summary of Changes

### Database (Prisma Schema)
- ✅ Add `CertificateRequest` model for tracking certificate requests
- ✅ Add `SessionInstance` model for separate session instances
- ✅ Add `SessionInstanceAttendance` model for per-instance attendance

### Backend (Server Actions)
- ✅ Update `submitQuiz` to accept and store email for certificates
- ✅ Add `requestCertificate` action for certificate requests
- ✅ Add `createSessionInstance` for creating session instances
- ✅ Add `startSessionInstance` for starting instances
- ✅ Add `endSessionInstance` for ending instances
- ✅ Add `getFinishedSessions` for listing completed sessions
- ✅ Add `getSessionInstanceDetails` for detailed session view

### Frontend Components
- ✅ `CertificatePromptModal` - Modal for email collection
- ✅ `SessionInstanceCard` - Card component for session listing
- ✅ `FinishedSessionsPage` - List of completed sessions
- ✅ `SessionInstanceDetailPage` - Detailed session view with attendance
- ✅ `NewSessionPage` - Form for creating session instances

### Frontend Updates
- ✅ Update `learn-client.tsx` to show certificate prompt after quiz
- ✅ Update sidebar navigation to include "Finished Sessions"

### Email Service
- ✅ Queue certificate email after generation
- ✅ Include certificate PDF attachment
- ✅ Include verification link

---

## Testing Checklist

- [ ] Certificate prompt appears after quiz submission
- [ ] Email validation works correctly
- [ ] Certificate request is stored in database
- [ ] Email is sent with certificate
- [ ] Session instances can be created
- [ ] Session instances track attendance separately
- [ ] Finished sessions page lists completed instances
- [ ] Session detail page shows attendance and statistics
- [ ] Multiple instances on same day are handled correctly
- [ ] Attendance is tracked per instance, not per course
- [ ] Certificate includes session title, student name, performance
- [ ] Sidebar navigation includes Finished Sessions link