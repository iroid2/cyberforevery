"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

/* ─── types ─────────────────────────────────────────────────────────── */
type LiveCourse = {
  id: string;
  title: string;
  subject: string;
  isLive: boolean;
  updatedAt: string;
  tutor: { name: string | null };
  _count: { questions: number; students: number };
};

/* ─── subject palette ────────────────────────────────────────────────── */
const subjectMeta: Record<string, { bg: string; text: string; dot: string }> = {
  Mathematics: { bg: "#EFF6FF", text: "#1D4ED8", dot: "#3B82F6" },
  Science: { bg: "#F0FDF4", text: "#15803D", dot: "#22C55E" },
  English: { bg: "#F5F3FF", text: "#6D28D9", dot: "#8B5CF6" },
  History: { bg: "#FFFBEB", text: "#B45309", dot: "#F59E0B" },
};
const fallbackMeta = { bg: "#F8FAFC", text: "#475569", dot: "#94A3B8" };

/* ─── helpers ────────────────────────────────────────────────────────── */
function getInitials(name: string | null) {
  return (name ?? "T")
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/* ─── sub-components ─────────────────────────────────────────────────── */
function LivePill() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-700">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
      </span>
      Live
    </span>
  );
}

function SubjectTag({ subject }: { subject: string }) {
  const meta = subjectMeta[subject] ?? fallbackMeta;
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold"
      style={{ background: meta.bg, color: meta.text }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: meta.dot }}
      />
      {subject}
    </span>
  );
}

function CourseCard({ course, index }: { course: LiveCourse; index: number }) {
  const initials = getInitials(course.tutor.name);

  return (
    <Link
      href={`/attend/${course.id}`}
      className="group flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* top bar */}
      <div className="flex items-center justify-between">
        <LivePill />
        <SubjectTag subject={course.subject} />
      </div>

      {/* title */}
      <div>
        <h2 className="text-lg font-bold leading-snug tracking-tight text-slate-900">
          {course.title}
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-slate-400">
          Tap to join and enter with your name.
        </p>
      </div>

      {/* tutor row */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
          {initials}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-800">
            {course.tutor.name ?? "Tutor"}
          </p>
          <p className="text-xs text-slate-400">
            {course._count.students} student
            {course._count.students === 1 ? "" : "s"} waiting
          </p>
        </div>
      </div>

      {/* footer */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-sm">
        <span className="text-slate-400">
          {course._count.questions} question
          {course._count.questions === 1 ? "" : "s"}
        </span>
        <span className="flex items-center gap-1 font-semibold text-emerald-600 transition-all group-hover:gap-2">
          Join now
          <svg
            width="14"
            height="14"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 10h12M11 5l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}

function EmptyState({ searching }: { searching: boolean }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-slate-200 bg-white px-8 py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-50">
        <svg
          width="32"
          height="32"
          viewBox="0 0 48 48"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="6"
            y="10"
            width="36"
            height="28"
            rx="5"
            stroke="#CBD5E1"
            strokeWidth="2"
          />
          <path d="M6 18h36" stroke="#CBD5E1" strokeWidth="2" />
          <circle cx="12" cy="14" r="1.5" fill="#CBD5E1" />
          <circle cx="17" cy="14" r="1.5" fill="#CBD5E1" />
          <circle cx="22" cy="14" r="1.5" fill="#CBD5E1" />
          <path
            d="M16 28h16M16 33h10"
            stroke="#CBD5E1"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div>
        <p className="text-lg font-semibold text-slate-800">
          {searching ? "No matching sessions" : "No live sessions right now"}
        </p>
        <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-slate-400">
          {searching
            ? "Try a different search term."
            : "Your tutor hasn't activated a course yet. This page refreshes every 15 seconds."}
        </p>
      </div>

      {!searching && (
        <span className="mt-1 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-medium text-emerald-700">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Waiting for your teacher to go live…
        </span>
      )}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-2xl border border-slate-100 bg-white p-5"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="h-5 w-12 animate-pulse rounded-full bg-slate-100" />
            <div className="h-5 w-20 animate-pulse rounded-full bg-slate-100" />
          </div>
          <div className="mb-2 h-5 w-3/4 animate-pulse rounded-lg bg-slate-100" />
          <div className="mb-5 h-4 w-1/2 animate-pulse rounded-lg bg-slate-100" />
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 animate-pulse rounded-full bg-slate-100" />
            <div className="flex flex-col gap-1.5">
              <div className="h-3.5 w-24 animate-pulse rounded bg-slate-100" />
              <div className="h-3 w-16 animate-pulse rounded bg-slate-100" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── page ───────────────────────────────────────────────────────────── */
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
        // keep last snapshot on network blip
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadCourses();
    const refreshTimer = window.setInterval(loadCourses, 15_000);
    const countdownTimer = window.setInterval(() => {
      setTick((t) => (t <= 1 ? 15 : t - 1));
    }, 1_000);

    return () => {
      mounted = false;
      window.clearInterval(refreshTimer);
      window.clearInterval(countdownTimer);
    };
  }, []);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return courses;
    return courses.filter((c) =>
      `${c.title} ${c.subject} ${c.tutor.name ?? ""}`
        .toLowerCase()
        .includes(term),
    );
  }, [courses, query]);

  const tickPercent = ((15 - tick) / 15) * 100;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* ── hero header ── */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-10">
          {/* top row */}
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              {/* eyebrow */}
              <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.2em] text-emerald-600">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Live classes
              </p>

              <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                Join a live session
              </h1>
              <p className="mt-2 max-w-lg text-sm leading-7 text-slate-500">
                These are the courses your tutor has marked as live. Open a
                session, enter your name, and you'll appear in the tutor
                dashboard instantly.
              </p>
            </div>

            {/* count badge */}
            <div className="flex flex-col items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 px-8 py-4 text-center">
              <span className="text-4xl font-extrabold tabular-nums text-emerald-700">
                {filtered.length}
              </span>
              <span className="mt-0.5 text-[11px] font-semibold uppercase tracking-widest text-emerald-600">
                {filtered.length === 1 ? "session" : "sessions"} live
              </span>
            </div>
          </div>

          {/* search + ticker */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            {/* search */}
            <div className="relative min-w-[200px] flex-1 max-w-lg">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="9"
                  cy="9"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M13.5 13.5L17 17"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, subject, or tutor…"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            {/* refresh ticker */}
            <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-medium text-slate-500">
              <span>Refreshing in {tick}s</span>
              <div className="h-1.5 w-14 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-emerald-400 transition-[width] duration-1000"
                  style={{ width: `${tickPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── main content ── */}
      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* section bar */}
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-sm font-semibold text-slate-800">
            {query ? "Search results" : "Available now"}
          </p>
          <p className="text-xs text-slate-400">
            Last checked {lastUpdated.toLocaleTimeString()} · {courses.length}{" "}
            total
          </p>
        </div>

        {/* content states */}
        {loading ? (
          <LoadingSkeleton />
        ) : filtered.length === 0 ? (
          <EmptyState searching={query.trim().length > 0} />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((course, i) => (
              <CourseCard key={course.id} course={course} index={i} />
            ))}
          </div>
        )}

        {/* footer note */}
        <div className="mt-8 flex items-center gap-2 text-xs text-slate-400">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          Live roster syncs from the backend every 15 seconds.
        </div>
      </main>
    </div>
  );
}
