"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { TopNavBar } from "@/components/top-nav-bar";
import { EnrollmentForm } from "@/components/enrollment-form";
import { getPricingPlan, packageIncludes } from "@/lib/pricing-plans";

export default function EnrollPage() {
  const searchParams = useSearchParams();
  const plan = getPricingPlan(searchParams.get("plan"));

  return (
    <div className="h-auto min-h-screen bg-[#050D05] text-white font-body">
      <TopNavBar />

      <main className="relative px-6 md:px-8">
        <div className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-[#0F1F0F]/80 to-transparent" />
        <div className="relative mx-auto max-w-7xl py-12 md:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 rounded-full border border-[#7FFF00]/30 bg-[#7FFF00]/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.35em] text-[#7FFF00]">
                <span className="h-2 w-2 rounded-full bg-[#7FFF00] animate-pulse" />
                Enrollment & Payment
              </div>

              {plan ? (
                <>
                  <h1 className="text-5xl font-black leading-tight text-white md:text-6xl">
                    You&apos;re enrolling in{" "}
                    <span className="text-[#7FFF00]">{plan.title}</span>.
                  </h1>
                  <p className="max-w-3xl text-sm leading-8 text-[#B4CCB4] md:text-base">
                    {plan.description} Confirm the details below, then complete the secure
                    checkout form to lock in your seat.
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-5xl font-black leading-tight text-white md:text-6xl">
                    A polished enrollment experience, start to finish.
                  </h1>
                  <p className="max-w-3xl text-sm leading-8 text-[#B4CCB4] md:text-base">
                    Pick a plan, review the program, and complete secure checkout when you&apos;re ready.
                  </p>
                </>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-4xl border border-white/10 bg-[#0F1F0F] p-6">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#6A8A6A]">
                    {plan ? "Selected plan" : "Choose your plan"}
                  </p>
                  <p className="mt-3 text-xl font-black text-white">
                    {plan ? `${plan.title} — ${plan.price}` : "Small Group or 1-on-1"}
                  </p>
                  <p className="mt-2 text-sm text-[#B4CCB4]">
                    {plan
                      ? plan.highlights[0]
                      : "Head back to pricing to pick the option that fits your child best."}
                  </p>
                </div>
                <div className="rounded-4xl border border-white/10 bg-[#0F1F0F] p-6">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#6A8A6A]">Secure payment</p>
                  <p className="mt-3 text-xl font-black text-[#7FFF00]">Stripe-ready checkout</p>
                  <p className="mt-2 text-sm text-[#B4CCB4]">Card details are collected securely and are not stored on our site.</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#enroll-form"
                  className="inline-flex items-center justify-center rounded-full bg-[#7FFF00] px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-black shadow-[0_0_30px_rgba(127,255,0,0.3)] transition hover:bg-[#75d400]"
                >
                  Start enrollment
                </a>
                {!plan && (
                  <a
                    href="/#pricing"
                    className="inline-flex items-center justify-center rounded-full border border-white/10 bg-transparent px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:border-[#7FFF00]/50 hover:text-[#7FFF00]"
                  >
                    Compare plans
                  </a>
                )}
              </div>
            </div>

            <div className="rounded-4xl border border-white/10 bg-[#071007] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
              <div className="overflow-hidden rounded-[1.75rem] bg-[#0B1A0B]">
                <Image src="/gallery/abt.png" alt="Cybersecurity bootcamp" width={960} height={640} className="h-full w-full object-cover" />
              </div>
              <div className="mt-5 grid gap-3 grid-cols-2">
                {[
                  { label: "Plan", value: plan ? plan.title : "Small Group or 1-on-1" },
                  { label: "Duration", value: "6 weeks" },
                  { label: "Price", value: plan ? `${plan.price}${plan.cadence}` : "$150 – $200" },
                  { label: "Checkout", value: "Stripe secure" },
                ].map((item) => (
                  <div key={item.label} className="rounded-3xl border border-white/10 bg-[#0F1F0F] p-4">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-[#6A8A6A]">{item.label}</p>
                    <p className="mt-2 text-lg font-black text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <section className="mt-14 rounded-4xl border border-white/10 bg-[#0F1F0F] p-8">
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#7FFF00]">
              Every plan includes
            </div>
            <ul className="mt-5 grid gap-3 text-sm text-[#D6E6D6] sm:grid-cols-2 lg:grid-cols-3">
              {packageIncludes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#7FFF00]/20 text-[#7FFF00] text-xs font-black">
                    ✓
                  </span>
                  <span className="text-[#B4CCB4]">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id="enroll-form" className="mt-14 scroll-mt-24">
            <div className="mb-8 rounded-4xl border border-white/10 bg-[#0A140A] p-6">
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#7FFF00]">Secure enrollment</p>
              <h2 className="mt-3 text-3xl font-black text-white">Complete your registration.</h2>
              <p className="mt-4 text-sm leading-7 text-[#B4CCB4]">
                Fill in the details below. Card data is never stored on this site — it&apos;s passed securely through Stripe.
              </p>
            </div>
            <EnrollmentForm />
          </section>
        </div>
      </main>
    </div>
  );
}
