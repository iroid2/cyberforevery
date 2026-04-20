import { NicheDashboardPage } from "../_components/niche-dashboard-page";

export default function SchedulePage() {
  return (
    <NicheDashboardPage
      eyebrow="Learner calendar"
      title="Schedule"
      description="Keep track of upcoming labs, mentorship sessions, and milestone deadlines across the bootcamp journey."
      stats={[
        { label: "Upcoming Sessions", value: "03", note: "Live events scheduled in the next seven days." },
        { label: "Mentor Touchpoints", value: "02", note: "Planned support sessions or office hours." },
        { label: "Deadlines This Week", value: "04", note: "Assignments or milestone deliverables due soon." },
        { label: "Lab Hours", value: "11", note: "Estimated guided practice time on this week’s calendar." },
      ]}
      actions={[
        { label: "Open assignments", href: "/dashboard/assignments" },
        { label: "Check progress", href: "/dashboard/progress" },
      ]}
      feed={[
        { title: "Cloud defense lab added", detail: "A new practical session was added to this week’s calendar.", time: "Today" },
        { title: "Mentor session confirmed", detail: "A small-group support window was scheduled for capstone help.", time: "Yesterday" },
      ]}
      highlights={[
        { title: "Time awareness", detail: "Keep learners focused on what is next, not just what is overdue.", meta: "Clarity" },
        { title: "Workload pacing", detail: "Balance labs and deadlines to avoid unnecessary stress spikes.", meta: "Pacing" },
        { title: "Mentor access", detail: "Make support windows visible and easy to join.", meta: "Support" },
        { title: "Milestone timing", detail: "Keep final assessments and certificate deadlines coordinated.", meta: "Planning" },
      ]}
    />
  );
}
