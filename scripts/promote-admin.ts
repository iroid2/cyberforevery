import "dotenv/config";
import { UserRole } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { sendAdminPromotionEmail } from "../lib/emails/actions";

async function promoteAdmin(email: string) {
  console.log(`🚀 [Promotion] Attempting to promote ${email} to SUPER_ADMIN...`);

  try {
    const user = await prisma.user.upsert({
      where: { email },
      update: { role: UserRole.SUPER_ADMIN },
      create: {
        email,
        name: "Director Admin",
        password: "password123", // Default password for manual promotion
        role: UserRole.SUPER_ADMIN,
      },
    });

    console.log(`✅ [Promotion] Success! ${user.email} is now a SUPER_ADMIN.`);
    
    // Send confirmation email
    await sendAdminPromotionEmail(user.email, user.name);
    console.log(`📧 [Promotion] Confirmation email dispatched.`);

  } catch (error) {
    console.error(`❌ [Promotion] Failed:`, error);
  } finally {
    await prisma.$disconnect();
  }
}

// Target email from user request
promoteAdmin("iradtu22@gmail.com");
