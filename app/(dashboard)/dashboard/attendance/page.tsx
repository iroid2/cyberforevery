import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Users, Search } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AttendancePage() {
  const session = await auth();
  const userId = session?.user?.id;
  const role = String((session?.user as { role?: string })?.role ?? "").toUpperCase();
  const isAdmin = role === "ADMIN" || role === "SUPER_ADMIN";

  const students = await prisma.courseStudent.findMany({
    where: isAdmin ? undefined : { course: { tutorId: userId } },
    orderBy: { joinedAt: "desc" },
    include: {
      course: {
        select: { title: true, subject: true, tutor: { select: { name: true } } },
      },
      submission: { select: { score: true, totalQuestions: true, submittedAt: true } },
    },
  });

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Attendance</h1>
            <p className="text-sm text-slate-500">
              {students.length} student{students.length !== 1 ? "s" : ""} across all courses
            </p>
          </div>
        </div>
      </header>

      <div className="flex-1 p-6">
        {students.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-24 text-center">
            <Users className="mb-4 h-10 w-10 text-slate-300" />
            <p className="text-base font-semibold text-slate-600">No students yet</p>
            <p className="mt-1 text-sm text-slate-400">Students will appear here after they join a live course.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <th className="px-5 py-3 text-left">Student</th>
                  <th className="px-5 py-3 text-left">Course</th>
                  {isAdmin && <th className="px-5 py-3 text-left">Tutor</th>}
                  <th className="px-5 py-3 text-center">Score</th>
                  <th className="px-5 py-3 text-right">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map((student) => {
                  const sub = student.submission;
                  const pct = sub && sub.totalQuestions > 0
                    ? Math.round((sub.score / sub.totalQuestions) * 100)
                    : null;
                  return (
                    <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-3">
                        <p className="font-semibold text-slate-900">{student.name}</p>
                      </td>
                      <td className="px-5 py-3">
                        <p className="font-medium text-slate-700">{student.course.title}</p>
                        <p className="text-xs text-slate-400">{student.course.subject}</p>
                      </td>
                      {isAdmin && (
                        <td className="px-5 py-3 text-slate-600">
                          {student.course.tutor?.name ?? "—"}
                        </td>
                      )}
                      <td className="px-5 py-3 text-center">
                        {pct !== null ? (
                          <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            pct >= 60 ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                          }`}>
                            {pct}%
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-right text-xs text-slate-400">
                        {new Date(student.joinedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
