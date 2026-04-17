import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AssignmentUploadCard } from "@/components/dashboard/assignment-upload-card";
import { DashboardPageShell, DashboardSection } from "@/components/dashboard/dashboard-page-shell";
import { HighlightCards, InsightPanels, RichTableCard, SettingsPanel } from "@/components/dashboard/dashboard-content-blocks";
import { getStudentAssignmentData } from "@/lib/services/assignments";

export default async function AssignmentsPage() {
  const session = await auth();
  const role = (session?.user as { role?: UserRole } | undefined)?.role;

  if (!session?.user || role !== UserRole.STUDENT) {
    redirect("/dashboard");
  }

  const userId = session.user.id;
  if (!userId) {
    redirect("/login");
  }

  const data = await getStudentAssignmentData(userId);

  if (!data) {
    return (
      <DashboardPageShell
        eyebrow="Assignments"
        title="Learner tasks and submission workflow"
        description="Your student account is active, but it is not linked to a learner record yet."
        stats={[
          { label: "Open tasks", value: "00", note: "No learner profile is linked to this account yet." },
          { label: "Due this week", value: "00", note: "Assignments will appear once your student profile is connected." },
          { label: "Submitted", value: "00", note: "No submissions available yet." },
          { label: "Completion", value: "0%", note: "Progress will unlock after your first assignment is published." },
        ]}
      >
        <DashboardSection title="Account setup needed" description="A student login exists, but it is not yet tied to a specific learner record in the database.">
          <div className="rounded-2xl border border-border bg-surface/50 p-6 text-sm text-muted">
            Ask an administrator to link this student account to a learner profile so assignments and progress can load correctly.
          </div>
        </DashboardSection>
      </DashboardPageShell>
    );
  }

  const assignments = data.assignments;
  const submittedCount = assignments.filter((assignment) => assignment.submission).length;
  const dueThisWeek = assignments.filter((assignment) => {
    if (!assignment.dueDate) return false;
    const diff = assignment.dueDate.getTime() - Date.now();
    return diff >= 0 && diff <= 1000 * 60 * 60 * 24 * 7;
  }).length;
  const completion = assignments.length ? Math.round((submittedCount / assignments.length) * 100) : 0;

  return (
    <DashboardPageShell
      eyebrow="Assignments"
      title="Learner tasks and submission workflow"
      description="Track your active assignments, upload work securely, and see what has already been submitted."
      stats={[
        { label: "Open tasks", value: String(assignments.length - submittedCount).padStart(2, "0"), note: "Assignments still waiting for your submission." },
        { label: "Due this week", value: String(dueThisWeek).padStart(2, "0"), note: "Assignments that are approaching their due date soon." },
        { label: "Submitted", value: String(submittedCount).padStart(2, "0"), note: "Assignments already uploaded from this student account." },
        { label: "Completion", value: `${completion}%`, note: "Submission completion across visible published assignments." },
      ]}
      actions={[
        { label: "View progress", href: "/dashboard/progress" },
        { label: "Review schedule", href: "/dashboard/schedule" },
      ]}
      feed={assignments.slice(0, 3).map((assignment) => ({
        title: assignment.title,
        detail: assignment.submission
          ? `Submitted file: ${assignment.submission.fileName ?? "Uploaded work"}`
          : `Awaiting submission for ${assignment.cohort.course.title}.`,
        time: assignment.dueDate
          ? assignment.dueDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })
          : "No due date",
      }))}
    >
      <DashboardSection title="Assignment board" description="This is now a live student task board backed by cohort assignments and assignment submissions.">
        <div className="space-y-6">
          <HighlightCards
            items={[
              { label: "Student", value: data.student.firstName, detail: "The learner profile currently connected to this dashboard account.", tone: "indigo" },
              { label: "Active cohorts", value: String(new Set(assignments.map((assignment) => assignment.cohortId)).size), detail: "Published assignments grouped across your enrolled cohorts.", tone: "emerald" },
              { label: "Needs upload", value: String(assignments.filter((assignment) => !assignment.submission).length), detail: "Assignments that still need a file submission.", tone: "amber" },
              { label: "Reviewed", value: String(assignments.filter((assignment) => assignment.submission?.status === "REVIEWED").length), detail: "Submissions that already have instructor review attached.", tone: "slate" },
            ]}
          />

          <RichTableCard
            title="Published assignments"
            description="Your assignment list now pulls from the database and shows real submission status."
            columns={[
              { key: "task", label: "Task" },
              { key: "track", label: "Track" },
              { key: "due", label: "Due" },
              { key: "progress", label: "Progress" },
              { key: "status", label: "Status" },
            ]}
            rows={assignments.map((assignment) => ({
              task: assignment.title,
              track: assignment.cohort.course.title,
              due: assignment.dueDate
                ? assignment.dueDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })
                : "No due date",
              progress: `progress:${assignment.submission ? "100%" : "0%"}`,
              status: assignment.submission ? `status:${assignment.submission.status}` : "status:Pending",
            }))}
          />

          <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
            <div className="space-y-4">
              {assignments.map((assignment) => (
                <article key={assignment.id} className="rounded-[1.5rem] border border-[#c6c5d4]/20 bg-white p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#6b7280]">
                        {assignment.cohort.course.title}
                      </p>
                      <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-[#191c1e]">
                        {assignment.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-[#5f6470]">
                        {assignment.description || "No additional assignment instructions were added yet."}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-[#c6c5d4]/20 bg-[#f7f9fb] px-4 py-3 text-sm text-[#191c1e]">
                      <div className="font-semibold">Due</div>
                      <div className="mt-1 text-[#5f6470]">
                        {assignment.dueDate
                          ? assignment.dueDate.toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })
                          : "Flexible"}
                      </div>
                    </div>
                  </div>

                  {assignment.submission ? (
                    <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm">
                      <div className="font-semibold text-emerald-800">
                        Submitted: {assignment.submission.fileName || "Uploaded file"}
                      </div>
                      <div className="mt-1 text-emerald-700">
                        Status: {assignment.submission.status}
                        {typeof assignment.submission.score === "number" ? ` • Score: ${assignment.submission.score}` : ""}
                      </div>
                      {assignment.submission.fileUrl ? (
                        <a
                          href={assignment.submission.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-flex text-xs font-bold uppercase tracking-[0.18em] text-emerald-800 underline"
                        >
                          Open submission
                        </a>
                      ) : null}
                    </div>
                  ) : (
                    <AssignmentUploadCard assignmentId={assignment.id} />
                  )}
                </article>
              ))}
            </div>

            <SettingsPanel
              title="Submission settings"
              description="Current learner upload and review behavior for this workflow."
              items={[
                { label: "Secure uploads", value: "Uploads are restricted to authenticated student accounts linked to an eligible assignment.", enabled: true },
                { label: "One active submission", value: "Each assignment keeps one current submission record per learner.", enabled: true },
                { label: "Instructor grading", value: "Reviewed submissions surface inside the grade portal for instructors.", enabled: true },
                { label: "Parent visibility", value: "Submission results feed directly into progress summaries for families.", enabled: true },
              ]}
            />
          </div>

          <InsightPanels
            title="Assignment insights"
            items={[
              { title: "Uploads are now live", subtitle: "Students can securely upload assignment files directly from the dashboard.", meta: "Workflow", tone: "emerald" },
              { title: "Review state is visible", subtitle: "Submission status moves from pending to reviewed as instructors score the work.", meta: "Feedback", tone: "indigo" },
              { title: "Progress is connected", subtitle: "Assignment completion now contributes to the learner progress dashboard.", meta: "Data", tone: "amber" },
            ]}
          />
        </div>
      </DashboardSection>
    </DashboardPageShell>
  );
}
