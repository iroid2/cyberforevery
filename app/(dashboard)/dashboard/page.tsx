import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { DashboardPageShell, DashboardSection, PlaceholderGrid } from "@/components/dashboard/dashboard-page-shell";

const dashboardByRole = {
  SUPER_ADMIN: {
    eyebrow: "Cyber operations command",
    title: "Bootcamp Control Center",
    description:
      "Monitor cohort health, enrollment flow, learner engagement, and certificate readiness across the cyber4every1 platform.",
    stats: [
      { label: "Active Cohorts", value: "06", note: "Live bootcamp groups progressing through the current term." },
      { label: "Pending Enrollments", value: "24", note: "Applications waiting for review, interview, or payment confirmation." },
      { label: "At-Risk Learners", value: "08", note: "Students flagged by attendance, assignment, or progress signals." },
      { label: "Certificates Ready", value: "19", note: "Learners who have completed requirements and are ready for issuance." },
    ],
    actions: [
      { label: "Review enrollments", href: "/dashboard/enrollments" },
      { label: "Manage cohorts", href: "/dashboard/cohorts" },
      { label: "Open user management", href: "/dashboard/user-management" },
      { label: "Check revenue snapshot", href: "/dashboard/revenue" },
    ],
    feed: [
      { title: "Cohort Delta opened lab week 3", detail: "Instructor materials and learner assignments were published to the cohort workspace.", time: "5m ago" },
      { title: "Certificate queue updated", detail: "Five students reached completion thresholds after final grading sync.", time: "18m ago" },
      { title: "Support alert raised", detail: "Parent billing follow-up needed for two pending enrollments.", time: "42m ago" },
    ],
    highlights: [
      { title: "Enrollment pipeline", detail: "Track applicants from inquiry to payment confirmation and cohort placement.", meta: "Admissions" },
      { title: "Instruction quality", detail: "Keep an eye on attendance variance, submission velocity, and mentor workload.", meta: "Teaching ops" },
      { title: "Credential delivery", detail: "Audit completion milestones before publishing certificates and learner outcomes.", meta: "Certification" },
      { title: "Revenue oversight", detail: "Pair billing status with cohort utilization so growth stays sustainable.", meta: "Finance" },
    ],
  },
  ADMIN_STAFF: {
    eyebrow: "Admissions and learner ops",
    title: "Program Operations Workspace",
    description:
      "Coordinate applications, cohort assignments, learner records, and billing touchpoints for the next cyber bootcamp cycle.",
    stats: [
      { label: "Applications In Queue", value: "17", note: "Learners awaiting review or missing supporting information." },
      { label: "Families Contacted", value: "31", note: "Recent follow-ups completed for admissions and onboarding." },
      { label: "Seats Remaining", value: "12", note: "Open capacity across currently scheduled cohorts." },
      { label: "Billing Holds", value: "04", note: "Enrollments paused until payment or sponsorship confirmation." },
    ],
    actions: [
      { label: "Process enrollments", href: "/dashboard/enrollments" },
      { label: "Update cohorts", href: "/dashboard/cohorts" },
      { label: "Respond to messages", href: "/dashboard/messages" },
      { label: "Review billing", href: "/dashboard/billing" },
    ],
    feed: [
      { title: "New parent inquiry assigned", detail: "A family requested curriculum details for the next beginner track.", time: "12m ago" },
      { title: "Cohort seating updated", detail: "Three learners were moved into the Saturday live lab section.", time: "29m ago" },
      { title: "Reminder sequence sent", detail: "Pending applicants received enrollment checklist nudges.", time: "1h ago" },
    ],
    highlights: [
      { title: "Admissions queue", detail: "Focus on fast review cycles and clear next-step communication.", meta: "Workflow" },
      { title: "Roster readiness", detail: "Keep cohort placements accurate before instructors begin delivery.", meta: "Capacity" },
      { title: "Family coordination", detail: "Billing and onboarding updates should be visible in one place.", meta: "Support" },
      { title: "Completion logistics", detail: "Prepare certificate and progression records early.", meta: "Records" },
    ],
  },
  INSTRUCTOR: {
    eyebrow: "Instructor command",
    title: "Teaching and Lab Delivery",
    description:
      "Run live labs, monitor learner submissions, and intervene early when students fall behind in the cyber curriculum.",
    stats: [
      { label: "Learners This Week", value: "42", note: "Students currently scheduled across your active classes." },
      { label: "Attendance Alerts", value: "05", note: "Learners with missed sessions or low participation." },
      { label: "Assignments To Review", value: "18", note: "Pending submissions from reverse engineering, OSINT, and cloud labs." },
      { label: "Progress Milestones", value: "11", note: "Students close to badge, module, or certification completion." },
    ],
    actions: [
      { label: "Open roster", href: "/dashboard/roster" },
      { label: "Review attendance", href: "/dashboard/attendance" },
      { label: "Enter grades", href: "/dashboard/grade-portal" },
      { label: "Issue certificates", href: "/dashboard/certificates" },
    ],
    feed: [
      { title: "OSINT lab submissions landed", detail: "Eight new submissions are ready for scoring and written feedback.", time: "9m ago" },
      { title: "Attendance warning triggered", detail: "Two learners missed consecutive sessions in the cloud defense track.", time: "24m ago" },
      { title: "Badge threshold crossed", detail: "A learner completed the final exploit analysis milestone.", time: "58m ago" },
    ],
    highlights: [
      { title: "Live lab pacing", detail: "Balance challenge depth with clear learner support checkpoints.", meta: "Labs" },
      { title: "Intervention queue", detail: "Surface struggling students before they disengage from the cohort.", meta: "Support" },
      { title: "Assessment workflow", detail: "Grading and feedback should stay tight to maintain momentum.", meta: "Review" },
      { title: "Recognition moments", detail: "Celebrate module completions and publish evidence of growth.", meta: "Outcomes" },
    ],
  },
  STUDENT: {
    eyebrow: "Learner mission board",
    title: "Your Cyber Learning Hub",
    description:
      "Track upcoming sessions, assignment work, bootcamp progress, and certification milestones in one focused workspace.",
    stats: [
      { label: "Upcoming Sessions", value: "03", note: "Live labs and mentor touchpoints scheduled in the next seven days." },
      { label: "Assignments Open", value: "04", note: "Tasks currently active across your enrolled learning path." },
      { label: "Module Progress", value: "68%", note: "Current completion pace for your active cohort curriculum." },
      { label: "Certificates Earned", value: "02", note: "Verified badges and completion records already unlocked." },
    ],
    actions: [
      { label: "View schedule", href: "/dashboard/schedule" },
      { label: "Open assignments", href: "/dashboard/assignments" },
      { label: "Check progress", href: "/dashboard/progress" },
      { label: "View certificates", href: "/dashboard/certificates" },
    ],
    feed: [
      { title: "Cloud lab opens tomorrow", detail: "Prepare your notes and browser-based lab environment before the session.", time: "Today" },
      { title: "Feedback posted", detail: "Your latest OSINT submission received mentor comments and revision notes.", time: "Yesterday" },
      { title: "Progress badge unlocked", detail: "You completed the secure investigation fundamentals module.", time: "2d ago" },
    ],
    highlights: [
      { title: "Mission cadence", detail: "Stay on top of labs, deadlines, and mentor expectations each week.", meta: "Focus" },
      { title: "Skill growth", detail: "Use progress data to see where you’re strongest and where to improve.", meta: "Growth" },
      { title: "Certification track", detail: "Keep evidence of readiness visible as you complete milestone work.", meta: "Proof" },
      { title: "Support access", detail: "Ask for help early whenever a concept or lab becomes a blocker.", meta: "Guidance" },
    ],
  },
  PARENT: {
    eyebrow: "Family visibility center",
    title: "Learner Support Dashboard",
    description:
      "Follow your learner’s schedule, progress, certificates, and billing status so you can support their cyber bootcamp journey confidently.",
    stats: [
      { label: "Sessions This Week", value: "02", note: "Upcoming instructor-led sessions for your learner." },
      { label: "Progress Status", value: "On Track", note: "Current standing based on recent attendance and coursework." },
      { label: "Certificates Posted", value: "01", note: "Completion records available for review or download." },
      { label: "Billing Items", value: "01", note: "Outstanding payment or finance follow-up requiring attention." },
    ],
    actions: [
      { label: "View schedule", href: "/dashboard/schedule" },
      { label: "Check learner progress", href: "/dashboard/progress" },
      { label: "Open certificates", href: "/dashboard/certificates" },
      { label: "Review billing", href: "/dashboard/billing" },
    ],
    feed: [
      { title: "Mentor feedback published", detail: "Your learner received comments on the latest systems challenge.", time: "Today" },
      { title: "Attendance synced", detail: "The platform updated this week’s session participation records.", time: "Yesterday" },
      { title: "Billing reminder sent", detail: "A tuition installment reminder was issued for the next cohort phase.", time: "2d ago" },
    ],
    highlights: [
      { title: "Learning visibility", detail: "Stay informed without needing to manage the coursework yourself.", meta: "Overview" },
      { title: "Milestone tracking", detail: "See when your learner is approaching certificates or intervention points.", meta: "Progress" },
      { title: "Communication flow", detail: "Use messages and help resources when you need direct support.", meta: "Support" },
      { title: "Payment clarity", detail: "Keep program finances in step with learner participation.", meta: "Billing" },
    ],
  },
  fallback: {
    eyebrow: "Workspace",
    title: "Dashboard",
    description: "Your cyber4every1 workspace is ready.",
    stats: [
      { label: "Workspace", value: "01", note: "Role-aware dashboard experience loaded successfully." },
      { label: "Modules", value: "04", note: "Core program operations connected to your account." },
      { label: "Messages", value: "00", note: "No urgent communication items right now." },
      { label: "Status", value: "Live", note: "Platform shell is active and ready for next actions." },
    ],
    actions: [{ label: "Open profile", href: "/dashboard/profile" }],
    feed: [{ title: "Workspace ready", detail: "Role configuration loaded with the current dashboard shell.", time: "Now" }],
    highlights: [
      { title: "Role mapping", detail: "Your account can access the correct niche workspace once permissions are finalized.", meta: "Access" },
      { title: "Platform health", detail: "The dashboard is active and available for further customization.", meta: "System" },
    ],
  },
} as const;

export default async function MainDashboard() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const role = String(session.user.role ?? "");
  const config =
    dashboardByRole[role as keyof typeof dashboardByRole] ?? dashboardByRole.fallback;

  return (
    <DashboardPageShell
      eyebrow={config.eyebrow}
      title={config.title}
      description={config.description}
      stats={config.stats}
      actions={config.actions}
      feed={config.feed}
    >
      <DashboardSection
        title="Priority Mission Queue"
        description="This workspace is now aligned to cyber education operations instead of the legacy finance system. The next phase is replacing old route trees with dedicated cohort, learner, and lab workflows."
      >
        <PlaceholderGrid items={config.highlights} />
      </DashboardSection>
    </DashboardPageShell>
  );
}
