import {
  Home,
  BookOpen,
  Users,
  ClipboardList,
  BarChart2,
  Settings,
  UserCog,
  Lock,
  PlusSquare,
  FileQuestion,
  Shield,
  Radio,
} from "lucide-react";

export enum UserRoleType {
  ADMIN = "ADMIN",
  TUTOR = "TUTOR",
}

export type RouteSubLink = {
  title: string;
  href: string;
  icon?: any;
};

export type Route = {
  title: string;
  href: string;
  icon: any;
  roles?: UserRoleType[];
  group?: string;
  isNew?: boolean;
  subLinks?: RouteSubLink[];
};

export const routes: Route[] = [
  // ─── OVERVIEW ───────────────────────────────────────────────
  {
    title: "Overview",
    href: "/dashboard",
    icon: Home,
    roles: [UserRoleType.ADMIN, UserRoleType.TUTOR],
    group: "Overview",
  },

  // ─── LIVE SESSIONS ──────────────────────────────────────────
  {
    title: "Live Sessions",
    href: "/dashboard/sessions",
    icon: Radio,
    roles: [UserRoleType.TUTOR],
    group: "Courses",
    isNew: true,
  },

  // ─── COURSE MANAGEMENT ──────────────────────────────────────
  {
    title: "My Courses",
    href: "/dashboard/courses",
    icon: BookOpen,
    roles: [UserRoleType.TUTOR],
    group: "Courses",
    subLinks: [
      { title: "Course List", href: "/dashboard/courses" },
      { title: "All Sessions", href: "/dashboard/sessions" },
      { title: "Create Course", href: "/dashboard/courses/new" },
    ],
  },
  {
    title: "New Course",
    href: "/dashboard/courses/new",
    icon: PlusSquare,
    roles: [UserRoleType.TUTOR],
    group: "Courses",
  },
  {
    title: "All Courses",
    href: "/dashboard/courses/all",
    icon: BookOpen,
    roles: [UserRoleType.ADMIN],
    group: "Courses",
    subLinks: [
      { title: "Live Courses", href: "/dashboard/courses/all?filter=live" },
      { title: "Inactive Courses", href: "/dashboard/courses/all?filter=inactive" },
    ],
  },

  // ─── ATTENDANCE & STUDENTS ──────────────────────────────────
  {
    title: "Attendance",
    href: "/dashboard/attendance",
    icon: ClipboardList,
    roles: [UserRoleType.ADMIN, UserRoleType.TUTOR],
    group: "Students",
  },

  // ─── QUIZ & RESULTS ─────────────────────────────────────────
  {
    title: "Quiz Results",
    href: "/dashboard/results",
    icon: FileQuestion,
    roles: [UserRoleType.TUTOR],
    group: "Performance",
  },
  {
    title: "All Results",
    href: "/dashboard/results/all",
    icon: FileQuestion,
    roles: [UserRoleType.ADMIN],
    group: "Performance",
    isNew: true,
  },

  // ─── ANALYTICS ──────────────────────────────────────────────
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart2,
    roles: [UserRoleType.TUTOR],
    group: "Performance",
  },
  {
    title: "Platform Analytics",
    href: "/dashboard/analytics/platform",
    icon: BarChart2,
    roles: [UserRoleType.ADMIN],
    group: "Performance",
    isNew: true,
  },

  // ─── TUTOR MANAGEMENT (ADMIN ONLY) ──────────────────────────
  {
    title: "Tutors",
    href: "/dashboard/tutors",
    icon: Users,
    roles: [UserRoleType.ADMIN],
    group: "User Management",
    subLinks: [
      { title: "All Tutors", href: "/dashboard/tutors" },
      { title: "Invite Tutor", href: "/dashboard/tutors/invite" },
    ],
  },

  // ─── SETTINGS (ADMIN ONLY) ───────────────────────────────────
  {
    title: "Platform Settings",
    href: "/dashboard/settings",
    icon: Settings,
    roles: [UserRoleType.ADMIN],
    group: "Settings",
  },
  {
    title: "Audit Log",
    href: "/dashboard/settings/audit-log",
    icon: Shield,
    roles: [UserRoleType.ADMIN],
    group: "Settings",
  },

  // ─── PERSONAL ────────────────────────────────────────────────
  {
    title: "My Profile",
    href: "/dashboard/profile",
    icon: UserCog,
    roles: [UserRoleType.ADMIN, UserRoleType.TUTOR],
    group: "Personal",
  },
  {
    title: "Change Password",
    href: "/dashboard/change-password",
    icon: Lock,
    roles: [UserRoleType.ADMIN, UserRoleType.TUTOR],
    group: "Personal",
  },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

export const getRoutesByRole = (role: UserRoleType): Route[] =>
  routes.filter((route) => route.roles?.includes(role));

export const getRoutesByGroup = (role: UserRoleType): Map<string, Route[]> => {
  const userRoutes = getRoutesByRole(role);
  const groups = new Map<string, Route[]>();
  userRoutes.forEach((route) => {
    const group = route.group || "Other";
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group)!.push(route);
  });
  return groups;
};

export const hasRouteAccess = (route: Route, role: UserRoleType): boolean =>
  route.roles?.includes(role) ?? false;
