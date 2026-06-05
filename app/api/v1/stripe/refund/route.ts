import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';
import { PaymentRecordStatus, PaymentStatus } from '@/lib/generated/prisma';

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || !['ADMIN','SUPER_ADMIN','ADMIN_STAFF'].includes((session.user as any).role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!stripe) {
      return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
    }

    const { paymentId } = await req.json();
    if (!paymentId) return NextResponse.json({ error: 'Missing paymentId' }, { status: 400 });

    const payment = await prisma.payment.findUnique({ where: { id: paymentId }, include: { enrollment: true } });
    if (!payment) return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    if (payment.status === PaymentRecordStatus.REFUNDED) return NextResponse.json({ error: 'Already refunded' }, { status: 400 });

    // Resolve payment intent id
    let intentId = payment.stripePaymentIntentId ?? null;
    if (!intentId && payment.stripeCheckoutSessionId) {
      const session = await stripe.checkout.sessions.retrieve(payment.stripeCheckoutSessionId as string) as any;
      intentId = typeof session.payment_intent === 'string' ? session.payment_intent : null;
    }

    if (!intentId) {
      return NextResponse.json({ error: 'No payment intent available for refund' }, { status: 400 });
    }

    // Create refund
    const refund = await stripe.refunds.create({ payment_intent: intentId });

    // Update DB
    await prisma.payment.update({ where: { id: payment.id }, data: { status: PaymentRecordStatus.REFUNDED } });
    await prisma.enrollment.update({ where: { id: payment.enrollmentId }, data: { paymentStatus: PaymentStatus.REFUNDED } });

    return NextResponse.json({ success: true, refundId: refund.id });
  } catch (err: any) {
    console.error('[Refund] error', err);
    return NextResponse.json({ error: err?.message || 'Internal error' }, { status: 500 });
  }
}
