import { DashboardPageShell, DashboardSection, PlaceholderGrid } from "@/components/dashboard/dashboard-page-shell";

export default function ProfilePage() {
  return (
    <DashboardPageShell
      eyebrow="Profile"
      title="Personal profile and account preferences"
      description="Manage your identity details, communication preferences, and account-level settings inside the dashboard."
      stats={[
        { label: "Profile completion", value: "86%", note: "Identity, communication, and account details filled in across the visible profile." },
        { label: "Connected methods", value: "03", note: "Account sign-in and communication channels currently configured." },
        { label: "Security score", value: "91%", note: "Dummy profile strength based on password, session, and verification posture." },
        { label: "Pending updates", value: "02", note: "Two recommended profile improvements still available." },
      ]}
      actions={[
        { label: "Edit profile details" },
        { label: "Review notification settings" },
        { label: "Open security preferences" },
      ]}
      feed={[
        { title: "Profile verified", detail: "Account details were confirmed during the latest identity sync.", time: "12m ago" },
        { title: "Notification preference saved", detail: "Weekly summary communication settings were updated successfully.", time: "1h ago" },
        { title: "Security recommendation issued", detail: "A stronger password and backup method were suggested for this account.", time: "5h ago" },
      ]}
    >
      <DashboardSection
        title="Account profile workspace"
        description="This route can later host editable forms, security controls, and role-specific personal settings."
      >
        <PlaceholderGrid
          items={[
            { meta: "Identity", title: "Personal details", detail: "Name, role, email, and account metadata will live here." },
            { meta: "Preferences", title: "Communication controls", detail: "Choose reminders, weekly updates, guardian summaries, and product alerts." },
            { meta: "Security", title: "Account protection", detail: "Manage sessions, password updates, and recovery preferences." },
            { meta: "Personal", title: "Role-specific options", detail: "Reserve this area for learner, family, instructor, or admin-specific settings." },
          ]}
        />
      </DashboardSection>
    </DashboardPageShell>
  );
}
