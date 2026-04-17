import {
  HighlightCards,
  InsightPanels,
  RichTableCard,
  SettingsPanel,
} from "@/components/dashboard/dashboard-content-blocks";
import { DashboardPageShell, DashboardSection } from "@/components/dashboard/dashboard-page-shell";

export default function ProgressPage() {
  return (
    <DashboardPageShell
      eyebrow="Progress"
      title="Learner growth, milestones, and completion"
      description="Understand how learners are progressing through content, support milestones, and family-visible checkpoints."
      stats={[
        { label: "Average completion", value: "82%", note: "Weighted learning progress across the visible learner portfolio." },
        { label: "Milestones hit", value: "47", note: "Recent achievements unlocked across track modules and project work." },
        { label: "Needs support", value: "05", note: "Learners currently below the expected learning pace." },
        { label: "Positive trend", value: "+9%", note: "Dummy week-over-week improvement in overall completion movement." },
      ]}
      actions={[
        { label: "Open progress map" },
        { label: "Review support notes" },
        { label: "Share guardian summary" },
      ]}
      feed={[
        { title: "Milestone unlocked", detail: "A learner finished the networking lab progression path.", time: "10m ago" },
        { title: "Support note added", detail: "An instructor logged next steps for a student needing confidence support.", time: "1h ago" },
        { title: "Family summary prepared", detail: "Weekly progress snapshots were generated for linked guardian accounts.", time: "5h ago" },
      ]}
    >
      <DashboardSection title="Progress overview" description="The progress route now has a more complete dashboard structure for learners, guardians, and support staff.">
        <div className="space-y-6">
          <HighlightCards items={[
            { label: "Top completion", value: "94%", detail: "The strongest learner in view is already close to the end of the current path.", tone: "emerald" },
            { label: "Stretch zone", value: "3", detail: "A small group is slightly behind and would benefit from extra checkpoints.", tone: "amber" },
            { label: "Project confidence", value: "High", detail: "Hands-on work is trending upward after recent coaching support.", tone: "indigo" },
            { label: "Intervention risk", value: "1", detail: "One learner profile still needs closer pacing support this week.", tone: "rose" },
          ]} />

          <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
            <RichTableCard
              title="Learner progress tracker"
              description="A dummy progress table showing milestones, current focus, and learning health."
              columns={[
                { key: "learner", label: "Learner" },
                { key: "path", label: "Path" },
                { key: "focus", label: "Current focus" },
                { key: "progress", label: "Progress" },
                { key: "status", label: "Status" },
              ]}
              rows={[
                { learner: "Marcus Chen", path: "Cybersecurity", focus: "Threat detection labs", progress: "progress:94%", status: "status:Healthy" },
                { learner: "Naomi A.", path: "Networking", focus: "Network mapping", progress: "progress:72%", status: "status:Review" },
                { learner: "Isaac T.", path: "AI Trends", focus: "Ethics and prompting", progress: "progress:86%", status: "status:Healthy" },
                { learner: "Riley K.", path: "Web Development", focus: "Portfolio pacing", progress: "progress:49%", status: "status:At risk" },
              ]}
            />

            <SettingsPanel
              title="Visibility settings"
              description="Who sees progress updates and how often they refresh."
              items={[
                { label: "Guardian dashboards", value: "Family-linked progress snapshots are visible inside parent accounts.", enabled: true },
                { label: "Milestone celebration prompts", value: "Learners receive a reward message when major checkpoints are hit.", enabled: true },
                { label: "Auto-escalate low progress", value: "Disabled while support rules are still being tuned.", enabled: false },
                { label: "Instructor progress digest", value: "Daily summaries appear in the teacher workflow.", enabled: true },
              ]}
            />
          </div>

          <InsightPanels title="Growth insights" items={[
            { title: "Practical labs are driving confidence", subtitle: "Hands-on exercises are where learners show the clearest progress momentum.", meta: "Strength", tone: "emerald" },
            { title: "Portfolio work still needs structure", subtitle: "Creative and build-heavy tracks benefit from clearer stage-by-stage checklists.", meta: "Support", tone: "amber" },
            { title: "Family engagement remains valuable", subtitle: "Progress transparency keeps parents aligned with learner effort and next steps.", meta: "Family", tone: "indigo" },
          ]} />
        </div>
      </DashboardSection>
    </DashboardPageShell>
  );
}
