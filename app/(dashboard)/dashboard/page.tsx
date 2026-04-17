import { auth } from "@/auth"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
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

  if (role === UserRoleType.SUPER_ADMIN) {
    return <SuperAdminDashboard session={session} availableRoutes={availableRoutes} />;
  }

  const roleHome = getRoleHome(role);
  const summaryCards = getSummaryCards(role);
  const recentActivity = getRecentActivity(role);
  const quickStats = getQuickStats(role);

  return (
    <>
      <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <h1 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">// DASHBOARD_OVERVIEW</h1>
        </div>
        <AnimatedThemeToggler className="rounded-full border border-border bg-background p-2 text-foreground transition hover:border-primary hover:text-primary" />
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

function SuperAdminDashboard({
  session,
  availableRoutes,
}: {
  session: {
    user?: {
      name?: string | null;
    } | null;
  };
  availableRoutes: ReturnType<typeof getRoutesByRole>;
}) {
  const userActivity = [
    { name: "Marcus Chen", email: "marcus.c@edu.com", role: "Student", cohort: "Spring 2024", status: "Active", initials: "MC" },
    { name: "Elena Rodriguez", email: "elena.r@staff.com", role: "Staff", cohort: "Editorial Dept.", status: "Active", initials: "ER" },
    { name: "Sarah Miller", email: "sarah@parent.net", role: "Parent", cohort: "-", status: "Pending", initials: "SM" },
  ];
  const activeCurations = [
    { title: "Advance Editorial", badge: "Cohort A-24", learners: "84 Students", progress: 68, stage: "Completion" },
    { title: "Strategic Curation", badge: "Cohort B-24", learners: "52 Students", progress: 45, stage: "Completion" },
    { title: "Network Intelligence", badge: "New", learners: "128 Pre-enrolled", progress: 92, stage: "Preparation" },
  ];

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e]">
      <header className="sticky top-0 z-20 border-b border-[#c6c5d4]/30 bg-white/85 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-8">
          <div className="flex items-center gap-8">
            <span className="text-xl font-extrabold text-[#1a237e]">Editorial Intelligence</span>
            <nav className="hidden md:flex gap-6 text-sm">
              <Link href="/dashboard" className="border-b-2 border-[#1a237e] pb-1 font-semibold text-[#1a237e]">Dashboard</Link>
              <Link href="/dashboard/user-management" className="font-medium text-slate-500 transition hover:text-[#1a237e]">User Management</Link>
              <Link href="/dashboard/cohorts" className="font-medium text-slate-500 transition hover:text-[#1a237e]">Cohorts</Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <AnimatedThemeToggler className="rounded-full border border-[#c6c5d4]/40 bg-white p-2 text-slate-600 transition hover:border-[#1a237e]/30 hover:text-[#1a237e]" />
            <button className="rounded-full p-2 text-slate-600 transition hover:bg-slate-100">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="rounded-full p-2 text-slate-600 transition hover:bg-slate-100">
              <span className="material-symbols-outlined">settings</span>
            </button>
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c6c5d4]/40 bg-[#eceef0] text-sm font-bold text-slate-700">
              {getInitials(session?.user?.name || "Admin")}
            </div>
          </div>
        </div>
      </header>

      <div className="px-8 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-[#191c1e]">Platform Intelligence</h1>
              <p className="mt-2 text-lg text-[#454652]">
                Central command for {session?.user?.name || "Ivan"} • Real-time platform synchronization
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 rounded-xl bg-[#eceef0] p-1">
              <button className="rounded-lg bg-white px-4 py-2 text-sm font-semibold shadow-sm">Real-time</button>
              <button className="rounded-lg px-4 py-2 text-sm font-medium text-[#454652]">7 Days</button>
              <button className="rounded-lg px-4 py-2 text-sm font-medium text-[#454652]">30 Days</button>
              <Link href="/dashboard/user-management" className="rounded-lg bg-[#1a237e] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90">Open Users</Link>
              <Link href="/dashboard/cohorts" className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#1a237e] transition hover:bg-[#eef2ff]">Open Cohorts</Link>
            </div>
          </div>

          <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-4">
            <div className="relative overflow-hidden rounded-[1.5rem] bg-[#000666] p-8 text-white md:col-span-2">
              <div className="relative z-10">
                <div className="flex items-start justify-between">
                  <span className="material-symbols-outlined rounded-full bg-white/20 p-3">payments</span>
                  <div className="text-right">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">Stripe Integration</span>
                    <p className="text-xs font-medium text-white/80">Live connection active</p>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="text-sm font-medium text-white/75">Total Platform Revenue</h3>
                  <div className="mt-2 text-5xl font-extrabold tracking-tight">$142,850.00</div>
                  <div className="mt-4 flex items-center gap-2 text-sm">
                    <span className="inline-flex items-center gap-1 rounded-lg bg-white/15 px-2 py-1 font-semibold text-green-200">
                      <span className="material-symbols-outlined text-sm">trending_up</span>
                      12.4%
                    </span>
                    <span className="text-white/60">vs previous month</span>
                  </div>
                </div>
              </div>
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
            </div>

            <div className="flex flex-col justify-between rounded-[1.5rem] border border-[#c6c5d4]/20 bg-white p-8">
              <div>
                <span className="material-symbols-outlined rounded-full bg-[#e0e0ff] p-3 text-[#1a237e]">school</span>
                <h3 className="mt-6 text-sm font-semibold text-[#454652]">Active Enrollments</h3>
                <div className="mt-2 text-4xl font-extrabold tracking-tight">1,204</div>
              </div>
              <div className="mt-6">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#e0e3e5]">
                  <div className="h-full w-4/5 bg-[#4c56af]" />
                </div>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#454652]">
                  80% of capacity reached
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-[1.5rem] bg-[#1d00a4] p-8 text-white">
              <div>
                <span className="material-symbols-outlined rounded-full bg-white/20 p-3">auto_graph</span>
                <h3 className="mt-6 text-sm font-semibold text-white/80">Student Retention</h3>
                <div className="mt-2 text-4xl font-extrabold tracking-tight">94.2%</div>
              </div>
              <p className="mt-6 text-xs font-medium text-white/75">Top 5% of EdTech benchmarks</p>
            </div>
          </div>

          <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="rounded-xl border border-[#c6c5d4]/20 bg-white p-8 lg:col-span-2">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold tracking-tight">Recent User Activity</h2>
                <div className="flex gap-2">
                  <button className="rounded-lg p-2 transition hover:bg-[#eceef0]">
                    <span className="material-symbols-outlined text-[#454652]">filter_list</span>
                  </button>
                  <button className="rounded-lg bg-[#eceef0] px-4 py-2 text-sm font-bold text-[#191c1e]">View All</button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#c6c5d4]/20 text-left">
                      <th className="pb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#454652]">User</th>
                      <th className="pb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#454652]">Role</th>
                      <th className="pb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#454652]">Cohort</th>
                      <th className="pb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#454652]">Status</th>
                      <th className="pb-4" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#c6c5d4]/15">
                    {userActivity.map((item) => (
                      <tr key={item.email}>
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eceef0] text-sm font-bold text-[#454652]">
                              {item.initials}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[#191c1e]">{item.name}</p>
                              <p className="text-xs text-[#454652]">{item.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 text-sm font-medium">{item.role}</td>
                        <td className="py-4 text-sm">{item.cohort}</td>
                        <td className="py-4">
                          <span className={item.status === "Active"
                            ? "inline-flex rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-bold text-green-800"
                            : "inline-flex rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800"}>
                            {item.status}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <span className="material-symbols-outlined cursor-pointer text-[#454652]">more_vert</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl bg-[#5865F2] p-8 text-white">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined rounded-lg bg-white/20 p-2">forum</span>
                  <h3 className="font-bold">Discord Integration</h3>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-400" />
                  <span className="text-sm font-medium">Connected to #main-campus</span>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-white/10 p-3 text-center">
                    <p className="text-xs text-white/70">Active Now</p>
                    <p className="font-bold">142</p>
                  </div>
                  <div className="rounded-lg bg-white/10 p-3 text-center">
                    <p className="text-xs text-white/70">New Roles</p>
                    <p className="font-bold">12</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-[#c6c5d4]/20 bg-[#f2f4f6] p-8">
                <h3 className="flex items-center gap-2 font-bold text-[#191c1e]">
                  <span className="material-symbols-outlined text-[#1a237e]">tune</span>
                  Platform Status
                </h3>
                <div className="mt-5 space-y-4">
                  {[
                    { label: "Course Registrations", enabled: true },
                    { label: "Email Automations", enabled: true },
                    { label: "Maintenance Mode", enabled: false },
                  ].map((toggle) => (
                    <div key={toggle.label} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-[#454652]">{toggle.label}</span>
                      <div className={toggle.enabled ? "flex h-5 w-10 items-center rounded-full bg-[#4c56af] px-1" : "flex h-5 w-10 items-center rounded-full bg-[#d8dadc] px-1"}>
                        <div className={toggle.enabled ? "ml-auto h-3 w-3 rounded-full bg-white" : "h-3 w-3 rounded-full bg-white"} />
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-6 w-full rounded-lg border border-[#1a237e]/20 py-2.5 text-sm font-bold text-[#1a237e] transition hover:bg-white">
                  System Health Report
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-extrabold tracking-tight">Active Curations</h2>
              <button className="flex items-center gap-1 text-sm font-bold text-[#1a237e] transition hover:gap-2">
                Management Portal
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {activeCurations.map((card, index) => (
                <div key={card.title} className="overflow-hidden rounded-xl border border-[#c6c5d4]/20 bg-white transition hover:shadow-xl hover:shadow-[#1a237e]/5">
                  <div className={index === 0 ? "h-32 bg-gradient-to-br from-[#d5e3fc] to-[#e2dfff]" : index === 1 ? "h-32 bg-gradient-to-br from-[#eceef0] to-[#d5e3fc]" : "h-32 bg-gradient-to-br from-[#e0e0ff] to-[#d5e3fc]"} />
                  <div className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="rounded px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#1a237e] bg-[#e0e0ff]">
                        {card.badge}
                      </span>
                      <span className="text-xs font-semibold text-[#454652]">{card.learners}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#191c1e]">{card.title}</h3>
                    <div className="mt-4 space-y-3">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-[#454652]">{card.stage}</span>
                        <span className="text-[#1a237e]">{card.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#e0e3e5]">
                        <div className="h-full bg-[#4c56af]" style={{ width: `${card.progress}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {availableRoutes.length > 0 && (
            <div className="mt-10 rounded-xl border border-[#c6c5d4]/20 bg-white p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#454652]">Admin Navigation</p>
                  <h3 className="mt-2 text-xl font-bold text-[#191c1e]">Available workspaces</h3>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {availableRoutes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className="rounded-xl border border-[#c6c5d4]/20 bg-[#f7f9fb] p-5 transition hover:border-[#1a237e]/30 hover:bg-[#eef2ff]"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#454652]">{route.group || "Navigation"}</p>
                    <h4 className="mt-3 text-lg font-bold text-[#191c1e]">{route.title}</h4>
                    <p className="mt-2 text-xs font-semibold text-[#1a237e]">{route.href}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
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
        href: "/dashboard/user-management",
      };
    case UserRoleType.INSTRUCTOR:
      return {
        title: "Classroom operations and learner tracking",
        description: "Jump into your roster, manage attendance, and review learner progress from your teaching workspace.",
        href: "/dashboard/roster",
      };
    case UserRoleType.ADMIN_STAFF:
      return {
        title: "Enrollment and cohort coordination",
        description: "Manage cohorts, review enrollments, and keep bootcamp operations moving smoothly.",
        href: "/dashboard/cohorts",
      };
    case UserRoleType.STUDENT:
      return {
        title: "Learning schedule and mission progress",
        description: "Access your upcoming sessions, assignments, and progress checkpoints from one learner dashboard.",
        href: "/dashboard/schedule",
      };
    case UserRoleType.PARENT:
      return {
        title: "Family schedule and payment tracking",
        description: "View student schedules, enrollment status, and billing actions from your parent portal.",
        href: "/dashboard/schedule",
      };
    default:
      return {
        title: "Platform overview and support entry point",
        description: "Browse your available tools, review your access level, and start from the module that matches your goal.",
        href: "/dashboard/help",
      };
  }
}

