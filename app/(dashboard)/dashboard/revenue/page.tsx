import { DashboardPageShell, DashboardSection, PlaceholderGrid } from "@/components/dashboard/dashboard-page-shell";

export default function RevenuePage() {
  return (
    <DashboardPageShell
      eyebrow="Revenue"
      title="Revenue analytics and financial performance"
      description="See the revenue picture across enrollments, payment completion, and upcoming finance opportunities."
      stats={[
        { label: "Monthly revenue", value: "$12.4K", note: "Dummy current-month revenue total across processed payments." },
        { label: "Projected next month", value: "$15.1K", note: "Expected intake based on current pending enrollments and payment pace." },
        { label: "Paid enrollments", value: "63", note: "Learners with completed payment status in the active window." },
        { label: "Revenue growth", value: "+12.4%", note: "Month-over-month growth trend across the current dummy finance dataset." },
      ]}
      actions={[
        { label: "Open finance trend view" },
        { label: "Export revenue report" },
        { label: "Review unpaid pipeline" },
      ]}
      feed={[
        { title: "Revenue snapshot updated", detail: "Monthly finance totals were refreshed after the latest billing sync.", time: "15m ago" },
        { title: "Growth benchmark raised", detail: "Finance forecasting was adjusted after stronger-than-expected conversions.", time: "1h ago" },
        { title: "Pending pipeline reviewed", detail: "Operations confirmed the next batch of expected finance inflows.", time: "5h ago" },
      ]}
    >
      <DashboardSection
        title="Revenue visibility"
        description="Later this route can host charts, cohort-by-cohort breakdowns, and finance-specific export controls."
      >
        <PlaceholderGrid
          items={[
            { meta: "Monthly", title: "Current revenue performance", detail: "Payments remain stable with visible momentum from active enrollment flow." },
            { meta: "Forecast", title: "Upcoming intake projections", detail: "Expected revenue increases are tied to pending enrollment completion." },
            { meta: "Operations", title: "Finance handoff readiness", detail: "This section can evolve into reconciliation and payout readiness tracking." },
            { meta: "Reporting", title: "Leadership summary", detail: "Reserve this area for executive finance highlights and variance notes." },
          ]}
        />
      </DashboardSection>
    </DashboardPageShell>
  );
}
