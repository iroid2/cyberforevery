const { PrismaClient } = require("@prisma/client");
const { PrismaNeon } = require("@prisma/adapter-neon");
const { Pool, neonConfig } = require("@neondatabase/serverless");
const ws = require("ws");

// FORCIBLY inject the environment variable into the process
process.env.DATABASE_URL = "postgresql://neondb_owner:npg_nkvpVR4Aj2bG@ep-aged-dream-ablzg9ht-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

async function forcePromote() {
  console.log("🚀 [Emergency] Force promoting iradtu22@gmail.com with ENV injection...");
  
  neonConfig.webSocketConstructor = ws;
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaNeon(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    const email = "iradtu22@gmail.com";
    const user = await prisma.user.upsert({
      where: { email },
      update: { role: "SUPER_ADMIN" },
      create: {
        email,
        name: "Director Admin",
        password: "password123",
        role: "SUPER_ADMIN",
      },
    });
    console.log(`✅ [Success] ${user.email} is now ${user.role}`);
  } catch (error) {
    console.error("❌ [Error]", error);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
}

forcePromote();
