import {
  HighlightCards,
  InsightPanels,
  RichTableCard,
  SettingsPanel,
} from "@/components/dashboard/dashboard-content-blocks";
import { DashboardPageShell, DashboardSection } from "@/components/dashboard/dashboard-page-shell";

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
        { title: "Calendar synced", detail: "This week's events were refreshed after the latest operations update.", time: "40m ago" },
        { title: "Room assignment updated", detail: "One in-person session moved to the larger training room.", time: "3h ago" },
      ]}
    >
      <DashboardSection title="Weekly schedule board" description="This route now has a stronger schedule layout with a realistic cadence view, support notes, and mobile-friendly cards.">
        <div className="space-y-6">
          <HighlightCards items={[
            { label: "Live sessions", value: "4", detail: "Instructor-led blocks currently scheduled in the active weekly plan.", tone: "indigo" },
            { label: "On-site rooms", value: "2", detail: "Physical classroom spaces reserved for this learner schedule.", tone: "emerald" },
            { label: "Family checkpoints", value: "1", detail: "One guardian-facing progress review appears on the week ahead.", tone: "amber" },
            { label: "Conflicts", value: "0", detail: "No unresolved schedule overlaps are currently visible.", tone: "slate" },
          ]} />

          <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
            <RichTableCard
              title="Upcoming sessions"
              description="Visible schedule blocks across learning, coaching, and family review windows."
              columns={[
                { key: "day", label: "Day" },
                { key: "session", label: "Session" },
                { key: "format", label: "Format" },
                { key: "time", label: "Time" },
                { key: "status", label: "Status" },
              ]}
              rows={[
                { day: "Tuesday", session: "Cybersecurity Core Session", format: "In-person", time: "9:00 - 11:00", status: "status:Healthy" },
                { day: "Thursday", session: "Project Studio", format: "Hybrid", time: "14:00 - 16:00", status: "status:Healthy" },
                { day: "Friday", session: "Mentor Office Hours", format: "Online", time: "17:00 - 18:00", status: "status:Review" },
                { day: "Saturday", session: "Family Progress Review", format: "Online", time: "10:00 - 10:45", status: "status:Healthy" },
              ]}
            />

            <SettingsPanel
              title="Calendar preferences"
              description="Controls for reminders and scheduling visibility."
              items={[
                { label: "Push reminders", value: "Session notifications go out before each learning block.", enabled: true },
                { label: "Guardian summaries", value: "Families receive weekly schedule snapshots.", enabled: true },
                { label: "Auto-reschedule suggestions", value: "Disabled until make-up session logic is finalized.", enabled: false },
                { label: "Room alerts", value: "Room and link changes appear inside the dashboard feed.", enabled: true },
              ]}
            />
          </div>

          <InsightPanels title="Schedule insights" items={[
            { title: "Tuesday remains the anchor day", subtitle: "The highest-attendance session still lands in the first half of the week.", meta: "Cadence", tone: "indigo" },
            { title: "Hybrid sessions reduce friction", subtitle: "Learners respond well when studio time can flex between remote and on-site participation.", meta: "Format", tone: "emerald" },
            { title: "Family visibility improves attendance", subtitle: "Guardian review checkpoints correlate with stronger session preparation.", meta: "Support", tone: "amber" },
          ]} />
        </div>
      </DashboardSection>
    </DashboardPageShell>
  );
}
