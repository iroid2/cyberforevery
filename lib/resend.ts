import "dotenv/config";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resendFrom = process.env.RESEND_FROM_EMAIL || process.env.EMAIL_FROM;
const resendAdmin = process.env.ADMIN_EMAIL;

if (!resendApiKey) {
  console.warn(
    "[Resend] RESEND_API_KEY is missing in .env. Email features will be disabled.",
  );
}

if (!resendFrom) {
  console.warn(
    "[Resend] No RESEND_FROM_EMAIL configured. Falling back to the hardcoded sender address.",
  );
}

export const resend = new Resend(resendApiKey);

export const DEFAULT_FROM =
  resendFrom || "Cyber4Every1 Onboarding <info@cyber4every1.com>";
export const ADMIN_EMAIL = resendAdmin || "iradtu22@gmail.com";
