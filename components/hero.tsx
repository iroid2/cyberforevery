"use client";

import React, { useEffect, useEffectEvent, useState } from "react";
import Link from "next/link";

const heroSlides = [
  {
    image: "/students-learning-computer-safety-in-classroom.jpg",
    alt: "Students learning computer safety together in a classroom bootcamp setting",
    tag: "// SESSION_ACTIVE: CYBER_BASICS",
    title: "Cyber Foundations",
    description: "Students build confidence with digital safety, ethical hacking basics, and team-led lab missions.",
  },
  {
    image: "/cybersecurity-training-diverse-group.jpg",
    alt: "Diverse group of students participating in cybersecurity bootcamp training",
    tag: "// SESSION_ACTIVE: TEAM_DEFENSE",
    title: "Collaborative Labs",
    description: "Hands-on blue team and red team challenges sharpen critical thinking and real-world response skills.",
  },
  {
    image: "/community-group-learning-digital-safety-together.jpg",
    alt: "Young learners working together on digital safety and cybersecurity activities",
    tag: "// SESSION_ACTIVE: FUTURE_BUILDERS",
    title: "Next-Gen Talent",
    description: "Young builders explore secure systems, AI workflows, and technical creativity in one bootcamp track.",
  },
  {
    image: "/family-using-laptop-safely-at-home-cybersecurity.jpg",
    alt: "Kids and families practicing safe technology use with laptops at home",
    tag: "// SESSION_ACTIVE: HOME_PROTOCOL",
    title: "Parent-Supported Growth",
    description: "Bootcamp lessons extend beyond class with guided take-home practice and safety-first learning.",
  },
];

const heroStats = [
  { value: "12+", label: "Global Labs" },
  { value: "400ms", label: "Neural Latency" },
  { value: "001", label: "Tier Protocol" },
];

