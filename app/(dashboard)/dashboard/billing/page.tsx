import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import {
  HighlightCards,
  InsightPanels,
  RichTableCard,
  SettingsPanel,
} from "@/components/dashboard/dashboard-content-blocks";
import { DashboardPageShell, DashboardSection } from "@/components/dashboard/dashboard-page-shell";
import { getBillingDashboardData } from "@/lib/services/enrollments";

export default async function BillingPage() {
  const session = await auth();
  const role = (session?.user as { role?: UserRole } | undefined)?.role;
  const userId = session?.user?.id;

  if (!session?.user || !userId || (role !== UserRole.SUPER_ADMIN && role !== UserRole.PARENT)) {
    redirect("/dashboard");
  }

  const data = await getBillingDashboardData(userId, role);

  if (!data) {
    redirect("/dashboard");
  }

  return (
    <DashboardPageShell
      eyebrow="Billing"
      title="Invoices, balances, and payment actions"
      description="Track real payment state, outstanding balances, and family finance follow-up across the learner lifecycle."
      stats={[
        { label: "Outstanding balance", value: `$${data.stats.outstandingBalance.toFixed(2)}`, note: "Visible unpaid balance from the current billing dataset." },
        { label: "Paid total", value: `$${data.stats.paidThisMonth.toFixed(2)}`, note: "Successful payment value recorded in linked payment rows." },
        { label: "Invoices due", value: String(data.stats.invoicesDue).padStart(2, "0"), note: "Enrollments still waiting for payment completion." },
        { label: "Payment success", value: `${data.stats.paymentSuccess}%`, note: "Share of visible enrollments already backed by a successful payment record." },
      ]}
      actions={
        role === UserRole.SUPER_ADMIN
          ? [
              { label: "Review enrollments", href: "/dashboard/enrollments" },
              { label: "Open revenue view", href: "/dashboard/revenue" },
            ]
          : [
              { label: "Review certificates", href: "/dashboard/certificates" },
              { label: "Track learner progress", href: "/dashboard/progress" },
            ]
      }
      feed={data.feed}
    >
      <DashboardSection
        title="Finance queue"
        description="This billing page is now backed by real enrollment and payment records instead of a placeholder invoice grid."
      >
        <div className="space-y-6">
          <HighlightCards items={[
            { label: "Collected", value: `$${data.stats.collectedToday.toFixed(2)}`, detail: "Successful payment value reflected in the current view.", tone: "emerald" },
            { label: "Reminder batch", value: String(data.stats.reminderBatch), detail: "Visible accounts still waiting on a completed payment.", tone: "amber" },
            { label: "Installments", value: String(data.stats.installmentPlans), detail: "No installment workflow has been modeled yet in the backend.", tone: "indigo" },
            { label: "Overdue risk", value: String(data.stats.overdueRisk), detail: "Enrollments still unpaid and likely to need direct follow-up.", tone: "rose" },
          ]} />

          <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
            <RichTableCard
              title="Invoice tracker"
              description="Live payment visibility by family or learner, depending on the current role."
              columns={[
                { key: "account", label: "Account" },
                { key: "track", label: "Track" },
                { key: "amount", label: "Amount" },
                { key: "due", label: "Due" },
                { key: "status", label: "Status" },
              ]}
              rows={data.rows.map((row) => ({
                account: row.account,
                track: row.track,
                amount: row.amount,
                due: row.due,
                status: `status:${row.status}`,
              }))}
            />

            <SettingsPanel
              title="Billing controls"
              description="Current realities of the payment workflow reflected by the live backend."
              items={[
                { label: "Stripe-backed payments", value: "Successful checkout sessions are now persisted and visible in billing summaries.", enabled: true },
                { label: "Guardian visibility", value: "Parents can see payment state for their linked learner records.", enabled: true },
                { label: "Revenue linkage", value: "Billing is now reading from the same payment records used by the finance backend.", enabled: true },
                { label: "Installment workflow", value: "Flexible staged payment plans are not yet implemented as first-class records.", enabled: false },
              ]}
            />
          </div>

          <InsightPanels title="Finance insights" items={[
            { title: "Billing is now grounded in payments", subtitle: "These totals come from actual stored payment rows rather than mocked finance cards.", meta: "Data", tone: "emerald" },
            { title: "Unpaid enrollments are easy to spot", subtitle: "Operations and families can now quickly see which learner records still need payment completion.", meta: "Follow-up", tone: "amber" },
            { title: "The next upgrade is invoice actions", subtitle: "What remains here is payment reminders, downloadable receipts, and a clearer overdue policy workflow.", meta: "Next", tone: "indigo" },
          ]} />
        </div>
      </DashboardSection>
    </DashboardPageShell>
  );
}
