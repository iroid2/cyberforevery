import {
  HighlightCards,
  InsightPanels,
  RichTableCard,
  SettingsPanel,
} from "@/components/dashboard/dashboard-content-blocks";
import { DashboardPageShell, DashboardSection } from "@/components/dashboard/dashboard-page-shell";

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
      <DashboardSection title="Account workspace" description="Profile now has a richer personal dashboard treatment instead of a plain placeholder panel.">
        <div className="space-y-6">
          <HighlightCards items={[
            { label: "Identity", value: "Verified", detail: "Primary account details look healthy and up to date.", tone: "emerald" },
            { label: "Notifications", value: "Weekly", detail: "Summary and event reminders are the active communication mode.", tone: "indigo" },
            { label: "Security", value: "Strong", detail: "Session posture and account setup are above the recommended baseline.", tone: "emerald" },
            { label: "Next step", value: "2 items", detail: "A few small profile updates could still improve account readiness.", tone: "amber" },
          ]} />

          <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
            <RichTableCard
              title="Account details"
              description="A structured profile view with identity and access details."
              columns={[
                { key: "field", label: "Field" },
                { key: "value", label: "Value" },
                { key: "source", label: "Source" },
                { key: "updated", label: "Updated" },
                { key: "status", label: "Status" },
              ]}
              rows={[
                { field: "Display name", value: "Ivan Admin", source: "Profile", updated: "Today", status: "status:Healthy" },
                { field: "Primary email", value: "admin@demo.com", source: "Auth", updated: "Today", status: "status:Healthy" },
                { field: "Role visibility", value: "Super Admin", source: "Access", updated: "Yesterday", status: "status:Healthy" },
                { field: "Backup contact", value: "Not added", source: "Profile", updated: "Pending", status: "status:Review" },
              ]}
            />

            <SettingsPanel
              title="Preference toggles"
              description="A compact account control area for communication and security behavior."
              items={[
                { label: "Weekly summary emails", value: "Receive a digest of platform movement and pending actions.", enabled: true },
                { label: "Security alerts", value: "Get notified when sensitive account changes occur.", enabled: true },
                { label: "Dark mode sync", value: "Theme preference can follow your local device setting.", enabled: true },
                { label: "Public profile card", value: "Disabled so account details stay private by default.", enabled: false },
              ]}
            />
          </div>

          <InsightPanels title="Profile insights" items={[
            { title: "Account looks strong", subtitle: "The main profile has good identity coverage and very few missing fields.", meta: "Health", tone: "emerald" },
            { title: "Backup details still matter", subtitle: "Adding a recovery path and secondary contact would reduce future admin friction.", meta: "Security", tone: "amber" },
            { title: "Personal settings should stay simple", subtitle: "The cleanest profile experiences surface only the most useful controls first.", meta: "UX", tone: "indigo" },
          ]} />
        </div>
      </DashboardSection>
    </DashboardPageShell>
  );
}
