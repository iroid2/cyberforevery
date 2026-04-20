import { NicheDashboardPage } from "../_components/niche-dashboard-page";

export default function RosterPage() {
  return (
    <NicheDashboardPage
      eyebrow="Classroom operations"
      title="Roster"
      description="Track active learners, cohort assignments, and classroom readiness for instructors and support staff."
      stats={[
        { label: "Active Learners", value: "42", note: "Students currently participating in live cohorts." },
        { label: "Support Flags", value: "05", note: "Learners needing intervention or follow-up." },
        { label: "New Starters", value: "08", note: "Recently onboarded learners in their first module." },
        { label: "Mentor Groups", value: "09", note: "Small-group learning clusters currently active." },
      ]}
      actions={[
        { label: "Review attendance", href: "/dashboard/attendance" },
        { label: "Open grade portal", href: "/dashboard/grade-portal" },
      ]}
      feed={[
        { title: "Learner moved to advanced section", detail: "One student was reassigned after diagnostic review.", time: "22m ago" },
        { title: "Intervention note added", detail: "A mentor flagged lab participation concerns for follow-up.", time: "1h ago" },
      ]}
      highlights={[
        { title: "Learner distribution", detail: "Keep cohort sizes balanced so live support stays effective.", meta: "Balance" },
        { title: "Support visibility", detail: "Make interventions visible before attendance dips become patterns.", meta: "Retention" },
        { title: "Instructor readiness", detail: "Ensure rosters match the actual schedule and lab setup.", meta: "Delivery" },
        { title: "Progress context", detail: "Tie roster decisions to assignment and milestone trends.", meta: "Insight" },
      ]}
    />
  );
}
