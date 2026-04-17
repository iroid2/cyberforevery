import {
  HighlightCards,
  InsightPanels,
  RichTableCard,
  SettingsPanel,
} from "@/components/dashboard/dashboard-content-blocks";
import { DashboardPageShell, DashboardSection } from "@/components/dashboard/dashboard-page-shell";

export default function EnrollmentsPage() {
  return (
    <DashboardPageShell
      eyebrow="Enrollments"
      title="Enrollment review and conversion tracking"
      description="Monitor pending applications, approvals, payment readiness, and onboarding progress across all learner records."
      stats={[
        { label: "Pending enrollments", value: "31", note: "Applications still waiting for manual review, payment, or cohort assignment." },
        { label: "Approved today", value: "12", note: "Learners cleared by operations in the current review cycle." },
        { label: "Conversion rate", value: "68%", note: "Dummy pipeline conversion from form start to successful enrollment." },
        { label: "Needs follow-up", value: "09", note: "Applications with missing info, payment blockers, or schedule conflicts." },
      ]}
      actions={[
        { label: "Open review queue" },
        { label: "Export pending records" },
        { label: "Trigger reminder emails" },
      ]}
      feed={[
        { title: "Payment reminder sent", detail: "Twelve pending applications received an automated billing reminder.", time: "7m ago" },
        { title: "Enrollment approved", detail: "Operations approved a family application for the next cybersecurity cohort.", time: "43m ago" },
        { title: "Cohort assignment created", detail: "Three approved learners were mapped into the July online intake.", time: "2h ago" },
      ]}
    >
      <DashboardSection
        title="Conversion desk"
        description="This is now a designed review page with realistic dummy data for queue ownership, payment blockers, and approval pacing."
      >
        <div className="space-y-6">
          <HighlightCards
            items={[
              { label: "Paid and ready", value: "18", detail: "These learners can move straight into onboarding and cohort assignment.", tone: "emerald" },
              { label: "Missing info", value: "6", detail: "Applications needing emergency contacts, device details, or guardian confirmation.", tone: "amber" },
              { label: "Manual review", value: "4", detail: "Staff should check fit, schedule choice, or financial support flags.", tone: "indigo" },
              { label: "At-risk", value: "3", detail: "These applications have stalled long enough to need immediate follow-up.", tone: "rose" },
            ]}
          />

          <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
            <RichTableCard
              title="Enrollment queue"
              description="A realistic admissions queue for review, billing, and operations handoff."
              columns={[
                { key: "student", label: "Student" },
                { key: "track", label: "Track" },
                { key: "guardian", label: "Guardian" },
                { key: "stage", label: "Stage" },
                { key: "status", label: "Status" },
              ]}
              rows={[
                { student: "Ava N.", track: "Computer Hardware", guardian: "gogebydek@mailinator.com", stage: "Awaiting payment", status: "status:Pending" },
                { student: "Micah O.", track: "Cybersecurity", guardian: "family.portal@demo.com", stage: "Approved and mapped", status: "status:Healthy" },
                { student: "Ruth K.", track: "Networking", guardian: "guardian@demo.com", stage: "Manual review", status: "status:Review" },
                { student: "Jonah T.", track: "Graphic Design + AI", guardian: "jonah.parent@demo.com", stage: "Reminder sent", status: "status:Overdue" },
              ]}
            />

            <SettingsPanel
              title="Workflow toggles"
              description="Operational choices affecting the current admissions flow."
              items={[
                { label: "Auto-create starter cohorts", value: "Fresh intake records can create fallback cohorts automatically.", enabled: true },
                { label: "Onboarding email dispatch", value: "Enabled after successful enrollment persistence.", enabled: true },
                { label: "Finance hold on incomplete records", value: "Prevent billing actions if guardian data is incomplete.", enabled: false },
                { label: "Manual approval gate", value: "Staff can still intervene before final learner activation.", enabled: true },
              ]}
            />
          </div>

          <InsightPanels
            title="Queue insights"
            items={[
              { title: "Hardware demand is rising", subtitle: "The newest forms are clustering around computer hardware and networking tracks.", meta: "Trend", tone: "indigo" },
              { title: "Payment friction is the main blocker", subtitle: "Most incomplete applications are otherwise ready for approval and cohort assignment.", meta: "Billing", tone: "amber" },
              { title: "Reminder timing matters", subtitle: "Applications convert faster when finance nudges go out within the first 24 hours.", meta: "Ops", tone: "emerald" },
            ]}
          />
        </div>
      </DashboardSection>
    </DashboardPageShell>
  );
}
