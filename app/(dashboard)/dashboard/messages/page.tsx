import {
  HighlightCards,
  InsightPanels,
  RichTableCard,
  SettingsPanel,
} from "@/components/dashboard/dashboard-content-blocks";
import { DashboardPageShell, DashboardSection } from "@/components/dashboard/dashboard-page-shell";

export default function MessagesPage() {
  return (
    <DashboardPageShell
      eyebrow="Messages"
      title="Communication center and message follow-up"
      description="Centralize conversations with staff, instructors, learners, and families in one searchable dashboard route."
      stats={[
        { label: "Unread messages", value: "18", note: "New threads and replies waiting for review across the visible inbox." },
        { label: "Resolved today", value: "27", note: "Conversations marked complete or answered in the current workday." },
        { label: "Urgent threads", value: "04", note: "Messages flagged for immediate operational or learner follow-up." },
        { label: "Avg. reply time", value: "22m", note: "Dummy average first-response speed across communication channels." },
      ]}
      actions={[
        { label: "Open inbox" },
        { label: "Review urgent threads" },
        { label: "Start announcement draft" },
      ]}
      feed={[
        { title: "Guardian reply received", detail: "A family responded to the latest schedule coordination message.", time: "6m ago" },
        { title: "Staff note resolved", detail: "Operations closed a billing clarification conversation successfully.", time: "38m ago" },
        { title: "Announcement drafted", detail: "A new cohort reminder message was prepared for review.", time: "2h ago" },
      ]}
    >
      <DashboardSection title="Inbox workspace" description="Messages now has a fuller communication layout with thread status, urgency, and announcement settings.">
        <div className="space-y-6">
          <HighlightCards items={[
            { label: "Fast replies", value: "91%", detail: "Most family and learner messages still receive a same-day first response.", tone: "emerald" },
            { label: "Urgent queue", value: "4", detail: "These threads touch attendance, billing, or a learner support concern.", tone: "rose" },
            { label: "Announcements", value: "3", detail: "Broadcast drafts are waiting on final review before sending.", tone: "indigo" },
            { label: "Family follow-up", value: "7", detail: "Guardians still waiting on a clear response or next action.", tone: "amber" },
          ]} />

          <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
            <RichTableCard
              title="Active threads"
              description="A realistic thread list covering guardian, staff, and learner conversations."
              columns={[
                { key: "thread", label: "Thread" },
                { key: "owner", label: "Owner" },
                { key: "channel", label: "Channel" },
                { key: "last", label: "Last update" },
                { key: "status", label: "Status" },
              ]}
              rows={[
                { thread: "Attendance clarification request", owner: "Guardian", channel: "Inbox", last: "6m ago", status: "status:Review" },
                { thread: "Billing update discussion", owner: "Operations", channel: "Internal", last: "38m ago", status: "status:Healthy" },
                { thread: "Learner progress follow-up", owner: "Instructor", channel: "Inbox", last: "1h ago", status: "status:Pending" },
                { thread: "Cohort reminder announcement", owner: "Admin", channel: "Broadcast", last: "2h ago", status: "status:Healthy" },
              ]}
            />

            <SettingsPanel
              title="Communication settings"
              description="Controls for thread handling and outbound notices."
              items={[
                { label: "Urgent routing", value: "High-priority threads route to ops and support leads.", enabled: true },
                { label: "Broadcast drafting", value: "Admins can draft notices before final approval.", enabled: true },
                { label: "Auto-resolve inactive threads", value: "Disabled so nothing closes without review.", enabled: false },
                { label: "Guardian copy on learner alerts", value: "Family contacts are included on key support messages.", enabled: true },
              ]}
            />
          </div>

          <InsightPanels title="Communication insights" items={[
            { title: "Families ask about logistics most", subtitle: "Schedules, attendance, and billing still dominate incoming guardian threads.", meta: "Pattern", tone: "amber" },
            { title: "Internal notes are moving faster", subtitle: "Staff-to-staff communication is resolving with less friction than before.", meta: "Ops", tone: "emerald" },
            { title: "Announcements are a strong lever", subtitle: "Broadcast reminders reduce repeated one-off questions when timed well.", meta: "Strategy", tone: "indigo" },
          ]} />
        </div>
      </DashboardSection>
    </DashboardPageShell>
  );
}
