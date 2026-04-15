import { neon } from '@neondatabase/serverless';

// 🚀 Emergency Promotion via Neon HTTP (Bypassing Prisma/Engines entirely)
const sql = neon("postgresql://neondb_owner:npg_nkvpVR4Aj2bG@ep-aged-dream-ablzg9ht-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require");

async function run() {
  console.log("📡 [Emergency] Attempting promotion via Neon HTTP...");
  const email = 'iradtu22@gmail.com';
  
  try {
    // Upsert the admin user with all required fields
    await sql`
      INSERT INTO "User" (id, email, name, password, role, "createdAt", "updatedAt")
      VALUES (gen_random_uuid(), ${email}, 'Director Admin', 'password123', 'SUPER_ADMIN', NOW(), NOW())
      ON CONFLICT (email) DO UPDATE SET role = 'SUPER_ADMIN', "updatedAt" = NOW();
    `;
    console.log(`✅ [Success] ${email} is now SUPER_ADMIN via RAW_SQL.`);
  } catch (err) {
    console.error("❌ [SQL_Error]", err);
  } finally {
    process.exit(0);
  }
}

run();
