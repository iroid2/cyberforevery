"use client";

import { useEffect, useState, useTransition } from "react";
import { CheckCircle2, Clock3, RefreshCw, Users } from "lucide-react";

type Student = {
  id: string;
  name: string;
  joinedAt: string;
  submission: { id: string } | null;
};

type SessionQuestion = {
  id: string;
  text: string;
  resolved: boolean;
  createdAt: string;
  student: { name: string | null };
};

type LiveRosterProps = {
  courseId: string;
  initialStudents: Student[];
  initialCount: number;
  initialQuestions: SessionQuestion[];
};

export function LiveRoster({
  courseId,
  initialStudents,
  initialCount,
  initialQuestions,
}: LiveRosterProps) {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [count, setCount] = useState(initialCount);
  const [questions, setQuestions] = useState<SessionQuestion[]>(initialQuestions);
  const [isResolving, startTransition] = useTransition();

  useEffect(() => {
    let mounted = true;

    const loadRoster = async () => {
      try {
        const res = await fetch(`/api/course-roster/${courseId}`, { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (!mounted) return;
        setStudents(data.course?.students ?? []);
        setCount(data.course?._count?.students ?? 0);
        setQuestions(data.course?.sessionQuestions ?? []);
      } catch {
        // keep last good data on network hiccups
      }
    };

    loadRoster();
    const timer = window.setInterval(loadRoster, 10000);
    return () => {
      mounted = false;
      window.clearInterval(timer);
    };
  }, [courseId]);

  function handleResolve(questionId: string, resolved: boolean) {
    startTransition(async () => {
      try {
        const res = await fetch(`/api/course-roster/${courseId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ questionId, resolved }),
        });

        if (!res.ok) return;

        setQuestions((current) =>
          current.map((question) =>
            question.id === questionId ? { ...question, resolved } : question,
          ),
        );
      } catch {
        // keep the previous state if the update fails
      }
    });
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-base font-bold text-slate-900">
            <Users className="h-5 w-5 text-emerald-600" />
            Students in session
          </h2>
          <p className="text-sm text-slate-500">
            {count} learner{count === 1 ? "" : "s"} have joined this course.
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
          Live roster
        </span>
      </div>

      {students.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
          No students have joined yet. Once they enter from{" "}
          <span className="font-mono">/attend</span>, they will appear here.
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {students.map((student) => {
            const hasSubmitted = Boolean(student.submission);
            return (
              <div
                key={student.id}
                className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900">{student.name}</p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                    <Clock3 className="h-3.5 w-3.5" />
                    Joined {new Date(student.joinedAt).toLocaleString()}
                  </div>
                </div>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    hasSubmitted
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {hasSubmitted ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : (
                    <Clock3 className="h-3.5 w-3.5" />
                  )}
                  {hasSubmitted ? "Submitted" : "In class"}
                </span>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-6 border-t border-slate-200 pt-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Live questions</h3>
            <p className="text-xs text-slate-500">
              Questions submitted by students in this session.
            </p>
          </div>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">
            {questions.length} queued
          </span>
        </div>

        {questions.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
            No live questions yet. Student questions submitted in{" "}
            <span className="font-mono">/learn</span> will show here.
          </div>
        ) : (
          <div className="space-y-3">
            {questions.map((question) => (
              <div
                key={question.id}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900">
                      {question.student.name ?? "Student"}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {question.text}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
                      question.resolved
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {question.resolved ? "Resolved" : "Open"}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-end">
                  <button
                    type="button"
                    disabled={isResolving}
                    onClick={() => handleResolve(question.id, !question.resolved)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    {question.resolved ? "Mark open" : "Mark resolved"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
