import { NicheDashboardPage } from "../_components/niche-dashboard-page";

export default function SystemSettingsPage() {
  return (
    <NicheDashboardPage
      eyebrow="Platform controls"
      title="System Settings"
      description="Configure the cyber bootcamp platform, operational defaults, and admin-side controls for delivery quality."
      stats={[
        { label: "Live Integrations", value: "05", note: "Core services currently supporting the platform experience." },
        { label: "Policy Checks", value: "09", note: "Security and workflow controls under active review." },
        { label: "Notification Rules", value: "14", note: "Automations supporting admissions and learner support." },
        { label: "Audit Priorities", value: "03", note: "Areas flagged for the next admin review cycle." },
      ]}
      actions={[
        { label: "Open user management", href: "/dashboard/user-management" },
        { label: "Review help center", href: "/dashboard/help" },
      ]}
      feed={[
        { title: "Notification policy updated", detail: "Reminder timing was adjusted for pending enrollments.", time: "27m ago" },
        { title: "Platform review queued", detail: "Admin settings were flagged for the next governance checkpoint.", time: "2h ago" },
      ]}
      highlights={[
        { title: "Operational defaults", detail: "Settings should support the way the bootcamp actually runs.", meta: "Config" },
        { title: "Security posture", detail: "Protect accounts, learner data, and admin workflows.", meta: "Security" },
        { title: "Workflow automation", detail: "Automate repetitive admin steps without losing visibility.", meta: "Efficiency" },
        { title: "Governance readiness", detail: "Keep high-impact controls easy to audit and adjust.", meta: "Oversight" },
      ]}
    />
  );
}
