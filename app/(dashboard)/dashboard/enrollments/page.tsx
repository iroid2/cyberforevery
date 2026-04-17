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
import { getEnrollmentDashboardData } from "@/lib/services/enrollments";

export default async function EnrollmentsPage() {
  const session = await auth();
  const role = (session?.user as { role?: UserRole } | undefined)?.role;

  if (!session?.user || (role !== UserRole.SUPER_ADMIN && role !== UserRole.ADMIN_STAFF)) {
    redirect("/dashboard");
  }

  const data = await getEnrollmentDashboardData();

  return (
    <DashboardPageShell
      eyebrow="Enrollments"
      title="Enrollment review and conversion tracking"
      description="Monitor real enrollment status, payment readiness, onboarding progress, and learner risk across the admissions pipeline."
      stats={[
        { label: "Pending enrollments", value: String(data.stats.pending).padStart(2, "0"), note: "Applications still waiting for payment or manual approval." },
        { label: "Approved", value: String(data.stats.approved).padStart(2, "0"), note: "Learners currently accepted into a cohort." },
        { label: "Conversion rate", value: `${data.stats.conversionRate}%`, note: "Accepted and completed enrollments across the current visible dataset." },
        { label: "Needs follow-up", value: String(data.stats.needsFollowUp).padStart(2, "0"), note: "Records blocked by payment, onboarding, or learner support steps." },
      ]}
      actions={[
        { label: "View certificates", href: "/dashboard/certificates" },
        { label: "Check cohort operations", href: "/dashboard/cohorts" },
      ]}
      feed={data.feed}
    >
      <DashboardSection
        title="Conversion desk"
        description="This page is now wired to live enrollment, onboarding, payment, and certificate records instead of placeholder queue data."
      >
        <div className="space-y-6">
          <HighlightCards
            items={[
              { label: "Paid and ready", value: String(data.stats.paidReady), detail: "Accepted learners whose billing is complete and can move through onboarding.", tone: "emerald" },
              { label: "Missing info", value: String(data.stats.missingInfo), detail: "Enrollments with checklist gaps like consent, profile setup, or tech verification.", tone: "amber" },
              { label: "Manual review", value: String(data.stats.manualReview), detail: "Records that are paid but still waiting on an admissions decision.", tone: "indigo" },
              { label: "At-risk", value: String(data.stats.atRisk), detail: "Enrolled learners already flagged for intervention after onboarding.", tone: "rose" },
            ]}
          />

          <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
            <RichTableCard
              title="Enrollment queue"
              description="Live queue built from current enrollment records, including guardian, track, stage, and operational status."
              columns={[
                { key: "student", label: "Student" },
                { key: "track", label: "Track" },
                { key: "guardian", label: "Guardian" },
                { key: "stage", label: "Stage" },
                { key: "status", label: "Status" },
              ]}
              rows={data.queueRows}
            />

            <SettingsPanel
              title="Workflow toggles"
              description="Current operating assumptions reflected by the live backend flow."
              items={[
                { label: "Onboarding checklists", value: "Every seeded enrollment now carries first-class onboarding state and checklist records.", enabled: true },
                { label: "Payment readiness", value: "Billing state is tracked on enrollments and linked payment records.", enabled: true },
                { label: "Learner risk flags", value: "Risk level can now surface at-risk learners early in the funnel and active cohort journey.", enabled: true },
                { label: "Certificate handoff", value: "Completion can now transition into certificate issuance once eligibility is met.", enabled: true },
              ]}
            />
          </div>

          <InsightPanels
            title="Queue insights"
            items={[
              {
                title: "Onboarding is now visible in admissions",
                subtitle: "Operations can tell the difference between paid-but-not-started, in-progress, active, and certified learners from one queue.",
                meta: "Lifecycle",
                tone: "indigo",
              },
              {
                title: "Incomplete checklist items are the cleanest next action",
                subtitle: "Missing consent, profile details, or tech readiness stand out immediately instead of hiding in free-form notes.",
                meta: "Ops",
                tone: "amber",
              },
              {
                title: "Certification is part of the same learner story now",
                subtitle: "The admissions view can see which enrollments have fully progressed into completion and issued credentials.",
                meta: "Outcome",
                tone: "emerald",
              },
            ]}
          />
        </div>
      </DashboardSection>
    </DashboardPageShell>
  );
}
