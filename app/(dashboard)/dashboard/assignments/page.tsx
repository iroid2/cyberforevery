import {
  HighlightCards,
  InsightPanels,
  RichTableCard,
  SettingsPanel,
} from "@/components/dashboard/dashboard-content-blocks";
import { DashboardPageShell, DashboardSection } from "@/components/dashboard/dashboard-page-shell";

export default function AssignmentsPage() {
  return (
    <DashboardPageShell
      eyebrow="Assignments"
      title="Learner tasks and submission workflow"
      description="Keep track of active assignments, due dates, and learner submission momentum in a clearer student-facing workspace."
      stats={[
        { label: "Open tasks", value: "09", note: "Assignments still active across the current learning cycle." },
        { label: "Due this week", value: "03", note: "Tasks that should be finished before the next class checkpoint." },
        { label: "Submitted", value: "14", note: "Recent work turned in across labs, quizzes, and reflection prompts." },
        { label: "Completion", value: "87%", note: "Average completion rate for the visible assignment queue." },
      ]}
      actions={[
        { label: "Open task board" },
        { label: "Review due soon" },
        { label: "Download rubric pack" },
      ]}
      feed={[
        { title: "New quiz published", detail: "A phishing awareness assessment is now available to learners.", time: "13m ago" },
        { title: "Submission received", detail: "A web development portfolio draft was uploaded for review.", time: "58m ago" },
        { title: "Reminder scheduled", detail: "Due-soon prompts will go out to learners tonight.", time: "4h ago" },
      ]}
    >
      <DashboardSection title="Task command board" description="Assignments now use a fuller layout with task status, due windows, and support settings.">
        <div className="space-y-6">
          <HighlightCards items={[
            { label: "Priority task", value: "Portfolio Draft", detail: "This longer-form submission carries the biggest weight in the current cycle.", tone: "indigo" },
            { label: "Finished early", value: "5", detail: "A handful of learners are already ahead of the normal submission pace.", tone: "emerald" },
            { label: "Need reminders", value: "4", detail: "These tasks are close enough to deadline to justify another learner nudge.", tone: "amber" },
            { label: "Overdue", value: "1", detail: "One assignment has slipped outside the preferred submission window.", tone: "rose" },
          ]} />

          <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
            <RichTableCard
              title="Active assignments"
              description="A realistic task list for the current learning cycle."
              columns={[
                { key: "task", label: "Task" },
                { key: "track", label: "Track" },
                { key: "due", label: "Due" },
                { key: "progress", label: "Progress" },
                { key: "status", label: "Status" },
              ]}
              rows={[
                { task: "Phishing Awareness Quiz", track: "Cybersecurity", due: "Wed 18:00", progress: "progress:95%", status: "status:Healthy" },
                { task: "Router Mapping Lab", track: "Networking", due: "Thu 16:00", progress: "progress:71%", status: "status:Review" },
                { task: "AI Trend Reflection", track: "AI Trends", due: "Fri 20:00", progress: "progress:88%", status: "status:Healthy" },
                { task: "Landing Page Draft", track: "Web Development", due: "Overdue", progress: "progress:42%", status: "status:Overdue" },
              ]}
            />

            <SettingsPanel
              title="Assignment settings"
              description="Controls shaping task delivery and learner visibility."
              items={[
                { label: "Reminder cadence", value: "Learners receive nudges at 48 hours and 12 hours before due time.", enabled: true },
                { label: "Guardian visibility", value: "Families can review task status for linked learners.", enabled: true },
                { label: "Late submission grace", value: "Grace mode is limited to formative exercises.", enabled: true },
                { label: "Auto-lock overdue tasks", value: "Disabled while the team finalizes retake policy.", enabled: false },
              ]}
            />
          </div>

          <InsightPanels title="Task insights" items={[
            { title: "Quizzes close quickly", subtitle: "Short security assessments keep the best completion rate in the current dummy dataset.", meta: "Momentum", tone: "emerald" },
            { title: "Projects need clearer pacing", subtitle: "Longer creative or build-based tasks benefit from milestone breakdowns and more visible rubrics.", meta: "Support", tone: "amber" },
            { title: "Family visibility helps", subtitle: "Guardian-facing status snapshots are a strong lever for due-date consistency.", meta: "Comms", tone: "indigo" },
          ]} />
        </div>
      </DashboardSection>
    </DashboardPageShell>
  );
}
