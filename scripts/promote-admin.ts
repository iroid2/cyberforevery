import "dotenv/config";
import { UserRole } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { issuePasswordSetupToken } from "../lib/account-setup";

async function promoteAdmin(email: string) {
  console.log(`[Promotion] Attempting to promote ${email} to SUPER_ADMIN...`);

  try {
    const user = await prisma.user.upsert({
      where: { email },
      update: { role: UserRole.SUPER_ADMIN },
      create: {
        email,
        name: "Director Admin",
        role: UserRole.SUPER_ADMIN,
      },
    });

    const token = await issuePasswordSetupToken(email);
    console.log(`[Promotion] Success! ${user.email} is now a SUPER_ADMIN.`);
    console.log(`[Promotion] Password setup token issued: ${token.rawToken}`);
  } catch (error) {
    console.error("[Promotion] Failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

promoteAdmin("iradtu22@gmail.com");
