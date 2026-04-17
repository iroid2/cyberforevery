import {
  HighlightCards,
  InsightPanels,
  RichTableCard,
  SettingsPanel,
} from "@/components/dashboard/dashboard-content-blocks";
import { DashboardPageShell, DashboardSection } from "@/components/dashboard/dashboard-page-shell";

export default function HelpPage() {
  return (
    <DashboardPageShell
      eyebrow="Help"
      title="Guides, support resources, and platform help"
      description="A central support route for quick answers, onboarding help, and issue resolution across every dashboard role."
      stats={[
        { label: "Published guides", value: "24", note: "Knowledge base articles currently visible inside the support center." },
        { label: "Top article", value: "Billing access", note: "The most-viewed dummy guide in the current help snapshot." },
        { label: "Open support topics", value: "07", note: "Areas where users still need clearer onboarding or documentation." },
        { label: "Resolved rate", value: "89%", note: "Share of common requests answered by guides before staff intervention." },
      ]}
      actions={[
        { label: "Browse help guides" },
        { label: "Open support request" },
        { label: "Review onboarding docs" },
      ]}
      feed={[
        { title: "New guide published", detail: "A fresh article covering payment completion was added to the help center.", time: "20m ago" },
        { title: "FAQ updated", detail: "Enrollment answers were expanded after recent family questions.", time: "1h ago" },
        { title: "Support article reviewed", detail: "The instructor attendance guide received a language cleanup.", time: "3h ago" },
      ]}
    >
      <DashboardSection title="Support center" description="Help now feels like a real support hub instead of a placeholder route.">
        <div className="space-y-6">
          <HighlightCards items={[
            { label: "Fast answers", value: "18", detail: "High-confidence articles resolving frequent user questions.", tone: "emerald" },
            { label: "Need expansion", value: "4", detail: "These topics still deserve deeper explanation or screenshots.", tone: "amber" },
            { label: "Role-specific", value: "6", detail: "Guides tailored to students, parents, instructors, and admins.", tone: "indigo" },
            { label: "Escalations", value: "2", detail: "Topics still too complex for self-service only.", tone: "rose" },
          ]} />

          <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
            <RichTableCard
              title="Knowledge base"
              description="A starter support table for top help resources and their current health."
              columns={[
                { key: "guide", label: "Guide" },
                { key: "audience", label: "Audience" },
                { key: "owner", label: "Owner" },
                { key: "updated", label: "Updated" },
                { key: "status", label: "Status" },
              ]}
              rows={[
                { guide: "How billing works", audience: "Parents", owner: "Finance", updated: "Today", status: "status:Healthy" },
                { guide: "Joining a live session", audience: "Students", owner: "Support", updated: "Yesterday", status: "status:Healthy" },
                { guide: "Marking attendance", audience: "Instructors", owner: "Operations", updated: "2 days ago", status: "status:Review" },
                { guide: "Admin route access", audience: "Admins", owner: "Platform", updated: "Pending", status: "status:Pending" },
              ]}
            />

            <SettingsPanel
              title="Support settings"
              description="Controls for self-service help and escalation."
              items={[
                { label: "Guide search", value: "Users can browse searchable support content inside the dashboard.", enabled: true },
                { label: "Escalation form", value: "Requests can move from help articles to staff follow-up.", enabled: true },
                { label: "Contextual walkthroughs", value: "Disabled while inline tours are still being prepared.", enabled: false },
                { label: "Role-aware guide ordering", value: "The most relevant articles surface first by user role.", enabled: true },
              ]}
            />
          </div>

          <InsightPanels title="Help insights" items={[
            { title: "Billing and enrollment lead", subtitle: "Families mostly need clarity on payment timing, invoices, and getting started.", meta: "Pattern", tone: "amber" },
            { title: "Instructor docs are improving", subtitle: "Operational articles for teaching workflows are getting easier to follow.", meta: "Quality", tone: "emerald" },
            { title: "Role-aware support will matter", subtitle: "Different user groups need a more tailored first-help experience inside the dashboard.", meta: "UX", tone: "indigo" },
          ]} />
        </div>
      </DashboardSection>
    </DashboardPageShell>
  );
}
