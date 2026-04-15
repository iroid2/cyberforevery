import { auth } from "@/auth";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  // Construct user object safely with fallbacks
  const user = {
    name: session.user?.name || "Member",
    email: session.user?.email || "",
    avatar: session.user?.image || "",
    role: (session.user as any)?.role || "GUEST",
  };

  return (
    <div className="[font-family:Arial,sans-serif]">
      <SidebarProvider>
        <AppSidebar user={user} />
        <SidebarInset>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
