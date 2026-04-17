import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { assertServerEnv } from "@/lib/env";

/**
 * Prisma 6 + Neon Serverless Singleton
 * Stable configuration for Next.js 16 + Auth.js v5.
 */

// Setup WebSocket for Node.js environment
if (typeof window === "undefined") {
  try {
    const ws = require("ws");
    neonConfig.webSocketConstructor = ws;
  } catch (e) {}
}

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

function createPrismaClient(): PrismaClient {
  assertServerEnv();
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    // Try loading dotenv for standalone scripts
    try {
      require("dotenv").config();
    } catch (e) {}
  }

  const url = process.env.DATABASE_URL || "";

  const pool = new Pool({ connectionString: url });
  const adapter = new PrismaNeon(pool);

  return new PrismaClient({ adapter } as any);
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
