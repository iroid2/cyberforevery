import {
  HighlightCards,
  InsightPanels,
  RichTableCard,
  SettingsPanel,
} from "@/components/dashboard/dashboard-content-blocks";
import { DashboardPageShell, DashboardSection } from "@/components/dashboard/dashboard-page-shell";

export default function GradePortalPage() {
  return (
    <DashboardPageShell
      eyebrow="Grade Portal"
      title="Assessment review and grading control"
      description="Track learner performance, pending grading tasks, and quality of feedback across every active learning track."
      stats={[
        { label: "Pending reviews", value: "26", note: "Submitted work still waiting for instructor review or score confirmation." },
        { label: "Avg. score", value: "84%", note: "Blended dummy performance across quizzes, labs, and project checkpoints." },
        { label: "Late submissions", value: "07", note: "Assignments submitted outside the preferred feedback window." },
        { label: "Feedback sent", value: "41", note: "Learner feedback notes delivered this week across all visible groups." },
      ]}
      actions={[
        { label: "Open grading queue" },
        { label: "Review low scores" },
        { label: "Export grade summary" },
      ]}
      feed={[
        { title: "Lab grading batch completed", detail: "Networking lab submissions were scored and released to learners.", time: "16m ago" },
        { title: "Project checkpoint flagged", detail: "One learner needs a coaching follow-up after a missed milestone.", time: "1h ago" },
        { title: "Feedback digest sent", detail: "Parents and students received weekly progress commentary for graded work.", time: "3h ago" },
      ]}
    >
      <DashboardSection title="Assessment board" description="The grade portal now uses the same rich dashboard language as the rest of the admin and instructor views.">
        <div className="space-y-6">
          <HighlightCards items={[
            { label: "Top performer", value: "96%", detail: "Highest average currently belongs to the AI Trends workshop group.", tone: "emerald" },
            { label: "Needs review", value: "5", detail: "These submissions likely need rubric clarification or resubmission guidance.", tone: "amber" },
            { label: "Rubrics live", value: "12", detail: "Most active assessments already have a clear scoring model attached.", tone: "indigo" },
            { label: "Risk learners", value: "3", detail: "Three learners are consistently trending below the completion threshold.", tone: "rose" },
          ]} />

          <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
            <RichTableCard
              title="Grading queue"
              description="Instructor-facing work review with dummy submission data."
              columns={[
                { key: "assignment", label: "Assignment" },
                { key: "learner", label: "Learner" },
                { key: "track", label: "Track" },
                { key: "score", label: "Score" },
                { key: "status", label: "Status" },
              ]}
              rows={[
                { assignment: "Phishing Detection Quiz", learner: "Marcus Chen", track: "Cybersecurity", score: "91 / 100", status: "status:Healthy" },
                { assignment: "Router Mapping Lab", learner: "Naomi A.", track: "Networking", score: "78 / 100", status: "status:Review" },
                { assignment: "AI Ethics Reflection", learner: "Isaac T.", track: "AI Trends", score: "88 / 100", status: "status:Healthy" },
                { assignment: "Portfolio Draft", learner: "Riley K.", track: "Web Development", score: "Pending", status: "status:Pending" },
              ]}
            />

            <SettingsPanel
              title="Feedback settings"
              description="Controls shaping the grading experience and learner visibility."
              items={[
                { label: "Auto-release grades", value: "Scores publish once written feedback is attached.", enabled: true },
                { label: "Guardian performance digest", value: "Families receive weekly summaries of grading movement.", enabled: true },
                { label: "Resubmission window", value: "Currently open for formative labs and draft milestones only.", enabled: true },
                { label: "Anonymous review", value: "Disabled for now to preserve direct instructor coaching context.", enabled: false },
              ]}
            />
          </div>

          <InsightPanels title="Performance insights" items={[
            { title: "Quiz performance is strong", subtitle: "Short-form security and AI assessments are producing the highest early confidence scores.", meta: "Trend", tone: "emerald" },
            { title: "Project-based work needs more support", subtitle: "Longer submissions show wider quality gaps and benefit from scaffolded milestones.", meta: "Coaching", tone: "amber" },
            { title: "Feedback speed matters", subtitle: "Learner momentum stays higher when grades and comments are returned within 48 hours.", meta: "Ops", tone: "indigo" },
          ]} />
        </div>
      </DashboardSection>
    </DashboardPageShell>
  );
}
