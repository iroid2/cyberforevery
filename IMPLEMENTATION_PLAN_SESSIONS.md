# Implementation Plan: Tutor Course Management & Session Analytics

## Overview
Redesign the tutor sidebar navigation and implement comprehensive course/session management with detailed analytics.

## Current State
- Sidebar has "Live Sessions" and "My Courses" under "Courses" group
- No dedicated page for listing tutor's courses with session details
- No session-level analytics per course
- No filtering by attendance day

## Desired State
1. **Sidebar Redesign** - "My Courses" shows tutor's created courses, each expandable to show sessions
2. **Sessions Page** - List all sessions for a course with date-based filtering
3. **Course Detail Page** - Overview of course with all sessions, analytics, student progress
4. **Session Detail Page** - Detailed analytics per session with attendance by day

---

## Part 1: Sidebar Navigation Redesign

### File: `config/protected-routes.ts`

**Changes:**
- Update "My Courses" route to be parent with sub-links
- Add "Sessions" as sub-link under "My Courses"
- Reorganize course management section

```typescript
// Current:
{
  title: "My Courses",
  href: "/dashboard/courses",
  icon: BookOpen,
  roles: [UserRoleType.TUTOR],
  group: "Courses",
  subLinks: [
    { title: "Create New Course", href: "/dashboard/courses/new" },
    { title: "Live Courses", href: "/dashboard/courses?filter=live" },
    { title: "Inactive Courses", href: "/dashboard/courses?filter=inactive" },
  ],
},

// Updated:
{
  title: "My Courses",
  href: "/dashboard/courses",
  icon: BookOpen,
  roles: [UserRoleType.TUTOR],
  group: "Courses",
  subLinks: [
    { title: "All Courses", href: "/dashboard/courses" },
    { title: "Create New Course", href: "/dashboard/courses/new" },
    { title: "Live Sessions", href: "/dashboard/sessions" },
    { title: "Finished Sessions", href: "/dashboard/courses/sessions" },
    { title: "Live Courses", href: "/dashboard/courses?filter=live" },
    { title: "Inactive Courses", href: "/dashboard/courses?filter=inactive" },
  ],
},
```

### File: `app/(dashboard)/dashboard/components/sidebar-nav.tsx`

**No changes needed** - Uses `getRoutesByGroup` which automatically renders sub-links.

---

## Part 2: Course List Page (Enhanced)

### File: `app/(dashboard)/dashboard/courses/page.tsx`

**Current:** Basic list of courses
**Enhanced:** Show course summary with session count, last session date, total students

```tsx
// Add to existing imports
import { Calendar, Clock3, Users, BarChart2 } from "lucide-react";

// Enhanced course card with session summary
async function getTutorCoursesWithSessions(tutorId: string) {
  return prisma.tutorCourse.findMany({
    where: { tutorId },
    include: {
      _count: {
        select: {
          students: true,
          lessons: true,
          questions: true,
        },
      },
    },
    orderBy: [{ isLive: "desc" }, { updatedAt: "desc" }],
  });
}

// In page component, show enhanced cards with:
// - Total sessions created
// - Last session date
// - Total students across all sessions
// - Average session duration
```

---

## Part 3: Course Detail Page (Enhanced)

### File: `app/(dashboard)/dashboard/courses/[id]/page.tsx`

**Current:** Course management, lessons, questions, live roster
**Enhanced:** Add "Sessions" tab showing all session instances

```tsx
// Add new tab for Sessions
const tabs = [
  { id: "lessons", label: "Lessons" },
  { id: "questions", label: "Quiz" },
  { id: "sessions", label: "Sessions" },  // NEW
  { id: "students", label: "Students" },
];

// Sessions tab content
function SessionsTab({ courseId }: { courseId: string }) {
  const [sessions, setSessions] = useState<SessionInstance[]>([]);
  const [filter, setFilter] = useState("all"); // all, completed, live

  return (
    <div className="space-y-4">
      {/* Filter controls */}
      <div className="flex gap-2">
        <button className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-sm">
          All Sessions
        </button>
        <button className="px-3 py-1.5 rounded-lg border text-slate-600 text-sm">
          Completed
        </button>
        <button className="px-3 py-1.5 rounded-lg border text-slate-600 text-sm">
          Live
        </button>
      </div>

      {/* Session list */}
      <div className="space-y-3">
        {sessions.map((session) => (
          <SessionRow key={session.id} session={session} />
        ))}
      </div>
    </div>
  );
}
```

