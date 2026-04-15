import { DashboardPageShell, DashboardSection, PlaceholderGrid } from "@/components/dashboard/dashboard-page-shell";

export default function ProgressPage() {
  return (
    <DashboardPageShell
      eyebrow="Progress"
      title="Learner progress and milestone reporting"
      description="Track improvement, completion milestones, and intervention opportunities across the active learner journey."
      stats={[
        { label: "Overall progress", value: "82%", note: "Current weighted learner progress across sessions, tasks, and milestones." },
        { label: "Milestones reached", value: "09", note: "Completed growth checkpoints in the current training cycle." },
        { label: "Skills mastered", value: "14", note: "Dummy count of completed competencies across the visible plan." },
        { label: "Next checkpoint", value: "3 days", note: "Time until the next scheduled progress review milestone." },
      ]}
      actions={[
        { label: "Open milestone report" },
        { label: "Review feedback history" },
        { label: "Share guardian summary" },
      ]}
      feed={[
        { title: "Milestone completed", detail: "One learner reached the password defense mastery checkpoint.", time: "13m ago" },
        { title: "Progress note published", detail: "A learner summary was shared with the family portal.", time: "1h ago" },
        { title: "Benchmark updated", detail: "Course progress targets were refreshed after the latest evaluation cycle.", time: "4h ago" },
      ]}
    >
      <DashboardSection
        title="Progress overview"
        description="This route can later support charts, milestone timelines, and downloadable reports for learners and guardians."
      >
        <PlaceholderGrid
          items={[
            { meta: "Mastery", title: "Security awareness progression", detail: "Learners are trending upward in phishing detection and account safety skills." },
            { meta: "Milestones", title: "Project completion checkpoints", detail: "Most learners are on pace for the next portfolio milestone." },
            { meta: "Guardian view", title: "Shared family summary", detail: "Progress reports can later be published directly into the parent experience." },
            { meta: "Support", title: "Intervention planning", detail: "Reserve this area for growth plans, mentorship, and recovery actions." },
          ]}
        />
      </DashboardSection>
    </DashboardPageShell>
  );
}
