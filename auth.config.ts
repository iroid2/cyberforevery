import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";
import LinkedIn from "next-auth/providers/linkedin";

const dashboardAccess: Record<string, string[]> = {
  "/dashboard/admin/users": ["SUPER_ADMIN"],
  "/dashboard/admin/settings": ["SUPER_ADMIN"],
  "/dashboard/bootcamp/cohorts": ["SUPER_ADMIN", "ADMIN_STAFF"],
  "/dashboard/bootcamp/enrollments": ["SUPER_ADMIN", "ADMIN_STAFF"],
  "/dashboard/instructor/roster": ["INSTRUCTOR", "SUPER_ADMIN"],
  "/dashboard/instructor/attendance": ["INSTRUCTOR", "SUPER_ADMIN"],
  "/dashboard/instructor/grading": ["INSTRUCTOR", "SUPER_ADMIN"],
  "/dashboard/student/schedule": ["STUDENT", "PARENT"],
  "/dashboard/student/tasks": ["STUDENT"],
  "/dashboard/student/progress": ["STUDENT", "PARENT"],
  "/dashboard/finance/billing": ["SUPER_ADMIN", "PARENT"],
  "/dashboard/finance/revenue": ["SUPER_ADMIN"],
  "/dashboard/messages": ["SUPER_ADMIN", "ADMIN_STAFF", "INSTRUCTOR", "PARENT"],
  "/dashboard/help": ["SUPER_ADMIN", "INSTRUCTOR", "ADMIN_STAFF", "PARENT", "STUDENT", "GUEST"],
};

export const providers = [
  Google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),
  Facebook({
    clientId: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  }),
  LinkedIn({
    clientId: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  }),
  Credentials({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize() {
      return null;
    },
  }),
] satisfies NextAuthConfig["providers"];

const authConfig = {
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  providers,
  callbacks: {
    authorized({ auth, request }) {
      const { pathname, origin } = request.nextUrl;

      if (!pathname.startsWith("/dashboard")) {
        return true;
      }

      if (!auth?.user) {
        return false;
      }

      if (pathname === "/dashboard") {
        return true;
      }

      const allowedRoles = dashboardAccess[pathname];
      const role = (auth.user as { role?: string }).role;

      if (!allowedRoles || (role && allowedRoles.includes(role))) {
        return true;
      }

      return Response.redirect(new URL("/dashboard", origin));
    },
  },
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;

export default authConfig;
