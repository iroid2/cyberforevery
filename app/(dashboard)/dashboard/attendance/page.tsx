import {
  HighlightCards,
  InsightPanels,
  RichTableCard,
  SettingsPanel,
} from "@/components/dashboard/dashboard-content-blocks";
import { DashboardPageShell, DashboardSection } from "@/components/dashboard/dashboard-page-shell";

export default function AttendancePage() {
  return (
    <DashboardPageShell
      eyebrow="Attendance"
      title="Attendance tracking and session health"
      description="Monitor presence, absence trends, and intervention needs across all scheduled learning sessions."
      stats={[
        { label: "Attendance rate", value: "94%", note: "Average attendance across the visible session range this month." },
        { label: "Sessions today", value: "05", note: "Today's live and virtual sessions requiring attendance capture." },
        { label: "Late arrivals", value: "07", note: "Learners flagged for arriving outside the normal session tolerance." },
        { label: "Interventions", value: "03", note: "Attendance-related follow-ups recommended this week." },
      ]}
      actions={[
        { label: "Open today's register" },
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
        title="Daily register board"
        description="This route now reflects a richer attendance experience with session rows, interventions, and operational toggles."
      >
        <div className="space-y-6">
          <HighlightCards
            items={[
              { label: "Present today", value: "82", detail: "Total learners marked present across the current active register window.", tone: "emerald" },
              { label: "Absent", value: "5", detail: "These sessions need confirmation, excuse handling, or guardian follow-up.", tone: "amber" },
              { label: "Late trend", value: "3 Days", detail: "One learner has recorded repeated late arrivals in the same week.", tone: "rose" },
              { label: "Manual checks", value: "4", detail: "Four attendance records were adjusted by staff after register review.", tone: "indigo" },
            ]}
          />

          <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
            <RichTableCard
              title="Session register"
              description="A daily snapshot of attendance outcomes across visible sessions."
              columns={[
                { key: "session", label: "Session" },
                { key: "coach", label: "Coach" },
                { key: "present", label: "Present" },
                { key: "late", label: "Late" },
                { key: "status", label: "Status" },
              ]}
              rows={[
                { session: "Cybersecurity Morning", coach: "Elena Rodriguez", present: "17 / 20", late: "2", status: "status:Healthy" },
                { session: "Networking Lab", coach: "David O.", present: "12 / 14", late: "1", status: "status:Review" },
                { session: "AI Trends Workshop", coach: "Grace Atwine", present: "11 / 11", late: "0", status: "status:Healthy" },
                { session: "Web Development Flex", coach: "Mentor Team", present: "8 / 12", late: "3", status: "status:At risk" },
              ]}
            />

            <SettingsPanel
              title="Attendance controls"
              description="Options affecting capture, follow-up, and alert behavior."
              items={[
                { label: "Guardian absence alerts", value: "Parents are notified after repeated missed sessions.", enabled: true },
                { label: "Late arrival grace window", value: "Currently set to a 10-minute tolerance.", enabled: true },
                { label: "Bulk auto-marking", value: "Disabled so instructors can confirm final register accuracy.", enabled: false },
                { label: "Weekly intervention digest", value: "Staff receive a summary of emerging attendance concerns.", enabled: true },
              ]}
            />
          </div>

          <InsightPanels
            title="Attendance insights"
            items={[
              { title: "Morning cohorts are strongest", subtitle: "Earlier sessions continue to outperform evening groups on punctuality and full attendance.", meta: "Trend", tone: "emerald" },
              { title: "Flex learners need tighter reminders", subtitle: "Self-paced formats benefit most from calendar nudges and direct family follow-up.", meta: "Intervention", tone: "amber" },
              { title: "Manual edits remain low", subtitle: "Register correction volume suggests instructors are capturing sessions consistently.", meta: "Quality", tone: "indigo" },
            ]}
          />
        </div>
      </DashboardSection>
    </DashboardPageShell>
  );
}
