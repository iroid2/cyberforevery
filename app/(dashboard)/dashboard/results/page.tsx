import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { formatDurationLabel } from "@/lib/duration";
import {
  BookOpen,
  Radio,
  Clock3,
  CheckCircle2,
  ArrowLeft,
  Users,
  TrendingUp,
  Calendar,
  BarChart2,
} from "lucide-react";

export const dynamic = "force-dynamic";

type SessionWithStats = {
  id: string;
  date: Date;
  status: string;
  durationSeconds: number | null;
  course: {
    id: string;
    title: string;
    subject: string;
    tutor: { name: string | null };
  };
  _count: {
    attendance: number;
    submissions: number;
  };
};

export default async function ResultsDashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const userId = session.user.id;
  const role = String((session.user as { role?: string }).role ?? "").toUpperCase();
  const isAdmin = role === "ADMIN" || role === "SUPER_ADMIN";

  // Fetch all session instances (with course data)
  const where = isAdmin ? {} : { course: { tutorId: userId } };

  const sessions = await prisma.sessionInstance.findMany({
    where,
    orderBy: { date: "desc" },
    include: {
      course: {
        select: {
          id: true,
          title: true,
          subject: true,
          tutor: { select: { name: true } },
        },
      },
      _count: { select: { attendance: true, submissions: true } },
    },
  });

  // Compute global average score across all submissions for accessible sessions
  const allSubmissions = await prisma.submission.findMany({
    where: isAdmin
      ? {}
      : { course: { tutorId: userId } },
    select: {
      score: true,
      totalQuestions: true,
    },
  });
  const avgScoreAll =
    allSubmissions.length > 0
      ? Math.round(
          allSubmissions.reduce(
            (sum, s) => sum + (s.score / s.totalQuestions) * 100,
            0
          ) / allSubmissions.length
        )
      : null;

  const liveSessions = sessions.filter((s) => s.status === "LIVE");
  const completedSessions = sessions.filter((s) => s.status === "COMPLETED");
  const scheduledSessions = sessions.filter((s) => s.status === "SCHEDULED");

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Results Overview</h1>
            <p className="text-sm text-slate-500">
              All sessions, completion status, and performance metrics
            </p>
          </div>
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">
        {/* Summary Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-1 flex items-center gap-2 text-slate-500">
              <Radio className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wide">Live Now</span>
            </div>
            <p className="text-2xl font-bold text-emerald-600">{liveSessions.length}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-1 flex items-center gap-2 text-slate-500">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wide">Completed</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{completedSessions.length}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-1 flex items-center gap-2 text-slate-500">
              <Users className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wide">Total Attendees</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">
              {sessions.reduce((s, sess) => s + sess._count.attendance, 0)}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-1 flex items-center gap-2 text-slate-500">
              <BarChart2 className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wide">Avg Score</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">
              {avgScoreAll !== null ? `${avgScoreAll}%` : "—"}
            </p>
          </div>
        </div>

        {/* Live Sessions Section */}
        {liveSessions.length > 0 && (
          <section className="rounded-xl border border-emerald-200 bg-white shadow-sm">
            <div className="border-b border-emerald-100 px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                </span>
                <h2 className="font-bold text-slate-900">Active Sessions</h2>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                  {liveSessions.length}
                </span>
              </div>
            </div>
            <div className="divide-y divide-slate-50">
              {liveSessions.map((session) => (
                <SessionRow key={session.id} session={session} />
              ))}
            </div>
          </section>
        )}

        {/* Completed Sessions Section */}
        {completedSessions.length > 0 && (
          <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-slate-400" />
                <h2 className="font-bold text-slate-900">Completed Sessions</h2>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">
                  {completedSessions.length}
                </span>
              </div>
            </div>
            <div className="divide-y divide-slate-50">
              {completedSessions.map((session) => (
                <SessionRow key={session.id} session={session} />
              ))}
            </div>
          </section>
        )}

        {/* Scheduled Sessions */}
        {scheduledSessions.length > 0 && (
          <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-amber-400" />
                <h2 className="font-bold text-slate-900">Scheduled Sessions</h2>
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
                  {scheduledSessions.length}
                </span>
              </div>
            </div>
            <div className="divide-y divide-slate-50">
              {scheduledSessions.map((session) => (
                <SessionRow key={session.id} session={session} />
              ))}
            </div>
          </section>
        )}

        {/* No Results */}
        {sessions.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
            <BookOpen className="mx-auto mb-3 h-10 w-10 text-slate-300" />
            <p className="text-sm font-medium text-slate-500">No sessions found</p>
            <p className="mt-1 text-xs text-slate-400">
              Create a course and schedule a session to see results here.
            </p>
            <Link
              href="/dashboard/courses/new"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Create Course
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function SessionRow({ session }: { session: SessionWithStats }) {
  const dateLabel = new Date(session.date).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const statusBadge = (() => {
    switch (session.status) {
      case "LIVE":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            LIVE
          </span>
        );
      case "COMPLETED":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Completed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">
            <Clock3 className="h-3.5 w-3.5" />
            Scheduled
          </span>
        );
    }
  })();

  return (
    <div className="flex items-center justify-between px-5 py-4">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
          <BookOpen className="h-5 w-5 text-slate-500" />
        </div>
        <div>
          <p className="font-semibold text-slate-900">{session.course.title}</p>
          <p className="text-xs text-slate-500">
            {session.course.subject} · {dateLabel}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-semibold text-slate-900">
            {session._count.attendance} attended · {session._count.submissions} submitted
          </p>
          {session.durationSeconds ? (
            <p className="text-xs text-slate-500">
              Duration: {formatDurationLabel(session.durationSeconds)}
            </p>
          ) : (
            <p className="text-xs text-slate-400">Not started</p>
          )}
        </div>
        {statusBadge}
        <Link
          href={`/dashboard/courses/${session.course.id}/sessions/${session.id}`}
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
