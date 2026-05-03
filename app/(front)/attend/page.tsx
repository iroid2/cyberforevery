"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type LiveCourse = {
  id: string;
  title: string;
  subject: string;
  isLive: boolean;
  updatedAt: string;
  tutor: { name: string | null };
  _count: { questions: number; students: number };
};

const subjectMeta: Record<string, { bg: string; text: string; dot: string }> = {
  Mathematics: { bg: "#EFF6FF", text: "#1D4ED8", dot: "#3B82F6" },
  Science: { bg: "#F0FDF4", text: "#15803D", dot: "#22C55E" },
  English: { bg: "#F5F3FF", text: "#6D28D9", dot: "#8B5CF6" },
  History: { bg: "#FFFBEB", text: "#B45309", dot: "#F59E0B" },
};

const fallbackMeta = { bg: "#F8FAFC", text: "#475569", dot: "#94A3B8" };

export default function AttendPage() {
  const [courses, setCourses] = useState<LiveCourse[]>([]);
  const [query, setQuery] = useState("");
  const [tick, setTick] = useState(15);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadCourses = async () => {
      try {
        const res = await fetch("/api/live-courses", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { courses?: LiveCourse[] };
        if (!mounted) return;
        setCourses(data.courses ?? []);
        setLastUpdated(new Date());
        setTick(15);
      } catch {
        // Keep the last successful snapshot when the network blips.
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadCourses();
    const refreshTimer = window.setInterval(loadCourses, 15000);
    const countdownTimer = window.setInterval(() => {
      setTick((current) => (current <= 1 ? 15 : current - 1));
    }, 1000);

    return () => {
      mounted = false;
      window.clearInterval(refreshTimer);
      window.clearInterval(countdownTimer);
    };
  }, []);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return courses;
    return courses.filter((course) =>
      `${course.title} ${course.subject} ${course.tutor.name ?? ""}`
        .toLowerCase()
        .includes(term),
    );
  }, [courses, query]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white px-6 py-8 shadow-sm">
        <div className="mx-auto flex max-w-6xl flex-col gap-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
                Live classes
              </p>
              <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Join a live session
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                These are the courses your tutor has marked as live. Open a session, join
                with your name, and you will appear in the tutor dashboard immediately.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
              {filtered.length} live {filtered.length === 1 ? "session" : "sessions"}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative w-full max-w-xl">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by title, subject, or tutor..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm shadow-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              />
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs font-medium text-slate-500 shadow-sm">
              Refreshing in {tick}s
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {query ? "Search results" : "Available now"}
            </p>
            <p className="text-xs text-slate-500">
              Last checked {lastUpdated.toLocaleTimeString()}
            </p>
          </div>
          <p className="text-xs text-slate-400">
            {courses.length} total live course{courses.length === 1 ? "" : "s"} from the backend
          </p>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center text-sm text-slate-500">
            Loading live sessions...
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <p className="text-lg font-semibold text-slate-900">
              {query ? "No matching sessions" : "No live sessions right now"}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              {query
                ? "Try a different search term."
                : "Your tutor has not activated a course yet. Come back when a class goes live."}
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((course) => {
              const meta = subjectMeta[course.subject] ?? fallbackMeta;
              const initials = (course.tutor.name ?? "T")
                .split(" ")
                .filter(Boolean)
                .map((word) => word[0])
                .join("")
                .toUpperCase()
                .slice(0, 2);

              return (
                <Link
                  key={course.id}
                  href={`/attend/${course.id}`}
                  className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      Live
                    </span>
                    <span
                      className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
                      style={{ background: meta.bg, color: meta.text }}
                    >
                      <span className="h-2 w-2 rounded-full" style={{ background: meta.dot }} />
                      {course.subject}
                    </span>
                  </div>

                  <div className="mt-5">
                    <h2 className="text-xl font-bold tracking-tight text-slate-950">
                      {course.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Tap to join the live room and enter with your name.
                    </p>
                  </div>

                  <div className="mt-5 flex items-center gap-3 text-sm text-slate-500">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-600">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-slate-900">
                        {course.tutor.name ?? "Tutor"}
                      </p>
                      <p className="text-xs text-slate-400">
                        {course._count.students} students waiting
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
                    <span className="text-slate-500">
                      {course._count.questions} quiz questions
                    </span>
                    <span className="font-semibold text-emerald-600 group-hover:translate-x-0.5 transition-transform">
                      Join now
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <div className="mt-6 flex items-center gap-3 text-xs text-slate-400">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Live roster is synced from the backend every 15 seconds.
        </div>
      </main>
    </div>
  );
}
