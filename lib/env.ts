const requiredEnv = [
  "DATABASE_URL",
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "RESEND_API_KEY",
  "INTERNAL_API_KEY",
  "UPLOADTHING_TOKEN",
] as string[];

export function getMissingRequiredEnv() {
  const missing = requiredEnv.filter((key) => !process.env[key]);
  const hasAuthSecret = Boolean(process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET);

  if (!hasAuthSecret) {
    missing.push("NEXTAUTH_SECRET");
  }

  return missing;
}

export function assertServerEnv() {
  const missing = getMissingRequiredEnv();

  if (missing.length > 0) {
    console.warn(`[Env] Missing required environment variables: ${missing.join(", ")}`);
  }
}
