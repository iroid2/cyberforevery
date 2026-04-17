import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { DashboardPageShell, DashboardSection } from "@/components/dashboard/dashboard-page-shell";
import { HighlightCards, InsightPanels, RichTableCard, SettingsPanel } from "@/components/dashboard/dashboard-content-blocks";
import { getProgressData } from "@/lib/services/assignments";

export default async function ProgressPage() {
  const session = await auth();
  const role = (session?.user as { role?: UserRole } | undefined)?.role;

  if (!session?.user || (role !== UserRole.STUDENT && role !== UserRole.PARENT)) {
    redirect("/dashboard");
  }

  const userId = session.user.id;
  if (!userId) {
    redirect("/login");
  }

  const data = await getProgressData(userId, role);

  if (!data || data.learners.length === 0) {
    return (
      <DashboardPageShell
        eyebrow="Progress"
        title="Learner growth, milestones, and completion"
        description="Progress reporting becomes available once learner records, assignments, and attendance data exist for this account."
        stats={[
          { label: "Average completion", value: "0%", note: "No learner progress data is available yet." },
          { label: "Milestones hit", value: "00", note: "Milestones will appear after assignments and attendance are recorded." },
          { label: "Needs support", value: "00", note: "Support flags will calculate once progress tracking is active." },
          { label: "Positive trend", value: "0%", note: "Trend analysis requires real learner history." },
        ]}
      >
        <DashboardSection title="No progress data yet" description="The page is now wired for real learner progress, but this account does not currently have any reportable learner data.">
          <div className="rounded-2xl border border-border bg-surface/50 p-6 text-sm text-muted">
            As soon as assignments, submissions, and attendance are connected to this account, progress metrics will appear here automatically.
          </div>
        </DashboardSection>
      </DashboardPageShell>
    );
  }

  const averageCompletion = Math.round(
    data.learners.reduce((sum, learner) => sum + learner.progress, 0) / data.learners.length,
  );
  const averageAttendance = Math.round(
    data.learners.reduce((sum, learner) => sum + learner.attendanceRate, 0) / data.learners.length,
  );
  const reviewedScores = data.learners.filter((learner) => learner.averageScore !== null);
  const averageScore = reviewedScores.length
    ? Math.round(reviewedScores.reduce((sum, learner) => sum + (learner.averageScore ?? 0), 0) / reviewedScores.length)
    : 0;
  const supportCount = data.learners.filter((learner) => learner.progress < 60).length;

  return (
    <DashboardPageShell
      eyebrow="Progress"
      title="Learner growth, milestones, and completion"
      description="This progress page is now driven by assignment submissions, review scores, and attendance instead of static placeholders."
      stats={[
        { label: "Average completion", value: `${averageCompletion}%`, note: "Combined assignment, score, and attendance progress across visible learners." },
        { label: "Attendance rate", value: `${averageAttendance}%`, note: "Attendance performance across tracked learner sessions." },
        { label: "Average score", value: `${averageScore}%`, note: "Average reviewed score across graded assignment submissions." },
        { label: "Needs support", value: String(supportCount).padStart(2, "0"), note: "Learners who are currently below the target progress threshold." },
      ]}
      actions={[
        { label: "Open assignments", href: "/dashboard/assignments" },
        { label: "Review schedule", href: "/dashboard/schedule" },
      ]}
      feed={data.learners.slice(0, 3).map((learner) => ({
        title: learner.name,
        detail: `${learner.openAssignments} open assignments • ${learner.attendanceRate}% attendance`,
        time: `${learner.progress}% progress`,
      }))}
    >
      <DashboardSection title="Learner progress tracker" description={data.mode === "student" ? "This is your personal progress view." : "This is a guardian view across linked learners."}>
        <div className="space-y-6">
          <HighlightCards
            items={[
              { label: "Learners", value: String(data.learners.length), detail: "Learners currently included in this progress view.", tone: "indigo" },
              { label: "On track", value: String(data.learners.filter((learner) => learner.progress >= 70).length), detail: "Learners currently meeting or exceeding the progress target.", tone: "emerald" },
              { label: "Open work", value: String(data.learners.reduce((sum, learner) => sum + learner.openAssignments, 0)), detail: "Assignments still waiting to be submitted across the visible learner set.", tone: "amber" },
              { label: "Watchlist", value: String(supportCount), detail: "Learners who would benefit from a support or pacing check-in.", tone: "rose" },
            ]}
          />

          <RichTableCard
            title="Progress by learner"
            description="Real learner progress rows now combine submissions, reviewed scores, and attendance."
            columns={[
              { key: "learner", label: "Learner" },
              { key: "path", label: "Assignments" },
              { key: "focus", label: "Attendance" },
              { key: "progress", label: "Progress" },
              { key: "status", label: "Status" },
            ]}
            rows={data.learners.map((learner) => ({
              learner: learner.name,
              path: `${learner.assignmentRate}% complete`,
              focus: `${learner.attendanceRate}% present`,
              progress: `progress:${learner.progress}%`,
              status: learner.progress >= 70 ? "status:Healthy" : learner.progress >= 50 ? "status:Review" : "status:At risk",
            }))}
          />

          <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
            <div className="space-y-4">
              {data.learners.map((learner) => (
                <article key={learner.name} className="rounded-[1.5rem] border border-[#c6c5d4]/20 bg-white p-6">
                  <h3 className="text-2xl font-extrabold tracking-tight text-[#191c1e]">{learner.name}</h3>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <Metric label="Overall progress" value={`${learner.progress}%`} />
                    <Metric label="Assignment completion" value={`${learner.assignmentRate}%`} />
                    <Metric label="Attendance rate" value={`${learner.attendanceRate}%`} />
                    <Metric label="Average score" value={learner.averageScore !== null ? `${learner.averageScore}%` : "Pending"} />
                  </div>
                </article>
              ))}
            </div>

            <SettingsPanel
              title="Progress settings"
              description="How this progress view is currently calculated and surfaced."
              items={[
                { label: "Assignment completion", value: "Completion now reflects whether each published assignment has a submission record.", enabled: true },
                { label: "Attendance weighting", value: "Attendance contributes directly to overall learner progress.", enabled: true },
                { label: "Review score visibility", value: "Instructor-reviewed scores appear once grading is completed.", enabled: true },
                { label: "Guardian reporting", value: "Parents can view the same learner metrics for linked students.", enabled: true },
              ]}
            />
          </div>

          <InsightPanels
            title="Growth insights"
            items={[
              { title: "Progress is now data-backed", subtitle: "Learner growth is calculated from real submissions and attendance instead of static mock values.", meta: "Foundation", tone: "emerald" },
              { title: "Assignment completion drives visibility", subtitle: "Students and parents can now quickly spot what work is still open.", meta: "Completion", tone: "indigo" },
              { title: "Support signals are emerging", subtitle: "Lower combined progress highlights which learners may need intervention next.", meta: "Support", tone: "amber" },
            ]}
          />
        </div>
      </DashboardSection>
    </DashboardPageShell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#c6c5d4]/20 bg-[#f7f9fb] p-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b7280]">{label}</p>
      <p className="mt-3 text-2xl font-extrabold tracking-tight text-[#191c1e]">{value}</p>
    </div>
  );
}
