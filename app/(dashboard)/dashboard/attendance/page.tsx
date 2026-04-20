import { NicheDashboardPage } from "../_components/niche-dashboard-page";

export default function AttendancePage() {
  return (
    <NicheDashboardPage
      eyebrow="Attendance intelligence"
      title="Attendance"
      description="Monitor live session participation, identify disengagement risk, and support timely instructor intervention."
      stats={[
        { label: "On-Time Check-Ins", value: "91%", note: "Average participation rate across recent live labs." },
        { label: "Repeated Absences", value: "04", note: "Learners missing multiple sessions in sequence." },
        { label: "Late Arrivals", value: "07", note: "Students needing follow-up on punctuality or access issues." },
        { label: "Sessions Logged", value: "28", note: "Attendance records captured this cycle." },
      ]}
      actions={[
        { label: "Open roster", href: "/dashboard/roster" },
        { label: "Check progress", href: "/dashboard/progress" },
      ]}
      feed={[
        { title: "Absence alert generated", detail: "A learner missed two consecutive secure coding sessions.", time: "11m ago" },
        { title: "Attendance sync complete", detail: "This week’s lab attendance was captured from instructor logs.", time: "39m ago" },
      ]}
      highlights={[
        { title: "Participation quality", detail: "Use attendance as an early warning for disengagement.", meta: "Retention" },
        { title: "Support triggers", detail: "Escalate repeated misses to mentors and family contacts quickly.", meta: "Care" },
        { title: "Schedule fit", detail: "Spot timing patterns that may indicate session conflicts.", meta: "Ops" },
        { title: "Outcome correlation", detail: "Compare attendance dips with assignment or milestone performance.", meta: "Insight" },
      ]}
    />
  );
}
