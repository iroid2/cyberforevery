import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool, neonConfig } from "@neondatabase/serverless";

/**
 * DEFINITIVE Prisma 7 + Neon configuration.
 * Optimized for Vercel builds by using dynamic Node.js imports.
 */

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString && typeof window === "undefined") {
    // Only attempt to load dotenv in standalone scripts
    try {
      require("dotenv").config();
    } catch (e) {}
  }

  // Neon WebSocket setup (Node.js only)
  if (typeof window === "undefined") {
    try {
      // Dynamic require avoids Vercel build-time module resolution errors for 'ws'
      const ws = require("ws");
      neonConfig.webSocketConstructor = ws;
    } catch (e) {
      console.warn("⚠️ [Prisma] WebSocket constructor not found. Falling back to HTTP.");
    }
  }

  const pool = new Pool({ 
    connectionString: process.env.DATABASE_URL || "", 
    connectionTimeoutMillis: 15000,
    max: 10 
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
