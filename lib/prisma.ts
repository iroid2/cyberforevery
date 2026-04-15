import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

/**
 * HIGH-STABILITY PRISMA SINGLETON
 * Optimized for Prisma 7 + Neon + Next.js Server Actions.
 */

if (typeof window === "undefined") {
  neonConfig.webSocketConstructor = ws;
}

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString && typeof window === "undefined") {
    try {
      require("dotenv").config();
    } catch (e) {}
  }

  // Create a robust pool with extended timeouts to prevent P2028 transaction errors
  const pool = new Pool({ 
    connectionString: process.env.DATABASE_URL || "",
    max: 10,
    connectionTimeoutMillis: 15000, // 15s to establish connection
    idleTimeoutMillis: 30000        // 30s before closing idle connections
  });
  
  const adapter = new PrismaNeon(pool);

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
