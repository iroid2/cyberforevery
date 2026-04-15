import { DashboardPageShell, DashboardSection, PlaceholderGrid } from "@/components/dashboard/dashboard-page-shell";

export default function GradePortalPage() {
  return (
    <DashboardPageShell
      eyebrow="Grade Portal"
      title="Assignment scoring and learner performance"
      description="Review submissions, score assignments, and monitor learner achievement from a single grading workspace."
      stats={[
        { label: "Pending grading", value: "12", note: "Assignments still waiting for final scoring or instructor comments." },
        { label: "Average score", value: "88%", note: "Current overall learner performance across active coursework." },
        { label: "Reviewed today", value: "19", note: "Submissions scored or commented on during the current day." },
        { label: "Needs remediation", value: "05", note: "Learners below the expected benchmark threshold." },
      ]}
      actions={[
        { label: "Open pending submissions" },
        { label: "Publish feedback batch" },
        { label: "Export grade summary" },
      ]}
      feed={[
        { title: "Feedback batch published", detail: "Learners received rubric notes for the latest security worksheet.", time: "10m ago" },
        { title: "Submission count increased", detail: "Four new assignments landed in the review queue.", time: "47m ago" },
        { title: "Remediation list updated", detail: "Two learners were added to the low-performance watchlist.", time: "2h ago" },
      ]}
    >
      <DashboardSection
        title="Grading workflow"
        description="This page is prepared for future rubric views, scoring tables, and learner-by-learner grading history."
      >
        <PlaceholderGrid
          items={[
            { meta: "Queue", title: "Security worksheet review", detail: "Assignments submitted from the primary cohort are waiting on final instructor notes." },
            { meta: "Released", title: "AI ethics reflection", detail: "Feedback and scores were published to the latest discussion assignment." },
            { meta: "Performance", title: "Strong learner progression", detail: "Most learners remain above the target mastery benchmark this week." },
            { meta: "Support", title: "Targeted learner coaching", detail: "Reserve this area for remediation plans and mentorship-linked grade recovery." },
          ]}
        />
      </DashboardSection>
    </DashboardPageShell>
  );
}
