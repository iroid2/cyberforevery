import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getCourseForManage,
  addLesson,
  deleteLesson,
  addQuestion,
  deleteQuestion,
} from "@/app/actions/courses";
import {
  getSessionInstancesByCourse,
} from "@/app/actions/sessions";
import { LiveRoster } from "./live-roster";
import { CoverImageUpload } from "./cover-image-upload";
import { LessonPresentationUpload } from "./lesson-presentation-upload";
import { SessionTimer } from "@/components/SessionTimer";
import { formatDurationLabel } from "@/lib/duration";
import {
  ArrowLeft,
  BookOpen,
  HelpCircle,
  Trash2,
  Plus,
  BarChart2,
  ImageIcon,
} from "lucide-react";

export const dynamic = "force-dynamic";

const OPTION_LABELS = ["A", "B", "C", "D"];

export default async function ManageCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [course, sessions] = await Promise.all([
    getCourseForManage(id),
    getSessionInstancesByCourse(id),
  ]);
  if (!course) notFound();

  const liveSession = sessions.find(s => s.status === "LIVE");

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <Link
              href="/dashboard/courses"
              className="flex shrink-0 items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Courses
            </Link>
            <div className="min-w-0">
              <h1 className="truncate text-xl font-bold text-slate-900">
                {course.title}
              </h1>
              <p className="text-sm text-slate-400">{course.subject}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href={`/dashboard/courses/${id}/results`}
              className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              <BarChart2 className="h-4 w-4" />
              Results
            </Link>
            {liveSession ? (
              <>
                <SessionTimer
                  sessionId={liveSession.id}
                  initialSeconds={liveSession.durationSeconds ?? 0}
                  size="lg"
                />
                <Link
                  href={`/dashboard/courses/${id}/sessions/${liveSession.id}`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  View Session
                </Link>
              </>
            ) : (
              <Link
                href={`/dashboard/courses/${id}/sessions/new`}
                className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
              >
                <Plus className="h-4 w-4" />
                New Session
              </Link>
            )}
          </div>
        </div>
      </header>

      <div className="flex-1 space-y-8 p-6">
        {/* Session Status */}
        {liveSession ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4">
            <p className="text-sm font-semibold text-emerald-700">
              This course is live. Students can join at{" "}
              <span className="font-mono">/attend/{id}</span>
            </p>
            {typeof liveSession.durationSeconds === "number" && liveSession.durationSeconds > 0 && (
              <p className="mt-2 inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700 shadow-sm">
                Session running for {formatDurationLabel(liveSession.durationSeconds)}
              </p>
            )}
          </div>
        ) : (() => {
          const lastCompleted = sessions.find(s => s.status === "COMPLETED");
          return lastCompleted ? (
            <div className="rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
              <p className="text-sm font-semibold text-slate-700">
                Session completed on {new Date(lastCompleted.date).toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <p className="mt-2 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                Session ran for {formatDurationLabel(lastCompleted.durationSeconds ?? 0)}
              </p>
            </div>
          ) : null;
        })()}

        {/* Sessions List */}
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-base font-bold text-slate-900">
              <Radio className="h-5 w-5 text-emerald-600" />
              Sessions
            </h2>
            <Link
              href={`/dashboard/courses/${id}/sessions/new`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700"
            >
              <Plus className="h-3.5 w-3.5" />
              New Session
            </Link>
          </div>
          {sessions.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-8 text-center">
              <p className="text-sm font-medium text-slate-500">No sessions yet. Create your first session to get started.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sessions.map((session) => {
                const sessionUrl = `/dashboard/courses/${id}/sessions/${session.id}`;
                const dateLabel = new Date(session.date).toLocaleDateString(undefined, {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                });
                return (
                  <div
                    key={session.id}
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                        {new Date(session.date).getDate()}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900">{dateLabel}</p>
                        <p className="text-xs text-slate-500">
                          {session._count.attendance} attended · {session._count.submissions} submitted
                          {typeof session.durationSeconds === "number" && session.durationSeconds > 0 && ` · Duration: ${formatDurationLabel(session.durationSeconds)}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
                          session.status === "LIVE"
                            ? "bg-emerald-100 text-emerald-700"
                            : session.status === "COMPLETED"
                            ? "bg-slate-100 text-slate-600"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {session.status === "LIVE" ? "Live" : session.status === "COMPLETED" ? "Completed" : "Scheduled"}
                      </span>
                      <Link
                        href={sessionUrl}
                        className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <LiveRoster
          courseId={id}
          initialStudents={course.students.map((s) => ({
            ...s,
            joinedAt: s.joinedAt.toISOString(),
          }))}
          initialCount={course._count.students}
          initialQuestions={(course.sessionQuestions ?? []).map((question) => ({
            id: question.id,
            text: question.text,
            resolved: question.resolved,
            createdAt: question.createdAt.toISOString(),
            student: { name: question.student.name },
          }))}
        />

        {/* Cover image */}
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-slate-900">
            <ImageIcon className="h-5 w-5 text-slate-500" />
            Cover Image
          </h2>
          <CoverImageUpload courseId={id} currentImage={(course as { coverImage?: string | null }).coverImage} />
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-base font-bold text-slate-900">
              <BookOpen className="h-5 w-5 text-emerald-600" />
              Lessons
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">
                {course.lessons.length}
              </span>
            </h2>
          </div>

          {course.lessons.length > 0 && (
            <div className="mb-4 space-y-3">
              {course.lessons.map((lesson, idx) => {
                const deleteAction = deleteLesson.bind(null, lesson.id, id);
                return (
                  <div
                    key={lesson.id}
                    className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-start gap-3">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                          {idx + 1}
                        </span>
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-900">
                            {lesson.title}
                          </p>
                          <p className="mt-1 whitespace-pre-wrap text-sm text-slate-500 line-clamp-2">
                            {lesson.content}
                          </p>
                        </div>
                      </div>
                      <form action={deleteAction}>
                        <button
                          type="submit"
                          title="Delete lesson"
                          className="shrink-0 rounded-md p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </form>
                    </div>
                    <LessonPresentationUpload
                      lessonId={lesson.id}
                      courseId={id}
                      currentUrl={(lesson as { presentationUrl?: string | null }).presentationUrl}
                      currentName={(lesson as { presentationName?: string | null }).presentationName}
                    />
                  </div>
                );
              })}
            </div>
          )}

          <details className="group rounded-xl border border-dashed border-slate-300 bg-white">
            <summary className="flex cursor-pointer select-none items-center gap-2 px-5 py-4 text-sm font-semibold text-slate-600 list-none transition-colors hover:text-emerald-700">
              <Plus className="h-4 w-4" />
              Add Lesson
            </summary>
            <div className="border-t border-slate-100 px-5 pb-5 pt-4">
              <form action={addLesson.bind(null, id)} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Lesson Title
                  </label>
                  <input
                    name="title"
                    type="text"
                    required
                    placeholder="e.g. Introduction to Firewalls"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Content / Notes
                  </label>
                  <textarea
                    name="content"
                    required
                    rows={6}
                    placeholder="Write your lesson notes here..."
                    className="w-full resize-y rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-lg bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                >
                  Save Lesson
                </button>
              </form>
            </div>
          </details>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-base font-bold text-slate-900">
              <HelpCircle className="h-5 w-5 text-indigo-500" />
              Quiz Questions
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">
                {course.questions.length}
              </span>
            </h2>
          </div>

          {course.questions.length > 0 && (
            <div className="mb-4 space-y-3">
              {course.questions.map((q, idx) => {
                const deleteAction = deleteQuestion.bind(null, q.id, id);
                return (
                  <div
                    key={q.id}
                    className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900">
                          <span className="mr-1.5 text-indigo-500">Q{idx + 1}.</span>
                          {q.text}
                        </p>
                        <div className="mt-2 grid grid-cols-2 gap-1.5">
                          {q.options.map((opt, i) => (
                            <div
                              key={i}
                              className={`flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs ${
                                i === q.correctIndex
                                  ? "border-emerald-200 bg-emerald-50 font-semibold text-emerald-700"
                                  : "border-slate-100 bg-slate-50 text-slate-600"
                              }`}
                            >
                              <span className="font-bold">{OPTION_LABELS[i]}.</span>
                              {opt}
                              {i === q.correctIndex && (
                                <span className="ml-auto text-emerald-600">✓</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                      <form action={deleteAction}>
                        <button
                          type="submit"
                          title="Delete question"
                          className="shrink-0 rounded-md p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </form>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <details className="group rounded-xl border border-dashed border-slate-300 bg-white">
            <summary className="flex cursor-pointer select-none items-center gap-2 px-5 py-4 text-sm font-semibold text-slate-600 list-none transition-colors hover:text-indigo-600">
              <Plus className="h-4 w-4" />
              Add Question
            </summary>
            <div className="border-t border-slate-100 px-5 pb-5 pt-4">
              <form action={addQuestion.bind(null, id)} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Question Text
                  </label>
                  <textarea
                    name="text"
                    required
                    rows={3}
                    placeholder="Enter the quiz question..."
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {OPTION_LABELS.map((label, index) => (
                    <div key={label}>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">
                        Option {label}
                      </label>
                      <input
                        name={`option${label}`}
                        required
                        placeholder={`Choice ${label}`}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                      />
                      <input type="hidden" name={`optionIndex${label}`} value={index} />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Correct Answer
                  </label>
                  <select
                    name="correctIndex"
                    required
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  >
                    {OPTION_LABELS.map((label, index) => (
                      <option key={label} value={index}>
                        Option {label}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
                >
                  Save Question
                </button>
              </form>
            </div>
          </details>
        </section>
      </div>
    </div>
  );
}
