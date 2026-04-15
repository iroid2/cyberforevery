import { auth } from "@/auth";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserRole } from "@prisma/client";
import {
  Activity,
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  Filter,
  Layers3,
  Search,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import { redirect } from "next/navigation";

const userStats = [
  {
    label: "Total users",
    value: "1,284",
    note: "Across students, parents, instructors, staff, and admins",
    accent: "bg-[#000666] text-white border-[#000666]",
    icon: Users,
  },
  {
    label: "Active this week",
    value: "932",
    note: "72.6% engagement rate with 8.4% week-over-week growth",
    accent: "bg-white text-[#191c1e] border-[#c6c5d4]/30",
    icon: Activity,
  },
  {
    label: "Privileged roles",
    value: "48",
    note: "Super admins, admin staff, and instructors with elevated access",
    accent: "bg-[#eef2ff] text-[#1a237e] border-[#bdc2ff]",
    icon: Shield,
  },
  {
    label: "Pending reviews",
    value: "19",
    note: "Accounts waiting on approval, role updates, or final onboarding",
    accent: "bg-[#fff4e8] text-[#9a5b00] border-[#ffd8a8]",
    icon: Sparkles,
  },
];

const segmentStats = [
  { label: "Students", value: "846", trend: "+12.4%", tone: "text-[#1a237e]" },
  { label: "Parents", value: "311", trend: "+6.8%", tone: "text-[#0f766e]" },
  { label: "Instructors", value: "74", trend: "+2.1%", tone: "text-[#7c3aed]" },
  { label: "Admin staff", value: "53", trend: "+4.7%", tone: "text-[#c2410c]" },
];

const users = [
  {
    name: "Marcus Chen",
    email: "marcus.chen@cyber4every1.org",
    role: "Student",
    team: "Network Intelligence",
    status: "Active",
    location: "Kampala Campus",
    lastSeen: "2 mins ago",
    progress: "92%",
  },
  {
    name: "Elena Rodriguez",
    email: "elena.rodriguez@cyber4every1.org",
    role: "Instructor",
    team: "Editorial Systems",
    status: "Active",
    location: "Remote",
    lastSeen: "15 mins ago",
    progress: "87%",
  },
  {
    name: "David Kimani",
    email: "david.kimani@cyber4every1.org",
    role: "Parent",
    team: "Family Portal",
    status: "Pending",
    location: "Nairobi",
    lastSeen: "1 hour ago",
    progress: "63%",
  },
  {
    name: "Aisha Namatovu",
    email: "aisha.namatovu@cyber4every1.org",
    role: "Admin Staff",
    team: "Operations",
    status: "Active",
    location: "Head Office",
    lastSeen: "9 mins ago",
    progress: "95%",
  },
  {
    name: "Samuel Okoro",
    email: "samuel.okoro@cyber4every1.org",
    role: "Student",
    team: "Digital Safety Cohort",
    status: "Review",
    location: "Entebbe",
    lastSeen: "3 hours ago",
    progress: "54%",
  },
  {
    name: "Grace Atwine",
    email: "grace.atwine@cyber4every1.org",
    role: "Super Admin",
    team: "Executive Control",
    status: "Active",
    location: "HQ",
    lastSeen: "Just now",
    progress: "100%",
  },
];

export default async function UserManagementPage() {
  const session = await auth();

  if (!session?.user || (session.user as { role?: UserRole }).role !== UserRole.SUPER_ADMIN) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#f7f9fb] px-4 py-5 md:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="rounded-[1.5rem] border border-[#c6c5d4]/25 bg-white p-5 shadow-[0_20px_80px_-60px_rgba(26,35,126,0.35)] md:p-7">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="hidden rounded-2xl border border-[#c6c5d4]/30 bg-[#eef2ff] p-2.5 text-[#1a237e] md:flex">
                <SidebarTrigger className="h-10 w-10 rounded-xl bg-transparent text-[#1a237e] hover:bg-white" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-[#eef2ff] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[#1a237e]">
                    User Management
                  </span>
                  <span className="hidden text-sm text-[#5f6470] md:inline">
                    Responsive admin control center
                  </span>
                </div>
                <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#191c1e] md:text-5xl">
                  User Management Command
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-[#5f6470] md:text-base">
                  Review user health, track role distribution, and manage access from one responsive
                  workspace. The sidebar can be expanded or collapsed on desktop using the top-left
                  control or the rail.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 lg:items-end">
              <div className="flex items-center gap-3 self-start rounded-2xl border border-[#c6c5d4]/20 bg-[#f7f9fb] px-3 py-3 lg:self-end">
                <AnimatedThemeToggler className="rounded-full border border-[#c6c5d4]/40 bg-white p-2 text-slate-600 transition hover:border-[#1a237e]/30 hover:text-[#1a237e]" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#6b7280]">
                  Light and dark ready
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {segmentStats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-[#c6c5d4]/20 bg-[#f7f9fb] px-4 py-4"
                  >
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#6b7280]">
                      {item.label}
                    </p>
                    <p className="mt-2 text-2xl font-extrabold tracking-tight text-[#191c1e]">
                      {item.value}
                    </p>
                    <p className={`mt-1 text-xs font-semibold ${item.tone}`}>{item.trend}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {userStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.label}
                className={`rounded-[1.5rem] border p-6 shadow-[0_12px_40px_-28px_rgba(15,23,42,0.25)] ${stat.accent}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-[0.24em] opacity-75">
                    {stat.label}
                  </span>
                  <Icon className="h-5 w-5 opacity-80" />
                </div>
                <div className="mt-8 flex items-end justify-between gap-4">
                  <p className="text-4xl font-extrabold tracking-tight">{stat.value}</p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-black/5 px-2.5 py-1 text-[11px] font-semibold">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                    Healthy
                  </span>
                </div>
                <p className="mt-4 text-sm leading-6 opacity-80">{stat.note}</p>
              </article>
            );
          })}
        </section>

        <section className="rounded-[1.75rem] border border-[#c6c5d4]/25 bg-white shadow-[0_24px_90px_-70px_rgba(26,35,126,0.5)]">
          <div className="flex flex-col gap-5 border-b border-[#c6c5d4]/20 p-5 md:p-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <BriefcaseBusiness className="h-5 w-5 text-[#1a237e]" />
                <h2 className="text-2xl font-extrabold tracking-tight text-[#191c1e]">
                  Directory Intelligence Table
                </h2>
              </div>
              <p className="mt-2 text-sm text-[#5f6470]">
                Dummy user data with role visibility, access health, and recent activity indicators.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative min-w-0 sm:min-w-[260px]">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b7280]" />
                <input
                  className="h-11 w-full rounded-xl border border-[#c6c5d4]/30 bg-[#f7f9fb] pl-10 pr-4 text-sm outline-none transition focus:border-[#1a237e]/35 focus:bg-white"
                  placeholder="Search user, role, or cohort"
                />
              </div>
              <button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#c6c5d4]/30 bg-[#f7f9fb] px-4 text-sm font-semibold text-[#191c1e] transition hover:bg-[#eef2ff]">
                <Filter className="h-4 w-4" />
                Filters
              </button>
              <button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#000666] px-4 text-sm font-semibold text-white transition hover:opacity-95">
                <BadgeCheck className="h-4 w-4" />
                Invite User
              </button>
            </div>
          </div>

          <div className="grid gap-4 border-b border-[#c6c5d4]/20 p-5 md:grid-cols-3 md:p-6">
            <InsightCard
              title="Verified accounts"
              value="96.1%"
              note="1,234 accounts completed onboarding and role confirmation."
            />
            <InsightCard
              title="Role conflicts"
              value="04"
              note="Only four records need manual role review this cycle."
            />
            <InsightCard
              title="Pending invitations"
              value="27"
              note="New invitations are waiting for activation across all cohorts."
            />
          </div>

          <div className="hidden overflow-x-auto lg:block">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-[#c6c5d4]/20 bg-[#f7f9fb] text-left">
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#6b7280]">
                    User
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#6b7280]">
                    Role
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#6b7280]">
                    Team / Module
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#6b7280]">
                    Progress
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#6b7280]">
                    Last Seen
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#6b7280]">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-[0.22em] text-[#6b7280]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c6c5d4]/15">
                {users.map((user) => (
                  <tr key={user.email} className="transition hover:bg-[#f7f9fb]">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef2ff] text-sm font-bold text-[#1a237e]">
                          {getInitials(user.name)}
                        </div>
                        <div>
                          <p className="font-bold text-[#191c1e]">{user.name}</p>
                          <p className="text-sm text-[#5f6470]">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="rounded-full bg-[#eef2ff] px-3 py-1 text-xs font-semibold text-[#1a237e]">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <p className="font-semibold text-[#191c1e]">{user.team}</p>
                      <p className="text-sm text-[#5f6470]">{user.location}</p>
                    </td>
                    <td className="px-6 py-5">
                      <div className="w-full max-w-[140px]">
                        <div className="mb-2 flex items-center justify-between text-xs font-semibold text-[#5f6470]">
                          <span>Completion</span>
                          <span>{user.progress}</span>
                        </div>
                        <div className="h-2 rounded-full bg-[#e5e7eb]">
                          <div
                            className="h-2 rounded-full bg-[#000666]"
                            style={{ width: user.progress }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm font-medium text-[#191c1e]">
                      {user.lastSeen}
                    </td>
                    <td className="px-6 py-5">
                      <StatusPill status={user.status} />
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="rounded-xl border border-[#c6c5d4]/30 px-4 py-2 text-sm font-semibold text-[#191c1e] transition hover:border-[#1a237e]/25 hover:bg-[#eef2ff] hover:text-[#1a237e]">
                        View profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-4 p-5 lg:hidden">
            {users.map((user) => (
              <article
                key={user.email}
                className="rounded-2xl border border-[#c6c5d4]/20 bg-[#f7f9fb] p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef2ff] text-sm font-bold text-[#1a237e]">
                      {getInitials(user.name)}
                    </div>
                    <div>
                      <p className="font-bold text-[#191c1e]">{user.name}</p>
                      <p className="text-sm text-[#5f6470]">{user.email}</p>
                    </div>
                  </div>
                  <StatusPill status={user.status} />
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <MobileField label="Role" value={user.role} />
                  <MobileField label="Team" value={user.team} />
                  <MobileField label="Location" value={user.location} />
                  <MobileField label="Last seen" value={user.lastSeen} />
                </div>

                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between text-xs font-semibold text-[#5f6470]">
                    <span>Access completion</span>
                    <span>{user.progress}</span>
                  </div>
                  <div className="h-2 rounded-full bg-[#e5e7eb]">
                    <div
                      className="h-2 rounded-full bg-[#000666]"
                      style={{ width: user.progress }}
                    />
                  </div>
                </div>

                <button className="mt-5 w-full rounded-xl border border-[#c6c5d4]/30 bg-white px-4 py-3 text-sm font-semibold text-[#191c1e] transition hover:border-[#1a237e]/25 hover:bg-[#eef2ff] hover:text-[#1a237e]">
                  Open user profile
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <BottomPanel
            title="Role health summary"
            description="Students remain the largest user segment, while privileged roles show low conflict and clean access posture."
          />
          <BottomPanel
            title="Onboarding readiness"
            description="Most pending records are already over 60% complete, which makes this queue easy to clear quickly."
          />
          <BottomPanel
            title="Audit confidence"
            description="Dummy dataset shows strong traceability, high verification coverage, and limited high-risk flags."
          />
        </section>
      </div>
    </div>
  );
}

function InsightCard({
  title,
  value,
  note,
}: {
  title: string;
  value: string;
  note: string;
}) {
  return (
    <div className="rounded-2xl border border-[#c6c5d4]/20 bg-[#f7f9fb] p-5">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#6b7280]">{title}</p>
      <p className="mt-3 text-3xl font-extrabold tracking-tight text-[#191c1e]">{value}</p>
      <p className="mt-2 text-sm leading-6 text-[#5f6470]">{note}</p>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const styles =
    status === "Active"
      ? "bg-green-100 text-green-800"
      : status === "Pending"
        ? "bg-amber-100 text-amber-800"
        : "bg-slate-200 text-slate-700";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] ${styles}`}
    >
      {status}
    </span>
  );
}

function MobileField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[#c6c5d4]/20 bg-white px-4 py-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b7280]">{label}</p>
      <p className="mt-2 text-sm font-semibold text-[#191c1e]">{value}</p>
    </div>
  );
}

function BottomPanel({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-[#c6c5d4]/20 bg-white p-6 shadow-[0_10px_40px_-34px_rgba(15,23,42,0.35)]">
      <div className="flex items-center gap-2">
        <Layers3 className="h-5 w-5 text-[#1a237e]" />
        <h3 className="text-lg font-bold text-[#191c1e]">{title}</h3>
      </div>
      <p className="mt-4 text-sm leading-6 text-[#5f6470]">{description}</p>
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
