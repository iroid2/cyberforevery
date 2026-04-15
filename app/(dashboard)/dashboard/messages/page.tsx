import { DashboardPageShell, DashboardSection, PlaceholderGrid } from "@/components/dashboard/dashboard-page-shell";

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
      <DashboardSection
        title="Communication workspace"
        description="This route can later support full threaded messaging, announcements, and quick-reply templates."
      >
        <PlaceholderGrid
          items={[
            { meta: "Urgent", title: "Attendance clarification request", detail: "One guardian asked for support around a missed session and make-up plan." },
            { meta: "Operations", title: "Billing update discussion", detail: "Staff are coordinating a payment reminder for a pending invoice group." },
            { meta: "Instruction", title: "Learner progress follow-up", detail: "An instructor flagged a learner needing extra encouragement this week." },
            { meta: "Announcements", title: "Upcoming cohort reminder", detail: "Reserve this area for scheduled notices and broadcast drafts." },
          ]}
        />
      </DashboardSection>
    </DashboardPageShell>
  );
}
