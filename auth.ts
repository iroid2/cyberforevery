import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";
import LinkedIn from "next-auth/providers/linkedin";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import authConfig from "@/auth.config";
import { prisma } from "@/lib/prisma";
import { hashPassword, needsPasswordRehash, verifyPassword } from "@/lib/security/password";
import { checkRateLimit } from "@/lib/security/rate-limit";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
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

          const isValidPassword = await verifyPassword(String(credentials.password), user?.password);

          if (!user || !isValidPassword) {
            return null;
          }

          if (needsPasswordRehash(user.password)) {
            const password = await hashPassword(String(credentials.password));
            await prisma.user.update({
              where: { id: user.id },
              data: { password },
            });
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
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        return true;
      }

      if (!user.email) {
        return false;
      }

      try {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
          select: { role: true },
        });

        if (dbUser && !dbUser.role) {
          await prisma.user.update({
            where: { email: user.email },
            data: { role: UserRole.PARENT },
          });
        }
      } catch (error) {
        console.error("[Auth] signIn callback error:", error);
      }

      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = (user as { role?: UserRole | null }).role ?? token.role;
      }

      if (trigger === "update" && session?.role) {
        token.role = session.role;
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
        (session.user as any).role = token.role as UserRole;
      }

      return session;
    },
  },
});
