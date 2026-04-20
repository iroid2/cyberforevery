import { NicheDashboardPage } from "../_components/niche-dashboard-page";

export default function EnrollmentsPage() {
  return (
    <NicheDashboardPage
      eyebrow="Admissions pipeline"
      title="Enrollments"
      description="Review applicant progress from inquiry through payment, onboarding, and cohort placement."
      stats={[
        { label: "Pending Review", value: "17", note: "Applications waiting on manual admissions checks." },
        { label: "Payment Pending", value: "06", note: "Families or sponsors still need to complete billing." },
        { label: "Ready To Place", value: "11", note: "Learners cleared for cohort assignment." },
        { label: "This Week", value: "29", note: "New or updated enrollment records touched in the past seven days." },
      ]}
      actions={[
        { label: "Open cohorts", href: "/dashboard/cohorts" },
        { label: "Respond to messages", href: "/dashboard/messages" },
      ]}
      feed={[
        { title: "Parent documents received", detail: "Three applications moved into the final review stage.", time: "7m ago" },
        { title: "Billing follow-up triggered", detail: "Outstanding invoice reminders were sent automatically.", time: "1h ago" },
      ]}
      highlights={[
        { title: "Fast admissions cycles", detail: "Reduce delays between inquiry, review, and placement.", meta: "Speed" },
        { title: "Data completeness", detail: "Make sure guardian details and learner context are captured early.", meta: "Records" },
        { title: "Placement quality", detail: "Route learners into the right cohort based on level and availability.", meta: "Fit" },
        { title: "Conversion tracking", detail: "Monitor where applicants are dropping off in the funnel.", meta: "Growth" },
      ]}
    />
  );
}
