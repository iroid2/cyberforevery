import { NicheDashboardPage } from "../_components/niche-dashboard-page";

export default function AssignmentsPage() {
  return (
    <NicheDashboardPage
      eyebrow="Lab workload"
      title="Assignments"
      description="Manage active tasks, submission timelines, and practical cyber challenges across the learner experience."
      stats={[
        { label: "Open Tasks", value: "04", note: "Assignments currently active for the learner journey." },
        { label: "Due Soon", value: "02", note: "Tasks reaching deadline within the next 72 hours." },
        { label: "Awaiting Review", value: "03", note: "Submitted items still waiting on mentor feedback." },
        { label: "Completed", value: "14", note: "Assignments already finished in the active cohort." },
      ]}
      actions={[
        { label: "View schedule", href: "/dashboard/schedule" },
        { label: "Track progress", href: "/dashboard/progress" },
      ]}
      feed={[
        { title: "Reverse engineering task unlocked", detail: "A new challenge opened after the previous milestone was completed.", time: "Today" },
        { title: "Submission feedback posted", detail: "Mentor review is available for the latest exploit analysis task.", time: "Yesterday" },
      ]}
      highlights={[
        { title: "Challenge sequencing", detail: "Assignments should map cleanly to learner skill development.", meta: "Learning" },
        { title: "Submission health", detail: "Surface overdue or stalled tasks before they become blockers.", meta: "Risk" },
        { title: "Mentor review flow", detail: "Keep learners informed when work is pending assessment.", meta: "Feedback" },
        { title: "Evidence of growth", detail: "Assignment history builds the learner’s achievement story.", meta: "Portfolio" },
      ]}
    />
  );
}
