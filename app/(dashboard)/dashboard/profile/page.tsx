import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { updateProfile } from "@/app/actions/user";
import { UserCog } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const name = session.user.name ?? "";
  const email = session.user.email ?? "";

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <UserCog className="h-5 w-5 text-slate-400" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">My Profile</h1>
            <p className="text-sm text-slate-500">Update your display name</p>
          </div>
        </div>
      </header>

      <div className="flex-1 p-6">
        <div className="mx-auto max-w-md">
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-4">
              <h2 className="font-semibold text-slate-900">Account Details</h2>
            </div>

            <div className="p-6 space-y-5">
              {/* Avatar */}
              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-2xl font-bold text-white">
                  {name ? name.charAt(0).toUpperCase() : "U"}
                </div>
              </div>

              {/* Email (read-only) */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Email
                </label>
                <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-500">
                  {email || "—"}
                </div>
              </div>

              {/* Name form */}
              <form action={updateProfile} className="space-y-5">
                <div className="space-y-1.5">
                  <label
                    htmlFor="name"
                    className="block text-xs font-semibold uppercase tracking-widest text-slate-400"
                  >
                    Display Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    defaultValue={name}
                    required
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    placeholder="Your full name"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
