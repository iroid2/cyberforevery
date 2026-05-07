"use client";

import { useEffect, useRef, useState, useTransition, useMemo, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { submitQuiz } from "@/app/actions/student";
import { StudentTimer } from "@/components/StudentTimer";
import {
  BookOpen,
  HelpCircle,
  CheckCircle,
  Loader2,
  GraduationCap,
  MessageSquare,
  Send,
  FileText,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Radio,
} from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  content: string;
  order: number;
  presentationUrl?: string | null;
  presentationName?: string | null;
  presentationType?: string | null;
}

interface Question {
  id: string;
  text: string;
  options: string[];
  order: number;
}

interface LiveQuestion {
  id: string;
  text: string;
  resolved: boolean;
  createdAt: string;
  student: { name: string | null };
}

interface Props {
  courseId: string;
  studentId: string;
  studentName: string;
  courseTitle: string;
  subject: string;
  coverImage?: string;
  lessons: Lesson[];
  questions: Question[];
  initialQuestions: LiveQuestion[];
  activeSessionId: string | null;
  activeSessionDate?: string | null;
}

const OPTION_LABELS = ["A", "B", "C", "D"];

// ─── Presentation Viewer ──────────────────────────────────────────────────────

function PresentationViewer({
  url,
  name,
  type,
}: {
  url: string;
  name?: string | null;
  type?: string | null;
}) {
  const [page, setPage] = useState(1);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const isPdf = !!(
    type?.toLowerCase().includes("pdf") ||
    url.toLowerCase().includes(".pdf")
  );

  const frameSrc = isPdf ? `${url}#page=${page}&toolbar=1` : url;

  const handlePrev = () => {
    if (page <= 1) return;
    setPage((p) => p - 1);
  };
  const handleNext = () => setPage((p) => p + 1);

  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-700 bg-slate-800 px-4 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <FileText className="h-4 w-4 shrink-0 text-slate-300" />
          <span className="truncate text-sm text-slate-200">
            {name ?? "Presentation"}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {isPdf && (
            <>
              <button
                onClick={handlePrev}
                disabled={page <= 1}
                className="flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-700 disabled:opacity-40"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                Prev
              </button>
              <span className="min-w-[52px] px-1 text-center text-xs text-slate-400">
                Page {page}
              </span>
              <button
                onClick={handleNext}
                className="flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-700"
              >
                Next
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </>
          )}
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            title="Open in new tab"
            className="ml-1 rounded p-1.5 text-slate-300 transition-colors hover:bg-slate-700"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
      {/* Viewer */}
      <iframe
        ref={iframeRef}
        key={frameSrc}
        src={frameSrc}
        title={name ?? "Presentation"}
        className="w-full border-0 bg-slate-100"
        style={{ height: "580px" }}
      />
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function LearnClient({
  courseId,
  studentId,
  studentName,
  courseTitle,
  subject,
  coverImage,
  lessons,
  questions,
  initialQuestions,
  activeSessionId,
  activeSessionDate,
}: Props) {
  const [tab, setTab] = useState<"lesson" | "quiz">("lesson");
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const [liveQuestions, setLiveQuestions] =
    useState<LiveQuestion[]>(initialQuestions);
  const [questionText, setQuestionText] = useState("");
  const [questionError, setQuestionError] = useState("");
  const [questionSuccess, setQuestionSuccess] = useState("");
  const [isQuestionPending, setIsQuestionPending] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const lessonWithPresentation = useMemo(() =>
    lessons.find((l) => l.presentationUrl) ?? null,
    [lessons]
  );
  const router = useRouter();

  const allAnswered =
    questions.length > 0 &&
    questions.every((q) => selected[q.id] !== undefined);

  useEffect(() => {
    let mounted = true;

    const syncQuestions = async () => {
      try {
        const res = await fetch(`/api/course-roster/${courseId}`, {
          cache: "no-store",
        });
        if (!res.ok) return;
        const data = await res.json();
        if (!mounted) return;
        setLiveQuestions(data.course?.sessionQuestions ?? initialQuestions);
      } catch {
        // keep the current list when the network blips
      }
    };

    syncQuestions();
    const timer = window.setInterval(syncQuestions, 12000);

    return () => {
      mounted = false;
      window.clearInterval(timer);
    };
  }, [courseId, initialQuestions]);

  function handleSubmit() {
    if (!allAnswered) {
      setError("Please answer all questions before submitting.");
      return;
    }
    setError("");
    startTransition(async () => {
      const submissionId = await submitQuiz(
        courseId,
        studentId,
        selected,
        elapsedSeconds,
        activeSessionId ?? undefined // pass undefined if no active session
      );
      router.push(`/learn/${courseId}/result?sid=${submissionId}`);
    });
  }

  async function handleQuestionSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const text = questionText.trim();
    if (!text) {
      setQuestionError("Type a question before sending it.");
      return;
    }

    setIsQuestionPending(true);
    setQuestionError("");
    setQuestionSuccess("");

    try {
      const res = await fetch(`/api/course-roster/${courseId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const payload = (await res.json()) as {
        error?: string;
        question?: LiveQuestion;
      };
      if (!res.ok || !payload.question) {
        throw new Error(
          payload.error ?? "Unable to submit your question right now."
        );
      }
      setLiveQuestions((current) => [
        payload.question!,
        ...current.filter((item) => item.id !== payload.question?.id),
      ]);
      setQuestionText("");
      setQuestionSuccess(
        "Your tutor will see this question in the live roster."
      );
    } catch (submitError) {
      setQuestionError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to submit your question."
      );
    } finally {
      setIsQuestionPending(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white px-6 py-3 shadow-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-emerald-600">
              <GraduationCap className="h-4 w-4 text-white" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">
                {courseTitle}
              </p>
              <p className="text-xs text-slate-400">{subject}</p>
            </div>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-xs font-medium text-slate-700">{studentName}</p>
            {activeSessionId && (
              <div className="mt-1 flex justify-end">
                <StudentTimer onTick={setElapsedSeconds} />
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-8">
        {/* Course cover */}
        <div className="mb-6 overflow-hidden rounded-2xl">
          {coverImage ? (
            <div className="relative h-44">
              <img
                src={coverImage}
                alt={courseTitle}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-5">
                <p className="text-lg font-bold text-white drop-shadow">
                  {courseTitle}
                </p>
                <p className="text-sm text-emerald-200 drop-shadow">{subject}</p>
              </div>
            </div>
          ) : (
            <div className="flex h-44 items-end bg-gradient-to-br from-emerald-600 via-emerald-700 to-slate-800 p-5">
              <div>
                <p className="text-lg font-bold text-white">{courseTitle}</p>
                <p className="text-sm text-emerald-200">{subject}</p>
              </div>
            </div>
          )}
        </div>

        {/* Presentation Preview - FIRST */}
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-slate-900">
            <FileText className="h-5 w-5 text-emerald-600" />
            Presentation Preview
          </h2>
          {lessonWithPresentation ? (
            <PresentationViewer
              url={lessonWithPresentation.presentationUrl!}
              name={lessonWithPresentation.presentationName}
              type={lessonWithPresentation.presentationType}
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-200 bg-slate-50 py-10 text-center">
              <FileText className="h-8 w-8 text-slate-300" />
              <p className="text-sm font-medium text-slate-400">
                Slides not uploaded yet
              </p>
              <p className="text-xs text-slate-300">
                Your tutor will add the presentation for this lesson
              </p>
            </div>
          )}
        </section>

        {/* Session Status Card */}
        {activeSessionId && activeSessionDate && (
          <section className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="flex items-center gap-2 text-sm font-bold text-emerald-700">
                  <Radio className="h-4 w-4" />
                  Live Session Today
                </h3>
                <p className="mt-1 text-sm text-emerald-600">
                  {new Date(activeSessionDate).toLocaleDateString(undefined, {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-200 px-2.5 py-1 text-xs font-bold text-emerald-800 animate-pulse">
                <span className="h-2 w-2 rounded-full bg-emerald-600 animate-ping" />
                LIVE
              </span>
            </div>
          </section>
        )}

        {/* Ask a question */}
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                <MessageSquare className="h-3.5 w-3.5" />
                Live support
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                Ask a question during the session
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                Send a question and it will appear in your tutor's live
                roster so they can respond while the class is active.
              </p>

              <form onSubmit={handleQuestionSubmit} className="mt-4 space-y-3">
                <textarea
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  rows={4}
                  placeholder="Type your question here..."
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="submit"
                    disabled={isQuestionPending}
                    className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isQuestionPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send question
                      </>
                    )}
                  </button>
                  <p className="text-xs text-slate-500">
                    Questions are saved in the backend and synced every few
                    seconds.
                  </p>
                </div>
                {questionError && (
                  <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                    {questionError}
                  </p>
                )}
                {questionSuccess && (
                  <p className="rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                    {questionSuccess}
                  </p>
                )}
              </form>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900">
                  Latest questions
                </h3>
                <span className="text-xs font-medium text-slate-500">
                  {liveQuestions.length} live
                </span>
              </div>
              {liveQuestions.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-10 text-center">
                  <MessageSquare className="mx-auto mb-3 h-7 w-7 text-slate-300" />
                  <p className="text-sm font-medium text-slate-500">
                    No questions yet
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Be the first to ask something.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {liveQuestions.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-slate-200 bg-white p-3"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-slate-900">
                          {item.student.name ?? "Student"}
                        </p>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                            item.resolved
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {item.resolved ? "Resolved" : "Open"}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Tabs */}
        <div className="mb-6 flex gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
          <button
            onClick={() => setTab("lesson")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-colors ${
              tab === "lesson"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <BookOpen className="h-4 w-4" />
            Lesson
          </button>
          <button
            onClick={() => setTab("quiz")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-colors ${
              tab === "quiz"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <HelpCircle className="h-4 w-4" />
            Quiz
            {questions.length > 0 && (
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                  tab === "quiz"
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {questions.length}
              </span>
            )}
          </button>
        </div>

        {/* Lesson tab */}
        {tab === "lesson" && (
          <div className="space-y-4">
            {lessons.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
                <BookOpen className="mb-3 h-8 w-8 text-slate-300" />
                <p className="text-sm font-medium text-slate-500">
                  No lessons yet
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Your tutor hasn't added lessons to this course yet.
                </p>
              </div>
            ) : (
              lessons.map((lesson, idx) => (
                <div
                  key={lesson.id}
                  className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                      {idx + 1}
                    </span>
                    <h2 className="font-semibold text-slate-900">
                      {lesson.title}
                    </h2>
                  </div>

                  {lesson.presentationUrl ? (
                    <PresentationViewer
                      url={lesson.presentationUrl}
                      name={lesson.presentationName}
                      type={lesson.presentationType}
                    />
                  ) : (
                    <div className="mb-4 flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-200 bg-slate-50 py-10 text-center">
                      <FileText className="h-8 w-8 text-slate-300" />
                      <p className="text-sm font-medium text-slate-400">
                        Slides not uploaded yet
                      </p>
                      <p className="text-xs text-slate-300">
                        Your tutor will add the presentation for this lesson
                      </p>
                    </div>
                  )}

                  {lesson.content && (
                    <div className="prose prose-slate prose-sm max-w-none whitespace-pre-wrap leading-relaxed text-slate-700 border-t border-slate-100 pt-4 mt-2">
                      {lesson.content}
                    </div>
                  )}
                </div>
              ))
            )}

            {lessons.length > 0 && questions.length > 0 && (
              <button
                onClick={() => setTab("quiz")}
                className="mt-2 w-full rounded-lg border border-emerald-200 bg-emerald-50 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
              >
                Ready for the quiz? →
              </button>
            )}
          </div>
        )}

        {/* Quiz tab */}
        {tab === "quiz" && (
          <div className="space-y-4">
            {questions.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
                <HelpCircle className="mb-3 h-8 w-8 text-slate-300" />
                <p className="text-sm font-medium text-slate-500">
                  No quiz questions yet
                </p>
              </div>
            ) : (
              <>
                {questions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <p className="mb-4 font-semibold text-slate-900">
                      <span className="mr-2 text-emerald-600">Q{idx + 1}.</span>
                      {q.text}
                    </p>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {q.options.map((opt, i) => {
                        const isSelected = selected[q.id] === i;
                        return (
                          <button
                            key={i}
                            onClick={() =>
                              setSelected((prev) => ({ ...prev, [q.id]: i }))
                            }
                            className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-all ${
                              isSelected
                                ? "border-emerald-500 bg-emerald-50 font-medium text-emerald-800"
                                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                            }`}
                          >
                            <span
                              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                                isSelected
                                  ? "bg-emerald-600 text-white"
                                  : "bg-slate-100 text-slate-500"
                              }`}
                            >
                              {["A", "B", "C", "D"][i]}
                            </span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {error && (
                  <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                    {error}
                  </p>
                )}

                <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-sm text-slate-500">
                    {Object.keys(selected).length} of {questions.length}{" "}
                    answered
                  </p>
                  <button
                    onClick={handleSubmit}
                    disabled={!allAnswered || isPending}
                    className="flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting…
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        Submit Quiz
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
