import { DashboardPageShell, DashboardSection, PlaceholderGrid } from "@/components/dashboard/dashboard-page-shell";

export default function BillingPage() {
  return (
    <DashboardPageShell
      eyebrow="Billing"
      title="Invoices, balances, and payment actions"
      description="Track what has been paid, what is still outstanding, and which families or admins need the next billing action."
      stats={[
        { label: "Outstanding balance", value: "$3,980", note: "Current unpaid value across the visible billing queue." },
        { label: "Paid this month", value: "$12.4K", note: "Dummy monthly payment intake across visible transactions." },
        { label: "Invoices due", value: "11", note: "Active billing records still waiting on completion." },
        { label: "Payment success", value: "91%", note: "Healthy completion rate for successfully finalized payments." },
      ]}
      actions={[
        { label: "Review open invoices" },
        { label: "Download billing summary" },
        { label: "Send payment reminder" },
      ]}
      feed={[
        { title: "Invoice marked paid", detail: "One family payment was recorded successfully in the latest sync.", time: "9m ago" },
        { title: "Reminder batch sent", detail: "Outstanding invoice reminders were delivered to pending accounts.", time: "52m ago" },
        { title: "Balance summary refreshed", detail: "Finance totals updated after the most recent transaction import.", time: "3h ago" },
      ]}
    >
      <DashboardSection
        title="Billing queue overview"
        description="This page is ready for future invoice tables, payment timelines, and finance-specific actions."
      >
        <PlaceholderGrid
          items={[
            { meta: "Paid", title: "Cybersecurity cohort invoice", detail: "Payment confirmed and learner access fully unlocked." },
            { meta: "Pending", title: "Family portal balance", detail: "Outstanding balance still waiting for guardian payment completion." },
            { meta: "Follow-up", title: "Installment plan check", detail: "One account is in a staged payment arrangement needing reminder support." },
            { meta: "Finance", title: "Reporting export", detail: "Reserve this area for downloadable finance-ready billing exports." },
          ]}
        />
      </DashboardSection>
    </DashboardPageShell>
  );
}
