import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { PaymentRecordStatus, PaymentStatus } from "@prisma/client";
import { sendPaymentConfirmationEmail } from "@/lib/emails/actions";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event;

  try {
    if (!signature || !endpointSecret) {
      throw new Error("Missing stripe-signature or endpointSecret");
    }
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (err: any) {
    console.error(`[Webhook] Signature verification failed: ${err.message}`);
    return NextResponse.json({ error: "Webhook verification failed" }, { status: 400 });
  }

  const existingEvent = await prisma.webhookEvent.findUnique({
    where: { eventId: event.id },
  });

  if (existingEvent) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  await prisma.webhookEvent.create({
    data: {
      eventId: event.id,
      type: event.type,
    },
  });

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as any;
      const enrollmentId = session.metadata?.enrollmentId;
      const sessionId = session.id;

      if (enrollmentId && sessionId) {
        console.log(`[Webhook] Payment success for enrollment: ${enrollmentId}`);

        const updatedEnrollment = await prisma.enrollment.update({
          where: { id: enrollmentId },
          data: { paymentStatus: PaymentStatus.PAID },
          include: { student: true },
        });

        const payment = await prisma.payment.upsert({
          where: { stripeCheckoutSessionId: sessionId },
          update: {
            status: PaymentRecordStatus.SUCCEEDED,
            stripePaymentIntentId: typeof session.payment_intent === "string" ? session.payment_intent : null,
            receiptEmail: session.customer_details?.email ?? null,
          },
          create: {
            enrollmentId,
            stripeCheckoutSessionId: sessionId,
            stripePaymentIntentId: typeof session.payment_intent === "string" ? session.payment_intent : null,
            amount: session.amount_total ?? 0,
            currency: session.currency ?? "usd",
            status: PaymentRecordStatus.SUCCEEDED,
            receiptEmail: session.customer_details?.email ?? null,
          },
        });

        if (payment.receiptEmail) {
          await sendPaymentConfirmationEmail(
            payment.receiptEmail,
            `${updatedEnrollment.student.firstName} ${updatedEnrollment.student.lastName}`,
            session.amount_total ?? payment.amount,
          );
        }
      }
      break;
    }
    default:
      console.log(`[Webhook] Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
