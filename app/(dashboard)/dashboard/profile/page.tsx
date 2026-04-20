import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { NicheDashboardPage } from "../_components/niche-dashboard-page";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <NicheDashboardPage
      eyebrow="Personal workspace"
      title="Profile"
      description="Review your role, account identity, and platform access details for the cyber4every1 workspace."
      stats={[
        { label: "Current Role", value: String(session.user.role ?? "GUEST").replaceAll("_", " "), note: "Your role shapes which dashboard tools and views are available." },
        { label: "Display Name", value: session.user.name ?? "Not set", note: "This name appears across the platform workspace." },
        { label: "Email Status", value: session.user.email ? "Connected" : "Missing", note: "Account email is used for notices, support, and access recovery." },
        { label: "Workspace State", value: "Active", note: "Your account is currently signed in and able to access the dashboard." },
      ]}
      actions={[
        { label: "Open help center", href: "/dashboard/help" },
        { label: "Open messages", href: "/dashboard/messages" },
      ]}
      feed={[
        { title: "Workspace identity synced", detail: "Your role-aware dashboard configuration loaded successfully.", time: "Now" },
        { title: "Account channel ready", detail: "Support and notification pathways are available from this profile context.", time: "Today" },
      ]}
      highlights={[
        { title: "Identity visibility", detail: "Keep the account details clear so communication and access stay reliable.", meta: "Account" },
        { title: "Role context", detail: "Your workspace experience changes depending on whether you are staff, instructor, learner, or parent.", meta: "Access" },
        { title: "Support linkage", detail: "Profile details help the team route requests and platform help more accurately.", meta: "Support" },
        { title: "Platform trust", detail: "A clean account state makes it easier to manage certificates, billing, and communication.", meta: "Readiness" },
      ]}
    />
  );
}
