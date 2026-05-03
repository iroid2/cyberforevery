"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check } from "lucide-react";
import { UpgradeCard } from "./upgrade-card";
import { navConfig } from "../utils/nav-config";

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-[320px] shrink-0 flex-col border-r border-slate-200 bg-white md:flex">
      <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-emerald-600">
          <Check className="h-5 w-5 text-white" />
        </div>
        <span className="text-base font-bold text-slate-900">Oripio</span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {navConfig.map((group) => (
          <div key={group.label} className="mb-6">
            <div className="px-3 py-2 text-xs font-semibold tracking-widest text-slate-400">
              {group.label}
            </div>
            <div className="space-y-1.5">
              {group.items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={[
                      "flex items-center justify-between rounded-md px-3 py-2.5 transition-colors",
                      isActive
                        ? "bg-slate-100 text-slate-900 font-medium"
                        : item.isDangerous
                          ? "text-red-600 hover:bg-red-50 hover:text-red-700"
                          : "text-slate-700 hover:bg-slate-100",
                    ].join(" ")}
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <Icon className="h-5 w-5 shrink-0" />
                      <span className="truncate text-sm font-medium">{item.label}</span>
                    </span>
                    {item.badge ? (
                      <span className="ml-2 inline-flex shrink-0 items-center justify-center rounded-md bg-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-700">
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-slate-200 p-3">
        <UpgradeCard
          title="Upgrade Pro!"
          description="Higher productivity with better organization"
          buttonText="Upgrade"
          className="!bg-emerald-50 !border-emerald-200"
        />
      </div>
    </aside>
  );
}
