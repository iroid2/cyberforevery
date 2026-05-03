import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { NextResponse } from "next/server";

const adminOnlyRoutes = ["/dashboard/tutors", "/dashboard/settings"];

const { auth } = NextAuth(authConfig);

export default auth((request) => {
  const { nextUrl, auth: session } = request;
  const pathname = nextUrl.pathname.replace(/\/+$/, "");

  if (!pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  if (!session?.user) {
    const loginUrl = new URL("/login", nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const role = String((session.user as { role?: string }).role ?? "").toUpperCase();

  if (adminOnlyRoutes.some((route) => pathname.startsWith(route)) && !["ADMIN", "SUPER_ADMIN"].includes(role)) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
