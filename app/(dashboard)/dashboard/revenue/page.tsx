import { NicheDashboardPage } from "../_components/niche-dashboard-page";

export default function RevenuePage() {
  return (
    <NicheDashboardPage
      eyebrow="Business health"
      title="Revenue"
      description="Monitor the commercial side of the bootcamp so growth, capacity, and program delivery stay aligned."
      stats={[
        { label: "Collected This Term", value: "$48K", note: "Revenue recognized from active enrollments and paid seats." },
        { label: "Projected Next Intake", value: "$22K", note: "Estimated revenue based on pipeline conversion and open seats." },
        { label: "Sponsor Coverage", value: "09", note: "Learners supported through scholarships or institutions." },
        { label: "Open Invoices", value: "04", note: "Billing records that still need completion." },
      ]}
      actions={[
        { label: "Open billing", href: "/dashboard/billing" },
        { label: "Review cohorts", href: "/dashboard/cohorts" },
      ]}
      feed={[
        { title: "Revenue forecast refreshed", detail: "Next-intake projections were updated using the latest admissions data.", time: "26m ago" },
        { title: "Sponsor-funded seat confirmed", detail: "An external partner finalized support for one learner.", time: "2h ago" },
      ]}
      highlights={[
        { title: "Capacity alignment", detail: "Revenue should map to the actual seats and mentor bandwidth available.", meta: "Planning" },
        { title: "Pipeline quality", detail: "Future intake strength depends on consistent admissions conversion.", meta: "Growth" },
        { title: "Sponsorship leverage", detail: "Institutional support can widen access without overloading operations.", meta: "Access" },
        { title: "Delivery sustainability", detail: "Healthy revenue supports labs, mentors, and learner success.", meta: "Stability" },
      ]}
    />
  );
}
