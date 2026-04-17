import {
  HighlightCards,
  InsightPanels,
  RichTableCard,
  SettingsPanel,
} from "@/components/dashboard/dashboard-content-blocks";
import { DashboardPageShell, DashboardSection } from "@/components/dashboard/dashboard-page-shell";

export default function RosterPage() {
  return (
    <DashboardPageShell
      eyebrow="Roster"
      title="Learner roster and classroom assignment view"
      description="Give instructors and admins a clear picture of assigned learners, attendance readiness, and classroom grouping."
      stats={[
        { label: "Assigned learners", value: "64", note: "Learners currently allocated to your visible teaching groups." },
        { label: "Active groups", value: "05", note: "Classes with active sessions, roster ownership, and published materials." },
        { label: "Needs attention", value: "06", note: "Learners with attendance, progress, or communication flags." },
        { label: "Average readiness", value: "89%", note: "Weighted readiness across onboarding, attendance, and content access." },
      ]}
      actions={[
        { label: "Open class grouping" },
        { label: "Review learner notes" },
        { label: "Message guardians" },
      ]}
      feed={[
        { title: "Roster synced", detail: "Latest cohort assignments were refreshed into the instructor workspace.", time: "11m ago" },
        { title: "Progress flag raised", detail: "One learner dropped below the expected completion threshold.", time: "55m ago" },
        { title: "Guardian note added", detail: "A parent submitted a scheduling request for an upcoming session.", time: "2h ago" },
      ]}
    >
      <DashboardSection
        title="Classroom roster"
        description="Instructors now get a fuller roster layout with student health, guardian context, and support signals."
      >
        <div className="space-y-6">
          <HighlightCards
            items={[
              { label: "On track", value: "52", detail: "Learners consistently meeting attendance, assignment, and preparation expectations.", tone: "emerald" },
              { label: "Watchlist", value: "6", detail: "Students needing intervention because of repeated lateness or low completion.", tone: "amber" },
              { label: "Guardian touchpoints", value: "11", detail: "Recent family notes still open for instructor or operations follow-up.", tone: "indigo" },
              { label: "Urgent support", value: "2", detail: "Immediate mentor attention is recommended for these learners this week.", tone: "rose" },
            ]}
          />

          <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
            <RichTableCard
              title="Assigned learners"
              description="A realistic classroom view with learner readiness and support status."
              columns={[
                { key: "learner", label: "Learner" },
                { key: "group", label: "Group" },
                { key: "guardian", label: "Guardian" },
                { key: "progress", label: "Progress" },
                { key: "status", label: "Status" },
              ]}
              rows={[
                { learner: "Marcus Chen", group: "Cybersecurity Foundations", guardian: "Sarah Chen", progress: "progress:92%", status: "status:Healthy" },
                { learner: "Naomi A.", group: "Networking Lab", guardian: "Joel A.", progress: "progress:76%", status: "status:Review" },
                { learner: "Isaac T.", group: "AI Trends Workshop", guardian: "Tina T.", progress: "progress:84%", status: "status:Healthy" },
                { learner: "Riley K.", group: "Web Development Flex", guardian: "Parent follow-up", progress: "progress:48%", status: "status:At risk" },
              ]}
            />

            <SettingsPanel
              title="Support actions"
              description="A quick operational checklist for active roster care."
              items={[
                { label: "Guardian digest", value: "Weekly summaries are still enabled for roster-linked parents.", enabled: true },
                { label: "Mentor escalation", value: "Instructors can send at-risk learners into support review.", enabled: true },
                { label: "Auto-group balancing", value: "Manual balancing is still preferred for small cohorts.", enabled: false },
                { label: "Session note carryover", value: "Previous learner notes remain visible across future classes.", enabled: true },
              ]}
            />
          </div>

          <InsightPanels
            title="Instruction insights"
            items={[
              { title: "Cybersecurity cohort is steady", subtitle: "Most learners are keeping pace, making it a stable anchor cohort for instructor planning.", meta: "Healthy", tone: "emerald" },
              { title: "Networking group needs one intervention", subtitle: "Absence patterns and unfinished lab work are starting to cluster around the same learner.", meta: "Support", tone: "amber" },
              { title: "Family communication is improving", subtitle: "Guardian responses are arriving faster since recent dashboard and onboarding updates.", meta: "Comms", tone: "indigo" },
            ]}
          />
        </div>
      </DashboardSection>
    </DashboardPageShell>
  );
}
