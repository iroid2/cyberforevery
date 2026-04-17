const requiredEnv = [
  "DATABASE_URL",
  "AUTH_SECRET",
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "RESEND_API_KEY",
  "INTERNAL_API_KEY",
  "UPLOADTHING_TOKEN",
] as const;

export function getMissingRequiredEnv() {
  return requiredEnv.filter((key) => !process.env[key]);
}

export function assertServerEnv() {
  const missing = getMissingRequiredEnv();

  if (missing.length > 0) {
    console.warn(`[Env] Missing required environment variables: ${missing.join(", ")}`);
  }
}