export function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  const showSlide = useEffectEvent((nextIndex: number) => {
    const total = heroSlides.length;
    setActiveSlide((nextIndex + total) % total);
  });

  const showNext = useEffectEvent(() => {
    setActiveSlide((current) => (current + 1) % heroSlides.length);
  });

  useEffect(() => {
    const interval = window.setInterval(() => {
      showNext();
    }, 5000);

    return () => window.clearInterval(interval);
  }, [showNext]);

  const currentSlide = heroSlides[activeSlide];

  return (
    <section className="relative overflow-hidden bg-[#131313] px-6 pb-16 pt-28 text-white md:px-8 lg:px-20">
      <div className="pointer-events-none absolute left-[-10%] top-[-8%] h-[26rem] w-[26rem] rounded-full bg-[#BFFF00]/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-[-14%] right-[-10%] h-[22rem] w-[22rem] rounded-full bg-white/5 blur-[140px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(191,255,0,0.08),transparent_50%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center">
        <div className="grid w-full items-center gap-16 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-6">
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-8 bg-primary" />
              <span className="font-headline text-sm font-bold uppercase tracking-[0.3em] text-primary">
                // MISSION_CRITICAL_LEARNING
              </span>
            </div>

            <div className="space-y-6">
              <h1 className="font-headline text-6xl font-bold leading-[0.9] tracking-tighter text-white md:text-7xl xl:text-8xl">
                Cybersecurity <br /> &amp; <span className="italic text-primary">AI</span>{" "}
                <br />
                Bootcamp
              </h1>

              <p className="max-w-md text-lg leading-relaxed text-white/65 md:text-xl">
                The elite technical offensive for students in grades 8-12.
                Master the architecture of the future through high-velocity
                training in neural defense and systems engineering.
              </p>
            </div>

            <div className="flex flex-wrap gap-5 pt-2">
              <Link
                href="/enroll"
                className="rounded-full bg-primary px-10 py-4 font-headline text-sm font-bold uppercase tracking-widest text-[#263500] shadow-[0_0_30px_-5px_rgba(191,255,0,0.4)] transition-transform duration-300 hover:scale-105"
              >
                Register Now
              </Link>
              <Link
                href="/bootcamp"
                className="rounded-full border border-white/10 bg-surface-container-low px-10 py-4 font-headline text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:scale-105 hover:bg-surface-container"
              >
                Explore Curriculum
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 border-t border-white/5 pt-12">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-headline text-2xl font-bold text-white md:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/45">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[560px] lg:col-span-6 lg:h-[700px]">
            <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-primary/20 via-transparent to-white/10 blur-3xl" />

            <div className="relative h-full overflow-hidden rounded-[2rem] border border-white/10 bg-surface-container-lowest shadow-[0_40px_90px_rgba(0,0,0,0.45)]">
              {heroSlides.map((slide, index) => (
                <div
                  key={slide.image}
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    index === activeSlide
                      ? "scale-100 opacity-100"
                      : "scale-[1.04] opacity-0"
                  }`}
                  aria-hidden={index !== activeSlide}
                >
                  <img
                    alt={slide.alt}
                    className="h-full w-full object-cover"
                    src={slide.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/10" />
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(191,255,0,0.16),transparent_35%,rgba(0,0,0,0.1)_80%)]" />
                </div>
              ))}

              <div className="absolute left-6 right-6 top-6 flex items-center justify-between gap-4">
                <div className="rounded-full border border-white/10 bg-black/45 px-4 py-2 backdrop-blur-xl">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_rgba(191,255,0,0.7)]" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary/90">
                      live_bootcamp_stream
                    </span>
                  </div>
                </div>

                <div className="hidden rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-right backdrop-blur-xl md:block">
                  <div className="font-mono text-[10px] leading-5 text-white/35">
                    [SYSTEM_LOG]
                    <br />
                    INITIALIZING_AI_KERNEL...
                    <br />
                    AUTH_STATUS: GRANTED
                    <br />
                    LOCATION: SECTOR_8_12
                  </div>
                </div>
              </div>

              <div className="absolute left-6 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-4">
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.title}
                    type="button"
                    aria-label={`Show slide ${index + 1}`}
                    onClick={() => showSlide(index)}
                    className={`w-1 rounded-full transition-all duration-300 ${
                      index === activeSlide
                        ? "h-14 bg-primary"
                        : "h-7 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>

              <div className="absolute bottom-8 left-8 right-8 z-20">
                <div className="flex flex-col gap-6">
                  <div className="max-w-md space-y-3">
                    <span className="inline-flex rounded-full border border-primary/20 bg-black/55 px-3 py-1 font-headline text-[10px] font-bold uppercase tracking-[0.24em] text-primary backdrop-blur-md">
                      {currentSlide.tag}
                    </span>
                    <div>
                      <h2 className="font-headline text-3xl font-bold text-white md:text-4xl">
                        {currentSlide.title}
                      </h2>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-white/70 md:text-base">
                        {currentSlide.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-end justify-between gap-4">
                    <div className="rounded-2xl border border-white/10 bg-black/45 px-4 py-3 backdrop-blur-md">
                      <div className="mb-2 flex items-center gap-3">
                        <span
                          className="material-symbols-outlined text-sm text-primary"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          terminal
                        </span>
                        <span className="font-mono text-xs text-white/80">
                          SLIDE_{String(activeSlide + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="h-1.5 w-36 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-primary shadow-[0_0_10px_#BFFF00] transition-all duration-500"
                          style={{
                            width: `${((activeSlide + 1) / heroSlides.length) * 100}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => showSlide(activeSlide - 1)}
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/8 text-white backdrop-blur-xl transition-all duration-300 hover:border-primary/40 hover:bg-primary hover:text-black"
                        aria-label="Previous slide"
                      >
                        <span className="material-symbols-outlined">
                          arrow_back
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => showSlide(activeSlide + 1)}
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/8 text-white backdrop-blur-xl transition-all duration-300 hover:border-primary/40 hover:bg-primary hover:text-black"
                        aria-label="Next slide"
                      >
                        <span className="material-symbols-outlined">
                          arrow_forward
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
