import { DashboardPageShell, DashboardSection, PlaceholderGrid } from "@/components/dashboard/dashboard-page-shell";

export default function AssignmentsPage() {
  return (
    <DashboardPageShell
      eyebrow="Assignments"
      title="Task list and submission tracking"
      description="Keep learners focused with a single view of due work, completion progress, and instructor feedback status."
      stats={[
        { label: "Assignments due", value: "04", note: "Current tasks still waiting for submission in the learner workflow." },
        { label: "Completed", value: "17", note: "Assignments marked done in the current learning cycle." },
        { label: "Needs revision", value: "03", note: "Work returned with comments for improvement and resubmission." },
        { label: "Avg. completion", value: "84%", note: "Task completion strength across the current assignment bundle." },
      ]}
      actions={[
        { label: "Open due work" },
        { label: "Review feedback" },
        { label: "See completed tasks" },
      ]}
      feed={[
        { title: "Assignment unlocked", detail: "A new lab task was made available for the current learner track.", time: "16m ago" },
        { title: "Feedback returned", detail: "Instructor notes were attached to the latest worksheet submission.", time: "58m ago" },
        { title: "Due date reminder sent", detail: "Learners were reminded about the upcoming project checkpoint.", time: "2h ago" },
      ]}
    >
      <DashboardSection
        title="Assignment tracker"
        description="Later this page can hold learner-specific filtering, submission upload status, and grading history."
      >
        <PlaceholderGrid
          items={[
            { meta: "Due tomorrow", title: "Password security worksheet", detail: "Complete the checklist and submit your threat-response explanation." },
            { meta: "Due this week", title: "Phishing awareness quiz", detail: "Short graded activity covering suspicious email detection." },
            { meta: "Returned", title: "Digital footprint reflection", detail: "Read instructor comments and revise one section for clarity." },
            { meta: "Portfolio", title: "Mini project tracker", detail: "Space reserved for future project milestones and attachment handling." },
          ]}
        />
      </DashboardSection>
    </DashboardPageShell>
  );
}
