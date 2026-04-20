import { NicheDashboardPage } from "../_components/niche-dashboard-page";

export default function ProgressPage() {
  return (
    <NicheDashboardPage
      eyebrow="Learning signals"
      title="Progress"
      description="Track learner momentum across attendance, assignments, milestones, and certification readiness."
      stats={[
        { label: "Current Pace", value: "68%", note: "Average module completion across the tracked cohort." },
        { label: "Badges Earned", value: "09", note: "Milestones already completed by active learners." },
        { label: "Support Flags", value: "05", note: "Students needing follow-up to stay on pace." },
        { label: "Completion Trend", value: "+12%", note: "Recent improvement in milestone completion velocity." },
      ]}
      actions={[
        { label: "Open assignments", href: "/dashboard/assignments" },
        { label: "Review certificates", href: "/dashboard/certificates" },
      ]}
      feed={[
        { title: "Milestone threshold crossed", detail: "Several learners moved into final certificate readiness review.", time: "21m ago" },
        { title: "Intervention list updated", detail: "Progress signals identified students needing extra support.", time: "1h ago" },
      ]}
      highlights={[
        { title: "Momentum tracking", detail: "Measure whether learners are accelerating, steady, or slipping.", meta: "Trend" },
        { title: "Intervention timing", detail: "Use signals early so support happens before major drop-off.", meta: "Support" },
        { title: "Recognition cadence", detail: "Celebrate milestones to reinforce progress visibly.", meta: "Motivation" },
        { title: "Completion confidence", detail: "Tie final progress metrics to certification decisions.", meta: "Outcome" },
      ]}
    />
  );
}
