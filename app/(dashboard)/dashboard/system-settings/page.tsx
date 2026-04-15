import { DashboardPageShell, DashboardSection, PlaceholderGrid } from "@/components/dashboard/dashboard-page-shell";

export default function SystemSettingsPage() {
  return (
    <DashboardPageShell
      eyebrow="System Settings"
      title="Platform settings and configuration"
      description="Control feature flags, authentication options, integrations, and environment-level operational settings from one admin screen."
      stats={[
        { label: "Active integrations", value: "07", note: "Email, payments, analytics, auth providers, and reporting pipelines are connected." },
        { label: "Feature flags", value: "14", note: "Controlled rollout toggles are available for operational and learning features." },
        { label: "Security policies", value: "09", note: "Password, session, and provider policies are active across the platform." },
        { label: "Pending changes", value: "03", note: "Three staged configuration updates are ready for final review." },
      ]}
      actions={[
        { label: "Review auth providers" },
        { label: "Open feature flag registry" },
        { label: "Run health diagnostics" },
      ]}
      feed={[
        { title: "Stripe health check passed", detail: "Payment integration returned a healthy status in the latest automated check.", time: "12m ago" },
        { title: "Google auth verified", detail: "OAuth configuration was validated after the last deployment window.", time: "49m ago" },
        { title: "Email queue stabilized", detail: "Retry backlog dropped back into the normal threshold range.", time: "2h ago" },
      ]}
    >
      <DashboardSection
        title="Configuration overview"
        description="Starter content for the settings page. This can later be expanded into editable sections for authentication, communications, billing, and release controls."
      >
        <PlaceholderGrid
          items={[
            { meta: "Authentication", title: "Sign-in providers", detail: "Manage credentials, Google, Facebook, LinkedIn, and future enterprise SSO options." },
            { meta: "Platform", title: "Release controls", detail: "Gate new features gradually with environment-specific flags and access scopes." },
            { meta: "Operations", title: "Notification defaults", detail: "Set email templates, retry behavior, onboarding cadence, and admin alerts." },
            { meta: "Security", title: "Session policies", detail: "Define token lifetime, forced logout windows, and device/session trust rules." },
          ]}
        />
      </DashboardSection>
    </DashboardPageShell>
  );
}
