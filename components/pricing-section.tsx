"use client";

import Link from "next/link";
import { pricingPlans, packageIncludes } from "@/lib/pricing-plans";

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

        <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
          {pricingPlans.map((plan) => (
            <article
              key={plan.title}
              className={`group relative overflow-hidden rounded-[1.75rem] border p-8 text-white shadow-[0_20px_60px_rgba(0,0,0,0.18)] transition hover:-translate-y-1 ${
                plan.badge
                  ? "border-[#7FFF00]/40 bg-[#142a14]"
                  : "border-white/10 bg-[#102010]"
              }`}
            >
              {plan.badge && (
                <span className="absolute right-6 top-6 rounded-full bg-[#7FFF00] px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-black">
                  {plan.badge}
                </span>
              )}

              <div className="text-sm font-bold uppercase tracking-[0.3em] text-[#7FFF00]">
                {plan.title}
              </div>
              <div className="mt-6 flex items-end gap-2">
                <span className="text-5xl font-black leading-none">{plan.price}</span>
                <span className="text-sm text-[#6A8A6A]">{plan.cadence}</span>
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
                href={`/enroll?plan=${encodeURIComponent(plan.key)}`}
                className="mt-10 inline-flex w-full items-center justify-center rounded-full bg-[#7FFF00] px-6 py-4 text-sm font-black uppercase tracking-[0.2em] text-black transition hover:bg-[#75d400]"
              >
                Enroll now
              </Link>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-[1.5rem] border border-white/10 bg-[#0F1F0F] p-8">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#7FFF00]">
            Every plan includes
          </div>
          <ul className="mt-5 grid gap-3 text-sm text-[#D6E6D6] sm:grid-cols-2">
            {packageIncludes.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#7FFF00]/20 text-[#7FFF00] text-xs font-black">
                  ✓
                </span>
                <span className="text-[#B4CCB4]">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto mt-6 max-w-3xl rounded-[1.5rem] border border-white/10 bg-[#0F1F0F] p-6 text-sm text-[#B4CCB4]">
          <div className="font-semibold text-white">Secure payment</div>
          <p className="mt-2 leading-7">
            Our registration process includes Stripe checkout for safe, PCI-compliant payments. Your child’s seat is confirmed once enrollment and payment are complete.
          </p>
        </div>
      </div>
    </section>
  );
}
