import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";
import LinkedIn from "next-auth/providers/linkedin";
import {
  canAccessProtectedRoute,
  getProtectedRouteByHref,
  normalizeDashboardPath,
} from "@/lib/config/protected-routes";

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
      const pathname = normalizeDashboardPath(request.nextUrl.pathname);
      const origin = request.nextUrl.origin;

      if (!pathname.startsWith("/dashboard")) {
        return true;
      }

      if (!auth?.user) {
        return false;
      }

      if (pathname === "/dashboard") {
        return true;
      }

      const role = (auth.user as { role?: string }).role;
      const protectedRoute = getProtectedRouteByHref(pathname);

      if (!protectedRoute) {
        return Response.redirect(new URL("/dashboard", origin));
      }

      if (canAccessProtectedRoute(pathname, role)) {
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
