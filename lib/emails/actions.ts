import { resend, DEFAULT_FROM, ADMIN_EMAIL } from "@/lib/resend";
import { getOnboardingEmailHtml } from "@/lib/emails/onboard-template";

type EmailResult = {
  success: boolean;
  id?: string;
  error?: string;
};

type OnboardingFlowOptions = {
  setupUrl?: string | null;
  dashboardUrl?: string | null;
};

function getEmailErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "Unknown email error";
}

async function sendEmailWithLogging(
  label: string,
  payload: Parameters<typeof resend.emails.send>[0]
): Promise<EmailResult> {
  try {
    const response = await resend.emails.send(payload);
    const providerError = response.error?.message ?? null;

    if (providerError) {
      console.error(`[Emails] ${label} rejected by provider:`, providerError);
      return { success: false, error: providerError };
    }

    console.log(
      `[Emails] ${label} accepted by provider with id ${response.data?.id ?? "unknown"}`
    );

    return { success: true, id: response.data?.id };
  } catch (error) {
    const message = getEmailErrorMessage(error);
    console.error(`[Emails] ${label} failed:`, message);
    return { success: false, error: message };
  }
}

export async function sendAdminEnrollmentNotification(data: Record<string, unknown>) {
  console.log(`[Emails] Sending admin dossier for student: ${data.studentFirstName ?? "Unknown"}`);

  const details = Object.entries(data)
    .filter(([key]) => key !== "agreeTerms" && key !== "agreeRefund")
    .map(
      ([key, value]) => `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #1a1a1a; color: #bfff00; font-size: 10px; font-weight: bold; text-transform: uppercase;">${key.replace(/([A-Z])/g, " $1")}</td>
          <td style="padding: 12px; border-bottom: 1px solid #1a1a1a; color: #ffffff; font-size: 12px;">${value || "N/A"}</td>
        </tr>
      `
    )
    .join("");

  return sendEmailWithLogging("Admin enrollment notification", {
    from: DEFAULT_FROM,
    to: [ADMIN_EMAIL],
    subject: `[NEW_INTEL] Enrollment Received: ${data.studentFirstName ?? "Student"} ${data.studentLastName ?? ""}`.trim(),
    html: `
      <div style="background-color: #050505; color: #ffffff; padding: 40px; font-family: 'Segoe UI', sans-serif; border: 1px solid #333;">
        <h1 style="color: #bfff00; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 2px solid #bfff00; padding-bottom: 20px; font-size: 24px;">Student Enrollment Dossier</h1>
        <p style="color: #888; margin-bottom: 30px;">A new application has been submitted through the Command Form. Subject data follows:</p>
        
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #111;">
              <th style="padding: 12px; text-align: left; color: #bfff00; text-transform: uppercase; font-size: 10px;">Parameter</th>
              <th style="padding: 12px; text-align: left; color: #bfff00; text-transform: uppercase; font-size: 10px;">Value</th>
            </tr>
          </thead>
          <tbody>
            ${details}
          </tbody>
        </table>
        
        <div style="margin-top: 40px; padding: 20px; border: 1px dashed #444; color: #666; font-size: 10px; text-align: center;">
          SYSTEM_STATUS: ACTIVE // DATA_INTEGRITY: VERIFIED // ORIGIN: ENROLLMENT_FORM_V1
        </div>
      </div>
    `,
  });
}

export async function sendAdminPromotionEmail(
  email: string,
  name: string,
  setupUrl?: string | null,
) {
  console.log(`[Emails] Sending admin promotion email to ${email}`);

  return sendEmailWithLogging("Admin promotion email", {
    from: DEFAULT_FROM,
    to: [email],
    subject: "ACCESS GRANTED: SUPER_ADMIN PERMISSIONS // Cyber4Every1",
    html: `
      <div style="background-color: #050505; color: #ffffff; padding: 40px; font-family: sans-serif; border: 1px solid #bfff00;">
        <h1 style="color: #bfff00; text-transform: uppercase;">Permissions Elevated</h1>
        <p>Agent <strong>${name}</strong>,</p>
        <p>Your security clearance has been upgraded to <span style="color: #bfff00;">SUPER_ADMIN</span>.</p>
        <p>You now have full access to the Command Dashboard, Finance Reports, and User Management systems.</p>
        ${setupUrl ? `<p>Use this secure setup link to finish configuring your account:</p><p><a href="${setupUrl}" style="color:#bfff00;">${setupUrl}</a></p>` : ""}
        <div style="margin-top: 30px; padding: 20px; background-color: #111; border-radius: 8px;">
          <p style="font-size: 12px; color: #555;">SECURITY_LEVEL: OMEGA // ACCESS_KEY: ENABLED</p>
        </div>
        <a href="https://cyber4every1.com/dashboard" style="display: inline-block; margin-top: 30px; background-color: #bfff00; color: #000; padding: 15px 30px; text-decoration: none; font-weight: bold; border-radius: 4px; text-transform: uppercase;">Access Command Center</a>
      </div>
    `,
  });
}

export async function sendOnboardingFlow(
  email: string,
  name: string,
  options: OnboardingFlowOptions = {},
) {
  console.log(`[Emails] Triggering onboarding flow for ${email}`);

  return sendEmailWithLogging("Onboarding flow", {
    from: DEFAULT_FROM,
    to: [email],
    subject: "WELCOME TO THE MISSION // Cyber4Every1",
    html: getOnboardingEmailHtml(name, options),
  });
}

export async function sendPaymentConfirmationEmail(
  email: string,
  studentName: string,
  amount: number
) {
  console.log(`[Emails] Sending payment confirmation to ${email}`);

  return sendEmailWithLogging("Payment confirmation", {
    from: DEFAULT_FROM,
    to: [email],
    subject: "PAYMENT RECEIVED // Mission Initialized",
    html: `
      <div style="background-color: #050505; color: #ffffff; padding: 40px; font-family: sans-serif; border: 1px solid #bfff00;">
        <h1 style="color: #bfff00; text-transform: uppercase;">Payment Confirmed</h1>
        <p>Mission briefing for <strong>${studentName}</strong>,</p>
        <p>We have successfully processed your payment of <span style="color: #bfff00;">$${(amount / 100).toFixed(2)}</span>.</p>
        <p>The student's seat is now secure. Please log in to the student portal to view the full schedule and preparation materials.</p>
        <div style="margin-top: 30px; padding: 20px; background-color: #111; border-radius: 8px;">
          <p style="font-size: 12px; color: #555;">TRANSACTION_STATUS: SUCCESS // ACCESS: FULL</p>
        </div>
        <a href="https://cyber4every1.com/dashboard" style="display: inline-block; margin-top: 30px; background-color: #bfff00; color: #000; padding: 15px 30px; text-decoration: none; font-weight: bold; border-radius: 4px; text-transform: uppercase;">Go to Dashboard</a>
      </div>
    `,
  });
}
