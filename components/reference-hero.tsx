"use client";

import { useState } from "react";
import Link from "next/link";

const heroSessions = [
  "SESSION 01: INTERNET SAFETY",
  "SESSION 02: ETHICAL HACKING",
  "SESSION 03: AI & CODE",
];

export function ReferenceHero() {
  const [activeSession, setActiveSession] = useState(0);

  return (
    <section className="relative overflow-hidden bg-[#050D05]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(127,255,0,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(127,255,0,0.035)_1px,transparent_1px)] bg-[size:55px_55px]" />
      <div className="pointer-events-none absolute left-[5%] top-[23%] h-2.5 w-2.5 rounded-full bg-[#5EBF00] shadow-[0_0_10px_rgba(127,255,0,0.8)]" />
      <div className="pointer-events-none absolute right-[7%] top-[23%] h-2.5 w-2.5 rounded-full bg-[#3DAAFF]" />
      <div className="pointer-events-none absolute left-[5%] top-[22%] h-[28px] w-[56px] rounded-full border border-[#5EBF00]/60" />
      <div className="pointer-events-none absolute right-[5%] bottom-[12%] text-[46px] leading-none text-[#2F7D00]">☆</div>
      <div className="pointer-events-none absolute left-[7%] bottom-[16%] rotate-[-18deg] rounded-[6px] border border-[#FF7A3D]/80 p-3" />

      <div className="relative mx-auto max-w-[1280px] px-5 pb-16 pt-[110px] md:px-6 md:pb-20">
        <div className="mx-auto mb-10 flex max-w-[1240px] items-center justify-between rounded-[28px] border border-white/10 bg-black/55 px-5 py-4 backdrop-blur-xl">
          <Link href="/" className="flex items-center gap-3 text-white">
            <span className="flex h-[48px] w-[48px] items-center justify-center rounded-[12px] bg-[#7FFF00] font-mono text-[14px] font-bold text-[#050D05]">
              C4E
            </span>
            <span className="text-[18px] font-black tracking-tight text-[#EEFFEE]">
              Cyber<span className="text-[#7FFF00]">4</span>Every1
            </span>
            <span className="inline-block h-3 w-3 rounded-full bg-[#7FFF00]" />
          </Link>

          <div className="hidden items-center gap-10 lg:flex">
            {[
              { label: "Programs", href: "#programs" },
              { label: "Mission", href: "#mission" },
              { label: "About", href: "#founder" },
              { label: "FAQ", href: "#faq" },
              { label: "Contact", href: "#contact" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-sans text-[14px] font-black uppercase tracking-[0.12em] text-[#B4CCB4] transition hover:text-[#7FFF00]"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-6 lg:flex">
            <a href="https://www.youtube.com" className="flex items-center gap-2 text-[#B4CCB4]">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FF0000] text-[10px] text-white">
                ▶
              </span>
              <span className="font-bold">YouTube</span>
            </a>
            <Link
              href="/enroll"
              className="rounded-[14px] bg-[#7FFF00] px-7 py-4 font-mono text-[12px] font-bold uppercase tracking-[0.24em] text-[#050D05] transition hover:bg-[#A3FF4D]"
            >
              Enroll Now
            </Link>
          </div>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[240px_1fr_240px] lg:gap-4">
          <div className="hidden items-center justify-center lg:flex">
            <div className="relative">
              <div className="absolute -inset-2 rounded-full border border-[#7FFF00]/20" />
              <div className="absolute -inset-6 rounded-full bg-[#7FFF00]/5 blur-2xl" />
              <div className="flex h-[225px] w-[225px] flex-col items-center justify-center rounded-full border-2 border-[#5EBF00] bg-[#1A2E1A]/70 text-center">
                <span className="material-symbols-outlined text-[48px] text-[#5EBF00]">
                  person
                </span>
                <span className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#6A8A6A]">
                  Kid photo
                  <br />
                  here
                </span>
              </div>
            </div>
          </div>

          <div className="relative mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-3 rounded-full border border-[rgba(127,255,0,0.22)] bg-[rgba(127,255,0,0.12)] px-5 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-[#7FFF00]">
              <span className="h-2 w-2 rounded-full bg-[#7FFF00]" />
              {heroSessions[activeSession]}
            </span>

            <h1 className="mt-10 font-sans text-[clamp(54px,8vw,104px)] font-black leading-[0.92] tracking-tight text-[#EEFFEE]">
              Better <span className="text-[#7FFF00]">Digital</span> Future
              <br />
              For Your Kids
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-[18px] italic leading-[1.7] text-[#6A8A6A] md:text-[20px]">
              Let the child be the director, and the actor in their own digital story.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/enroll"
                className="inline-flex min-w-[190px] items-center justify-center rounded-full bg-[#7FFF00] px-8 py-5 font-sans text-[18px] font-black text-[#050D05] transition hover:scale-[1.02] hover:bg-[#A3FF4D]"
              >
                Get Started
                <span className="ml-4">→</span>
              </Link>
              <a
                href="#programs"
                className="inline-flex min-w-[190px] items-center justify-center rounded-full border border-[#2F7D00] bg-transparent px-8 py-5 font-sans text-[18px] font-black text-[#7FFF00] transition hover:bg-[#0F1F0F]"
              >
                Explore Curriculum
              </a>
            </div>

            <p className="mx-auto mt-8 max-w-xl text-[14px] leading-8 text-[#6A8A6A] md:text-[15px]">
              We don&apos;t just lecture - real experiments, workshops and field experiences throughout the journey!
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-[#B4CCB4]">
              <a href="#contact" className="rounded-full border border-[#2F7D00] px-4 py-2 transition hover:bg-[#0F1F0F]">
                Chicago, Illinois
              </a>
              <a href="tel:+13124683844" className="rounded-full border border-[#2F7D00] px-4 py-2 transition hover:bg-[#0F1F0F]">
                +1 (312) 468-3844
              </a>
              <a href="mailto:ivan@cyberforevery.com" className="rounded-full border border-[#2F7D00] px-4 py-2 transition hover:bg-[#0F1F0F]">
                ivan@cyberforevery.com
              </a>
            </div>

            <div className="mt-10 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setActiveSession((prev) => (prev - 1 + heroSessions.length) % heroSessions.length)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#2F7D00] bg-[rgba(127,255,0,0.08)] text-[#7FFF00] transition hover:bg-[#7FFF00] hover:text-[#050D05]"
                aria-label="Previous slide"
              >
                ←
              </button>
              <span className="hidden h-0.5 w-16 rounded-full bg-[#2F7D00] sm:block" />
              <button
                type="button"
                onClick={() => setActiveSession((prev) => (prev + 1) % heroSessions.length)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#2F7D00] bg-[rgba(127,255,0,0.08)] text-[#7FFF00] transition hover:bg-[#7FFF00] hover:text-[#050D05]"
                aria-label="Next slide"
              >
                →
              </button>
            </div>
          </div>

          <div className="hidden items-center justify-center lg:flex">
            <div className="relative">
              <div className="absolute -inset-2 rounded-full border border-[#7FFF00]/20" />
              <div className="absolute -inset-6 rounded-full bg-[#7FFF00]/5 blur-2xl" />
              <div className="flex h-[225px] w-[225px] flex-col items-center justify-center rounded-full border-2 border-[#5EBF00] bg-[#1A2E1A]/70 text-center">
                <span className="material-symbols-outlined text-[48px] text-[#5EBF00]">
                  person
                </span>
                <span className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#6A8A6A]">
                  Kid photo
                  <br />
                  here
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
