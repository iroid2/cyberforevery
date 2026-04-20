import { NicheDashboardPage } from "../_components/niche-dashboard-page";

export default function HelpPage() {
  return (
    <NicheDashboardPage
      eyebrow="Support center"
      title="Help Center"
      description="Find support pathways for enrollments, labs, learner progress, billing questions, and platform access."
      stats={[
        { label: "Support Guides", value: "12", note: "Core help topics covering the main bootcamp workflows." },
        { label: "Urgent Paths", value: "03", note: "Fast routes for blocked learners, families, or instructors." },
        { label: "Common Topics", value: "05", note: "Highest-volume questions from recent platform activity." },
        { label: "Response Goal", value: "< 24h", note: "Target turnaround for standard support requests." },
      ]}
      actions={[
        { label: "Open messages", href: "/dashboard/messages" },
        { label: "Review profile", href: "/dashboard/profile" },
      ]}
      feed={[
        { title: "Admissions FAQ refreshed", detail: "Support guidance was updated for the next intake cycle.", time: "Today" },
        { title: "Lab access steps shared", detail: "A learner support note was published for browser-based labs.", time: "Yesterday" },
      ]}
      highlights={[
        { title: "Enrollment support", detail: "Guide families through applications, payments, and cohort placement.", meta: "Admissions" },
        { title: "Learning support", detail: "Help learners recover quickly when labs, schedules, or assignments become blockers.", meta: "Learners" },
        { title: "Instructor support", detail: "Keep mentors clear on where to escalate operations or platform issues.", meta: "Teaching" },
        { title: "Platform access", detail: "Surface the right path for account, certificate, and profile questions.", meta: "Access" },
      ]}
    />
  );
}
