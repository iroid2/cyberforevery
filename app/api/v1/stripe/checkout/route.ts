import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { enrollmentId } = await req.json();

    // 1. Fetch enrollment and verify ownership
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: enrollmentId },
      include: {
        student: {
          include: {
            parent: true,
          }
        },
        cohort: {
          include: {
            course: true,
          }
        }
      }
    });

    if (!enrollment) {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 });
    }

    // Security: Only the parent of the student can pay for this enrollment
    if (enrollment.student.parentId !== (session.user as any).id) {
      return NextResponse.json({ error: 'Forbidden: You do not own this enrollment' }, { status: 403 });
    }

    // 2. Determine Price
    // Extract plan info from student.additionalInfo (stored as JSON)
    const additionalInfo = enrollment.student.additionalInfo as any;
    const plan = additionalInfo?.selection?.plan || 'Basic';
    
    let amount = 19900; // Default $199
    if (plan === 'Standard') amount = 29900;
    if (plan === 'Premium') amount = 49900;

    const courseTitle = enrollment.cohort.course.title;

    // 3. Create Stripe Checkout Session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${courseTitle} - ${plan} Plan`,
              description: `Enrollment for ${enrollment.student.firstName} ${enrollment.student.lastName}`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/dashboard/student/schedule?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/dashboard/student/schedule?canceled=true`,
      customer_email: enrollment.student.parent.email!,
      metadata: {
        enrollmentId: enrollment.id,
        studentId: enrollment.studentId,
        parentId: enrollment.student.parentId,
      },
    });

    return NextResponse.json({ url: checkoutSession.url });

  } catch (error: any) {
    console.error('🔥 [Stripe] Checkout Session error:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
