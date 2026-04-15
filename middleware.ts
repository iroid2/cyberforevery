import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { hasRouteAccess, UserRoleType } from "@/lib/config/routes";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const role = (req.auth?.user as any)?.role as UserRoleType;

  // Protect all /dashboard routes
  if (nextUrl.pathname.startsWith("/dashboard")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }

    // Check role-based access for the specific path
    // Special case for the root /dashboard which is open to all logged-in users
    if (nextUrl.pathname !== "/dashboard" && !hasRouteAccess(nextUrl.pathname, role)) {
      // Redirect to their own dashboard home if they hit a forbidden path
      return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
