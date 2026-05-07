import { redirect } from "next/navigation";
import { createSessionInstance } from "@/app/actions/sessions";

export const dynamic = "force-dynamic";

export default async function NewSessionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center gap-4 min-w-0">
          <a
            href={`/dashboard/courses/${id}`}
            className="flex shrink-0 items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-700"
          >
            ← Back to Course
          </a>
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-slate-900">Create New Session</h1>
          </div>
        </div>
      </header>

      <div className="flex-1 p-6">
        <div className="mx-auto max-w-lg rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <form action={createSessionInstance.bind(null, id)} className="space-y-6">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">
                Session Date
              </label>
              <input
                type="date"
                name="date"
                required
                defaultValue={new Date().toISOString().split("T")[0]}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
              <p className="mt-1 text-xs text-slate-400">Choose the date this session will be held.</p>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">
                Session Notes (optional)
              </label>
              <textarea
                name="remarks"
                rows={4}
                placeholder="Add any notes for this session..."
                className="w-full resize-y rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
              >
                Create Session
              </button>
              <a
                href={`/dashboard/courses/${id}`}
                className="inline-flex items-center rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
