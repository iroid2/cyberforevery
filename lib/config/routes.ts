import {
  Home,
  Users,
  BookOpen,
  Settings,
  ShieldCheck,
  GraduationCap,
  Calendar,
  ClipboardList,
  MessageSquare,
  CreditCard,
  FileBadge,
  LayoutDashboard,
  UserCheck,
  Package,
  History,
  Mail,
  HelpCircle,
} from "lucide-react";

export enum UserRoleType {
  SUPER_ADMIN = "SUPER_ADMIN",
  INSTRUCTOR = "INSTRUCTOR",
  ADMIN_STAFF = "ADMIN_STAFF",
  PARENT = "PARENT",
  STUDENT = "STUDENT",
  GUEST = "GUEST",
}

export type Route = {
  title: string;
  href: string;
  icon: any;
  roles?: UserRoleType[];
  group?: string;
  isNew?: boolean;
};

export const routes: Route[] = [
  // Dashboard
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: Object.values(UserRoleType),
  },

  // Super Admin - User Control
  {
    title: "User Management",
    href: "/dashboard/admin/users",
    icon: Users,
    roles: [UserRoleType.SUPER_ADMIN],
    group: "Administrative",
  },
  {
    title: "System Settings",
    href: "/dashboard/admin/settings",
    icon: Settings,
    roles: [UserRoleType.SUPER_ADMIN],
    group: "Administrative",
  },

  // Bootcamp Management (Super Admin & Admin Staff)
  {
    title: "All Cohorts",
    href: "/dashboard/bootcamp/cohorts",
    icon: Package,
    roles: [UserRoleType.SUPER_ADMIN, UserRoleType.ADMIN_STAFF],
    group: "Management",
  },
  {
    title: "Enrollments",
    href: "/dashboard/bootcamp/enrollments",
    icon: UserCheck,
    roles: [UserRoleType.SUPER_ADMIN, UserRoleType.ADMIN_STAFF],
    group: "Management",
  },

  // Instructor Tools
  {
    title: "My Roster",
    href: "/dashboard/instructor/roster",
    icon: Users,
    roles: [UserRoleType.INSTRUCTOR, UserRoleType.SUPER_ADMIN],
    group: "Classroom",
  },
  {
    title: "Attendance",
    href: "/dashboard/instructor/attendance",
    icon: Calendar,
    roles: [UserRoleType.INSTRUCTOR, UserRoleType.SUPER_ADMIN],
    group: "Classroom",
  },
  {
    title: "Grade Portal",
    href: "/dashboard/instructor/grading",
    icon: ClipboardList,
    roles: [UserRoleType.INSTRUCTOR, UserRoleType.SUPER_ADMIN],
    group: "Classroom",
  },

  // Student & Parent View
  {
    title: "My Schedule",
    href: "/dashboard/student/schedule",
    icon: Calendar,
    roles: [UserRoleType.STUDENT, UserRoleType.PARENT],
    group: "Learner Portal",
  },
  {
    title: "Assignments",
    href: "/dashboard/student/tasks",
    icon: BookOpen,
    roles: [UserRoleType.STUDENT],
    group: "Learner Portal",
  },
  {
    title: "My Progress",
    href: "/dashboard/student/progress",
    icon: FileBadge,
    roles: [UserRoleType.STUDENT, UserRoleType.PARENT],
    group: "Learner Portal",
  },

  // Finance
  {
    title: "Billing & Invoices",
    href: "/dashboard/finance/billing",
    icon: CreditCard,
    roles: [UserRoleType.SUPER_ADMIN, UserRoleType.PARENT],
    group: "Finance",
  },
  {
    title: "Revenue Report",
    href: "/dashboard/finance/revenue",
    icon: GraduationCap,
    roles: [UserRoleType.SUPER_ADMIN],
    group: "Finance",
  },

  // Communication
  {
    title: "Messages",
    href: "/dashboard/messages",
    icon: MessageSquare,
    roles: [
      UserRoleType.SUPER_ADMIN,
      UserRoleType.ADMIN_STAFF,
      UserRoleType.INSTRUCTOR,
      UserRoleType.PARENT,
    ],
    group: "Communication",
  },

  // Help
  {
    title: "Help Center",
    href: "/dashboard/help",
    icon: HelpCircle,
    roles: Object.values(UserRoleType),
    group: "Support",
  },
];

export const getRoutesByRole = (role: UserRoleType) => {
  return routes.filter((route) => route.roles?.includes(role));
};

export const getRoutesByGroup = (role: UserRoleType) => {
  const userRoutes = getRoutesByRole(role);
  const groups: Record<string, Route[]> = {};

  userRoutes.forEach((route) => {
    const group = route.group || "Navigation";
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(route);
  });

  return groups;
};

export const hasRouteAccess = (href: string, role: UserRoleType) => {
  return routes.some((r) => r.href === href && r.roles?.includes(role));
};
