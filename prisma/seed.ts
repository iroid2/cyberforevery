import { PrismaClient, UserRole } from "@prisma/client";
import { sendAdminPromotionEmail } from "../lib/emails/actions";

// The standard PrismaClient constructor automatically picks up DATABASE_URL from .env
const prisma = new PrismaClient();

async function main() {
  console.log("🚀 [Seed] Starting platform initialization...");

  const users = [
    {
      name: "Platform Director",
      email: "admin@cyber.com",
      password: "password123",
      role: UserRole.SUPER_ADMIN,
    },
    {
      name: "Ivan Instructor",
      email: "ivan@cyber.com",
      password: "password123",
      role: UserRole.INSTRUCTOR,
    },
    {
      name: "Staff Member",
      email: "staff@cyber.com",
      password: "password123",
      role: UserRole.ADMIN_STAFF,
    },
    {
      name: "Parent User",
      email: "parent@cyber.com",
      password: "password123",
      role: UserRole.PARENT,
    },
    {
      name: "Student User",
      email: "student@cyber.com",
      password: "password123",
      role: UserRole.STUDENT,
    },
    {
      name: "Cyber Admin",
      email: "iradtu22@gmail.com",
      password: "password123",
      role: UserRole.SUPER_ADMIN,
    },
  ];

  for (const user of users) {
    const upsertedUser = await prisma.user.upsert({
      where: { email: user.email },
      update: { role: user.role }, // Ensure role is updated to SUPER_ADMIN if promoted
      create: user,
    });
    console.log(`✅ [Seed] User Synced: ${user.name} (${user.role})`);
    
    // If it's the target admin, send the promotion email
    if (user.email === "iradtu22@gmail.com") {
      try {
        await sendAdminPromotionEmail(user.email, user.name || "Admin");
        console.log(`📧 [Seed] Promotion email dispatched to ${user.email}`);
      } catch (e) {
        console.error(`❌ [Seed] Email dispatch failed for ${user.email}:`, e);
      }
    }
  }

  console.log("🏁 [Seed] Command executed successfully.");
}

main()
  .catch((e) => {
    console.error("🔥 [Seed] Global Failure:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
