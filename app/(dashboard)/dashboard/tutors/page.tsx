import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Users, BookOpen } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function TutorsPage() {
  const session = await auth();
  const role = String((session?.user as { role?: string })?.role ?? "").toUpperCase();
  if (role !== "ADMIN" && role !== "SUPER_ADMIN") redirect("/dashboard");

  const tutors = await prisma.user.findMany({
    where: { role: "TUTOR" },
    orderBy: { createdAt: "desc" },
    include: {
      tutorCourses: {
        select: {
          id: true,
          isLive: true,
          _count: { select: { students: true } },
        },
      },
    },
  });

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Tutors</h1>
            <p className="text-sm text-slate-500">{tutors.length} tutor{tutors.length !== 1 ? "s" : ""} registered</p>
          </div>
        </div>
      </header>

      <div className="flex-1 p-6">
        {tutors.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-24 text-center">
            <Users className="mb-4 h-10 w-10 text-slate-300" />
            <p className="text-base font-semibold text-slate-600">No tutors yet</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <th className="px-5 py-3 text-left">Tutor</th>
                  <th className="px-5 py-3 text-center">Courses</th>
                  <th className="px-5 py-3 text-center">Live Now</th>
                  <th className="px-5 py-3 text-center">Total Students</th>
                  <th className="px-5 py-3 text-right">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tutors.map((tutor) => {
                  const liveCourses = tutor.tutorCourses.filter((c) => c.isLive).length;
                  const totalStudents = tutor.tutorCourses.reduce(
                    (sum, c) => sum + c._count.students, 0
                  );
                  return (
                    <tr key={tutor.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-3">
                        <p className="font-semibold text-slate-900">{tutor.name ?? "—"}</p>
                        <p className="text-xs text-slate-400">{tutor.email}</p>
                      </td>
                      <td className="px-5 py-3 text-center text-slate-600">
                        {tutor.tutorCourses.length}
                      </td>
                      <td className="px-5 py-3 text-center">
                        {liveCourses > 0 ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            {liveCourses}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-center text-slate-600">{totalStudents}</td>
                      <td className="px-5 py-3 text-right text-xs text-slate-400">
                        {new Date(tutor.createdAt).toLocaleDateString()}
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
