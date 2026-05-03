"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, GraduationCap } from "lucide-react";
import { getRoutesByGroup, UserRoleType } from "@/config/protected-routes";
import { logoutUser } from "@/app/actions";

interface User {
  name: string;
  email: string;
  role: string;
  image?: string | null;
}

function getInitials(name: string): string {
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function resolveRole(role: string): UserRoleType {
  const upper = role.toUpperCase();
  if (upper === "ADMIN" || upper === "SUPER_ADMIN") return UserRoleType.ADMIN;
  return UserRoleType.TUTOR;
}

function RoleBadge({ role }: { role: string }) {
  const upper = role.toUpperCase();
  const isAdmin = upper === "ADMIN" || upper === "SUPER_ADMIN";
  return (
    <span
      className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
        isAdmin
          ? "bg-indigo-100 text-indigo-700"
          : "bg-emerald-100 text-emerald-700"
      }`}
    >
      {isAdmin ? "Admin" : "Tutor"}
    </span>
  );
}

export function SidebarNav({ user }: { user: User }) {
  const pathname = usePathname();
  const userRole = resolveRole(user.role);
  const groups = getRoutesByGroup(userRole);

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-[280px] flex-col border-r border-slate-200 bg-white">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-4 flex-shrink-0">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-emerald-600">
          <GraduationCap className="h-5 w-5 text-white" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-slate-900 leading-tight">CyberForEvery1</p>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest">Tutor Portal</p>
        </div>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {Array.from(groups.entries()).map(([groupName, groupRoutes]) => (
          <div key={groupName}>
            <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
              {groupName}
            </p>
            <div className="space-y-0.5">
              {groupRoutes.map((route) => {
                const Icon = route.icon;
                const isActive =
                  pathname === route.href ||
                  (route.href !== "/dashboard" && pathname.startsWith(route.href));

                return (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={`flex items-center justify-between rounded-md px-3 py-2.5 text-sm transition-colors ${
                      isActive
                        ? "bg-emerald-50 text-emerald-700 font-medium"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <span className="flex items-center gap-3 min-w-0">
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="truncate">{route.title}</span>
                    </span>
                    {route.isNew && (
                      <span className="ml-2 shrink-0 rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700 uppercase tracking-wide">
                        New
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="border-t border-slate-200 p-3 flex-shrink-0">
        <div className="flex items-center gap-3 rounded-lg bg-slate-50 px-3 py-3">
          {/* Avatar */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name}
                className="h-9 w-9 rounded-full object-cover"
              />
            ) : (
              getInitials(user.name)
            )}
          </div>

          {/* Name + email + role */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">{user.name}</p>
              <RoleBadge role={user.role} />
            </div>
            <p className="truncate text-xs text-slate-500">{user.email}</p>
          </div>

          {/* Logout */}
          <form action={logoutUser}>
            <button
              type="submit"
              title="Log out"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
