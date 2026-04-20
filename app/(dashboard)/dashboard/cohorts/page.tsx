import { NicheDashboardPage } from "../_components/niche-dashboard-page";

export default function CohortsPage() {
  return (
    <NicheDashboardPage
      eyebrow="Cohort orchestration"
      title="Cohorts"
      description="Manage bootcamp groups, delivery windows, mentor allocation, and learner distribution across active cyber tracks."
      stats={[
        { label: "Live Cohorts", value: "06", note: "Currently active groups across beginner and advanced tracks." },
        { label: "Seats Open", value: "12", note: "Capacity still available for the next intake." },
        { label: "Mentors Assigned", value: "09", note: "Instructor and support staffing mapped to live cohorts." },
        { label: "Labs Scheduled", value: "28", note: "Hands-on sessions planned across the term calendar." },
      ]}
      actions={[
        { label: "Review enrollments", href: "/dashboard/enrollments" },
        { label: "Open roster", href: "/dashboard/roster" },
      ]}
      feed={[
        { title: "Weekend section expanded", detail: "An additional live lab section was added to support demand.", time: "16m ago" },
        { title: "Mentor assignment updated", detail: "Cloud security learners were redistributed for better support coverage.", time: "48m ago" },
      ]}
      highlights={[
        { title: "Placement readiness", detail: "Keep applications flowing into the right cohort without overloading mentors.", meta: "Admissions" },
        { title: "Delivery consistency", detail: "Balance session pacing, lab complexity, and instructor capacity.", meta: "Scheduling" },
        { title: "Capacity planning", detail: "Track seats and waitlists before the next campaign opens.", meta: "Planning" },
        { title: "Learner progression", detail: "Watch cohorts that are nearing certification or intervention thresholds.", meta: "Outcomes" },
      ]}
    />
  );
}
