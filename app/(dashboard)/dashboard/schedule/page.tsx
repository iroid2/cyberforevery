import { DashboardPageShell, DashboardSection, PlaceholderGrid } from "@/components/dashboard/dashboard-page-shell";

export default function SchedulePage() {
  return (
    <DashboardPageShell
      eyebrow="Schedule"
      title="Upcoming sessions and weekly learning plan"
      description="See the next sessions, calendar windows, and coordination checkpoints for learners and guardians."
      stats={[
        { label: "Sessions this week", value: "06", note: "Upcoming scheduled learning events in the active learner calendar." },
        { label: "Next live session", value: "Tue 9:00", note: "The nearest scheduled session currently visible to this account." },
        { label: "Attendance target", value: "95%", note: "Weekly attendance expectation across the current learning plan." },
        { label: "Schedule changes", value: "02", note: "Minor updates or room adjustments applied this week." },
      ]}
      actions={[
        { label: "View full calendar" },
        { label: "Download weekly plan" },
        { label: "Request schedule help" },
      ]}
      feed={[
        { title: "Session reminder sent", detail: "Reminder messages went out for the next cybersecurity cohort session.", time: "8m ago" },
        { title: "Calendar synced", detail: "This week’s events were refreshed after the latest operations update.", time: "40m ago" },
        { title: "Room assignment updated", detail: "One in-person session moved to the larger training room.", time: "3h ago" },
      ]}
    >
      <DashboardSection
        title="Weekly schedule snapshot"
        description="This flat route replaces the previous nested learner schedule path and can later host a full calendar grid."
      >
        <PlaceholderGrid
          items={[
            { meta: "Tuesday", title: "Cybersecurity Core Session", detail: "Live instruction, password labs, and mentor Q&A in the morning block." },
            { meta: "Thursday", title: "Project Studio", detail: "Hands-on lab session focused on practical digital defense exercises." },
            { meta: "Saturday", title: "Family progress review", detail: "Parent-facing checkpoint with highlights, questions, and next steps." },
            { meta: "Planning", title: "Adaptive schedule support", detail: "Use this panel later for reschedules, make-up sessions, and availability controls." },
          ]}
        />
      </DashboardSection>
    </DashboardPageShell>
  );
}
