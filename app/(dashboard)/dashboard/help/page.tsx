import { DashboardPageShell, DashboardSection, PlaceholderGrid } from "@/components/dashboard/dashboard-page-shell";

export default function HelpPage() {
  return (
    <DashboardPageShell
      eyebrow="Help Center"
      title="Guides, support, and onboarding help"
      description="Use the dashboard help center to find walkthroughs, troubleshooting guidance, and support next steps."
      stats={[
        { label: "Help articles", value: "24", note: "Starter guidance articles covering onboarding, billing, and classroom support." },
        { label: "Popular guides", value: "06", note: "Most accessed knowledge-base entries this week." },
        { label: "Open support items", value: "03", note: "Issues still waiting for a final answer or next action." },
        { label: "Resolution rate", value: "94%", note: "Dummy help center closure success across current support traffic." },
      ]}
      actions={[
        { label: "Browse guides" },
        { label: "Open support request" },
        { label: "Read onboarding checklist" },
      ]}
      feed={[
        { title: "New help article published", detail: "A dashboard guide for navigating learner modules was added today.", time: "17m ago" },
        { title: "Support answer updated", detail: "Billing and invoice guidance now reflects the latest flow changes.", time: "1h ago" },
        { title: "Onboarding checklist refreshed", detail: "Support updated the getting-started sequence for new families.", time: "4h ago" },
      ]}
    >
      <DashboardSection
        title="Support resources"
        description="This route is ready for future searchable help articles, FAQs, and support intake forms."
      >
        <PlaceholderGrid
          items={[
            { meta: "Getting started", title: "Dashboard orientation", detail: "Learn how to navigate modules, messages, billing, and progress views." },
            { meta: "Billing", title: "Payment support guide", detail: "See invoice, reminder, and troubleshooting answers for common finance issues." },
            { meta: "Learning", title: "Session and assignment help", detail: "Find answers for schedules, attendance, assignments, and progress tracking." },
            { meta: "Support", title: "Escalation workflow", detail: "Reserve this area for contact forms, support routing, and issue priorities." },
          ]}
        />
      </DashboardSection>
    </DashboardPageShell>
  );
}
