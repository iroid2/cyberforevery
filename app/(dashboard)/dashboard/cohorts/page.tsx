import { DashboardPageShell, DashboardSection, PlaceholderGrid } from "@/components/dashboard/dashboard-page-shell";

export default function CohortsPage() {
  return (
    <DashboardPageShell
      eyebrow="Cohorts"
      title="Cohort planning and intake management"
      description="Track upcoming cohorts, active capacity, staffing assignments, and readiness for every training cycle."
      stats={[
        { label: "Active cohorts", value: "08", note: "Running and scheduled cohorts currently visible to operations and leadership." },
        { label: "Seats filled", value: "314", note: "Enrolled learners across all open and active delivery groups." },
        { label: "Average fill rate", value: "81%", note: "Current projected fill rate across the active intake window." },
        { label: "Ready to launch", value: "05", note: "Cohorts with staffing, schedule, and materials already approved." },
      ]}
      actions={[
        { label: "Create new cohort" },
        { label: "Review staffing plan" },
        { label: "Export intake summary" },
      ]}
      feed={[
        { title: "Weekend cohort approved", detail: "A weekend cybersecurity intake cleared final operations review.", time: "18m ago" },
        { title: "Capacity increased", detail: "The next online cohort gained twelve extra seats after instructor confirmation.", time: "1h ago" },
        { title: "Launch checklist updated", detail: "Readiness checkpoints were refreshed for the next three planned starts.", time: "3h ago" },
      ]}
    >
      <DashboardSection
        title="Cohort pipeline"
        description="Use this page to manage future starts, learner allocation, and instructor assignment at a glance."
      >
        <PlaceholderGrid
          items={[
            { meta: "June intake", title: "Cybersecurity Morning Cohort", detail: "42 learners, instructor assigned, payments 78% complete, launch checklist nearly done." },
            { meta: "July intake", title: "AI Trends Evening Cohort", detail: "31 learners pre-registered with high demand from returning families and staff referrals." },
            { meta: "Weekend track", title: "Web Development Flex Cohort", detail: "Online-only format with flexible pacing and two reserved mentor office-hour windows." },
            { meta: "Operations", title: "Graphic Design + AI Cohort", detail: "Marketing assets prepared, waitlist warming, and onboarding sequence ready for release." },
          ]}
        />
      </DashboardSection>
    </DashboardPageShell>
  );
}
