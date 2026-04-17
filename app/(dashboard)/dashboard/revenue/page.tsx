import {
  HighlightCards,
  InsightPanels,
  RichTableCard,
  SettingsPanel,
} from "@/components/dashboard/dashboard-content-blocks";
import { DashboardPageShell, DashboardSection } from "@/components/dashboard/dashboard-page-shell";

export default function RevenuePage() {
  return (
    <DashboardPageShell
      eyebrow="Revenue"
      title="Revenue performance and finance intelligence"
      description="Give leadership a sharper snapshot of payment inflow, top tracks, and the health of the current enrollment revenue engine."
      stats={[
        { label: "Monthly revenue", value: "$18.9K", note: "Dummy current-month income across active learner and family payments." },
        { label: "Projected intake", value: "$24.6K", note: "Expected revenue if the visible pending queue completes at current pace." },
        { label: "Top track", value: "Cybersecurity", note: "The strongest contributor to paid enrollment volume this month." },
        { label: "Refund risk", value: "1.8%", note: "Low current refund exposure across visible finance records." },
      ]}
      actions={[
        { label: "Download revenue report" },
        { label: "Review payment mix" },
        { label: "Compare cohort performance" },
      ]}
      feed={[
        { title: "Weekly revenue summary generated", detail: "Leadership analytics refreshed after the latest finance sync.", time: "18m ago" },
        { title: "Cybersecurity track moved up", detail: "New paid enrollments widened its lead over other tracks.", time: "1h ago" },
        { title: "Installment revenue updated", detail: "Scheduled payment projections were recalculated for the month.", time: "4h ago" },
      ]}
    >
      <DashboardSection title="Leadership finance view" description="Revenue now has a more executive-friendly layout with channel mix, forecasting, and pace signals.">
        <div className="space-y-6">
          <HighlightCards items={[
            { label: "Fastest growth", value: "+18%", detail: "Networking has the strongest week-over-week paid enrollment increase.", tone: "emerald" },
            { label: "Cash mode", value: "Stable", detail: "Payment completion remains healthy across the primary billing paths.", tone: "indigo" },
            { label: "Forecast gap", value: "$2.1K", detail: "This is the difference between current paid volume and target pace.", tone: "amber" },
            { label: "Refund watch", value: "Low", detail: "Very few accounts show signals that suggest reversal or dropout risk.", tone: "slate" },
          ]} />

          <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
            <RichTableCard
              title="Revenue by track"
              description="A dummy mix of course and cohort revenue signals for leadership review."
              columns={[
                { key: "track", label: "Track" },
                { key: "cohort", label: "Cohort" },
                { key: "paid", label: "Paid" },
                { key: "forecast", label: "Forecast" },
                { key: "status", label: "Status" },
              ]}
              rows={[
                { track: "Cybersecurity", cohort: "Morning June", paid: "$6,400", forecast: "$7,100", status: "status:Healthy" },
                { track: "Networking", cohort: "Weekend July", paid: "$4,980", forecast: "$6,200", status: "status:Healthy" },
                { track: "Computer Hardware", cohort: "Starter Intake", paid: "$2,200", forecast: "$3,400", status: "status:Review" },
                { track: "Graphic Design + AI", cohort: "Online August", paid: "$1,750", forecast: "$2,900", status: "status:Pending" },
              ]}
            />

            <SettingsPanel
              title="Forecast controls"
              description="Inputs shaping executive reporting and pacing alerts."
              items={[
                { label: "Projection refresh", value: "Forecasts update after every successful payment sync.", enabled: true },
                { label: "Leadership digest", value: "Weekly revenue snapshots are shared with admins.", enabled: true },
                { label: "Refund exclusion", value: "Potential reversals are still included in headline totals.", enabled: false },
                { label: "Track comparison cards", value: "Visible inside leadership and finance routes.", enabled: true },
              ]}
            />
          </div>

          <InsightPanels title="Revenue insights" items={[
            { title: "Cybersecurity remains the anchor", subtitle: "It continues to set the pace for both paid volume and overall forecast confidence.", meta: "Core", tone: "indigo" },
            { title: "Networking is accelerating", subtitle: "Weekend demand and clearer course positioning are improving financial upside.", meta: "Growth", tone: "emerald" },
            { title: "Creative tracks need more nurture", subtitle: "Graphic Design + AI still benefits from stronger marketing and family education.", meta: "Pipeline", tone: "amber" },
          ]} />
        </div>
      </DashboardSection>
    </DashboardPageShell>
  );
}
