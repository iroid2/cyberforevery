import { notFound } from "next/navigation";
import Link from "next/link";
import { getCourseResults } from "@/app/actions/courses";
import { ArrowLeft, Users, TrendingUp, CheckCircle, XCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CourseResultsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await getCourseResults(id);
  if (!course) notFound();

  const submitted = course.students.filter((s) => s.submission);
  const avgScore = submitted.length > 0
    ? Math.round(
        submitted.reduce((sum, s) => sum + (s.submission!.score / s.submission!.totalQuestions) * 100, 0) /
          submitted.length
      )
    : null;

  const passRate = submitted.length > 0
    ? Math.round(
        (submitted.filter((s) => s.submission!.score / s.submission!.totalQuestions >= 0.6).length /
          submitted.length) * 100
      )
    : null;

  // Per-question stats
  const questionStats = course.questions.map((q) => {
    const total = submitted.filter((s) =>
      s.submission?.answers.some((a) => a.questionId === q.id)
    ).length;
    const correct = submitted.filter((s) =>
      s.submission?.answers.find((a) => a.questionId === q.id && a.isCorrect)
    ).length;
    return { ...q, total, correct };
  });

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center gap-4">
          <Link
            href={`/dashboard/courses/${id}`}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to course
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-900">{course.title} — Results</h1>
            <p className="text-sm text-slate-400">{course.subject}</p>
          </div>
        </div>
      </header>

      <div className="flex-1 p-6 space-y-6 max-w-5xl">
        {/* Summary stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Total Joined", value: course.students.length, icon: Users, color: "bg-slate-700" },
            { label: "Avg Score", value: avgScore !== null ? `${avgScore}%` : "—", icon: TrendingUp, color: "bg-emerald-600" },
            { label: "Pass Rate (≥60%)", value: passRate !== null ? `${passRate}%` : "—", icon: CheckCircle, color: "bg-indigo-600" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${color}`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">{label}</p>
                <p className="text-2xl font-bold text-slate-900">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Per-student table */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-slate-100 px-5 py-4">
            <h2 className="font-semibold text-slate-900">Student Scores</h2>
          </div>
          {course.students.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-slate-400">No students have joined yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <th className="px-5 py-3 text-left">Name</th>
                  <th className="px-5 py-3 text-center">Score</th>
                  <th className="px-5 py-3 text-center">Result</th>
                  <th className="px-5 py-3 text-right">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {course.students.map((student) => {
                  const sub = student.submission;
                  const pct = sub ? Math.round((sub.score / sub.totalQuestions) * 100) : null;
                  const passed = pct !== null && pct >= 60;
                  return (
                    <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-3 font-medium text-slate-900">{student.name}</td>
                      <td className="px-5 py-3 text-center text-slate-600">
                        {sub ? `${sub.score}/${sub.totalQuestions}` : "—"}
                      </td>
                      <td className="px-5 py-3 text-center">
                        {pct !== null ? (
                          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            passed ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                          }`}>
                            {passed ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                            {pct}%
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400">Not submitted</span>
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
          )}
        </div>

        {/* Per-question analysis */}
        {questionStats.length > 0 && (
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="font-semibold text-slate-900">Question Analysis</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {questionStats.map((q, idx) => {
                const pct = q.total > 0 ? Math.round((q.correct / q.total) * 100) : 0;
                return (
                  <div key={q.id} className="flex items-center gap-4 px-5 py-4">
                    <span className="shrink-0 text-sm font-bold text-slate-400">Q{idx + 1}</span>
                    <p className="flex-1 text-sm text-slate-700 truncate">{q.text}</p>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full ${pct >= 60 ? "bg-emerald-500" : "bg-red-400"}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className={`text-xs font-semibold w-10 text-right ${pct >= 60 ? "text-emerald-600" : "text-red-500"}`}>
                        {q.total > 0 ? `${pct}%` : "—"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
