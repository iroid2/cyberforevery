import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import {
  HighlightCards,
  InsightPanels,
  RichTableCard,
  SettingsPanel,
} from "@/components/dashboard/dashboard-content-blocks";
import { DashboardPageShell, DashboardSection } from "@/components/dashboard/dashboard-page-shell";
import { getAttendanceDashboardData } from "@/lib/services/enrollments";

export default async function AttendancePage() {
  const session = await auth();
  const role = (session?.user as { role?: UserRole } | undefined)?.role;
  const userId = session?.user?.id;

  if (!session?.user || !userId || (role !== UserRole.INSTRUCTOR && role !== UserRole.SUPER_ADMIN)) {
    redirect("/dashboard");
  }

  const data = await getAttendanceDashboardData(userId, role);

  if (!data) {
    redirect("/dashboard");
  }

  return (
    <DashboardPageShell
      eyebrow="Attendance"
      title="Attendance tracking and session health"
      description="Monitor real session attendance, spot emerging intervention needs, and connect attendance directly to learner progress."
      stats={[
        { label: "Attendance rate", value: `${data.stats.attendanceRate}%`, note: "Average attendance across the visible sessions in the database." },
        { label: "Sessions tracked", value: String(data.stats.sessionsToday).padStart(2, "0"), note: "Sessions currently visible to this role." },
        { label: "Late arrivals", value: String(data.stats.lateArrivals).padStart(2, "0"), note: "Late arrival tracking has not been modeled yet, so this remains zero for now." },
        { label: "Interventions", value: String(data.stats.interventions).padStart(2, "0"), note: "Sessions whose attendance outcomes suggest extra support or follow-up." },
      ]}
      actions={[
        { label: "Open roster", href: "/dashboard/roster" },
        { label: "Review progress", href: "/dashboard/progress" },
      ]}
      feed={data.feed}
    >
      <DashboardSection
        title="Daily register board"
        description="This attendance workspace is now fed by real session and learner attendance records instead of dummy register rows."
      >
        <div className="space-y-6">
          <HighlightCards
            items={[
              { label: "Present", value: String(data.stats.presentToday), detail: "Attendance entries marked present across visible sessions.", tone: "emerald" },
              { label: "Absent", value: String(data.stats.absent), detail: "Recorded absences that may need a guardian or staff follow-up.", tone: "amber" },
              { label: "Review trend", value: String(data.stats.lateTrend), detail: "Sessions hovering in the middle band and worth watching closely.", tone: "rose" },
              { label: "Manual checks", value: String(data.stats.manualChecks), detail: "No extra adjustment workflow is stored yet, so this remains zero for now.", tone: "indigo" },
            ]}
          />

          <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
            <RichTableCard
              title="Session register"
              description="Live attendance snapshot across the sessions visible to this instructor or admin."
              columns={[
                { key: "session", label: "Session" },
                { key: "coach", label: "Coach" },
                { key: "present", label: "Present" },
                { key: "late", label: "Late" },
                { key: "status", label: "Status" },
              ]}
              rows={data.sessions.map((session) => ({
                session: session.session,
                coach: session.coach,
                present: session.presentLabel,
                late: session.late,
                status: `status:${session.status}`,
              }))}
            />

            <SettingsPanel
              title="Attendance controls"
              description="The current state of the attendance workflow in the live backend."
              items={[
                { label: "Session-linked tracking", value: "Attendance is now tied directly to real camp sessions and enrolled learners.", enabled: true },
                { label: "Progress weighting", value: "Attendance contributes to learner progress and certificate eligibility checks.", enabled: true },
                { label: "Intervention visibility", value: "Low-attendance sessions now help surface review and at-risk learners earlier.", enabled: true },
                { label: "Late arrival workflow", value: "A dedicated lateness model has not been added yet.", enabled: false },
              ]}
            />
          </div>

          <InsightPanels
            title="Attendance insights"
            items={[
              { title: "Attendance is now a real input", subtitle: "The dashboard is no longer guessing. It reads from actual attendance rows attached to each session.", meta: "Data", tone: "emerald" },
              { title: "Certificate readiness depends on this", subtitle: "Attendance now matters beyond reporting because it feeds the completion thresholds used for certificate issuance.", meta: "Outcome", tone: "indigo" },
              { title: "The next layer is per-session editing", subtitle: "What remains here is a proper mark-attendance action for instructors to update the register from the page itself.", meta: "Next", tone: "amber" },
            ]}
          />
        </div>
      </DashboardSection>
    </DashboardPageShell>
  );
}
