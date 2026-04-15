import { DashboardPageShell, DashboardSection, PlaceholderGrid } from "@/components/dashboard/dashboard-page-shell";

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
        title="Enrollment pipeline"
        description="This page is ready for a future full table view with filtering by stage, payment status, and cohort readiness."
      >
        <PlaceholderGrid
          items={[
            { meta: "Review", title: "Family application waiting on payment", detail: "Strong fit, complete form data, invoice issued, payment still pending." },
            { meta: "Approved", title: "Learner scheduled for next intake", detail: "Application accepted, portal onboarding email sent, materials queue active." },
            { meta: "Follow-up", title: "Missing emergency contact details", detail: "Guardian details need one final confirmation before enrollment approval." },
            { meta: "Operations", title: "Bulk intake checkpoint", detail: "Use this space later for staff dashboards, filters, and queue ownership." },
          ]}
        />
      </DashboardSection>
    </DashboardPageShell>
  );
}
