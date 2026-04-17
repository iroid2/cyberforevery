import {
  HighlightCards,
  InsightPanels,
  RichTableCard,
  SettingsPanel,
} from "@/components/dashboard/dashboard-content-blocks";
import { DashboardPageShell, DashboardSection } from "@/components/dashboard/dashboard-page-shell";

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
      <DashboardSection title="Finance queue" description="Billing now has a fuller finance-oriented layout with invoice rows, risk signals, and reminder controls.">
        <div className="space-y-6">
          <HighlightCards items={[
            { label: "Collected today", value: "$1,840", detail: "Recent successful payments already reflected in the visible queue.", tone: "emerald" },
            { label: "Reminder batch", value: "12", detail: "Families currently included in the latest payment follow-up cycle.", tone: "amber" },
            { label: "Installment plans", value: "4", detail: "Accounts actively using staged payment arrangements.", tone: "indigo" },
            { label: "Overdue risk", value: "2", detail: "Two invoices are old enough to require manual staff review.", tone: "rose" },
          ]} />

          <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
            <RichTableCard
              title="Invoice tracker"
              description="A realistic billing queue for finance and family follow-up."
              columns={[
                { key: "account", label: "Account" },
                { key: "track", label: "Track" },
                { key: "amount", label: "Amount" },
                { key: "due", label: "Due" },
                { key: "status", label: "Status" },
              ]}
              rows={[
                { account: "Marcus Chen Family", track: "Cybersecurity", amount: "$480", due: "Paid", status: "status:Healthy" },
                { account: "Naomi A. Family", track: "Networking", amount: "$520", due: "Due Apr 19", status: "status:Pending" },
                { account: "Riley K. Family", track: "Web Development", amount: "$410", due: "Installment", status: "status:Review" },
                { account: "Ava N. Family", track: "Computer Hardware", amount: "$450", due: "Overdue", status: "status:Overdue" },
              ]}
            />

            <SettingsPanel
              title="Billing controls"
              description="Settings shaping invoice messaging and finance behavior."
              items={[
                { label: "Automated reminders", value: "Reminder emails continue for unpaid balances.", enabled: true },
                { label: "Installment support", value: "Families may request staggered payment plans.", enabled: true },
                { label: "Late fee automation", value: "Disabled while policy is still being finalized.", enabled: false },
                { label: "Guardian invoice access", value: "Parents can view payment status from their dashboard.", enabled: true },
              ]}
            />
          </div>

          <InsightPanels title="Finance insights" items={[
            { title: "Reminder emails still matter", subtitle: "Most pending balances convert after the first or second billing prompt.", meta: "Collection", tone: "emerald" },
            { title: "Installments reduce drop-off", subtitle: "Flexible payment structures help keep families engaged through the enrollment process.", meta: "Support", tone: "indigo" },
            { title: "Overdue accounts need a human touch", subtitle: "The oldest balances are more likely to move after direct staff outreach.", meta: "Risk", tone: "amber" },
          ]} />
        </div>
      </DashboardSection>
    </DashboardPageShell>
  );
}
