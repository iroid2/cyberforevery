import { notFound } from "next/navigation";
import Link from "next/link";
import { getStudentResult } from "@/app/actions/student";
import { CheckCircle, XCircle, Trophy, ArrowLeft, GraduationCap } from "lucide-react";

export const dynamic = "force-dynamic";

function getLabel(pct: number) {
  if (pct >= 90) return { label: "Excellent!", color: "text-emerald-600" };
  if (pct >= 75) return { label: "Great job!", color: "text-blue-600" };
  if (pct >= 60) return { label: "Good effort!", color: "text-amber-600" };
  return { label: "Keep practicing!", color: "text-red-600" };
}

export default async function ResultPage({
  params,
  searchParams,
}: {
  params: Promise<{ courseId: string }>;
  searchParams: Promise<{ sid?: string }>;
}) {
  const { courseId } = await params;
  const { sid } = await searchParams;
  if (!sid) notFound();

  const result = await getStudentResult(sid, courseId);
  if (!result) notFound();

  const pct = result.totalQuestions > 0
    ? Math.round((result.score / result.totalQuestions) * 100)
    : 0;
  const { label, color } = getLabel(pct);
  const reviewAnswers = result.answers.filter((ans) => !ans.isCorrect);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-emerald-600">
              <GraduationCap className="h-4 w-4 text-white" />
            </div>
            <p className="font-semibold text-slate-900">Quiz Results</p>
          </div>
          <Link
            href="/attend"
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to sessions
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10 space-y-6">
        {/* Score card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <Trophy className="h-8 w-8 text-emerald-600" />
          </div>
          <p className="text-4xl font-black text-slate-900">{pct}%</p>
          <p className={`mt-1 text-lg font-semibold ${color}`}>{label}</p>
          <p className="mt-2 text-sm text-slate-500">
            {result.student.name} scored {result.score} out of {result.totalQuestions}
          </p>
        </div>

        {/* Per-question breakdown */}
        <div className="space-y-3">
          <h2 className="font-semibold text-slate-700">Question Breakdown</h2>
          {result.answers.map((ans, idx) => {
            const { question, isCorrect, selectedIndex } = ans;
            return (
              <div
                key={ans.id}
                className={`rounded-xl border p-5 ${
                  isCorrect ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50"
                }`}
              >
                <div className="mb-3 flex items-start gap-3">
                  {isCorrect ? (
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  ) : (
                    <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                  )}
                  <p className="font-medium text-slate-900">
                    Q{idx + 1}. {question.text}
                  </p>
                </div>
                <div className="ml-8 space-y-1.5">
                  {question.options.map((opt, i) => {
                    const isYours = i === selectedIndex;
                    const isCorrectOpt = i === question.correctIndex;
                    return (
                      <div
                        key={i}
                        className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                          isCorrectOpt
                            ? "bg-emerald-100 font-semibold text-emerald-800"
                            : isYours
                            ? "bg-red-100 text-red-700 line-through"
                            : "text-slate-600"
                        }`}
                      >
                        <span className="font-bold text-[10px] uppercase tracking-wide w-4">
                          {["A", "B", "C", "D"][i]}
                        </span>
                        {opt}
                        {isCorrectOpt && (
                          <span className="ml-auto text-[10px] font-bold text-emerald-600 uppercase">
                            Correct
                          </span>
                        )}
                        {isYours && !isCorrect && (
                          <span className="ml-auto text-[10px] font-bold text-red-500 uppercase">
                            Your answer
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <h2 className="font-semibold text-emerald-800">Study next</h2>
          {reviewAnswers.length > 0 ? (
            <div className="mt-4 space-y-4">
              {reviewAnswers.map((ans) => (
                <div key={ans.id} className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">{ans.question.text}</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Correct answer:{" "}
                    <span className="font-semibold text-emerald-700">
                      {ans.question.options[ans.question.correctIndex]}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm text-emerald-800">
              No weak areas found. Review the slides once more to reinforce the lesson.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
