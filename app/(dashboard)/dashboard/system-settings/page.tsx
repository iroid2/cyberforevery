import {
  HighlightCards,
  InsightPanels,
  RichTableCard,
  SettingsPanel,
} from "@/components/dashboard/dashboard-content-blocks";
import { DashboardPageShell, DashboardSection } from "@/components/dashboard/dashboard-page-shell";

export default function SystemSettingsPage() {
  return (
    <DashboardPageShell
      eyebrow="System Settings"
      title="Platform settings and configuration"
      description="Control integrations, release behavior, communications, and security posture from a single operational console."
      stats={[
        { label: "Active integrations", value: "07", note: "Email, billing, analytics, auth, and automation services are currently live." },
        { label: "Feature flags", value: "14", note: "Controlled rollout switches are available for both platform and classroom experiences." },
        { label: "Security policies", value: "09", note: "Session, password, and admin access controls are currently enforced." },
        { label: "Pending changes", value: "03", note: "Three staged configuration updates still need final operational approval." },
      ]}
      actions={[
        { label: "Review auth providers" },
        { label: "Open flag registry" },
        { label: "Run diagnostics" },
      ]}
      feed={[
        { title: "Stripe health check passed", detail: "Payment integration returned healthy signals in the latest automated check.", time: "12m ago" },
        { title: "Google auth verified", detail: "OAuth configuration remained valid after the last deployment window.", time: "49m ago" },
        { title: "Email queue stabilized", detail: "Retry backlog dropped back into the expected threshold range.", time: "2h ago" },
      ]}
    >
      <DashboardSection
        title="Operations control panels"
        description="These starter settings blocks give admins a realistic overview of what is live, what needs review, and which controls are currently enabled."
      >
        <div className="space-y-6">
          <HighlightCards
            items={[
              { label: "Deployment", value: "Healthy", detail: "Production edge routes, auth flows, and billing hooks are operating normally.", tone: "emerald" },
              { label: "Release Ring", value: "Beta", detail: "New learner portal enhancements are still limited to the staged rollout cohort.", tone: "indigo" },
              { label: "Comms Queue", value: "Low", detail: "Reminder emails and operational notices are moving without significant backlog.", tone: "amber" },
              { label: "Admin Risk", value: "1 Alert", detail: "One security recommendation remains open for privileged account review.", tone: "rose" },
            ]}
          />

          <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
            <RichTableCard
              title="Integration registry"
              description="A live-style registry for key services, ownership, and current environment health."
              columns={[
                { key: "service", label: "Service" },
                { key: "owner", label: "Owner" },
                { key: "scope", label: "Scope" },
                { key: "status", label: "Status" },
              ]}
              rows={[
                { service: "Resend Email", owner: "Communications", scope: "Onboarding + reminders", status: "status:Healthy" },
                { service: "Stripe Billing", owner: "Finance", scope: "Checkout + invoices", status: "status:Healthy" },
                { service: "NextAuth", owner: "Platform", scope: "Credentials + sessions", status: "status:Healthy" },
                { service: "Analytics Feed", owner: "Leadership", scope: "KPI dashboards", status: "status:Review" },
              ]}
            />

            <SettingsPanel
              title="Policy switches"
              description="Quick controls for high-impact operational behaviors."
              items={[
                { label: "Course registrations", value: "Open to guardians and staff intake flows.", enabled: true },
                { label: "Email automation", value: "Enrollment and billing messages continue automatically.", enabled: true },
                { label: "Maintenance banner", value: "Currently hidden from the public-facing site.", enabled: false },
                { label: "Beta curriculum tools", value: "Visible to internal instructional staff only.", enabled: true },
              ]}
            />
          </div>

          <InsightPanels
            title="Pending reviews"
            items={[
              { title: "Sender domain verification", subtitle: "Email delivery configuration should be confirmed before broad reminder campaigns go out.", meta: "Communications", tone: "amber" },
              { title: "Role audit refresh", subtitle: "Super-admin and staff permissions should be reviewed after the latest dashboard route normalization.", meta: "Security", tone: "rose" },
              { title: "New feature launch plan", subtitle: "The updated learner progress cards are staged and waiting for final sign-off.", meta: "Release", tone: "indigo" },
            ]}
          />
        </div>
      </DashboardSection>
    </DashboardPageShell>
  );
}
