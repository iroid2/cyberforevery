import { notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  ArrowLeft,
  User,
  CheckCircle2,
  XCircle,
  Clock3,
  MessageSquare,
  Trophy,
  HelpCircle,
} from "lucide-react";
import { formatDurationLabel } from "@/lib/duration";

export const dynamic = "force-dynamic";

const OPTION_LABELS = ["A", "B", "C", "D"];

export default async function StudentDetailPage({
  params,
}: {
  params: Promise<{ id: string; studentId: string }>;
}) {
  const { id: courseId, studentId } = await params;

  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const role = String((session.user as { role?: string }).role ?? "").toUpperCase();
  const isAdmin = role === "ADMIN" || role === "SUPER_ADMIN";
  const tutorId = session.user.id;

  const student = await prisma.courseStudent.findFirst({
    where: {
      id: studentId,
      courseId,
      ...(isAdmin ? {} : { course: { tutorId } }),
    },
    include: {
      course: { select: { id: true, title: true, subject: true } },
      submission: {
        include: {
          answers: {
            include: {
              question: {
                select: {
                  text: true,
                  options: true,
                  correctIndex: true,
                  order: true,
                },
              },
            },
            orderBy: { question: { order: "asc" } },
          },
        },
      },
      sessionQuestions: { orderBy: { createdAt: "asc" } },
    },
  });

  if (!student) notFound();

  const sub = student.submission;
  const scorePercent =
    sub && sub.totalQuestions > 0
      ? Math.round((sub.score / sub.totalQuestions) * 100)
      : null;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center gap-4">
          <Link
            href={`/dashboard/courses/${courseId}`}
            className="flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Course
          </Link>
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-slate-900">{student.name}</h1>
            <p className="text-sm text-slate-400">
              {student.course.title} · {student.course.subject}
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-4xl space-y-6 p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-1 flex items-center gap-2 text-slate-500">
              <User className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wide">Student</span>
            </div>
            <p className="text-lg font-bold text-slate-900">{student.name}</p>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
              <Clock3 className="h-3.5 w-3.5" />
              Joined {new Date(student.joinedAt).toLocaleString()}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-1 flex items-center gap-2 text-slate-500">
              <Trophy className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wide">Quiz Score</span>
            </div>
            {sub ? (
              <>
                <p className={`text-3xl font-bold ${scorePercent! >= 60 ? "text-emerald-600" : "text-red-500"}`}>
                  {scorePercent}%
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  {sub.score} / {sub.totalQuestions} correct
                </p>
              </>
            ) : (
              <>
                <p className="text-base font-semibold text-amber-600">Not submitted</p>
                <p className="mt-1 text-xs text-slate-400">Quiz not completed yet</p>
              </>
            )}
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-1 flex items-center gap-2 text-slate-500">
              <Clock3 className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wide">Time Spent</span>
            </div>
            {sub?.timeSpentSeconds != null ? (
              <>
                <p className="text-3xl font-bold text-slate-900">
                  {formatDurationLabel(sub.timeSpentSeconds)}
                </p>
                <p className="mt-1 text-xs text-slate-400">Recorded on submission</p>
              </>
            ) : (
              <>
                <p className="text-base font-semibold text-slate-500">—</p>
                <p className="mt-1 text-xs text-slate-400">No time recorded yet</p>
              </>
            )}
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-1 flex items-center gap-2 text-slate-500">
              <MessageSquare className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wide">Questions Asked</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {student.sessionQuestions.length}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              {student.sessionQuestions.filter((q) => q.resolved).length} resolved
            </p>
          </div>
        </div>

        <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-4">
            <HelpCircle className="h-5 w-5 text-indigo-500" />
            <h2 className="font-bold text-slate-900">Quiz Answers</h2>
            {sub && (
              <span className="ml-auto rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-500">
                {sub.answers.length} question{sub.answers.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {!sub ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <HelpCircle className="mb-3 h-10 w-10 text-slate-300" />
              <p className="text-sm font-medium text-slate-500">Quiz not submitted yet</p>
              <p className="mt-1 text-xs text-slate-400">
                This student hasn&apos;t completed the quiz.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {sub.answers.map((answer, idx) => {
                const q = answer.question;
                return (
                  <div key={idx} className="px-5 py-4">
                    <p className="mb-3 font-semibold text-slate-900">
                      <span className="mr-2 text-indigo-500">Q{idx + 1}.</span>
                      {q.text}
                    </p>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {q.options.map((opt, i) => {
                        const isSelected = answer.selectedIndex === i;
                        const isCorrect = q.correctIndex === i;
                        let style = "border-slate-100 bg-slate-50 text-slate-600";
                        if (isSelected && isCorrect) {
                          style = "border-emerald-200 bg-emerald-50 text-emerald-800";
                        } else if (isSelected && !isCorrect) {
                          style = "border-red-200 bg-red-50 text-red-800";
                        } else if (!isSelected && isCorrect) {
                          style = "border-emerald-100 bg-emerald-50/40 text-emerald-700";
                        }

                        return (
                          <div
                            key={i}
                            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${style}`}
                          >
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold shadow-sm">
                              {OPTION_LABELS[i]}
                            </span>
                            <span className="flex-1">{opt}</span>
                            {isSelected && isCorrect && (
                              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                            )}
                            {isSelected && !isCorrect && (
                              <XCircle className="h-4 w-4 shrink-0 text-red-500" />
                            )}
                            {!isSelected && isCorrect && (
                              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 opacity-70" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-4">
            <MessageSquare className="h-5 w-5 text-emerald-600" />
            <h2 className="font-bold text-slate-900">Questions Asked During Session</h2>
            <span className="ml-auto rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-500">
              {student.sessionQuestions.length}
            </span>
          </div>

          {student.sessionQuestions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <MessageSquare className="mb-3 h-10 w-10 text-slate-300" />
              <p className="text-sm font-medium text-slate-500">No questions asked</p>
              <p className="mt-1 text-xs text-slate-400">
                This student didn&apos;t ask any questions during the session.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {student.sessionQuestions.map((q) => (
                <div key={q.id} className="flex items-start gap-4 px-5 py-4">
                  <div className="flex-1">
                    <p className="text-sm leading-relaxed text-slate-800">{q.text}</p>
                    <p className="mt-1 text-xs text-slate-400">
                      {new Date(q.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${
                      q.resolved
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {q.resolved ? "Resolved" : "Open"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
