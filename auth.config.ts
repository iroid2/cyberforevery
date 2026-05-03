import type { NextAuthConfig } from "next-auth";

const authConfig = {
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET,
  trustHost: true,
  providers: [],
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;

export default authConfig;
