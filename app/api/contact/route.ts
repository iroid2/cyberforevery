import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_EMAILS = [
  "iradtu2@gmail.com",
  "ivan@cyberforevery.com",
  "ivanlivingstone206@gmail.com",
];

const FROM_ADDRESS = "Cyber4Every1 <noreply@cyberforevery.com>";

// ─── Admin notification email ────────────────────────────────────────────────
function adminEmailHtml(data: {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#050D05;font-family:'Segoe UI',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#050D05;padding:32px 0">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#0F1F0F;border-radius:20px;border:1px solid rgba(127,255,0,0.15);overflow:hidden;max-width:600px;width:100%">

        <!-- Header -->
        <tr><td style="background:#1E301E;padding:28px 36px;border-bottom:1px solid rgba(127,255,0,0.12)">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <span style="display:inline-block;background:#7FFF00;color:#050D05;font-weight:900;font-size:11px;padding:6px 12px;border-radius:8px;letter-spacing:0.08em;font-family:monospace">C4E</span>
                <span style="color:#EEFFEE;font-size:16px;font-weight:900;margin-left:10px;vertical-align:middle">Cyber<span style="color:#7FFF00">4</span>Every1</span>
              </td>
              <td align="right">
                <span style="font-family:monospace;font-size:9px;color:#6A8A6A;text-transform:uppercase;letter-spacing:0.25em">// NEW_MESSAGE</span>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:36px">
          <p style="margin:0 0 24px;font-family:monospace;font-size:10px;text-transform:uppercase;letter-spacing:0.25em;color:#7FFF00">// CONTACT_FORM_SUBMISSION</p>
          <h2 style="margin:0 0 24px;color:#EEFFEE;font-size:22px;font-weight:900">You have a new message</h2>

          <!-- Sender details -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#050D05;border-radius:14px;border:1px solid rgba(127,255,0,0.12);overflow:hidden;margin-bottom:24px">
            <tr><td style="padding:0">
              ${[
                ["Name", `${data.firstName} ${data.lastName}`],
                ["Email", data.email],
                ["Inquiry", data.subject],
              ].map(([label, value], i) => `
              <table width="100%" cellpadding="0" cellspacing="0" style="border-bottom:${i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none"}">
                <tr>
                  <td style="padding:14px 20px;width:100px">
                    <span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.18em;color:#6A8A6A">${label}</span>
                  </td>
                  <td style="padding:14px 20px">
                    <span style="font-size:13px;color:#EEFFEE;font-weight:600">${value}</span>
                  </td>
                </tr>
              </table>`).join("")}
            </td></tr>
          </table>

          <!-- Message -->
          <p style="margin:0 0 8px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.18em;color:#6A8A6A">Message</p>
          <div style="background:#050D05;border:1px solid rgba(127,255,0,0.12);border-radius:14px;padding:20px;font-size:14px;color:#B4CCB4;line-height:1.7;white-space:pre-wrap">${data.message}</div>

          <!-- Reply CTA -->
          <table cellpadding="0" cellspacing="0" style="margin-top:28px">
            <tr><td>
              <a href="mailto:${data.email}" style="display:inline-block;background:#7FFF00;color:#050D05;font-weight:900;font-size:11px;text-transform:uppercase;letter-spacing:0.18em;padding:14px 28px;border-radius:100px;text-decoration:none">
                Reply to ${data.firstName} →
              </a>
            </td></tr>
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:20px 36px;border-top:1px solid rgba(255,255,255,0.05)">
          <p style="margin:0;font-size:11px;color:#6A8A6A;text-align:center">This message was submitted via the contact form at cyberforevery.com</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── User confirmation email ──────────────────────────────────────────────────
function confirmationEmailHtml(data: {
  firstName: string;
  subject: string;
  message: string;
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#050D05;font-family:'Segoe UI',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#050D05;padding:32px 0">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#0F1F0F;border-radius:20px;border:1px solid rgba(127,255,0,0.15);overflow:hidden;max-width:600px;width:100%">

        <!-- Header -->
        <tr><td style="background:#1E301E;padding:28px 36px;border-bottom:1px solid rgba(127,255,0,0.12)">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <span style="display:inline-block;background:#7FFF00;color:#050D05;font-weight:900;font-size:11px;padding:6px 12px;border-radius:8px;letter-spacing:0.08em;font-family:monospace">C4E</span>
                <span style="color:#EEFFEE;font-size:16px;font-weight:900;margin-left:10px;vertical-align:middle">Cyber<span style="color:#7FFF00">4</span>Every1</span>
              </td>
              <td align="right">
                <span style="font-family:monospace;font-size:9px;color:#6A8A6A;text-transform:uppercase;letter-spacing:0.25em">// MESSAGE_RECEIVED</span>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Hero strip -->
        <tr><td style="background:linear-gradient(135deg,#1E301E 0%,#0F1F0F 100%);padding:40px 36px 32px;text-align:center;border-bottom:1px solid rgba(127,255,0,0.08)">
          <div style="display:inline-block;width:56px;height:56px;background:rgba(127,255,0,0.12);border:1px solid rgba(127,255,0,0.25);border-radius:16px;font-size:24px;line-height:56px;text-align:center;margin-bottom:16px">🛡️</div>
          <h1 style="margin:0 0 8px;color:#EEFFEE;font-size:24px;font-weight:900">Thanks for reaching out, ${data.firstName}!</h1>
          <p style="margin:0;color:#6A8A6A;font-size:13px;line-height:1.6">We've received your message and will be in touch within <strong style="color:#7FFF00">1–2 business days</strong>.</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:36px">
          <p style="margin:0 0 6px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.18em;color:#6A8A6A">Your submission</p>

          <table width="100%" cellpadding="0" cellspacing="0" style="background:#050D05;border-radius:14px;border:1px solid rgba(127,255,0,0.10);overflow:hidden;margin-bottom:24px">
            <tr><td style="padding:14px 20px;border-bottom:1px solid rgba(255,255,255,0.05)">
              <span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.18em;color:#6A8A6A">Inquiry type &nbsp;</span>
              <span style="font-size:13px;color:#EEFFEE;font-weight:600">${data.subject}</span>
            </td></tr>
            <tr><td style="padding:16px 20px">
              <p style="margin:0 0 6px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.18em;color:#6A8A6A">Your message</p>
              <p style="margin:0;font-size:13px;color:#B4CCB4;line-height:1.7;white-space:pre-wrap">${data.message}</p>
            </td></tr>
          </table>

          <!-- What's next -->
          <div style="background:rgba(127,255,0,0.06);border:1px solid rgba(127,255,0,0.15);border-radius:14px;padding:20px 24px;margin-bottom:28px">
            <p style="margin:0 0 12px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.18em;color:#7FFF00">// WHAT_HAPPENS_NEXT</p>
            ${[
              "Our team reviews every message personally.",
              "We'll reply to this email within 1–2 business days.",
              "For urgent matters, reach us at ivan@cyberforevery.com",
            ].map(
              (item) =>
                `<p style="margin:0 0 8px;font-size:13px;color:#B4CCB4;line-height:1.6">✓ &nbsp;${item}</p>`
            ).join("")}
          </div>

          <!-- CTA -->
          <table cellpadding="0" cellspacing="0" style="width:100%">
            <tr>
              <td align="center">
                <a href="https://cyberforevery.com" style="display:inline-block;background:#7FFF00;color:#050D05;font-weight:900;font-size:11px;text-transform:uppercase;letter-spacing:0.18em;padding:14px 32px;border-radius:100px;text-decoration:none">
                  Explore Our Programs →
                </a>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:20px 36px;border-top:1px solid rgba(255,255,255,0.05);text-align:center">
          <p style="margin:0 0 6px;font-size:12px;color:#6A8A6A">Questions? Reply to this email or contact us at</p>
          <a href="mailto:ivan@cyberforevery.com" style="font-size:12px;color:#7FFF00;text-decoration:none;font-weight:700">ivan@cyberforevery.com</a>
          <p style="margin:12px 0 0;font-size:10px;color:#3A5A3A">© 2025 Cyber4Every1 NFP. All rights reserved.</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, subject, message } = await req.json();

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Send admin notification to all three recipients
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: ADMIN_EMAILS,
      replyTo: email,
      subject: `New Contact: ${subject} — ${firstName} ${lastName}`,
      html: adminEmailHtml({ firstName, lastName, email, subject, message }),
    });

    // Send confirmation to the person who submitted
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: email,
      subject: `We received your message — Cyber4Every1`,
      html: confirmationEmailHtml({ firstName, subject, message }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}
