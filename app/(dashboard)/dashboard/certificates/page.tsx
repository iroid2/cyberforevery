import { UserRole } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { issueCertificateAction } from "@/app/actions/certificates";
import { auth } from "@/auth";
import {
  HighlightCards,
  InsightPanels,
  RichTableCard,
  SettingsPanel,
} from "@/components/dashboard/dashboard-content-blocks";
import { DashboardPageShell, DashboardSection } from "@/components/dashboard/dashboard-page-shell";
import { getCertificateDashboardData, getCertificateIssuanceCandidates } from "@/lib/services/enrollments";

export default async function CertificatesPage() {
  const session = await auth();
  const role = (session?.user as { role?: UserRole } | undefined)?.role;
  const userId = session?.user?.id;

  if (!session?.user || !role || !userId) {
    redirect("/login");
  }

  const data = await getCertificateDashboardData(userId, role);
  const issuanceCandidates = await getCertificateIssuanceCandidates(userId, role);
  const certificates = data.certificates;
  const issuedCount = certificates.length;
  const recentCount = certificates.filter((certificate) => {
    const issuedAt = new Date(certificate.issuedAt).getTime();
    return Date.now() - issuedAt <= 1000 * 60 * 60 * 24 * 30;
  }).length;

  return (
    <DashboardPageShell
      eyebrow="Certificates"
      title="Completion and certificate records"
      description="View issued course certificates, verify learner outcomes, and follow the handoff from completion into recognition."
      stats={[
        { label: "Issued", value: String(issuedCount).padStart(2, "0"), note: "Certificates currently visible to this role." },
        { label: "Recent", value: String(recentCount).padStart(2, "0"), note: "Certificates issued in the last 30 days." },
        { label: "Verification", value: issuedCount ? "Live" : "Pending", note: "Each issued certificate now has a unique verification code." },
        { label: "Viewer", value: data.subjectLabel, note: "Current audience context for this certificate workspace." },
      ]}
      actions={
        role === UserRole.SUPER_ADMIN || role === UserRole.ADMIN_STAFF
          ? [
              { label: "Review enrollments", href: "/dashboard/enrollments" },
              { label: "Check cohorts", href: "/dashboard/cohorts" },
            ]
          : role === UserRole.INSTRUCTOR
            ? [
                { label: "Open grade portal", href: "/dashboard/grade-portal" },
                { label: "Review roster", href: "/dashboard/roster" },
              ]
          : [
              { label: "Track progress", href: "/dashboard/progress" },
              { label: "Review schedule", href: "/dashboard/schedule" },
            ]
      }
      feed={certificates.slice(0, 4).map((certificate) => ({
        title: "Certificate issued",
        detail: `${"studentName" in certificate ? certificate.studentName : data.subjectLabel} - ${certificate.courseTitle}`,
        time: new Date(certificate.issuedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      }))}
    >
      <DashboardSection
        title="Recognition archive"
        description="This page is now driven by real certificate records tied to enrollments, cohorts, and learners."
      >
        <div className="space-y-6">
          <HighlightCards
            items={[
              { label: "Issued records", value: String(issuedCount), detail: "Certificates already generated and saved in the platform.", tone: "emerald" },
              { label: "Verification codes", value: String(issuedCount), detail: "Every certificate includes a unique public verification path.", tone: "indigo" },
              { label: "Completion link", value: issuedCount ? "Active" : "Pending", detail: "Certificates are now part of the course lifecycle, not a disconnected manual step.", tone: "amber" },
              { label: "Audience", value: data.mode === "admin" ? "Platform-wide" : data.mode === "parent" ? "Family view" : "Learner view", detail: "The certificate archive adapts to the current role context.", tone: "slate" },
            ]}
          />

          {issuedCount ? (
            <RichTableCard
              title="Issued certificates"
              description="Live certificate records with learner, course, cohort, and verification metadata."
              columns={[
                { key: "student", label: "Student" },
                { key: "course", label: "Course" },
                { key: "cohort", label: "Cohort" },
                { key: "issued", label: "Issued" },
                { key: "status", label: "Status" },
              ]}
              rows={certificates.map((certificate) => ({
                student: "studentName" in certificate ? certificate.studentName : data.subjectLabel,
                course: certificate.courseTitle,
                cohort: certificate.cohortName,
                issued: new Date(certificate.issuedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
                status: `status:${certificate.status}`,
              }))}
            />
          ) : (
            <div className="rounded-2xl border border-[#c6c5d4]/20 bg-[#f7f9fb] p-6 text-sm text-[#5f6470]">
              No certificate records are visible for this account yet. Once a learner completes the course and issuance runs, certificates will appear here.
            </div>
          )}

          <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
            <div className="space-y-4">
              {certificates.map((certificate) => (
                <article key={certificate.id} className="rounded-[1.5rem] border border-[#c6c5d4]/20 bg-white p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#6b7280]">
                        {"studentName" in certificate ? certificate.studentName : data.subjectLabel}
                      </p>
                      <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-[#191c1e]">
                        {certificate.courseTitle}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-[#5f6470]">
                        Certificate #{certificate.certificateNumber} for {certificate.cohortName}.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-[#c6c5d4]/20 bg-[#f7f9fb] px-4 py-3 text-sm text-[#191c1e]">
                      <div className="font-semibold">Verification</div>
                      <div className="mt-1 text-[#5f6470]">{certificate.verificationCode.slice(0, 12)}...</div>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href={`/certificate/${certificate.verificationCode}`}
                      className="inline-flex rounded-full bg-[#000666] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[#111b85]"
                    >
                      Open verification page
                    </Link>
                    <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
                      {certificate.status}
                    </span>
                  </div>
                </article>
              ))}
            </div>

            <SettingsPanel
              title="Certificate rules"
              description="The current completion and recognition flow behind each issued record."
              items={[
                { label: "Eligibility checks", value: "Certificates are only issued after onboarding, attendance, assignments, and score thresholds are met.", enabled: true },
                { label: "Public verification", value: "Each certificate can be verified through a unique public code-based page.", enabled: true },
                { label: "Enrollment link", value: "Every certificate is tied back to the source enrollment and cohort context.", enabled: true },
                { label: "Issuer tracking", value: "Issued records preserve which platform user triggered certification.", enabled: true },
              ]}
            />
          </div>

          <InsightPanels
            title="Certificate insights"
            items={[
              {
                title: "Recognition is now verifiable",
                subtitle: "Learners and families can share a dedicated verification link instead of relying on screenshots or manual admin confirmation.",
                meta: "Trust",
                tone: "emerald",
              },
              {
                title: "Completion is now a measurable system event",
                subtitle: "Certificates sit directly on top of enrollments, which makes reporting and ops handoff much cleaner.",
                meta: "Data",
                tone: "indigo",
              },
              {
                title: "This lays the groundwork for printable certificates next",
                subtitle: "The backend identifiers and public verification path are in place, so a branded certificate template can sit on top safely.",
                meta: "Next",
                tone: "amber",
              },
            ]}
          />

          {(role === UserRole.SUPER_ADMIN || role === UserRole.ADMIN_STAFF || role === UserRole.INSTRUCTOR) ? (
            <div className="rounded-[1.5rem] border border-[#c6c5d4]/20 bg-white p-6">
              <h3 className="text-xl font-extrabold tracking-tight text-[#191c1e]">Issuance queue</h3>
              <p className="mt-2 text-sm leading-6 text-[#5f6470]">
                Eligible enrollments can now be turned into verified certificates directly from the dashboard.
              </p>

              <div className="mt-5 space-y-4">
                {issuanceCandidates.length ? issuanceCandidates.map(({ enrollment, snapshot }) => {
                  if (!snapshot) {
                    return null;
                  }

                  return (
                    <article key={enrollment.id} className="rounded-2xl border border-[#c6c5d4]/20 bg-[#f7f9fb] p-5">
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#6b7280]">
                            {enrollment.cohort.course.title}
                          </p>
                          <h4 className="mt-2 text-lg font-bold text-[#191c1e]">
                            {enrollment.student.firstName} {enrollment.student.lastName}
                          </h4>
                          <p className="mt-2 text-sm leading-6 text-[#5f6470]">
                            {enrollment.cohort.name} - Attendance {snapshot.attendanceRate}% - Assignments {snapshot.assignmentRate}% - Final score {snapshot.finalScore}%
                          </p>
                        </div>
                        <div className="shrink-0">
                          {snapshot.isEligible ? (
                            <form action={issueCertificateAction}>
                              <input type="hidden" name="enrollmentId" value={enrollment.id} />
                              <button
                                type="submit"
                                className="inline-flex rounded-full bg-[#000666] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[#111b85]"
                              >
                                Issue certificate
                              </button>
                            </form>
                          ) : (
                            <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-800">
                              Not ready
                            </span>
                          )}
                        </div>
                      </div>

                      {!snapshot.isEligible ? (
                        <div className="mt-4 rounded-xl border border-amber-200 bg-white px-4 py-3 text-sm text-amber-800">
                          {snapshot.reasons.join(" ")}
                        </div>
                      ) : null}
                    </article>
                  );
                }) : (
                  <div className="rounded-2xl border border-[#c6c5d4]/20 bg-[#f7f9fb] p-5 text-sm text-[#5f6470]">
                    No issuance candidates are visible right now. As learners complete onboarding, attendance, and assignments, eligible records will show up here automatically.
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </DashboardSection>
    </DashboardPageShell>
  );
}
