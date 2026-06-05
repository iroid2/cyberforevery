"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TopNavBar } from "@/components/top-nav-bar";
import { EnrollmentForm } from "@/components/enrollment-form";
import { MainFooter } from "@/components/main-footer";

export default function EnrollPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-[#050D05] text-foreground font-body">
      <TopNavBar />

      <main className="relative h-[calc(100vh-88px)] px-6 md:px-8">
        <div className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-[#0F1F0F]/80 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-between py-8">
          <div className="grid flex-1 gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 rounded-full border border-[#7FFF00]/30 bg-[#7FFF00]/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.35em] text-[#7FFF00]">
                <span className="h-2 w-2 rounded-full bg-[#7FFF00] animate-pulse" />
                Enrollment & Payment
              </div>
              <h1 className="text-5xl font-black leading-tight text-white md:text-6xl">
                A polished enrollment experience that fits in one screen.
              </h1>
              <p className="max-w-3xl text-sm leading-8 text-[#B4CCB4] md:text-base">
                Review the program, confirm the package, and open the secure checkout form only when you’re ready. The page stays within the viewport, and the registration flow appears in a focused overlay.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-4xl border border-white/10 bg-[#0F1F0F] p-6">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#6A8A6A]">Ready in one view</p>
                  <p className="mt-3 text-xl font-black text-white">No long scroll</p>
                  <p className="mt-2 text-sm text-[#B4CCB4]">Everything important is visible without exceeding the screen.</p>
                </div>
                <div className="rounded-4xl border border-white/10 bg-[#0F1F0F] p-6">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#6A8A6A]">Secure payment</p>
                  <p className="mt-3 text-xl font-black text-[#7FFF00]">Stripe-ready checkout</p>
                  <p className="mt-2 text-sm text-[#B4CCB4]">Card details are collected securely in the overlay and not stored on our site.</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center justify-center rounded-full bg-[#7FFF00] px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-black shadow-[0_0_30px_rgba(127,255,0,0.3)] transition hover:bg-[#75d400]"
                >
                  Start enrollment
                </button>
                <a href="#summary" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-transparent px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:border-[#7FFF00]/50 hover:text-[#7FFF00]">
                  Program summary
                </a>
              </div>
            </div>

            <div className="rounded-4xl border border-white/10 bg-[#071007] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
              <div className="overflow-hidden rounded-[1.75rem] bg-[#0B1A0B]">
                <Image src="/gallery/abt.png" alt="Cybersecurity bootcamp" width={960} height={640} className="h-full w-full object-cover" />
              </div>
              <div className="mt-5 grid gap-3 grid-cols-2">
                {[
                  { label: "Plan", value: "Standard" },
                  { label: "Duration", value: "8 weeks" },
                  { label: "Price", value: "$499" },
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

          <section id="summary" className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Clear process",
                text: "One-screen page, one click to enroll, one secure checkout overlay.",
              },
              {
                title: "Family-first UX",
                text: "Parents see a concise summary without endless scroll.",
              },
              {
                title: "Secure payment",
                text: "Stripe-ready card entry appears only inside the modal.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-4xl border border-white/10 bg-[#0F1F0F] p-6">
                <h3 className="text-lg font-black text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#B4CCB4]">{item.text}</p>
              </div>
            ))}
          </section>
        </div>
      </main>

      <MainFooter />

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-6 pt-24 backdrop-blur-sm">
          <div className="relative w-full max-w-5xl overflow-hidden rounded-4xl border border-white/10 bg-[#071007]/95 shadow-2xl">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#0F1F0F] text-white transition hover:bg-[#1F2B1F]"
            >
              ✕
            </button>
            <div className="max-h-[calc(100vh-4rem)] overflow-y-auto p-8">
              <div className="mb-8 rounded-4xl border border-white/10 bg-[#0A140A] p-6">
                <p className="text-[10px] uppercase tracking-[0.35em] text-[#7FFF00]">Secure enrollment</p>
                <h2 className="mt-3 text-3xl font-black text-white">Complete registration in a focused overlay.</h2>
                <p className="mt-4 text-sm leading-7 text-[#B4CCB4]">
                  This form is intentionally isolated from the page. It scrolls inside the overlay and never forces the page itself to exceed the viewport.
                </p>
              </div>
              <EnrollmentForm />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
