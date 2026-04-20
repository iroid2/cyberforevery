import { NicheDashboardPage } from "../_components/niche-dashboard-page";

export default function UserManagementPage() {
  return (
    <NicheDashboardPage
      eyebrow="Platform administration"
      title="User Management"
      description="Manage staff, instructors, families, and learners participating in the cyber4every1 platform."
      stats={[
        { label: "Active Accounts", value: "128", note: "Users currently active across the program workspace." },
        { label: "Pending Invites", value: "09", note: "Accounts awaiting onboarding or role confirmation." },
        { label: "Instructor Seats", value: "12", note: "Teaching accounts assigned across live cohorts." },
        { label: "Families Linked", value: "36", note: "Guardian accounts connected to learner records." },
      ]}
      actions={[
        { label: "Open cohorts", href: "/dashboard/cohorts" },
        { label: "Open system settings", href: "/dashboard/system-settings" },
      ]}
      feed={[
        { title: "Instructor role assigned", detail: "A new mentor was granted access to the teaching workspace.", time: "18m ago" },
        { title: "Parent access approved", detail: "A guardian account completed verification successfully.", time: "1h ago" },
      ]}
      highlights={[
        { title: "Role clarity", detail: "Every user should land in the right workspace for their responsibilities.", meta: "Access" },
        { title: "Safe onboarding", detail: "Account setup should be fast but still controlled.", meta: "Security" },
        { title: "Support routing", detail: "User role quality improves communication and accountability.", meta: "Ops" },
        { title: "Platform hygiene", detail: "Keep inactive or outdated access under review.", meta: "Governance" },
      ]}
    />
  );
}
