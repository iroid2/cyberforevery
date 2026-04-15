import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { PaymentStatus } from '@prisma/client';
import { sendPaymentConfirmationEmail } from '@/lib/emails/actions';

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  let event;

  try {
    if (!signature || !endpointSecret) {
      throw new Error('Missing stripe-signature or endpointSecret');
    }
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (err: any) {
    console.error(`❌ [Webhook] Signature verification failed: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as any;
      const enrollmentId = session.metadata?.enrollmentId;

      if (enrollmentId) {
        console.log(`✅ [Webhook] Payment success for enrollment: ${enrollmentId}`);
        
        // 1. Update Database
        const updatedEnrollment = await prisma.enrollment.update({
          where: { id: enrollmentId },
          data: { paymentStatus: PaymentStatus.PAID },
          include: { student: true }
        });

        // 2. Trigger Confirmation Email
        await sendPaymentConfirmationEmail(
          session.customer_details?.email || updatedEnrollment.student.firstName, // fallback
          `${updatedEnrollment.student.firstName} ${updatedEnrollment.student.lastName}`,
          session.amount_total
        );
      }
      break;
    default:
      console.log(`ℹ️ [Webhook] Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
