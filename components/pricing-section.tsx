"use client";

import Link from "next/link";

const pricingPlans = [
  {
    title: "Basic Access",
    price: "$299",
    description: "Core bootcamp track with guided labs and digital safety training.",
    highlights: [
      "Interactive weekly sessions",
      "Ethical hacking fundamentals",
      "Secure student onboarding",
      "Best for first-time learners",
    ],
    planKey: "Basic",
  },
  {
    title: "Standard Experience",
    price: "$499",
    description: "Enhanced access with live office hours and mentor support.",
    highlights: [
      "Group workshops & labs",
      "Progress check-ins",
      "Parent progress updates",
      "Ideal for curious learners",
    ],
    planKey: "Standard",
  },
  {
    title: "Premium Mentorship",
    price: "$799",
    description: "Full mentorship track with one-on-one guidance and portfolio support.",
    highlights: [
      "1-on-1 coaching sessions",
      "Project showcase readiness",
      "Certificate pathway",
      "Perfect for committed students",
    ],
    planKey: "Premium",
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="bg-[#081009] px-5 py-20 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <div className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-[#7FFF00]">
            // PRICING
          </div>
          <h2 className="mt-4 text-3xl font-black text-white md:text-4xl">
            Transparent pricing for secure student enrollment.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#6A8A6A]">
            Choose the right bootcamp path, enroll your child, and complete payment through our Stripe-powered checkout.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          {pricingPlans.map((plan) => (
            <article key={plan.title} className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#102010] p-8 text-white shadow-[0_20px_60px_rgba(0,0,0,0.18)] transition hover:-translate-y-1">
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-[#7FFF00]">
                {plan.title}
              </div>
              <div className="mt-6 flex items-end gap-2">
                <span className="text-5xl font-black leading-none">{plan.price}</span>
                <span className="text-sm text-[#6A8A6A]">/ one-time</span>
              </div>
              <p className="mt-4 text-sm leading-7 text-[#B4CCB4]">{plan.description}</p>

              <ul className="mt-8 space-y-3 text-sm text-[#D6E6D6]">
                {plan.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#7FFF00]/20 text-[#7FFF00] text-xs font-black">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/enroll?plan=${encodeURIComponent(plan.planKey)}`}
                className="mt-10 inline-flex w-full items-center justify-center rounded-full bg-[#7FFF00] px-6 py-4 text-sm font-black uppercase tracking-[0.2em] text-black transition hover:bg-[#75d400]"
              >
                Enroll now
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-[1.5rem] border border-white/10 bg-[#0F1F0F] p-6 text-sm text-[#B4CCB4]">
          <div className="font-semibold text-white">Secure payment</div>
          <p className="mt-2 leading-7">
            Our registration process includes Stripe checkout for safe, PCI-compliant payments. Your child’s seat is confirmed once enrollment and payment are complete.
          </p>
        </div>
      </div>
    </section>
  );
}
