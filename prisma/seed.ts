import {
  UserRole,
  PrismaClient,
} from "@prisma/client";
import { hashPassword } from "../lib/security/password";

const prisma = new PrismaClient();
const DEFAULT_PASSWORD = "ChangeMe123!";

const staffUsers = [
  { name: "Platform Admin", email: "admin@cyber.com", role: UserRole.ADMIN },
  { name: "Ivan Tutor", email: "ivan@cyber.com", role: UserRole.TUTOR },
  { name: "Nia Tutor", email: "nia@cyber.com", role: UserRole.TUTOR },
  { name: "Marco Tutor", email: "marco@cyber.com", role: UserRole.TUTOR },
  { name: "Cyber Admin", email: "iradtu22@gmail.com", role: UserRole.ADMIN },
] as const;

async function main() {
  console.log("[Seed] Creating initial users...");

  for (const userData of staffUsers) {
    const hashed = await hashPassword(DEFAULT_PASSWORD);
    await prisma.user.upsert({
      where: { email: userData.email },
      update: {
        name: userData.name,
        role: userData.role,
        password: hashed,
      },
      create: {
        name: userData.name,
        email: userData.email,
        role: userData.role,
        password: hashed,
      },
    });
    console.log(`  ✓ ${userData.email} (${userData.role}) - password: ${DEFAULT_PASSWORD}`);
  }

  // Create a test session with questions
  const tutor = await prisma.user.findFirst({ where: { role: UserRole.TUTOR } });
  if (tutor) {
    const session = await prisma.session.create({
      data: {
        title: "Cybersecurity Basics Quiz Session",
        subject: "Digital Safety Fundamentals",
        notes: "Welcome to the session! This quiz covers basic cybersecurity concepts.",
        isActive: true,
        tutorId: tutor.id,
        questions: {
          create: [
            {
              questionText: "What is a strong password?",
              options: [
                "Password123",
                "A mix of 12+ characters with numbers, capitals, and symbols",
                "Your birthday",
                "The word 'password'",
              ],
              correctIndex: 1,
              orderIndex: 0,
            },
            {
              questionText: "What is phishing?",
              options: [
                "A type of fishing",
                "A cyber attack that uses fake messages to steal information",
                "A social media platform",
                "An email client",
              ],
              correctIndex: 1,
              orderIndex: 1,
            },
          ],
        },
      },
    });
    console.log(`  ✓ Created session: ${session.title}`);
  }

  console.log("[Seed] ✅ Complete!");
}

main()
  .catch((error) => {
    console.error("[Seed] Global failure:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
