import { DashboardPageShell, DashboardSection, PlaceholderGrid } from "@/components/dashboard/dashboard-page-shell";

export default function AttendancePage() {
  return (
    <DashboardPageShell
      eyebrow="Attendance"
      title="Attendance tracking and session health"
      description="Monitor presence, absence trends, and intervention needs across all scheduled learning sessions."
      stats={[
        { label: "Attendance rate", value: "94%", note: "Average attendance across the visible session range this month." },
        { label: "Sessions today", value: "05", note: "Today’s live and virtual sessions requiring attendance capture." },
        { label: "Late arrivals", value: "07", note: "Learners flagged for arriving outside the normal session tolerance." },
        { label: "Interventions", value: "03", note: "Attendance-related follow-ups recommended this week." },
      ]}
      actions={[
        { label: "Open today’s register" },
        { label: "Download attendance report" },
        { label: "Review absence alerts" },
      ]}
      feed={[
        { title: "Morning register submitted", detail: "Attendance for the primary cybersecurity class was confirmed successfully.", time: "14m ago" },
        { title: "Absence alert triggered", detail: "A learner crossed the threshold for repeated missed sessions.", time: "1h ago" },
        { title: "Guardian follow-up queued", detail: "One parent message was prepared for a recurring attendance pattern.", time: "4h ago" },
      ]}
    >
      <DashboardSection
        title="Session attendance overview"
        description="A later version can add per-session registers, bulk marking, and cohort-level trends."
      >
        <PlaceholderGrid
          items={[
            { meta: "Today", title: "Cybersecurity Morning Session", detail: "17 present, 1 absent, 2 late arrivals, follow-up status healthy." },
            { meta: "Today", title: "Web Development Lab", detail: "Full attendance recorded with no support flags." },
            { meta: "Week trend", title: "High consistency across learner portal", detail: "Attendance remains strong in the current active groups." },
            { meta: "Action", title: "Intervention watchlist", detail: "This area can evolve into a targeted absence intervention queue." },
          ]}
        />
      </DashboardSection>
    </DashboardPageShell>
  );
}
