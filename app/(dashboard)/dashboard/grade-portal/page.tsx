import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { createAssignment, reviewSubmission } from "@/app/actions/assignments";
import { DashboardPageShell, DashboardSection } from "@/components/dashboard/dashboard-page-shell";
import { HighlightCards, InsightPanels, RichTableCard, SettingsPanel } from "@/components/dashboard/dashboard-content-blocks";
import { getInstructorGradeData } from "@/lib/services/assignments";

export default async function GradePortalPage() {
  const session = await auth();
  const role = (session?.user as { role?: UserRole } | undefined)?.role;

  if (!session?.user || (role !== UserRole.INSTRUCTOR && role !== UserRole.SUPER_ADMIN)) {
    redirect("/dashboard");
  }

  const userId = session.user.id;
  if (!userId) {
    redirect("/login");
  }

  const data = await getInstructorGradeData(userId, role);
  const submissions = data.assignments.flatMap((assignment) =>
    assignment.submissions.map((submission) => ({
      submission,
      assignment,
    })),
  );

  const reviewedCount = submissions.filter(({ submission }) => submission.status === "REVIEWED").length;
  const pendingCount = submissions.filter(({ submission }) => submission.status === "SUBMITTED").length;
  const averageScoreBase = submissions
    .map(({ submission }) => submission.score)
    .filter((score): score is number => typeof score === "number");
  const averageScore = averageScoreBase.length
    ? Math.round(averageScoreBase.reduce((sum, score) => sum + score, 0) / averageScoreBase.length)
    : 0;

  return (
    <DashboardPageShell
      eyebrow="Grade Portal"
      title="Assessment review and grading control"
      description="Create assignments for your cohorts, review uploaded work, and publish scores back into learner progress."
      stats={[
        { label: "Published assignments", value: String(data.assignments.length).padStart(2, "0"), note: "Assignments currently available across your visible cohorts." },
        { label: "Pending reviews", value: String(pendingCount).padStart(2, "0"), note: "Submissions that still need a score or comment." },
        { label: "Avg. score", value: `${averageScore}%`, note: "Average score across reviewed submissions." },
        { label: "Feedback sent", value: String(reviewedCount).padStart(2, "0"), note: "Submissions already marked as reviewed by an instructor." },
      ]}
      actions={[
        { label: "Open assignments", href: "/dashboard/assignments" },
        { label: "View progress", href: "/dashboard/progress" },
      ]}
      feed={submissions.slice(0, 3).map(({ submission, assignment }) => ({
        title: submission.student.firstName,
        detail: `${assignment.title} • ${submission.status}`,
        time: submission.updatedAt.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      }))}
    >
      <DashboardSection title="Assignment control center" description="This grade portal is now wired to real assignments and student submissions instead of dummy placeholders.">
        <div className="space-y-6">
          <HighlightCards
            items={[
              { label: "Cohorts", value: String(data.cohorts.length), detail: "Cohorts available to this instructor or admin for assignment publishing.", tone: "indigo" },
              { label: "Submissions", value: String(submissions.length), detail: "Uploaded learner submissions currently available for review.", tone: "emerald" },
              { label: "Awaiting review", value: String(pendingCount), detail: "Recently submitted work that still needs scoring or feedback.", tone: "amber" },
              { label: "Reviewed", value: String(reviewedCount), detail: "Submissions already scored and returned to learners.", tone: "slate" },
            ]}
          />

          <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[1.5rem] border border-[#c6c5d4]/20 bg-white p-6">
              <h3 className="text-xl font-extrabold tracking-tight text-[#191c1e]">Create assignment</h3>
              <p className="mt-2 text-sm leading-6 text-[#5f6470]">
                Publish a new assignment for one of your active cohorts.
              </p>
              <form action={createAssignment} className="mt-6 space-y-4">
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.22em] text-[#6b7280]">Cohort</label>
                  <select name="cohortId" required className="w-full rounded-2xl border border-[#c6c5d4]/30 bg-[#f7f9fb] px-4 py-3 text-sm">
                    <option value="">Select cohort</option>
                    {data.cohorts.map((cohort) => (
                      <option key={cohort.id} value={cohort.id}>
                        {cohort.name} • {cohort.course.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.22em] text-[#6b7280]">Title</label>
                  <input name="title" required className="w-full rounded-2xl border border-[#c6c5d4]/30 bg-[#f7f9fb] px-4 py-3 text-sm" />
                </div>
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.22em] text-[#6b7280]">Description</label>
                  <textarea name="description" rows={4} className="w-full rounded-2xl border border-[#c6c5d4]/30 bg-[#f7f9fb] px-4 py-3 text-sm" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.22em] text-[#6b7280]">Due date</label>
                    <input type="datetime-local" name="dueDate" className="w-full rounded-2xl border border-[#c6c5d4]/30 bg-[#f7f9fb] px-4 py-3 text-sm" />
                  </div>
                  <div>
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.22em] text-[#6b7280]">Points</label>
                    <input type="number" min="1" name="points" className="w-full rounded-2xl border border-[#c6c5d4]/30 bg-[#f7f9fb] px-4 py-3 text-sm" />
                  </div>
                </div>
                <button type="submit" className="w-full rounded-full bg-primary px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-primary-foreground hover:opacity-90">
                  Publish assignment
                </button>
              </form>
            </div>

            <RichTableCard
              title="Submission queue"
              description="Each uploaded student assignment now appears here for instructor review."
              columns={[
                { key: "assignment", label: "Assignment" },
                { key: "learner", label: "Learner" },
                { key: "track", label: "Track" },
                { key: "score", label: "Score" },
                { key: "status", label: "Status" },
              ]}
              rows={submissions.map(({ submission, assignment }) => ({
                assignment: assignment.title,
                learner: `${submission.student.firstName} ${submission.student.lastName}`,
                track: assignment.cohort.course.title,
                score: typeof submission.score === "number" ? `${submission.score}` : "Pending",
                status: `status:${submission.status}`,
              }))}
            />
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
            <div className="space-y-4">
              {submissions.length === 0 ? (
                <div className="rounded-[1.5rem] border border-[#c6c5d4]/20 bg-white p-6 text-sm text-[#5f6470]">
                  No student submissions have been uploaded yet. Publish an assignment and wait for learners to submit their files.
                </div>
              ) : (
                submissions.map(({ submission, assignment }) => (
                  <article key={submission.id} className="rounded-[1.5rem] border border-[#c6c5d4]/20 bg-white p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#6b7280]">
                          {assignment.cohort.course.title}
                        </p>
                        <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-[#191c1e]">
                          {assignment.title}
                        </h3>
                        <p className="mt-2 text-sm text-[#5f6470]">
                          Learner: {submission.student.firstName} {submission.student.lastName}
                        </p>
                      </div>
                      {submission.fileUrl ? (
                        <a
                          href={submission.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex rounded-full border border-[#c6c5d4]/30 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#191c1e] hover:border-primary hover:text-primary"
                        >
                          Open file
                        </a>
                      ) : null}
                    </div>

                    <form action={reviewSubmission} className="mt-6 grid gap-4 md:grid-cols-[120px_1fr_auto]">
                      <input type="hidden" name="submissionId" value={submission.id} />
                      <input
                        type="number"
                        min="0"
                        max={assignment.points ?? 100}
                        name="score"
                        defaultValue={submission.score ?? ""}
                        placeholder="Score"
                        className="rounded-2xl border border-[#c6c5d4]/30 bg-[#f7f9fb] px-4 py-3 text-sm"
                      />
                      <textarea
                        name="feedback"
                        rows={3}
                        defaultValue={submission.feedback ?? ""}
                        placeholder="Add learner feedback"
                        className="rounded-2xl border border-[#c6c5d4]/30 bg-[#f7f9fb] px-4 py-3 text-sm"
                      />
                      <button type="submit" className="rounded-full bg-primary px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-primary-foreground hover:opacity-90">
                        Save review
                      </button>
                    </form>
                  </article>
                ))
              )}
            </div>

            <SettingsPanel
              title="Review settings"
              description="Instructor-side controls in the current assignment workflow."
              items={[
                { label: "Role-scoped access", value: "Only cohort instructors and super admins can review these submissions.", enabled: true },
                { label: "Upload-backed grading", value: "Grade portal rows now reflect actual uploaded student work.", enabled: true },
                { label: "Progress sync", value: "Scores and review state feed directly into learner progress views.", enabled: true },
                { label: "Multiple file attempts", value: "Current workflow tracks one latest submission per assignment and learner.", enabled: false },
              ]}
            />
          </div>

          <InsightPanels
            title="Review insights"
            items={[
              { title: "Assignment creation is now live", subtitle: "Instructors can publish assignments for their cohorts directly from the grade portal.", meta: "Authoring", tone: "indigo" },
              { title: "Uploads flow into grading", subtitle: "Student files appear as reviewable submissions instead of placeholder queue entries.", meta: "Workflow", tone: "emerald" },
              { title: "Progress closes the loop", subtitle: "Reviewed submissions can now influence learner progress and parent visibility.", meta: "Reporting", tone: "amber" },
            ]}
          />
        </div>
      </DashboardSection>
    </DashboardPageShell>
  );
}
