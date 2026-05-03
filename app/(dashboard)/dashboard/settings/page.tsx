import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Settings, Globe, Shield } from "lucide-react";

export default async function SettingsPage() {
  const session = await auth();
  const role = String((session?.user as { role?: string })?.role ?? "").toUpperCase();
  if (role !== "ADMIN" && role !== "SUPER_ADMIN") redirect("/dashboard");

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">Platform Settings</h1>
        <p className="text-sm text-slate-500">Admin configuration</p>
      </header>

      <div className="flex-1 p-6 space-y-6 max-w-2xl">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <Globe className="h-5 w-5 text-emerald-600" />
            <h2 className="font-semibold text-slate-900">General</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Platform Name
              </label>
              <input
                type="text"
                defaultValue="CyberForEvery1"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Student Join URL
              </label>
              <div className="flex items-center rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5">
                <span className="text-sm text-slate-400">your-domain.com</span>
                <span className="text-sm font-semibold text-slate-700">/attend</span>
              </div>
            </div>
          </div>
          <button className="mt-5 rounded-lg bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors">
            Save Changes
          </button>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <Shield className="h-5 w-5 text-indigo-600" />
            <h2 className="font-semibold text-slate-900">Access Control</h2>
          </div>
          <div className="space-y-3">
            {[
              { label: "Allow students to join without a code", enabled: true },
              { label: "Show correct answers after quiz submission", enabled: true },
              { label: "Allow multiple quiz attempts", enabled: false },
            ].map(({ label, enabled }) => (
              <label key={label} className="flex items-center justify-between rounded-lg border border-slate-200 p-4 cursor-pointer hover:bg-slate-50 transition-colors">
                <span className="text-sm text-slate-700">{label}</span>
                <div className={`relative h-5 w-9 rounded-full transition-colors ${enabled ? "bg-emerald-600" : "bg-slate-300"}`}>
                  <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${enabled ? "translate-x-4" : "translate-x-0.5"}`} />
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
