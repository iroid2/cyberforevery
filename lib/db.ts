import { PrismaClient } from "@/lib/generated/prisma";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { assertServerEnv } from "@/lib/env";

// Route all pool.query() calls through HTTP — no WebSocket needed for regular queries.
// Do NOT set webSocketConstructor: any code that accidentally opens an interactive
// transaction (pool.connect()) will fail cleanly instead of crashing on the broken
// bufferutil native addon.
neonConfig.poolQueryViaFetch = true;

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function createPrismaClient() {
  assertServerEnv();

  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is required to initialize Prisma");
  }

  const pool = new Pool({ connectionString });
  const adapter = new PrismaNeon(pool);

  return new PrismaClient({ adapter } as never);
}

let client: PrismaClient | undefined;

// Lazily constructed so importing this module (e.g. while Next.js collects
// page data at build time) never opens a DB connection or throws on a
// missing DATABASE_URL — that only happens on first real use at runtime.
function getPrismaClient(): PrismaClient {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;
  if (client) return client;

  client = createPrismaClient();

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = client;
  }

  return client;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    const value = Reflect.get(getPrismaClient() as object, prop, receiver);
    return typeof value === "function" ? value.bind(getPrismaClient()) : value;
  },
});
