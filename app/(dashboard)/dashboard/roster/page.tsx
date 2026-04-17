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
import { getRosterDashboardData } from "@/lib/services/enrollments";

export default async function RosterPage() {
  const session = await auth();
  const role = (session?.user as { role?: UserRole } | undefined)?.role;
  const userId = session?.user?.id;

  if (!session?.user || !userId || (role !== UserRole.INSTRUCTOR && role !== UserRole.SUPER_ADMIN)) {
    redirect("/dashboard");
  }

  const data = await getRosterDashboardData(userId, role);

  if (!data) {
    redirect("/dashboard");
  }

  return (
    <DashboardPageShell
      eyebrow="Roster"
      title="Learner roster and classroom assignment view"
      description="Give instructors and platform admins a live view of assigned learners, classroom grouping, and support readiness."
      stats={[
        { label: "Assigned learners", value: String(data.stats.assignedLearners).padStart(2, "0"), note: "Learners currently mapped into the visible teaching groups." },
        { label: "Active groups", value: String(data.stats.activeGroups).padStart(2, "0"), note: "Cohorts currently represented in this roster view." },
        { label: "Needs attention", value: String(data.stats.needsAttention).padStart(2, "0"), note: "Learners flagged as review or at-risk based on current lifecycle data." },
        { label: "Average readiness", value: `${data.stats.averageReadiness}%`, note: "Combined lifecycle readiness pulled from attendance, assignments, and scores." },
      ]}
      actions={[
        { label: "Open attendance", href: "/dashboard/attendance" },
        { label: "Review certificates", href: "/dashboard/certificates" },
      ]}
      feed={data.feed}
    >
      <DashboardSection
        title="Classroom roster"
        description="This roster is now driven by real enrollments and learner lifecycle status instead of placeholder classroom cards."
      >
        <div className="space-y-6">
          <HighlightCards
            items={[
              { label: "On track", value: String(data.stats.onTrack), detail: "Learners currently healthy or already certified in the visible cohort set.", tone: "emerald" },
              { label: "Watchlist", value: String(data.stats.watchlist), detail: "Learners whose onboarding, attendance, or progress still needs monitoring.", tone: "amber" },
              { label: "Guardian touchpoints", value: String(data.stats.guardianTouchpoints), detail: "Active learner records that may still need parent-facing follow-up.", tone: "indigo" },
              { label: "Urgent support", value: String(data.stats.urgentSupport), detail: "At-risk learners who need intervention before they fall further behind.", tone: "rose" },
            ]}
          />

          <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
            <RichTableCard
              title="Assigned learners"
              description="Live learner roster linked to enrollments, guardians, and lifecycle completion data."
              columns={[
                { key: "learner", label: "Learner" },
                { key: "group", label: "Group" },
                { key: "guardian", label: "Guardian" },
                { key: "progress", label: "Progress" },
                { key: "status", label: "Status" },
              ]}
              rows={data.learners.map((learner) => ({
                learner: learner.learner,
                group: learner.group,
                guardian: learner.guardian,
                progress: `progress:${learner.progress}%`,
                status: `status:${learner.status}`,
              }))}
            />

            <SettingsPanel
              title="Support actions"
              description="Operational assumptions now reflected by the real learner roster."
              items={[
                { label: "Lifecycle visibility", value: "Instructors can see who is active, at risk, or already certified from one place.", enabled: true },
                { label: "Guardian linkage", value: "Every roster learner is connected to a parent or guardian account in the current dataset.", enabled: true },
                { label: "Certificate awareness", value: "Certified learners remain visible in the roster so alumni outcomes stay measurable.", enabled: true },
                { label: "Manual balancing", value: "Cohort assignment is still intentionally human-controlled.", enabled: false },
              ]}
            />
          </div>

          <InsightPanels
            title="Instruction insights"
            items={[
              { title: "Readiness is now measurable", subtitle: "The roster combines assignment completion, attendance, and performance into one teaching-friendly readiness view.", meta: "Health", tone: "emerald" },
              { title: "At-risk learners stand out early", subtitle: "Risk flags now travel with the learner record instead of hiding inside attendance or grading pages alone.", meta: "Support", tone: "amber" },
              { title: "Certification closes the loop", subtitle: "Instructors and admins can now see who progressed all the way from active learner to verified completion.", meta: "Outcome", tone: "indigo" },
            ]}
          />
        </div>
      </DashboardSection>
    </DashboardPageShell>
  );
}
