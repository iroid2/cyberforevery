import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  Calendar,
  BookOpen,
  Users,
  HelpCircle,
  Plus,
  ExternalLink,
  Radio,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SessionsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const tutorId = session.user.id;

  const courses = await prisma.tutorCourse.findMany({
    where: { tutorId },
    orderBy: [{ isLive: "desc" }, { updatedAt: "desc" }],
    include: {
      sessions: {
        orderBy: { date: "desc" },
        take: 5,
        include: {
          _count: { select: { attendance: true, submissions: true } },
        },
      },
      _count: { select: { lessons: true, questions: true, students: true } },
    },
  });

  const liveSessions = courses.flatMap(c =>
    c.sessions.filter(s => s.status === "LIVE").map(s => ({ session: s, course: c }))
  );

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Sessions</h1>
            <p className="text-sm text-slate-500">
              Manage your course sessions and view attendance.
            </p>
          </div>
          <Link
            href="/dashboard/courses/new"
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            New Course
          </Link>
        </div>
      </header>

      <div className="flex-1 p-6 max-w-6xl mx-auto w-full space-y-8">

        {courses.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-24 text-center">
            <BookOpen className="mb-4 h-10 w-10 text-slate-300" />
            <p className="text-base font-semibold text-slate-600">No courses yet</p>
            <p className="mt-1 mb-6 text-sm text-slate-400">
              Create a course first, then schedule sessions.
            </p>
            <Link
              href="/dashboard/courses/new"
              className="flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Create Course
            </Link>
          </div>
        )}

        {/* Live Sessions */}
        {liveSessions.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                {liveSessions.length} LIVE
              </span>
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                Active Sessions
              </h2>
            </div>

            <div className="space-y-4">
              {liveSessions.map(({ session: liveSession, course }) => (
                <div
                  key={liveSession.id}
                  className="rounded-2xl border border-emerald-200 bg-white shadow-sm overflow-hidden"
                >
                  <div className="h-1 bg-emerald-500" />
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-emerald-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Live
                          </span>
                          <span className="text-xs text-slate-400">{course.subject}</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 truncate">
                          {course.title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                          Session: {new Date(liveSession.date).toLocaleDateString(undefined, {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Link
                          href={`/dashboard/courses/${course.id}/sessions/${liveSession.id}`}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors"
                        >
                          Manage Session
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* All Sessions by Course */}
        <section>
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">
            All Sessions by Course
          </h2>
          <div className="space-y-6">
            {courses.map((course) => (
              <div key={course.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-slate-900">{course.title}</h3>
                    <p className="text-xs text-slate-500">{course.subject}</p>
                  </div>
                  <Link
                    href={`/dashboard/courses/${course.id}`}
                    className="text-xs font-semibold text-emerald-600 hover:underline"
                  >
                    Manage Course
                  </Link>
                </div>
                {course.sessions.length === 0 ? (
                  <p className="text-center text-sm text-slate-400 py-4">No sessions scheduled</p>
                ) : (
                  <div className="space-y-2">
                    {course.sessions.map((s) => (
                      <Link
                        key={s.id}
                        href={`/dashboard/courses/${course.id}/sessions/${s.id}`}
                        className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-3 hover:bg-slate-100"
                      >
                        <div className="flex items-center gap-3">
                          <Calendar className="h-4 w-4 text-slate-400" />
                          <span className="text-sm text-slate-700">
                            {new Date(s.date).toLocaleDateString(undefined, {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                          s.status === "LIVE"
                            ? "bg-emerald-100 text-emerald-700"
                            : s.status === "COMPLETED"
                            ? "bg-slate-100 text-slate-600"
                            : "bg-amber-100 text-amber-700"
                        }`}>
                          {s.status}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="text-sm font-bold text-slate-700 mb-3">How Sessions Work</h3>
          <ol className="space-y-2 text-sm text-slate-500">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-bold text-emerald-700">1</span>
              Create a <strong className="text-slate-700">Session</strong> for a specific date on your course page.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-bold text-emerald-700">2</span>
              Click <strong className="text-slate-700">Start</strong> to go live. Students see it on /attend.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-bold text-emerald-700">3</span>
              Track attendance and view quiz results per session.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-bold text-emerald-700">4</span>
              <strong className="text-slate-700">End</strong> the session when done. Data is saved for later review.
            </li>
          </ol>
        </section>
      </div>
    </div>
  );
}
