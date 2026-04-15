import "dotenv/config";
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  console.warn("⚠️ [Resend] RESEND_API_KEY is missing in .env. Email features will be disabled.");
}

export const resend = new Resend(resendApiKey);

export const DEFAULT_FROM = "Cyber4Every1 Onboarding <info@infocyber4every1.com>";
export const ADMIN_EMAIL = "iradtu22@gmail.com";
