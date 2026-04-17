import Link from "next/link";
import { auth } from "@/auth";
import {
  HighlightCards,
  InsightPanels,
  RichTableCard,
  SettingsPanel,
} from "@/components/dashboard/dashboard-content-blocks";
import { DashboardPageShell, DashboardSection } from "@/components/dashboard/dashboard-page-shell";
import { getRoutesByRole, normalizeUserRole, UserRoleType } from "@/lib/config/routes";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const role = normalizeUserRole((session.user as { role?: string } | undefined)?.role);
  const availableRoutes = getRoutesByRole(role).filter((route) => route.href !== "/dashboard");
  const roleHome = getRoleHome(role);
  const summaryCards = getSummaryCards(role);
  const recentActivity = getRecentActivity(role);
  const quickStats = getQuickStats(role);

  return (
    <DashboardPageShell
      eyebrow="Overview"
      title={`Welcome back, ${session.user?.name || "Member"}`}
      description={roleHome.description}
      stats={summaryCards.map((card) => ({
        label: card.label,
        value: card.value,
        note: card.note,
      }))}
      actions={[
        { label: "Open primary workspace", href: roleHome.href },
        { label: "Help center", href: "/dashboard/help" },
      ]}
      feed={recentActivity}
    >
      <DashboardSection
        title="Workspace overview"
        description="This landing page now uses the same shared dashboard system as the rest of the platform, so every role starts from a consistent command center."
      >
        <div className="space-y-6">
          <HighlightCards
            items={[
              { label: "Role", value: role.replaceAll("_", " "), detail: "Current access level attached to this signed-in account.", tone: "indigo" },
              { label: "Modules", value: String(availableRoutes.length), detail: "Role-aware workspaces currently available in the sidebar and dashboard.", tone: "emerald" },
              { label: "Primary focus", value: roleHome.title, detail: "The main mission this dashboard highlights first for the current role.", tone: "amber" },
              { label: "Session", value: session.user?.email || "No email", detail: "The active account identity connected to this dashboard session.", tone: "slate" },
            ]}
          />

          <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
            <RichTableCard
              title="Available workspaces"
              description="Every dashboard module visible to this role, grouped by the platform navigation model."
              columns={[
                { key: "workspace", label: "Workspace" },
                { key: "group", label: "Group" },
                { key: "path", label: "Path" },
                { key: "status", label: "Status" },
              ]}
              rows={availableRoutes.map((route) => ({
                workspace: route.title,
                group: route.group || "Overview",
                path: route.href,
                status: "status:Active",
              }))}
            />

            <SettingsPanel
              title="Dashboard system"
              description="This overview is now aligned with the same shell and navigation behavior used by the rest of the app."
              items={[
                { label: "Shared shell", value: "Overview now uses the same dashboard frame as enrollments, billing, attendance, and progress.", enabled: true },
                { label: "Role-aware routes", value: "Sidebar items are generated from the protected route map for the current session role.", enabled: true },
                { label: "Seed-backed direction", value: "The dashboard structure is designed to fit your seeded learner lifecycle data as pages go live.", enabled: true },
                { label: "Legacy homepage layout", value: "The older mixed super-admin-only dashboard surface has been retired from this route.", enabled: false },
              ]}
            />
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[1.5rem] border border-border/70 bg-card p-6 shadow-sm">
              <div className="mb-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  Primary mission
                </p>
                <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground">
                  {roleHome.title}
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                  {roleHome.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={roleHome.href}
                  className="inline-flex rounded-full bg-primary px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground transition hover:opacity-90"
                >
                  Open primary workspace
                </Link>
                <Link
                  href="/dashboard/profile"
                  className="inline-flex rounded-full border border-border px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-foreground transition hover:border-primary hover:text-primary"
                >
                  Review profile
                </Link>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-border/70 bg-card p-6 shadow-sm">
              <div className="mb-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  Quick stats
                </p>
                <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground">
                  Current signals
                </h3>
              </div>
              <div className="space-y-4">
                {quickStats.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-border/70 bg-muted/40 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-semibold text-foreground">{item.label}</span>
                      <span className="text-lg font-extrabold text-primary">{item.value}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <InsightPanels
            title="Dashboard insights"
            items={[
              {
                title: "The overview now matches the rest of the app",
                subtitle: "Instead of a separate special-case homepage, this route now shares the same dashboard grammar as the live role pages.",
                meta: "Consistency",
                tone: "emerald",
              },
              {
                title: "Sidebar grouping is cleaner",
                subtitle: "The dashboard route now lives under an Overview group, which removes the awkward Other section from the nav.",
                meta: "Navigation",
                tone: "indigo",
              },
              {
                title: "This page is ready to become more data-driven",
                subtitle: "As more services go live, the overview can surface role-specific summaries without needing another layout rewrite.",
                meta: "Next",
                tone: "amber",
              },
            ]}
          />
        </div>
      </DashboardSection>
    </DashboardPageShell>
  );
}

function getSummaryCards(role: UserRoleType) {
  switch (role) {
    case UserRoleType.SUPER_ADMIN:
      return [
        { label: "Platform reach", value: "248", note: "Visible active accounts seeded across admin, staff, parent, and learner roles." },
        { label: "Finance pulse", value: "$12.4K", note: "Starter finance snapshot representing successful recorded payments." },
        { label: "Completion lane", value: "06", note: "Learner lifecycle states currently represented in the seeded platform dataset." },
        { label: "Certificates", value: "01", note: "Issued and verifiable certificate records already present in the system." },
      ];
    case UserRoleType.INSTRUCTOR:
      return [
        { label: "Assigned learners", value: "03", note: "Seeded learners visible through the current instructor-linked cohort set." },
        { label: "Tracked sessions", value: "05", note: "Attendance-aware sessions connected to the active classroom workflow." },
        { label: "Review queue", value: "03", note: "Submissions and learner progress signals that still need instructor attention." },
        { label: "Certificates", value: "01", note: "Completion outcomes instructors can already verify from the dashboard." },
      ];
    case UserRoleType.ADMIN_STAFF:
      return [
        { label: "Enrollment queue", value: "06", note: "Learner lifecycle scenarios visible in the admissions and onboarding flow." },
        { label: "Cohort ops", value: "03", note: "Seeded cohorts supporting operations, scheduling, and completion tracking." },
        { label: "Needs follow-up", value: "03", note: "Applications blocked by onboarding, missing details, or payment state." },
        { label: "Issued outcomes", value: "01", note: "Certificates already generated from completed enrollments." },
      ];
    case UserRoleType.STUDENT:
      return [
        { label: "Assignments", value: "02", note: "Published tasks currently visible to learner accounts with active submissions." },
        { label: "Progress", value: "82%", note: "Sample learner progress across submissions, attendance, and review state." },
        { label: "Certificates", value: "01", note: "Completion records appear here once the learner reaches certificate stage." },
        { label: "Support path", value: "Live", note: "Assignments, progress, and certificate routes are now connected in one learner flow." },
      ];
    case UserRoleType.PARENT:
      return [
        { label: "Linked learners", value: "02", note: "Guardian accounts can see progress and billing for connected students." },
        { label: "Billing view", value: "Live", note: "Payment state now reflects real enrollment and payment records." },
        { label: "Progress path", value: "Live", note: "Parent progress pages now consume assignment and attendance data." },
        { label: "Certificates", value: "01", note: "Families can now view and verify issued completion records." },
      ];
    default:
      return [
        { label: "Access level", value: "Guest", note: "Guest-level fallback access for users without a mapped dashboard role." },
        { label: "Available tools", value: "02", note: "Starter routes available to support setup and onboarding." },
        { label: "Status", value: "Pending", note: "This account still needs a fuller dashboard role assignment." },
        { label: "Help path", value: "Open", note: "Support and profile routes remain available while access is limited." },
      ];
  }
}

function getQuickStats(role: UserRoleType) {
  switch (role) {
    case UserRoleType.SUPER_ADMIN:
      return [
        { label: "Live services", value: "6", note: "Enrollments, roster, attendance, billing, progress, and certificates are now wired." },
        { label: "Seed scenarios", value: "6", note: "Pending, onboarding, active, at-risk, completion-ready, and certified learner paths." },
        { label: "Core shell", value: "Unified", note: "The overview page now shares the same dashboard shell as the rest of the app." },
      ];
    case UserRoleType.INSTRUCTOR:
      return [
        { label: "Roster", value: "Connected", note: "Instructor cohorts now feed into live roster and attendance views." },
        { label: "Grade flow", value: "Live", note: "Assignments and submission review continue to feed learner progress." },
        { label: "Issuance queue", value: "Ready", note: "Eligible learners can now be promoted to certificate status from the dashboard." },
      ];
    case UserRoleType.ADMIN_STAFF:
      return [
        { label: "Admissions", value: "Connected", note: "Enrollment status, onboarding state, and payment readiness are visible together." },
        { label: "Lifecycle", value: "Tracked", note: "Operations can now see learners from intake to completion outcomes." },
        { label: "Certificates", value: "Visible", note: "Staff can now view and issue completion records where appropriate." },
      ];
    case UserRoleType.STUDENT:
      return [
        { label: "Uploads", value: "Live", note: "Assignment submissions are now connected to the learner workflow." },
        { label: "Progress", value: "Tracked", note: "Attendance and assignments now contribute to the progress surface." },
        { label: "Completion path", value: "Visible", note: "Certificates provide a clear end-state after successful course completion." },
      ];
    case UserRoleType.PARENT:
      return [
        { label: "Family view", value: "Connected", note: "Parents can now see billing, progress, and certificate outcomes together." },
        { label: "Payments", value: "Tracked", note: "Billing reflects real payment state tied to enrollments." },
        { label: "Outcomes", value: "Verifiable", note: "Completion records now extend into certificate verification pages." },
      ];
    default:
      return [
        { label: "Setup", value: "Starter", note: "This role still uses a simplified dashboard fallback." },
        { label: "Support", value: "Open", note: "Help and profile remain the main routes available here." },
        { label: "Status", value: "Safe", note: "The dashboard shell still renders even before a full role setup is applied." },
      ];
  }
}

function getRecentActivity(role: UserRoleType) {
  switch (role) {
    case UserRoleType.SUPER_ADMIN:
      return [
        { title: "Enrollment lifecycle expanded", detail: "Seeded learners now span onboarding, active, at-risk, completion-ready, and certified states.", time: "Today" },
        { title: "Certificates are live", detail: "Issued records now appear in dashboard views and public verification pages.", time: "Today" },
        { title: "Billing is connected", detail: "Dashboard billing now reflects persisted payment records rather than placeholders.", time: "Today" },
      ];
    case UserRoleType.INSTRUCTOR:
      return [
        { title: "Roster refreshed", detail: "Learners in your visible cohorts now appear through the live roster workflow.", time: "Today" },
        { title: "Attendance connected", detail: "Session attendance now contributes directly to learner monitoring.", time: "Today" },
        { title: "Certificate queue ready", detail: "Eligible completions can now be promoted to verified certificates.", time: "Today" },
      ];
    case UserRoleType.ADMIN_STAFF:
      return [
        { title: "Admissions desk connected", detail: "Enrollment review now reads from real onboarding and payment state.", time: "Today" },
        { title: "Lifecycle status visible", detail: "Operations can now tell who is pending, active, or certified from one flow.", time: "Today" },
        { title: "Certificates visible", detail: "Issued outcomes now appear in a shared dashboard archive.", time: "Today" },
      ];
    case UserRoleType.STUDENT:
      return [
        { title: "Assignments are live", detail: "Learner dashboards can now upload and track submissions against real assignments.", time: "Today" },
        { title: "Progress is connected", detail: "Attendance and assignment completion now power the learner progress view.", time: "Today" },
        { title: "Certificates are visible", detail: "Learners can now see issued completion records in the dashboard.", time: "Today" },
      ];
    case UserRoleType.PARENT:
      return [
        { title: "Family progress updated", detail: "Parent dashboards now read learner assignment and attendance progress.", time: "Today" },
        { title: "Billing view is live", detail: "Parents can now see payment state tied to their linked learner records.", time: "Today" },
        { title: "Certificates are shareable", detail: "Issued learner outcomes now have dashboard and public verification views.", time: "Today" },
      ];
    default:
      return [
        { title: "Dashboard shell ready", detail: "The overview route now uses the same shared dashboard system as the rest of the platform.", time: "Today" },
        { title: "Navigation grouped", detail: "Sidebar sections now use clearer route grouping and no longer fall into Other.", time: "Today" },
        { title: "Support routes available", detail: "Help and profile remain available while this account’s role is limited.", time: "Today" },
      ];
  }
}

function getRoleHome(role: UserRoleType) {
  switch (role) {
    case UserRoleType.SUPER_ADMIN:
      return {
        title: "System oversight and platform control",
        description: "Monitor users, finance, operations, lifecycle state, and outcome visibility from one command layer.",
        href: "/dashboard/enrollments",
      };
    case UserRoleType.INSTRUCTOR:
      return {
        title: "Classroom operations and learner tracking",
        description: "Jump into your roster, attendance, grading, and certificate readiness from the instructor workspace.",
        href: "/dashboard/roster",
      };
    case UserRoleType.ADMIN_STAFF:
      return {
        title: "Enrollment and cohort coordination",
        description: "Manage admissions, cohort operations, onboarding progress, and completion handoff from one place.",
        href: "/dashboard/enrollments",
      };
    case UserRoleType.STUDENT:
      return {
        title: "Learning schedule and mission progress",
        description: "Access your assignments, progress, schedule, and completion path from one learner dashboard.",
        href: "/dashboard/assignments",
      };
    case UserRoleType.PARENT:
      return {
        title: "Family schedule and learner support",
        description: "Track learner progress, payment state, and completion outcomes from the parent portal.",
        href: "/dashboard/progress",
      };
    default:
      return {
        title: "Platform overview and support entry point",
        description: "Browse your available tools, review your access level, and start from the module that matches your goal.",
        href: "/dashboard/help",
      };
  }
}
