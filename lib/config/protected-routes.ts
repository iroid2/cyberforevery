export enum UserRoleType {
  SUPER_ADMIN = "SUPER_ADMIN",
  INSTRUCTOR = "INSTRUCTOR",
  ADMIN_STAFF = "ADMIN_STAFF",
  PARENT = "PARENT",
  STUDENT = "STUDENT",
  GUEST = "GUEST",
}

export type ProtectedRoute = {
  title: string;
  href: string;
  roles?: UserRoleType[];
  group?: string;
  isNew?: boolean;
};

export const protectedRoutes: ProtectedRoute[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    roles: Object.values(UserRoleType),
  },
  {
    title: "User Management",
    href: "/dashboard/user-management",
    roles: [UserRoleType.SUPER_ADMIN],
    group: "Administrative",
  },
  {
    title: "System Settings",
    href: "/dashboard/system-settings",
    roles: [UserRoleType.SUPER_ADMIN],
    group: "Administrative",
  },
  {
    title: "Cohorts",
    href: "/dashboard/cohorts",
    roles: [UserRoleType.SUPER_ADMIN, UserRoleType.ADMIN_STAFF],
    group: "Management",
  },
  {
    title: "Enrollments",
    href: "/dashboard/enrollments",
    roles: [UserRoleType.SUPER_ADMIN, UserRoleType.ADMIN_STAFF],
    group: "Management",
  },
  {
    title: "Roster",
    href: "/dashboard/roster",
    roles: [UserRoleType.INSTRUCTOR, UserRoleType.SUPER_ADMIN],
    group: "Classroom",
  },
  {
    title: "Attendance",
    href: "/dashboard/attendance",
    roles: [UserRoleType.INSTRUCTOR, UserRoleType.SUPER_ADMIN],
    group: "Classroom",
  },
  {
    title: "Grade Portal",
    href: "/dashboard/grade-portal",
    roles: [UserRoleType.INSTRUCTOR, UserRoleType.SUPER_ADMIN],
    group: "Classroom",
  },
  {
    title: "Schedule",
    href: "/dashboard/schedule",
    roles: [UserRoleType.STUDENT, UserRoleType.PARENT],
    group: "Learner Portal",
  },
  {
    title: "Assignments",
    href: "/dashboard/assignments",
    roles: [UserRoleType.STUDENT],
    group: "Learner Portal",
  },
  {
    title: "Progress",
    href: "/dashboard/progress",
    roles: [UserRoleType.STUDENT, UserRoleType.PARENT],
    group: "Learner Portal",
  },
  {
    title: "Billing",
    href: "/dashboard/billing",
    roles: [UserRoleType.SUPER_ADMIN, UserRoleType.PARENT],
    group: "Finance",
  },
  {
    title: "Revenue",
    href: "/dashboard/revenue",
    roles: [UserRoleType.SUPER_ADMIN],
    group: "Finance",
  },
  {
    title: "Messages",
    href: "/dashboard/messages",
    roles: [
      UserRoleType.SUPER_ADMIN,
      UserRoleType.ADMIN_STAFF,
      UserRoleType.INSTRUCTOR,
      UserRoleType.PARENT,
    ],
    group: "Communication",
  },
  {
    title: "Help Center",
    href: "/dashboard/help",
    roles: Object.values(UserRoleType),
    group: "Support",
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    roles: Object.values(UserRoleType),
    group: "Personal",
  },
];

export function normalizeDashboardPath(pathname: string) {
  if (pathname === "/") {
    return pathname;
  }

  return pathname.replace(/\/+$/, "");
}

export function getProtectedRouteByHref(href: string) {
  const normalizedHref = normalizeDashboardPath(href);

  return protectedRoutes.find((route) => normalizeDashboardPath(route.href) === normalizedHref);
}

export function canAccessProtectedRoute(
  href: string,
  role?: UserRoleType | string | null
) {
  const route = getProtectedRouteByHref(href);

  if (!route || !role) {
    return false;
  }

  return route.roles?.includes(role as UserRoleType) ?? false;
}
