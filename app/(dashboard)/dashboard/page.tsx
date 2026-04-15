import { auth } from "@/auth"
import Link from "next/link"
import { redirect } from "next/navigation"
import { getRoutesByRole, UserRoleType } from "@/lib/config/routes"

export default async function Page() {
  const session = await auth();
  
  if (!session) {
    redirect("/login");
  }

  const role = (session.user as any)?.role as UserRoleType || UserRoleType.GUEST;
  const availableRoutes = getRoutesByRole(role).filter((route) => route.href !== "/dashboard");
  const roleHome = getRoleHome(role);
  const summaryCards = getSummaryCards(role);
  const recentActivity = getRecentActivity(role);
  const quickStats = getQuickStats(role);

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b">
        <div className="flex items-center gap-2 px-4">
          <h1 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">// DASHBOARD_OVERVIEW</h1>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-6 p-8">
        <div className="max-w-4xl">
          <h2 className="text-4xl font-headline font-black uppercase tracking-tighter mb-2">
            WELCOME BACK, {session?.user?.name || "ENVOY"}
          </h2>
          <p className="text-muted-foreground font-headline text-sm tracking-widest uppercase">
            ROLE_PROFILE: <span className="text-primary">{role}</span> // SYSTEM_STATUS: OPERATIONAL
          </p>
        </div>

        <div className="rounded-xl border border-border bg-surface/40 p-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted mb-3">
            PRIMARY_MISSION
          </p>
          <h3 className="text-2xl font-headline font-black uppercase tracking-tight">
            {roleHome.title}
          </h3>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            {roleHome.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={roleHome.href}
              className="rounded-full bg-primary px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-primary-foreground transition hover:opacity-90"
            >
              Open Primary Workspace
            </Link>
            <Link
              href="/dashboard/help"
              className="rounded-full border border-border px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-foreground transition hover:border-primary hover:text-primary"
            >
              Help Center
            </Link>
          </div>
        </div>

        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          {summaryCards.map((card) => (
            <div key={card.label} className="rounded-xl bg-surface/50 border border-border p-6">
              <p className="text-[10px] text-muted uppercase tracking-[0.3em]">{card.label}</p>
              <p className="mt-4 text-3xl font-black uppercase tracking-tight text-primary">
                {card.value}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                {card.note}
              </p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-xl border border-border border-dashed bg-surface/30 p-8">
            <div className="mb-6">
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted">
                ROLE_WORKSPACES
              </p>
              <h3 className="mt-2 text-xl font-black uppercase tracking-tight">
                Modules available to your account
              </h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {availableRoutes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className="rounded-xl border border-border bg-background/40 p-5 transition hover:border-primary hover:bg-primary/5"
                >
                  <p className="text-[10px] uppercase tracking-[0.3em] text-muted">
                    {route.group || "Navigation"}
                  </p>
                  <h4 className="mt-3 text-lg font-black uppercase tracking-tight">
                    {route.title}
                  </h4>
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-primary">
                    {route.href}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-surface/40 p-6">
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted">
                STARTER_DATA
              </p>
              <h3 className="mt-2 text-xl font-black uppercase tracking-tight">
                Quick stats
              </h3>
              <div className="mt-5 space-y-4">
                {quickStats.map((item) => (
                  <div key={item.label} className="rounded-lg border border-border bg-background/40 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-bold uppercase tracking-wide">{item.label}</span>
                      <span className="text-lg font-black text-primary">{item.value}</span>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-surface/40 p-6">
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted">
                RECENT_ACTIVITY
              </p>
              <h3 className="mt-2 text-xl font-black uppercase tracking-tight">
                Latest updates
              </h3>
              <div className="mt-5 space-y-3">
                {recentActivity.map((item) => (
                  <div key={item.title} className="rounded-lg border border-border bg-background/40 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-bold uppercase tracking-wide">{item.title}</p>
                      <span className="text-[10px] uppercase tracking-[0.3em] text-primary">{item.time}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface/20 p-8">
          <div className="mb-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted">
              SYSTEM_FEED
            </p>
            <h3 className="mt-2 text-xl font-black uppercase tracking-tight">
              Dashboard starter panel
            </h3>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-background/40 p-5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted">ACCESS_LEVEL</p>
              <p className="mt-3 text-2xl font-black uppercase tracking-tight text-primary">
                {role.replaceAll("_", " ")}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-background/40 p-5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted">AVAILABLE_MODULES</p>
              <p className="mt-3 text-2xl font-black uppercase tracking-tight">
                {availableRoutes.length}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-background/40 p-5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted">SESSION_USER</p>
              <p className="mt-3 text-sm font-bold uppercase tracking-wide">
                {session.user?.email || "NO_EMAIL"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function getSummaryCards(role: UserRoleType) {
  switch (role) {
    case UserRoleType.SUPER_ADMIN:
      return [
        { label: "Active Users", value: "248", note: "Dummy count for platform-wide active accounts." },
        { label: "Monthly Revenue", value: "$12.4K", note: "Starter revenue snapshot for the admin dashboard." },
        { label: "Open Tickets", value: "17", note: "Sample unresolved issues waiting for review." },
      ];
    case UserRoleType.INSTRUCTOR:
      return [
        { label: "Assigned Students", value: "64", note: "Dummy roster size across your current teaching groups." },
        { label: "Classes Today", value: "5", note: "Planned live sessions visible in your starter calendar." },
        { label: "Pending Grades", value: "12", note: "Assignments that still need scoring or comments." },
      ];
    case UserRoleType.ADMIN_STAFF:
      return [
        { label: "Open Enrollments", value: "31", note: "Sample incoming enrollment requests for review." },
        { label: "Active Cohorts", value: "8", note: "Dummy cohort count currently marked as running." },
        { label: "Pending Payments", value: "14", note: "Starter billing follow-ups for the operations team." },
      ];
    case UserRoleType.STUDENT:
      return [
        { label: "Lessons This Week", value: "6", note: "Dummy learning sessions scheduled this week." },
        { label: "Assignments Due", value: "4", note: "Practice tasks still waiting for submission." },
        { label: "Progress Score", value: "82%", note: "Starter completion metric for your learner view." },
      ];
    case UserRoleType.PARENT:
      return [
        { label: "Children Enrolled", value: "2", note: "Sample number of students linked to this account." },
        { label: "Upcoming Sessions", value: "7", note: "Dummy family schedule items for the current week." },
        { label: "Outstanding Balance", value: "$398", note: "Starter billing total waiting for payment." },
      ];
    default:
      return [
        { label: "Access Level", value: "Guest", note: "Starter guest access for browsing available modules." },
        { label: "Enabled Modules", value: "2", note: "Dummy count of areas available to this account." },
        { label: "Support Items", value: "3", note: "Sample onboarding tasks before full access is granted." },
      ];
  }
}

function getQuickStats(role: UserRoleType) {
  switch (role) {
    case UserRoleType.SUPER_ADMIN:
      return [
        { label: "New accounts", value: "19", note: "Created in the last 7 days." },
        { label: "Course completions", value: "42", note: "Dummy completions recorded this month." },
        { label: "Refund requests", value: "3", note: "Items flagged for finance follow-up." },
      ];
    case UserRoleType.INSTRUCTOR:
      return [
        { label: "Attendance rate", value: "94%", note: "Sample learner attendance trend." },
        { label: "Live labs", value: "3", note: "Hands-on labs scheduled this week." },
        { label: "Messages", value: "9", note: "Unread student and parent messages." },
      ];
    case UserRoleType.ADMIN_STAFF:
      return [
        { label: "Admissions calls", value: "11", note: "Planned outreach items for today." },
        { label: "Seats remaining", value: "26", note: "Open spaces across active cohorts." },
        { label: "Documents pending", value: "7", note: "Enrollment records missing approval." },
      ];
    case UserRoleType.STUDENT:
      return [
        { label: "Streak", value: "9 days", note: "Dummy learning streak for motivation." },
        { label: "Quiz average", value: "88%", note: "Starter performance indicator." },
        { label: "Badges earned", value: "5", note: "Sample achievements unlocked so far." },
      ];
    case UserRoleType.PARENT:
      return [
        { label: "Attendance this month", value: "96%", note: "Dummy family learner attendance record." },
        { label: "Invoices due", value: "1", note: "One sample billing item needs action." },
        { label: "Messages from staff", value: "4", note: "Unread communication waiting in the portal." },
      ];
    default:
      return [
        { label: "Profile status", value: "Starter", note: "Account is using default dashboard data." },
        { label: "Help articles", value: "12", note: "Suggested onboarding guides." },
        { label: "Open actions", value: "2", note: "Sample next steps to finish setup." },
      ];
  }
}

function getRecentActivity(role: UserRoleType) {
  switch (role) {
    case UserRoleType.SUPER_ADMIN:
      return [
        { title: "New cohort approved", detail: "Bootcamp Cohort 04 was approved for the next intake cycle.", time: "10m ago" },
        { title: "Revenue report synced", detail: "Finance summary was refreshed with this week's sample totals.", time: "45m ago" },
        { title: "User role updated", detail: "A staff account was promoted to administrative access.", time: "2h ago" },
      ];
    case UserRoleType.INSTRUCTOR:
      return [
        { title: "Attendance submitted", detail: "You marked today's morning class attendance successfully.", time: "12m ago" },
        { title: "Assignment uploaded", detail: "A new network defense worksheet was added for learners.", time: "1h ago" },
        { title: "Parent message received", detail: "One guardian asked for a progress update before Friday.", time: "3h ago" },
      ];
    case UserRoleType.ADMIN_STAFF:
      return [
        { title: "Enrollment reviewed", detail: "A pending learner application was marked ready for approval.", time: "18m ago" },
        { title: "Seat allocation updated", detail: "Operations increased capacity for the weekend cohort.", time: "1h ago" },
        { title: "Invoice reminder sent", detail: "A payment reminder was sent to three pending accounts.", time: "4h ago" },
      ];
    case UserRoleType.STUDENT:
      return [
        { title: "Quiz completed", detail: "You finished the phishing awareness quiz with a strong score.", time: "20m ago" },
        { title: "Lab unlocked", detail: "A new password security lab is ready in your learning track.", time: "2h ago" },
        { title: "Mentor feedback posted", detail: "Your instructor left notes on the latest assignment.", time: "5h ago" },
      ];
    case UserRoleType.PARENT:
      return [
        { title: "Session reminder posted", detail: "Your learner has a scheduled class tomorrow morning.", time: "25m ago" },
        { title: "Payment reminder generated", detail: "A sample invoice reminder was added to your account.", time: "2h ago" },
        { title: "Progress note shared", detail: "Staff posted an encouraging update on weekly performance.", time: "6h ago" },
      ];
    default:
      return [
        { title: "Welcome flow started", detail: "Your dashboard is showing starter content while setup is in progress.", time: "Just now" },
        { title: "Support guide recommended", detail: "The help center highlighted first steps for new users.", time: "1h ago" },
        { title: "Access review pending", detail: "Full role assignment is still waiting for confirmation.", time: "3h ago" },
      ];
  }
}

function getRoleHome(role: UserRoleType) {
  switch (role) {
    case UserRoleType.SUPER_ADMIN:
      return {
        title: "System oversight and platform control",
        description: "Monitor users, revenue, operations, and system-wide administration from a single command layer.",
        href: "/dashboard/admin/users",
      };
    case UserRoleType.INSTRUCTOR:
      return {
        title: "Classroom operations and learner tracking",
        description: "Jump into your roster, manage attendance, and review learner progress from your teaching workspace.",
        href: "/dashboard/instructor/roster",
      };
    case UserRoleType.ADMIN_STAFF:
      return {
        title: "Enrollment and cohort coordination",
        description: "Manage cohorts, review enrollments, and keep bootcamp operations moving smoothly.",
        href: "/dashboard/bootcamp/cohorts",
      };
    case UserRoleType.STUDENT:
      return {
        title: "Learning schedule and mission progress",
        description: "Access your upcoming sessions, assignments, and progress checkpoints from one learner dashboard.",
        href: "/dashboard/student/schedule",
      };
    case UserRoleType.PARENT:
      return {
        title: "Family schedule and payment tracking",
        description: "View student schedules, enrollment status, and billing actions from your parent portal.",
        href: "/dashboard/student/schedule",
      };
    default:
      return {
        title: "Platform overview and support entry point",
        description: "Browse your available tools, review your access level, and start from the module that matches your goal.",
        href: "/dashboard/help",
      };
  }
}
