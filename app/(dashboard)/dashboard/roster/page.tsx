import { DashboardPageShell, DashboardSection, PlaceholderGrid } from "@/components/dashboard/dashboard-page-shell";

export default function RosterPage() {
  return (
    <DashboardPageShell
      eyebrow="Roster"
      title="Learner roster and classroom assignment view"
      description="Give instructors and admins a clear picture of assigned learners, attendance readiness, and classroom grouping."
      stats={[
        { label: "Assigned learners", value: "64", note: "Learners currently allocated to your visible teaching groups." },
        { label: "Active groups", value: "05", note: "Classes with active sessions, roster ownership, and published materials." },
        { label: "Needs attention", value: "06", note: "Learners with attendance, progress, or communication flags." },
        { label: "Average readiness", value: "89%", note: "Weighted readiness across onboarding, attendance, and content access." },
      ]}
      actions={[
        { label: "Open class grouping" },
        { label: "Review learner notes" },
        { label: "Message guardians" },
      ]}
      feed={[
        { title: "Roster synced", detail: "Latest cohort assignments were refreshed into the instructor workspace.", time: "11m ago" },
        { title: "Progress flag raised", detail: "One learner dropped below the expected completion threshold.", time: "55m ago" },
        { title: "Guardian note added", detail: "A parent submitted a scheduling request for an upcoming session.", time: "2h ago" },
      ]}
    >
      <DashboardSection
        title="Class grouping overview"
        description="This screen can later grow into a full roster table with filters by cohort, completion, guardian status, and attendance risk."
      >
        <PlaceholderGrid
          items={[
            { meta: "Group A", title: "Cybersecurity Foundations", detail: "18 learners, strong progress, two learners flagged for attendance review." },
            { meta: "Group B", title: "Networking Lab Cohort", detail: "14 learners, assignment completion trending ahead of schedule." },
            { meta: "Group C", title: "AI Trends Workshop", detail: "11 learners, high engagement but one learner awaiting onboarding completion." },
            { meta: "Operations", title: "Mentor support queue", detail: "Reserve this area for mentor matching, notes, and individualized support actions." },
          ]}
        />
      </DashboardSection>
    </DashboardPageShell>
  );
}
