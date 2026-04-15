import { NextResponse } from 'next/server';
import { resend, DEFAULT_FROM, ADMIN_EMAIL } from '@/lib/resend';
import { getOnboardingEmailHtml } from '@/lib/emails/onboard-template';

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();

    if (!email || !name) {
      return NextResponse.json({ error: 'Email and name are required' }, { status: 400 });
    }

    // 1. Send Onboarding Email to Student
    const studentEmailResponse = await resend.emails.send({
      from: DEFAULT_FROM,
      to: [email],
      subject: 'WELCOME TO THE MISSION // Cyber4Every1',
      html: getOnboardingEmailHtml(name),
    });

    // 2. Notify Admin
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
      }
    });

  } catch (error: any) {
    console.error('🔥 [Onboarding API] Error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
