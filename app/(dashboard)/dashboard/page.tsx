import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  BookOpen, Radio, Users, TrendingUp,
  Plus, ClipboardList, BarChart2, Clock,
} from "lucide-react";

export const dynamic = "force-dynamic";

function StatCard({
  title, value, sub, icon: Icon, color,
}: {
  title: string; value: string | number; sub?: string;
  icon: React.ElementType; color: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${color}`}>
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">{title}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
        {sub && <p className="text-xs text-slate-400">{sub}</p>}
      </div>
    </div>
  );
}

// ─── TUTOR DASHBOARD ─────────────────────────────────────────────────────────

async function TutorDashboard({ userId, name }: { userId: string; name: string }) {
  const [courses, recentStudents] = await Promise.all([
    prisma.tutorCourse.findMany({
      where: { tutorId: userId },
      include: { _count: { select: { students: true, questions: true } } },
    }),
    prisma.courseStudent.findMany({
      where: { course: { tutorId: userId } },
      orderBy: { joinedAt: "desc" },
      take: 8,
      include: {
        course: { select: { title: true } },
        submission: { select: { score: true, totalQuestions: true } },
      },
    }),
  ]);

  const liveCourses = courses.filter((c) => c.isLive).length;
  const totalStudents = courses.reduce((s, c) => s + c._count.students, 0);

  const submitted = recentStudents.filter((s) => s.submission);
  const avgScore = submitted.length > 0
    ? Math.round(
        submitted.reduce(
          (sum, s) => sum + (s.submission!.score / s.submission!.totalQuestions) * 100,
          0
        ) / submitted.length
      )
    : null;

  const firstName = name.split(" ")[0];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">Welcome back, {firstName}</h1>
        <p className="text-sm text-slate-500">Here's your teaching overview</p>
      </header>

      <div className="flex-1 p-6 space-y-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard title="My Courses" value={courses.length} icon={BookOpen} color="bg-slate-700" />
          <StatCard title="Live Now" value={liveCourses} sub="Active sessions" icon={Radio} color="bg-emerald-600" />
          <StatCard title="Total Students" value={totalStudents} sub="Joined courses" icon={Users} color="bg-indigo-600" />
          <StatCard title="Avg Score" value={avgScore !== null ? `${avgScore}%` : "—"} sub="Quiz average" icon={TrendingUp} color="bg-amber-500" />
        </div>

        {/* Quick actions */}
        <div className="flex flex-wrap gap-3">
          <Link href="/dashboard/courses/new" className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors">
            <Plus className="h-4 w-4" /> New Course
          </Link>
          <Link href="/dashboard/courses" className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <BookOpen className="h-4 w-4" /> My Courses
          </Link>
          <Link href="/dashboard/attendance" className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <ClipboardList className="h-4 w-4" /> Attendance
          </Link>
        </div>

        {/* Recent activity */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4">
            <h2 className="font-semibold text-slate-900">Recent Students</h2>
            <p className="text-xs text-slate-400 mt-0.5">Latest joins across your courses</p>
          </div>
          {recentStudents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-14 text-center">
              <Clock className="mb-3 h-8 w-8 text-slate-300" />
              <p className="text-sm font-medium text-slate-500">No activity yet</p>
              <p className="mt-1 text-xs text-slate-400">Students will appear here once they join a live course.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {recentStudents.map((student) => {
                const sub = student.submission;
                const pct = sub && sub.totalQuestions > 0
                  ? Math.round((sub.score / sub.totalQuestions) * 100)
                  : null;
                return (
                  <div key={student.id} className="flex items-center justify-between px-5 py-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{student.name}</p>
                      <p className="text-xs text-slate-400">{student.course.title}</p>
                    </div>
                    <div className="text-right">
                      {pct !== null ? (
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${pct >= 60 ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                          {pct}%
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">Joined</span>
                      )}
                      <p className="mt-0.5 text-[10px] text-slate-400">
                        {new Date(student.joinedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN DASHBOARD ─────────────────────────────────────────────────────────

async function AdminDashboard({ name }: { name: string }) {
  const [tutorCount, courseCount, studentCount, recentStudents, topTutors] = await Promise.all([
    prisma.user.count({ where: { role: "TUTOR" } }),
    prisma.tutorCourse.count(),
    prisma.courseStudent.count(),
    prisma.courseStudent.findMany({
      orderBy: { joinedAt: "desc" },
      take: 8,
      include: {
        course: { select: { title: true, tutor: { select: { name: true } } } },
        submission: { select: { score: true, totalQuestions: true } },
      },
    }),
    prisma.user.findMany({
      where: { role: "TUTOR" },
      include: {
        tutorCourses: {
          include: { _count: { select: { students: true } } },
        },
      },
      take: 5,
    }),
  ]);

  const firstName = name.split(" ")[0];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">Admin Overview — {firstName}</h1>
        <p className="text-sm text-slate-500">Platform-wide stats</p>
      </header>

      <div className="flex-1 p-6 space-y-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Tutors" value={tutorCount} icon={Users} color="bg-indigo-600" />
          <StatCard title="Courses" value={courseCount} sub="All tutors" icon={BookOpen} color="bg-slate-700" />
          <StatCard title="Students" value={studentCount} sub="Platform-wide" icon={ClipboardList} color="bg-emerald-600" />
          <StatCard title="Analytics" value="→" sub="View reports" icon={BarChart2} color="bg-amber-500" />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Top tutors */}
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4 flex items-center justify-between">
              <h2 className="font-semibold text-slate-900">Tutors</h2>
              <Link href="/dashboard/tutors" className="text-xs font-medium text-emerald-600 hover:underline">View all</Link>
            </div>
            {topTutors.length === 0 ? (
              <p className="px-5 py-10 text-center text-sm text-slate-400">No tutors yet.</p>
            ) : (
              <div className="divide-y divide-slate-50">
                {topTutors.map((t) => {
                  const students = t.tutorCourses.reduce((s, c) => s + c._count.students, 0);
                  return (
                    <div key={t.id} className="flex items-center justify-between px-5 py-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{t.name ?? "—"}</p>
                        <p className="text-xs text-slate-400">{t.email}</p>
                      </div>
                      <div className="text-right text-xs text-slate-500">
                        <p>{t.tutorCourses.length} courses</p>
                        <p>{students} students</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Recent students */}
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4 flex items-center justify-between">
              <h2 className="font-semibold text-slate-900">Recent Students</h2>
              <Link href="/dashboard/attendance" className="text-xs font-medium text-emerald-600 hover:underline">View all</Link>
            </div>
            {recentStudents.length === 0 ? (
              <p className="px-5 py-10 text-center text-sm text-slate-400">No students yet.</p>
            ) : (
              <div className="divide-y divide-slate-50">
                {recentStudents.map((s) => {
                  const pct = s.submission
                    ? Math.round((s.submission.score / s.submission.totalQuestions) * 100)
                    : null;
                  return (
                    <div key={s.id} className="flex items-center justify-between px-5 py-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{s.name}</p>
                        <p className="text-xs text-slate-400">
                          {s.course.title} · {s.course.tutor?.name}
                        </p>
                      </div>
                      {pct !== null ? (
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${pct >= 60 ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                          {pct}%
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">Joined</span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ENTRY POINT ─────────────────────────────────────────────────────────────

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const userId = session.user.id;
  const name = session.user.name ?? "User";
  const role = String((session.user as { role?: string }).role ?? "").toUpperCase();
  const isAdmin = role === "ADMIN" || role === "SUPER_ADMIN";

  if (isAdmin) return <AdminDashboard name={name} />;
  return <TutorDashboard userId={userId} name={name} />;
}
