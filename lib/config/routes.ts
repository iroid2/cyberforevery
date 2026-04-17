import {
  BookOpen,
  Calendar,
  CreditCard,
  FileBadge,
  GraduationCap,
  HelpCircle,
  Home,
  LayoutDashboard,
  MessageSquare,
  Package,
  Settings,
  ClipboardList,
  UserCheck,
  UserCog,
  Users,
} from "lucide-react";
import {
  protectedRoutes,
  UserRoleType,
  type ProtectedRoute,
} from "@/lib/config/protected-routes";

export { UserRoleType } from "@/lib/config/protected-routes";

export type Route = ProtectedRoute & {
  icon: any;
};

const routeIcons: Record<string, any> = {
  "/dashboard": LayoutDashboard,
  "/dashboard/user-management": Users,
  "/dashboard/system-settings": Settings,
  "/dashboard/cohorts": Package,
  "/dashboard/enrollments": UserCheck,
  "/dashboard/roster": Users,
  "/dashboard/attendance": Calendar,
  "/dashboard/grade-portal": ClipboardList,
  "/dashboard/schedule": Calendar,
  "/dashboard/assignments": BookOpen,
  "/dashboard/progress": FileBadge,
  "/dashboard/certificates": GraduationCap,
  "/dashboard/billing": CreditCard,
  "/dashboard/revenue": GraduationCap,
  "/dashboard/messages": MessageSquare,
  "/dashboard/help": HelpCircle,
  "/dashboard/profile": UserCog,
};

export const routes: Route[] = protectedRoutes.map((route) => ({
  ...route,
  icon: routeIcons[route.href] ?? Home,
}));

export const getRouteByHref = (href: string) => {
  return routes.find((route) => route.href === href);
};

export const normalizeUserRole = (role?: UserRoleType | string | null): UserRoleType => {
  if (!role) {
    return UserRoleType.GUEST;
  }

  const normalizedRole = String(role).toUpperCase();
  const matchedRole = Object.values(UserRoleType).find((value) => value === normalizedRole);

  return matchedRole ?? UserRoleType.GUEST;
};

export const getRoutesByRole = (role?: UserRoleType | string | null) => {
  const normalizedRole = normalizeUserRole(role);

  return routes.filter((route) => route.roles?.includes(normalizedRole));
};

export const getRoutesByGroup = (role?: UserRoleType | string | null) => {
  const userRoutes = getRoutesByRole(role);
  const groups = new Map<string, Route[]>();

  userRoutes.forEach((route) => {
    const group = route.group || "Other";
    if (!groups.has(group)) {
      groups.set(group, []);
    }
    groups.get(group)?.push(route);
  });

  return groups;
};

export const hasRouteAccess = (route: Route, role?: UserRoleType | string | null) => {
  const normalizedRole = normalizeUserRole(role);

  return route.roles?.includes(normalizedRole) ?? false;
};
