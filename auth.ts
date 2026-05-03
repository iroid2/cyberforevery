import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import authConfig from "@/auth.config";
import { prisma } from "@/lib/db";
import { verifyPassword } from "@/lib/security/password";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { PrismaAdapter } from "@auth/prisma-adapter";

const authSecret = process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET;

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  secret: authSecret,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const normalizedEmail = String(credentials.email).toLowerCase();
          const rateLimit = checkRateLimit(`login:${normalizedEmail}`, 10, 60_000);

          if (!rateLimit.allowed) {
            return null;
          }

          const user = await prisma.user.findUnique({
            where: { email: normalizedEmail },
          });

          if (!user) {
            return null;
          }

          const isValidPassword = await verifyPassword(String(credentials.password), user?.password);

          if (!isValidPassword) {
            return null;
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error("[Auth] Credentials authorize error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string | null }).role ?? token.role;
      }

      if (!token.role && token.email) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { email: token.email },
            select: { role: true },
          });

          if (dbUser) {
            token.role = dbUser.role;
          }
        } catch (error) {
          console.error("[Auth] JWT callback error:", error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        (session.user as any).role = token.role as string;
      }

      return session;
    },
  },
});
