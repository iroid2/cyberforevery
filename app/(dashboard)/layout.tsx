import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <SidebarProvider>
      <AppSidebar
        user={{
          name: session.user.name ?? "cyber4every1 user",
          email: session.user.email ?? "workspace@cyber4every1.com",
          avatar: session.user.image ?? undefined,
          role: (session.user.role as any) ?? "GUEST",
        }}
      />
      <SidebarInset className="min-h-svh bg-background">
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
