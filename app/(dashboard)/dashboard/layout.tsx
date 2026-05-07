import type { ReactNode } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SidebarNav } from "./components/sidebar-nav";

export default async function DashboardRouteLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = {
    name: session.user.name ?? "User",
    email: session.user.email ?? "",
    role: (session.user as { role?: string }).role ?? "TUTOR",
    image: session.user.image ?? null,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <SidebarNav user={user} />
      <main className="min-h-screen pl-[280px]">{children}</main>
    </div>
  );
}
