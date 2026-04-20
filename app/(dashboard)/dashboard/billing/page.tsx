import { NicheDashboardPage } from "../_components/niche-dashboard-page";

export default function BillingPage() {
  return (
    <NicheDashboardPage
      eyebrow="Program billing"
      title="Billing"
      description="Track tuition status, enrollment payment steps, and billing follow-ups tied to learner participation."
      stats={[
        { label: "Outstanding Items", value: "04", note: "Billing records still waiting for payment or review." },
        { label: "Paid This Cycle", value: "31", note: "Completed payment records tied to active enrollments." },
        { label: "Sponsor Cases", value: "03", note: "Learners funded through external or institutional support." },
        { label: "Follow-Ups Due", value: "05", note: "Families needing a billing reminder or manual intervention." },
      ]}
      actions={[
        { label: "Review enrollments", href: "/dashboard/enrollments" },
        { label: "Open messages", href: "/dashboard/messages" },
      ]}
      feed={[
        { title: "Reminder batch sent", detail: "Upcoming payment prompts were sent to pending families.", time: "34m ago" },
        { title: "Sponsorship review updated", detail: "A scholarship-backed learner was cleared for placement.", time: "1h ago" },
      ]}
      highlights={[
        { title: "Enrollment continuity", detail: "Billing should support access, not create avoidable friction.", meta: "Ops" },
        { title: "Family clarity", detail: "Make status and next steps easy to understand.", meta: "Support" },
        { title: "Revenue visibility", detail: "Tie payments to actual cohort utilization and learner activity.", meta: "Finance" },
        { title: "Escalation workflow", detail: "Flag unresolved cases before they affect learning access.", meta: "Risk" },
      ]}
    />
  );
}
