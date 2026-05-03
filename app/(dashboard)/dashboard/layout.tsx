import type { ComponentType, ReactNode } from "react";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { logoutUser } from "@/app/actions";
import {
  BookOpen,
  CalendarDays,
  GraduationCap,
  LayoutDashboard,
  LifeBuoy,
  Users,
  Settings,
  Bell,
} from "lucide-react";

type DashboardUser = {
  name: string;
  email: string;
  role: string;
  image?: string | null;
};

const adminLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/courses/new", label: "Create Course", icon: BookOpen },
  { href: "/dashboard/sessions", label: "Sessions", icon: CalendarDays },
  { href: "/dashboard/attendance", label: "Attendance", icon: Users },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

const tutorLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/courses/new", label: "Create Course", icon: BookOpen },
  { href: "/dashboard/sessions", label: "Sessions", icon: CalendarDays },
  { href: "/dashboard/attendance", label: "Attendance", icon: Users },
];

function isAdmin(role: string) {
  const upper = role.toUpperCase();
  return upper === "ADMIN" || upper === "SUPER_ADMIN";
}

function Initials({ name }: { name: string }) {
  const parts = name.split(" ").filter(Boolean);
  const value =
    parts.length >= 2
      ? `${parts[0][0]}${parts[parts.length - 1][0]}`
      : name.slice(0, 2);
  return <span>{value.toUpperCase()}</span>;
}

function SidebarLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span>{label}</span>
    </Link>
  );
}

export default async function DashboardRouteLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user: DashboardUser = {
    name: session.user.name ?? "User",
    email: session.user.email ?? "",
    role: (session.user as { role?: string }).role ?? "TUTOR",
    image: session.user.image ?? null,
  };

  const links = isAdmin(user.role) ? adminLinks : tutorLinks;

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 z-30 flex w-[280px] flex-col border-r border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-white">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">cyber4every1</p>
            <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">
              Tutor Portal
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-5">
          <div className="mb-5">
            <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Main Menu
            </p>
            <div className="space-y-1">
              {links.map((link) => (
                <SidebarLink key={link.href} {...link} />
              ))}
            </div>
          </div>

          <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
            <div className="mb-2 flex items-center gap-2 text-emerald-700">
              <Bell className="h-4 w-4" />
              <p className="text-xs font-semibold uppercase tracking-[0.16em]">
                Live Activity
              </p>
            </div>
            <p className="text-sm font-semibold text-slate-900">
              Student joins, uploads, and submissions will show here.
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-600">
              Keep an eye on who joined a session, who uploaded a lesson, and
              who completed the quiz.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Quick Stats
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-white p-3">
                <p className="text-xs text-slate-400">Students</p>
                <p className="mt-1 font-bold text-slate-900">Live</p>
              </div>
              <div className="rounded-xl bg-white p-3">
                <p className="text-xs text-slate-400">Submits</p>
                <p className="mt-1 font-bold text-slate-900">Auto-grade</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 p-4">
          <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-3 py-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <Initials name={user.name} />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {user.name}
                </p>
                <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
                  {isAdmin(user.role) ? "Admin" : "Tutor"}
                </span>
              </div>
              <p className="truncate text-xs text-slate-500">{user.email}</p>
            </div>
            <form action={logoutUser}>
              <button
                type="submit"
                title="Log out"
                className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
              >
                <LifeBuoy className="h-4 w-4 rotate-45" />
              </button>
            </form>
          </div>
        </div>
      </aside>

      <main className="min-h-screen pl-[280px]">{children}</main>
    </div>
  );
}
