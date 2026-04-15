import { PrismaClient, UserRole } from "@prisma/client";
import { sendAdminPromotionEmail } from "../lib/emails/actions";

const prisma = new PrismaClient();

async function main() {
  console.log("[Seed] Starting platform initialization...");

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
    await prisma.user.upsert({
      where: { email: user.email },
      update: { role: user.role },
      create: user,
    });

    console.log(`[Seed] User synced: ${user.name} (${user.role})`);

    if (user.email === "iradtu22@gmail.com") {
      try {
        await sendAdminPromotionEmail(user.email, user.name || "Admin");
        console.log(`[Seed] Promotion email dispatched to ${user.email}`);
      } catch (error) {
        console.error(`[Seed] Email dispatch failed for ${user.email}:`, error);
      }
    }
  }

  const starterCourses = [
    {
      title: "Intro to Cybersecurity",
      slug: "intro-to-cybersecurity",
      description: "Foundational cybersecurity track available online and in-person.",
    },
    {
      title: "Intro to Computer Hardware",
      slug: "intro-to-computer-hardware",
      description: "Hands-on hardware fundamentals available online and in-person.",
    },
    {
      title: "Intro to Networking",
      slug: "intro-to-networking",
      description: "Networking essentials for beginners delivered online and in-person.",
    },
    {
      title: "Intro to AI & Current Trends",
      slug: "intro-to-ai-current-trends",
      description: "Beginner-friendly AI and trends course available online and in-person.",
    },
    {
      title: "Intro to Web Development",
      slug: "intro-to-web-development",
      description: "Web development fundamentals offered as an online-only course.",
    },
    {
      title: "Intro to Graphic Design + AI",
      slug: "intro-to-graphic-design-ai",
      description: "Graphic design and AI creativity course offered online only.",
    },
  ];

  for (const course of starterCourses) {
    await prisma.course.upsert({
      where: { slug: course.slug },
      update: {
        title: course.title,
        description: course.description,
      },
      create: course,
    });

    console.log(`[Seed] Course synced: ${course.title}`);
  }

  console.log("[Seed] Command executed successfully.");
}

main()
  .catch((error) => {
    console.error("[Seed] Global failure:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