---

## Part 4: Session Instance Management

### Database: `prisma/schema.prisma`

**Add new models:**

```prisma
model SessionInstance {
  id          String   @id @default(cuid())
  courseId    String
  course      TutorCourse @relation(fields: [courseId], references: [id], onDelete: Cascade)
  date        DateTime
  title       String?
  notes       String?  @db.Text
  startedAt   DateTime?
  completedAt DateTime?
  durationSeconds Int?  @default(0)
  isActive    Boolean  @default(false)
  
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

**Run:**
```bash
npx prisma db push
npx prisma generate
```

---

## Part 5: Server Actions for Session Instances

### File: `app/actions/sessions.ts` (NEW)

```typescript
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// Create session instance
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

  revalidatePath(`/dashboard/courses/${courseId}`);
  return instance;
}

// Start session instance
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

// End session instance
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

// Get all sessions for a course
export async function getCourseSessions(courseId: string) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const course = await prisma.tutorCourse.findFirst({
    where: { id: courseId, tutorId: session.user.id },
    select: { id: true, title: true, subject: true },
  });
  if (!course) throw new Error("Course not found");

  const instances = await prisma.sessionInstance.findMany({
    where: { courseId },
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

// Get session instance details with attendance
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

// Get sessions filtered by date
export async function getSessionsByDate(
  courseId: string,
  startDate: string,
  endDate: string
) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const instances = await prisma.sessionInstance.findMany({
    where: {
      courseId,
      date: {
        gte: new Date(startDate),
        lte: new Date(endDate),
      },
    },
    include: {
      attendances: {
        include: {
          student: true,
        },
      },
    },
    orderBy: { date: "desc" },
  });

  return instances;
}
```

---

## Part 6: Frontend Components

### Component 1: Session Instance Card
**File: `components/SessionInstanceCard.tsx`**

```tsx
import { formatDurationLabel } from "@/lib/duration";
import { Calendar, Clock3, Users, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";

export function SessionInstanceCard({
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
                : instance.isActive
                ? "bg-amber-100 text-amber-700"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {instance.completedAt ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5" />
                Completed
              </>
            ) : instance.isActive ? (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                In Progress
              </>
            ) : (
              <>
                <Clock3 className="h-3.5 w-3.5" />
                Scheduled
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

      <div className="mt-4 grid grid-cols-3 gap-4 rounded-lg bg-slate-50 p-4">
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
            <span className="text-xs text-slate-500">({attendanceRate}%)</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-slate-400" />
          <span className="text-sm text-slate-600">
            Submissions:{" "}
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

### Component 2: Create Session Form
**File: `app/(dashboard)/dashboard/courses/[id]/sessions/new/page.tsx`**

```tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { createSessionInstance } from "@/app/actions/sessions";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";

export default async function NewSessionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  async function create(formData: FormData) {
    "use server";
    await createSessionInstance(id, {
      date: formData.get("date") as string,
      title: formData.get("title") as string,
      notes: formData.get("notes") as string,
    });
    redirect(`/dashboard/courses/${id}/sessions`);
  }

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
              Create a new session for this course
            </p>
          </div>
        </div>
      </header>

      <div className="flex-1 p-6">
        <div className="mx-auto max-w-2xl">
          <form action={create} className="space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
                <Calendar className="h-5 w-5 text-slate-400" />
                Session Details
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Session Date *
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

### Component 3: Sessions List Page
**File: `app/(dashboard)/dashboard/courses/[id]/sessions/page.tsx`**

```tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getCourseSessions } from "@/app/actions/sessions";
import Link from "next/link";
import { formatDurationLabel } from "@/lib/duration";
import { SessionInstanceCard } from "@/components/SessionInstanceCard";
import {
  Calendar,
  ArrowLeft,
  Plus,
  Clock3,
  CheckCircle2,
  Users,
  BarChart2,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SessionsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { course, instances } = await getCourseSessions(id);

  const completedInstances = instances.filter((i) => i.completedAt);
  const activeInstances = instances.filter((i) => i.isActive && !i.completedAt);
  const scheduledInstances = instances.filter((i) => !i.isActive && !i.completedAt);

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
                {course.title} - Sessions
              </h1>
              <p className="text-sm text-slate-500">
                Manage and review all session instances
              </p>
            </div>
          </div>
          <Link
            href={`/dashboard/courses/${id}/sessions/new`}
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            <Plus className="h-4 w-4" />
            New Session
          </Link>
        </div>
      </header>

      <div className="flex-1 p-6">
        {/* Summary Stats */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-1 flex items-center gap-2 text-slate-500">
              <Calendar className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wide">
                Total Sessions
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-900">
              {instances.length}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-1 flex items-center gap-2 text-slate-500">
              <span className="relative flex h-4 w-4">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wide">
                Active Now
              </span>
            </div>
            <p className="text-2xl font-bold text-emerald-600">
              {activeInstances.length}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-1 flex items-center gap-2 text-slate-500">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wide">
                Completed
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-900">
              {completedInstances.length}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-1 flex items-center gap-2 text-slate-500">
              <Users className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wide">
                Total Students
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-900">
              {course._count.students}
            </p>
          </div>
        </div>

        {/* Active Sessions */}
        {activeInstances.length > 0 && (
          <section className="mb-6">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
              </span>
              Active Sessions
            </h2>
            <div className="space-y-4">
              {activeInstances.map((instance) => (
                <SessionInstanceCard
                  key={instance.id}
                  instance={instance}
                  courseId={id}
                />
              ))}
            </div>
          </section>
        )}

        {/* Completed Sessions */}
        {completedInstances.length > 0 && (
          <section className="mb-6">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
              <CheckCircle2 className="h-4 w-4 text-slate-400" />
              Completed Sessions
            </h2>
            <div className="space-y-4">
              {completedInstances.map((instance) => (
                <SessionInstanceCard
                  key={instance.id}
                  instance={instance}
                  courseId={id}
                />
              ))}
            </div>
          </section>
        )}

        {/* Scheduled Sessions */}
        {scheduledInstances.length > 0 && (
          <section className="mb-6">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
              <Clock3 className="h-4 w-4 text-slate-400" />
              Scheduled Sessions
            </h2>
            <div className="space-y-4">
              {scheduledInstances.map((instance) => (
                <SessionInstanceCard
                  key={instance.id}
                  instance={instance}
                  courseId={id}
                />
              ))}
            </div>
          </section>
        )}

        {/* No Sessions */}
        {instances.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
            <Calendar className="mx-auto mb-3 h-10 w-10 text-slate-300" />
            <p className="text-sm font-medium text-slate-500">
              No sessions created yet
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Create your first session instance to get started.
            </p>
            <Link
              href={`/dashboard/courses/${id}/sessions/new`}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              <Plus className="h-4 w-4" />
              Create First Session
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
```

### Component 4: Session Detail Page with Analytics
**File: `app/(dashboard)/dashboard/courses/[id]/sessions/[instanceId]/page.tsx`**

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
  FileQuestion,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SessionDetailPage({
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

  // Calculate average score for this session
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

  // Group students by attendance day (for multi-day sessions)
  const studentsByDay = instance.attendances.reduce((acc: any, attendance: any) => {
    const day = new Date(attendance.instance.date).toLocaleDateString();
    if (!acc[day]) acc[day] = { present: 0, absent: 0, students: [] };
    acc[day].students.push(attendance);
    if (attendance.present) {
      acc[day].present++;
    } else {
      acc[day].absent++;
    }
    return acc;
  }, {});

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

      <div className="flex-1 p-6 max-w-6xl">
        {/* Session Overview Cards */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-1 flex items-center gap-2 text-slate-500">
              <Calendar className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wide">
                Date
              </span>
            </div>
            <p className="font-semibold text-slate-900">
              {new Date(instance.date).toLocaleDateString()}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-1 flex items-center gap-2 text-slate-500">
              <Clock3 className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wide">
                Duration
              </span>
            </div>
            <p className="font-semibold text-slate-900">
              {instance.durationSeconds
                ? formatDurationLabel(instance.durationSeconds)
                : "—"}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-1 flex items-center gap-2 text-slate-500">
              <Users className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wide">
                Attendance
              </span>
            </div>
            <p className="font-semibold text-slate-900">
              {presentCount}/{totalStudents}
            </p>
            <p className="text-xs text-slate-500">{attendanceRate}% rate</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-1 flex items-center gap-2 text-slate-500">
              <BarChart2 className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wide">
                Avg Score
              </span>
            </div>
            <p className="font-semibold text-slate-900">
              {avgScore !== null ? `${avgScore}%` : "—"}
            </p>
          </div>
        </div>

        {/* Session Notes */}
        {instance.notes && (
          <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-slate-900">
              <FileQuestion className="h-5 w-5 text-slate-400" />
              Session Notes
            </h2>
            <p className="whitespace-pre-wrap text-sm text-slate-600">
              {instance.notes}
            </p>
          </div>
        )}

        {/* Attendance by Day (for multi-day tracking) */}
        {Object.keys(studentsByDay).length > 1 && (
          <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
              <Calendar className="h-5 w-5 text-slate-400" />
              Attendance by Day
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {Object.entries(studentsByDay).map(([day, data]: [string, any]) => (
                <div
                  key={day}
                  className="rounded-lg border border-slate-100 bg-slate-50 p-4"
                >
                  <p className="font-semibold text-slate-900">{day}</p>
                  <div className="mt-2 flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1 text-emerald-600">
                      <CheckCircle2 className="h-4 w-4" />
                      {data.present} present
                    </span>
                    <span className="flex items-center gap-1 text-red-600">
                      <XCircle className="h-4 w-4" />
                      {data.absent} absent
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Attendance List */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-slate-100 px-5 py-4">
            <h2 className="font-bold text-slate-900">Attendance List</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <th className="px-5 py-3 text-left">Student</th>
                  <th className="px-5 py-3 text-center">Status</th>
                  <th className="px-5 py-3 text-center">Quiz</th>
                  <th className="px-5 py-3 text-center">Score</th>
                  <th className="px-5 py-3 text-center">Time Spent</th>
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
                    <td className="px-5 py-3 text-center">
                      {attendance.student.submission?.length > 0 &&
                      attendance.student.submission[0].timeSpentSeconds ? (
                        <span className="text-xs font-medium text-slate-600">
                          {formatDurationLabel(
                            attendance.student.submission[0].timeSpentSeconds
                          )}
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

---

## Part 7: Date Filter Component

### Component: DateRangeFilter
**File: `components/DateRangeFilter.tsx`**

```tsx
"use client";

import { useState } from "react";
import { format } from "date-fns";

export function DateRangeFilter({
  onFilter,
}: {
  onFilter: (startDate: string, endDate: string) => void;
}) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleApply = () => {
    onFilter(startDate, endDate);
  };

  return (
    <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex items-center gap-2">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
        />
        <span className="text-slate-400">to</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
        />
      </div>
      <button
        onClick={handleApply}
        className="rounded-lg bg-emerald-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-emerald-700"
      >
        Filter
      </button>
    </div>
  );
}
```

---

## Implementation Timeline

### Phase 1: Database & Backend (3-4 hours)
- [ ] Update Prisma schema with new models
- [ ] Run `prisma db push` and `prisma generate`
- [ ] Create `app/actions/sessions.ts` with all actions
- [ ] Test API endpoints

### Phase 2: Frontend Components (4-5 hours)
- [ ] Create `SessionInstanceCard` component
- [ ] Create `DateRangeFilter` component
- [ ] Create Sessions list page
- [ ] Create Session detail page
- [ ] Create New session page

### Phase 3: Integration (2-3 hours)
- [ ] Update `protected-routes.ts`
- [ ] Update course detail page to include sessions tab
- [ ] Wire up all navigation
- [ ] Add filter functionality to sessions list

### Phase 4: Testing (2 hours)
- [ ] Test session creation flow
- [ ] Test attendance tracking
- [ ] Test date filtering
- [ ] Test analytics calculations
- [ ] Edge cases and error handling

**Total Estimate: 11-14 hours**

---

## Key Features Delivered

✅ **Sidebar Redesign** - "My Courses" now shows all tutor courses with session management  
✅ **Session Instances** - Separate sessions per date (Monday, Tuesday, etc.)  
✅ **Attendance Tracking** - Per-instance attendance with present/absent  
✅ **Date Filtering** - Filter sessions by date range  
✅ **Detailed Analytics** - Per-session stats: duration, attendance rate, scores, time spent  
✅ **Multi-day Support** - Track different sessions on different days  
✅ **Student Progress** - See quiz submissions per session  
✅ **Session Notes** - Add notes to each session instance  

---

## Benefits

1. **Better Organization** - Separate sessions by date, not just course
2. **Detailed Analytics** - See exactly how each session performed
3. **Attendance Tracking** - Know who attended which session
4. **Progress Monitoring** - Track student quiz performance per session
5. **Flexible Scheduling** - Create multiple instances of the same course on different days
6. **Historical Data** - Review all past sessions with complete statistics