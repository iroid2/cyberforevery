import { NicheDashboardPage } from "../_components/niche-dashboard-page";

export default function GradePortalPage() {
  return (
    <NicheDashboardPage
      eyebrow="Assessment review"
      title="Grade Portal"
      description="Score learner submissions, leave feedback, and validate readiness for module advancement and certification."
      stats={[
        { label: "Pending Reviews", value: "18", note: "Submissions currently waiting for scoring and notes." },
        { label: "Avg Completion", value: "74%", note: "Average learner performance across recent assessment items." },
        { label: "Ready For Sign-Off", value: "09", note: "Learners close to completion review." },
        { label: "Feedback Freshness", value: "< 48h", note: "Target turnaround for grading response time." },
      ]}
      actions={[
        { label: "Review attendance", href: "/dashboard/attendance" },
        { label: "Issue certificates", href: "/dashboard/certificates" },
      ]}
      feed={[
        { title: "OSINT grading batch opened", detail: "New submissions are queued for mentor review.", time: "13m ago" },
        { title: "Capstone scores posted", detail: "A set of final challenge results was released to learners.", time: "52m ago" },
      ]}
      highlights={[
        { title: "Feedback speed", detail: "Quick scoring keeps learners motivated and unblocked.", meta: "Momentum" },
        { title: "Rubric consistency", detail: "Ensure technical evaluation stays aligned across mentors.", meta: "Quality" },
        { title: "Advancement signals", detail: "Use assessment data to decide next modules or support needs.", meta: "Progress" },
        { title: "Certification readiness", detail: "Validate learners before they enter the final issuance queue.", meta: "Outcome" },
      ]}
    />
  );
}
