import { NextResponse } from "next/server";
import { resend, DEFAULT_FROM, ADMIN_EMAIL } from "@/lib/resend";
import { getOnboardingEmailHtml } from "@/lib/emails/onboard-template";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { z } from "zod";

const onboardSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  setupUrl: z.string().url().optional(),
});

export async function POST(req: Request) {
  try {
    const forwardedFor = req.headers.get("x-forwarded-for") || "unknown";
    const rateLimit = checkRateLimit(`onboard:${forwardedFor}`, 5, 60_000);

    if (!rateLimit.allowed) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    if (req.headers.get("x-internal-key") !== process.env.INTERNAL_API_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const parsed = onboardSchema.safeParse(await req.json());

    if (!parsed.success) {
      return NextResponse.json({ error: "Email and name are required" }, { status: 400 });
    }

    const { email, name, setupUrl } = parsed.data;

    const studentEmailResponse = await resend.emails.send({
      from: DEFAULT_FROM,
      to: [email],
      subject: "WELCOME TO THE MISSION // Cyber4Every1",
      html: getOnboardingEmailHtml(name, { setupUrl }),
    });

    const adminNotificationResponse = await resend.emails.send({
      from: DEFAULT_FROM,
      to: [ADMIN_EMAIL],
      subject: `NEW ENROLLMENT: ${name}`,
      text: `An onboarding email was just sent to ${name} (${email}). System Status: Normal.`,
    });

    return NextResponse.json({
      success: true,
      data: {
        student: studentEmailResponse,
        admin: adminNotificationResponse,
      },
    });
  } catch (error) {
    console.error("[Onboarding API] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
