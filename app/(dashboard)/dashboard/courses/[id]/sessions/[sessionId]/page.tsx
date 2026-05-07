import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getSessionInstanceDetails,
  startSessionInstance,
  endSessionInstance,
  deleteSessionInstance,
  updateSessionInstanceRemarks,
} from "@/app/actions/sessions";
import { SessionTimer } from "@/components/SessionTimer";
import { formatDurationLabel } from "@/lib/duration";
import {
  ArrowLeft,
  Play,
  Square,
  Trash2,
  Save,
  UserCheck,
  FileQuestion,
  ClipboardList,
  Edit3,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SessionDetailPage({
  params,
}: {
  params: Promise<{ id: string; sessionId: string }>;
}) {
  const { id: courseId, sessionId } = await params;
  const session = await getSessionInstanceDetails(sessionId);

  if (!session) notFound();

  // Safety: ensure session belongs to course
  if (session.course.id !== courseId) notFound();

  const startAction = startSessionInstance.bind(null, sessionId);
  const endAction = endSessionInstance.bind(null, sessionId);
  const deleteAction = deleteSessionInstance.bind(null, sessionId);
  const remarksAction = updateSessionInstanceRemarks.bind(null, sessionId);

  const isLive = session.status === "LIVE";
  const isCompleted = session.status === "COMPLETED";
  const isScheduled = session.status === "SCHEDULED";

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <Link
              href={`/dashboard/courses/${courseId}`}
              className="flex shrink-0 items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Course
            </Link>
            <div className="min-w-0">
              <h1 className="truncate text-xl font-bold text-slate-900">
                {session.course.title}
              </h1>
              <p className="text-sm text-slate-400">
                Session: {new Date(session.date).toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {isLive && (
              <SessionTimer
                sessionId={sessionId}
                initialSeconds={session.durationSeconds ?? 0}
                size="lg"
              />
            )}
            {isScheduled && (
              <form action={startAction}>
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                >
                  <Play className="h-4 w-4" />
                  Start Session
                </button>
              </form>
            )}
            {isLive && (
              <form action={endAction}>
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
                >
                  <Square className="h-4 w-4" />
                  End Session
                </button>
              </form>
            )}
            {isCompleted && typeof session.durationSeconds === "number" && session.durationSeconds > 0 && (
              <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">
                Duration: {formatDurationLabel(session.durationSeconds)}
              </span>
            )}
            <form action={deleteAction}>
              <button
                type="submit"
                title="Delete session"
                className="flex h-9 w-9 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="flex-1 space-y-8 p-6">
        {/* Session Remarks */}
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <Edit3 className="h-5 w-5 text-slate-500" />
            <h2 className="text-base font-bold text-slate-900">Session Notes</h2>
          </div>
          <form action={remarksAction}>
            <textarea
              name="remarks"
              rows={3}
              defaultValue={session.remarks ?? ""}
              placeholder="Add notes about this session..."
              className="w-full resize-y rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
            <div className="mt-2 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
              >
                <Save className="h-3.5 w-3.5" />
                Save Note
              </button>
            </div>
          </form>
        </section>

        {/* Attendance */}
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-emerald-600" />
            <h2 className="text-base font-bold text-slate-900">Attendance</h2>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">
              {session._count.attendance} students
            </span>
          </div>
          {session.attendance.length === 0 ? (
            <p className="text-center text-sm text-slate-400 py-4">No attendance records yet.</p>
          ) : (
            <div className="space-y-2">
              {session.attendance.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center gap-4 rounded-lg border border-slate-100 bg-slate-50 p-3"
                >
                  <div className="flex min-w-0 flex-1">
                    <span className="text-sm font-medium text-slate-900">
                      {record.student.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 text-xs text-slate-600">
                      <input
                        type="checkbox"
                        checked={record.attended}
                        disabled
                        className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      Attended
                    </label>
                    <span className="max-w-[200px] truncate text-xs text-slate-500">
                      {record.remarks ?? ""}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Submissions / Quiz Results */}
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <FileQuestion className="h-5 w-5 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-900">Quiz Submissions</h2>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">
              {session._count.submissions}
            </span>
          </div>
          {session.submissions.length === 0 ? (
            <p className="text-center text-sm text-slate-400 py-4">No quiz submissions yet.</p>
          ) : (
            <div className="space-y-2">
              {session.submissions.map((sub) => {
                const pct = sub.totalQuestions > 0 ? Math.round((sub.score / sub.totalQuestions) * 100) : 0;
                return (
                  <Link
                    key={sub.id}
                    href={`/dashboard/courses/${courseId}/results?sid=${sub.id}`}
                    className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-3 hover:bg-slate-100"
                  >
                    <span className="text-sm font-medium text-slate-900">{sub.student.name}</span>
                    <span className={`text-xs font-bold ${pct >= 60 ? "text-emerald-600" : "text-red-600"}`}>
                      {sub.score}/{sub.totalQuestions} ({pct}%)
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}