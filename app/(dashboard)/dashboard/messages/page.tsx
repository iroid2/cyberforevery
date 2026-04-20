import { NicheDashboardPage } from "../_components/niche-dashboard-page";

export default function MessagesPage() {
  return (
    <NicheDashboardPage
      eyebrow="Support communications"
      title="Messages"
      description="Coordinate learner, parent, and staff communication around admissions, classroom support, and billing follow-up."
      stats={[
        { label: "Open Threads", value: "14", note: "Conversations needing response or follow-up." },
        { label: "Urgent Support", value: "03", note: "Messages tied to delivery blockers or learner risk." },
        { label: "Admissions Inquiries", value: "07", note: "Conversations from families exploring enrollment." },
        { label: "Resolved Today", value: "11", note: "Threads closed or answered within service targets." },
      ]}
      actions={[
        { label: "Review enrollments", href: "/dashboard/enrollments" },
        { label: "Open help center", href: "/dashboard/help" },
      ]}
      feed={[
        { title: "Parent inquiry escalated", detail: "A billing and scheduling question was forwarded to admin staff.", time: "8m ago" },
        { title: "Instructor follow-up sent", detail: "Support details were shared with a learner who missed a lab.", time: "44m ago" },
      ]}
      highlights={[
        { title: "Response speed", detail: "Fast replies reduce friction and protect learner momentum.", meta: "Service" },
        { title: "Context sharing", detail: "Tie messages to enrollments, cohorts, and billing when possible.", meta: "Ops" },
        { title: "Escalation paths", detail: "Keep urgent support issues visible to the right team members.", meta: "Support" },
        { title: "Trust building", detail: "Clear communication is part of the learning experience.", meta: "Experience" },
      ]}
    />
  );
}
