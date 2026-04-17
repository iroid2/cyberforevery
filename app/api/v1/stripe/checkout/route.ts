import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { checkRateLimit } from "@/lib/security/rate-limit";

function getPlanAmount(plan: string) {
  if (plan === "Standard") return 29900;
  if (plan === "Premium") return 49900;
  return 19900;
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rateLimit = checkRateLimit(`checkout:${session.user.id}`, 10, 60_000);
    if (!rateLimit.allowed) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const { enrollmentId } = await req.json();

    const enrollment = await prisma.enrollment.findUnique({
      where: { id: enrollmentId },
      include: {
        student: {
          include: {
            parent: true,
          },
        },
        cohort: {
          include: {
            course: true,
          },
        },
      },
    });

    if (!enrollment) {
      return NextResponse.json({ error: "Enrollment not found" }, { status: 404 });
    }

    if (enrollment.student.parentId !== (session.user as any).id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const additionalInfo = enrollment.student.additionalInfo as any;
    const plan = additionalInfo?.selection?.plan || "Basic";
    const amount = getPlanAmount(plan);
    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${enrollment.cohort.course.title} - ${plan} Plan`,
              description: `Enrollment for ${enrollment.student.firstName} ${enrollment.student.lastName}`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/dashboard/schedule?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dashboard/schedule?canceled=true`,
      customer_email: enrollment.student.parent.email ?? undefined,
      metadata: {
        enrollmentId: enrollment.id,
        studentId: enrollment.studentId,
        parentId: enrollment.student.parentId,
        plan,
      },
    });

    await prisma.payment.create({
      data: {
        enrollmentId: enrollment.id,
        stripeCheckoutSessionId: checkoutSession.id,
        amount,
        currency: "usd",
        receiptEmail: enrollment.student.parent.email ?? null,
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("[Stripe] Checkout Session error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
