import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getCourseForManage,
  toggleCourseLive,
  addLesson,
  deleteLesson,
  addQuestion,
  deleteQuestion,
} from "@/app/actions/courses";
import { LiveRoster } from "./live-roster";
import {
  ArrowLeft,
  BookOpen,
  HelpCircle,
  Trash2,
  Radio,
  Plus,
  BarChart2,
} from "lucide-react";

export const dynamic = "force-dynamic";

const OPTION_LABELS = ["A", "B", "C", "D"];

export default async function ManageCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await getCourseForManage(id);
  if (!course) notFound();

  const toggleAction = toggleCourseLive.bind(null, id);

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
            <form action={toggleAction}>
              <button
                type="submit"
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                  course.isLive
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-slate-800 text-white hover:bg-slate-900"
                }`}
              >
                <Radio className="h-4 w-4" />
                {course.isLive ? "Go Inactive" : "Go Live"}
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="flex-1 space-y-8 p-6">
        {course.isLive && (
          <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-sm font-semibold text-emerald-700">
              This course is live. Students can join at{" "}
              <span className="font-mono">/attend/{id}</span>
            </p>
          </div>
        )}

        <LiveRoster
          courseId={id}
          initialStudents={course.students}
          initialCount={course._count.students}
          initialQuestions={(course.sessionQuestions ?? []).map((question) => ({
            id: question.id,
            text: question.text,
            resolved: question.resolved,
            createdAt: question.createdAt.toISOString(),
            student: { name: question.student.name },
          }))}
        />

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
