import {
  HighlightCards,
  InsightPanels,
  RichTableCard,
  SettingsPanel,
} from "@/components/dashboard/dashboard-content-blocks";
import { DashboardPageShell, DashboardSection } from "@/components/dashboard/dashboard-page-shell";

export default function CohortsPage() {
  return (
    <DashboardPageShell
      eyebrow="Cohorts"
      title="Cohort planning and intake management"
      description="Track capacity, launch readiness, instructor assignment, and demand across every upcoming or active training cycle."
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
        title="Launch board"
        description="This view shows the kinds of planning signals an admin team needs before each cohort opens to families and learners."
      >
        <div className="space-y-6">
          <HighlightCards
            items={[
              { label: "Highest demand", value: "Networking", detail: "The next networking intake is pacing ahead of all other tracks this week.", tone: "indigo" },
              { label: "Waitlist", value: "43", detail: "Interested learners are queued across online-only and weekend formats.", tone: "amber" },
              { label: "Instructor coverage", value: "96%", detail: "Most cohorts already have primary and backup instructional coverage assigned.", tone: "emerald" },
              { label: "Risk cohort", value: "1", detail: "One intake still needs room confirmation and final billing template review.", tone: "rose" },
            ]}
          />

          <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
            <RichTableCard
              title="Cohort schedule"
              description="A dummy operational table with capacity, ownership, and readiness status."
              columns={[
                { key: "cohort", label: "Cohort" },
                { key: "format", label: "Format" },
                { key: "seats", label: "Seats" },
                { key: "progress", label: "Readiness" },
                { key: "status", label: "Status" },
              ]}
              rows={[
                { cohort: "Cybersecurity Morning", format: "In-person", seats: "42 / 50", progress: "progress:84%", status: "status:Healthy" },
                { cohort: "AI Trends Evening", format: "Online", seats: "31 / 36", progress: "progress:76%", status: "status:Review" },
                { cohort: "Networking Weekend", format: "Hybrid", seats: "27 / 30", progress: "progress:92%", status: "status:Healthy" },
                { cohort: "Graphic Design + AI", format: "Online", seats: "18 / 28", progress: "progress:61%", status: "status:Pending" },
              ]}
            />

            <SettingsPanel
              title="Launch checklist"
              description="Quick-read operational readiness across the next intake window."
              items={[
                { label: "Instructor assignment", value: "Lead and support instructors assigned for five launch-ready cohorts.", enabled: true },
                { label: "Room confirmation", value: "One Kampala room update still pending facilities sign-off.", enabled: false },
                { label: "Orientation emails", value: "Templates are prepared and waiting on cohort activation.", enabled: true },
                { label: "Payment mapping", value: "Finance codes are attached to all but one new intake.", enabled: true },
              ]}
            />
          </div>

          <InsightPanels
            title="Planning insights"
            items={[
              { title: "Parents prefer weekend sessions", subtitle: "Weekend cohorts are converting faster for families balancing school and transport constraints.", meta: "Demand", tone: "indigo" },
              { title: "Online web development remains flexible", subtitle: "This route is attracting returning learners and lower-friction signups.", meta: "Format", tone: "emerald" },
              { title: "Graphic design marketing push needed", subtitle: "Interest is real, but messaging still trails cybersecurity and networking demand.", meta: "Campaign", tone: "amber" },
            ]}
          />
        </div>
      </DashboardSection>
    </DashboardPageShell>
  );
}
