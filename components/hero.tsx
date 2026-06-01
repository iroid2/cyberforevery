"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const heroSlides = [
  // {
  //   image: "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t87XXEHVNFoWJQIlN2Pe8w30c9b4qDOikhXGdn",
  //   alt: "Students learning computer safety together in a classroom bootcamp setting",
  //   tag: "// TRACK_ACTIVE: CYBER_BASICS",
  //   title: "Cyber Foundations",
  //   subtitle: "Digital Safety & System Security",
  //   description: "Students build solid confidence with critical digital safety principles, password protocols, identity protection, and hands-on laboratory setup for absolute beginners.",
  // },
  {
    image:
      "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t80f6WILihKT2r14c95UZpu0o3EFidHWSafGxV",
    alt: "Diverse group of students participating in cybersecurity bootcamp training",
    tag: "// TRACK_ACTIVE: TEAM_DEFENSE",
    title: "Collaborative Labs",
    subtitle: "Active Threat Hunting Missions",
    description:
      "Hands-on threat hunting and network defense challenges sharpen critical thinking, team-led response operations, and real-world system forensics.",
  },
  // {
  //   image:
  //     "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t802BjB8ihKT2r14c95UZpu0o3EFidHWSafGxV",
  //   alt: "Young builders working together on coding and secure systems development",
  //   tag: "// TRACK_ACTIVE: FUTURE_BUILDERS",
  //   title: "Next-Gen Talent",
  //   subtitle: "Secure Coding & Creative Tech",
  //   description:
  //     "Young builders explore the foundations of secure systems, clean code architecture, data privacy, and technical creativity in a single comprehensive path.",
  // },
  {
    image:
      "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8ODYI1nW8LhVaWDv6j9MsJfrBtSzIw0EAiPTN",
    alt: "Students learning about artificial intelligence and ethical model usage",
    tag: "// TRACK_ACTIVE: AI_ETHICS",
    title: "AI & Digital Ethics",
    subtitle: "Responsible AI Engineering",
    description:
      "Navigate artificial intelligence safely. Master AI prompt engineering, recognize risks like deepfakes and misinformation, and explore future digital ethics guidelines.",
  },
  {
    image:
      "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8wOEDHt1TdHBc4CLpiZkSoOhwfayE2nrK9lDe",
    alt: "Cybersecurity class studying network packet flows and forensics",
    tag: "// TRACK_ACTIVE: NET_FORENSICS",
    title: "Network Forensics",
    subtitle: "Analyzing Packets & Flow Paths",
    description:
      "Dive deep into how the internet works. Analyze IP addresses, domain name resolution protocols, router topologies, and packet traces under active simulation.",
  },
  {
    image:
      "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8FqKuA72TuioZrkO7jzTmKc1VNbxf2h0PGUyJ",
    alt: "Kids and families practicing safe technology habits at home",
    tag: "// TRACK_ACTIVE: HOME_PROTOCOL",
    title: "Parent-Led Growth",
    subtitle: "Integrated Tech Safety Habits",
    description:
      "Bootcamp learnings extend beyond the classroom with direct parent dashboard progress updates, take-home security checklists, and daily digital safety practices.",
  },
  {
    image:
      "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8O0pRm3W8LhVaWDv6j9MsJfrBtSzIw0EAiPTN",
    alt: "Students learning ethical hacking and defensive configurations",
    tag: "// TRACK_ACTIVE: ETHICAL_HACKING",
    title: "Ethical Hacking",
    subtitle: "Defensive Security Protocols",
    description:
      "Understand the mindset of hackers. Build strong secure layers, test firewalls, run vulnerability scans, and establish solid access permissions.",
  },
  {
    image:
      "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8yepwTJ0RPSIe6TDhV9XWsvMcGraNqgwEmzui",
    alt: "Web development and secure portal workspace",
    tag: "// TRACK_ACTIVE: SECURE_WEB",
    title: "Secure Web Dev",
    subtitle: "Building Protected Platforms",
    description:
      "Discover how to code secure web pages. Implement encryption APIs, defend against malicious scripts, and understand structure standards from the ground up.",
  },
  {
    image:
      "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8bQ5wBEfEmWbSlTeqdPBJ2KkDuc6zsywVZgj5",
    alt: "Students working on server environment hardening configurations",
    tag: "// TRACK_ACTIVE: SERVER_HARDENING",
    title: "Server Hardening",
    subtitle: "System Vulnerability Shields",
    description:
      "Construct impenetrable server walls. Harden local systems, audit kernel policies, regulate guest permissions, and simulate active attack logs.",
  },
  {
    image:
      "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8bQIifEmWbSlTeqdPBJ2KkDuc6zsywVZgj5XL",
    alt: "Diverse group of learners aligning network system architectures",
    tag: "// TRACK_ACTIVE: SYS_TOPOLOGY",
    title: "Network Topologies",
    subtitle: "Mapping Cloud Architecture",
    description:
      "Design cloud meshes and physical system models. Map subnet addresses, route gateway switches, and study modern server clustering standards.",
  },
  {
    image:
      "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t88DSZZatQFCmUcehZsVgfiAlPRjzXOkpwdb7H",
    alt: "Secure terminal cryptographic decoding sandbox",
    tag: "// TRACK_ACTIVE: CRYPTOGRAPHY",
    title: "Applied Cryptography",
    subtitle: "Symmetric & Asymmetric Keys",
    description:
      "Discover the science of secret messages. Code key generation scripts, inspect SSL/TLS handshakes, and decipher cryptographic blocks.",
  },
  {
    image:
      "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8mx7JFao58PZtKOgQnYrzTxiyVpudJGm1LDI2",
    alt: "Bootcamp students building creative applications and games",
    tag: "// TRACK_ACTIVE: SECURE_PLAYGROUND",
    title: "Interactive Coding",
    subtitle: "Creative Sandboxed Apps",
    description:
      "Experience absolute coding freedom in isolated software playgrounds. Build dynamic script projects and run them securely under teacher supervision.",
  },
];

const heroStats = [
  { value: "12+", label: "Hands-on Labs" },
  { value: "Grades 8-12", label: "Target Audience" },
  { value: "4 Weeks", label: "Cohort Duration" },
];

export function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  useEffect(() => {
    if (!isAutoplay) return;

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoplay]);

  const showSlide = (index: number) => {
    setIsAutoplay(false); // Pause autoplay on manual interaction
    const total = heroSlides.length;
    setActiveSlide((index + total) % total);
  };

  const currentSlide = heroSlides[activeSlide];

  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] px-6 pb-20 pt-32 text-white md:px-8 lg:px-20 min-h-[95vh] flex items-center">
      {/* Immersive Background Effects */}
      <div className="pointer-events-none absolute left-[-10%] top-[-8%] h-[35rem] w-[35rem] rounded-full bg-[#7FFF00]/5 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-[-14%] right-[-10%] h-[30rem] w-[30rem] rounded-full bg-[#7FFF00]/3 blur-[160px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(127,255,0,0.06),transparent_60%)]" />

      {/* Tech Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="grid w-full items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Animated Content */}
          <div className="space-y-8 lg:col-span-6 flex flex-col justify-center min-h-[500px]">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7FFF00] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#7FFF00]"></span>
              </span>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#7FFF00]">
                // HIGH_VELOCITY_CYBER_ED
              </span>
            </div>

            {/* AnimatePresence for synced content change */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="space-y-5"
              >
                <div className="space-y-1">
                  <span className="inline-flex rounded-md border border-[#7FFF00]/20 bg-[#7FFF00]/5 px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#7FFF00]">
                    {currentSlide.tag}
                  </span>
                  <h1 className="font-headline text-5xl font-black leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
                    {currentSlide.title}
                  </h1>
                  <h2 className="font-headline text-lg font-bold text-white/50 tracking-wide md:text-xl">
                    {currentSlide.subtitle}
                  </h2>
                </div>

                <p className="max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
                  {currentSlide.description}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/enroll"
                className="group relative inline-flex items-center justify-center rounded-full bg-[#7FFF00] px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest text-black shadow-[0_0_30px_rgba(127,255,0,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(127,255,0,0.5)]"
              >
                Register Now
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1 material-symbols-outlined text-xs">
                  arrow_forward
                </span>
              </Link>
              <Link
                href="/bootcamp"
                className="rounded-full border border-white/10 bg-white/5 px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:border-white/20"
              >
                Explore Curriculum
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 border-t border-white/5 pt-8">
              {heroStats.map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <div className="font-headline text-xl font-extrabold text-white md:text-2xl">
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-white/40">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Console & Interactive Slider */}
          <div className="relative h-[480px] lg:col-span-6 lg:h-[580px] flex items-center justify-center">
            {/* Outer Cyber Frame Glow */}
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-[#7FFF00]/10 via-transparent to-white/5 blur-3xl opacity-80" />

            <div className="relative w-full h-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#0E0E0E] shadow-[0_30px_80px_rgba(0,0,0,0.8)] flex flex-col">
              {/* Screen Top Bar */}
              <div className="flex items-center justify-between border-b border-white/5 bg-[#141414] px-6 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <span className="ml-3 font-mono text-[10px] uppercase tracking-wider text-white/40">
                    secure_core_terminal v1.42
                  </span>
                </div>
                <div className="rounded border border-[#7FFF00]/30 bg-[#7FFF00]/5 px-2 py-0.5 font-mono text-[9px] text-[#7FFF00] animate-pulse">
                  ONLINE
                </div>
              </div>

              {/* Dynamic Image Display Container */}
              <div className="relative flex-1 overflow-hidden bg-black">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <img
                      alt={currentSlide.alt}
                      className="h-full w-full object-cover opacity-90 transition-transform duration-700"
                      src={currentSlide.image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/10" />
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(127,255,0,0.12),transparent_40%,rgba(0,0,0,0.3)_90%)]" />
                  </motion.div>
                </AnimatePresence>

                {/* Cyber HUD Overlays */}
                <div className="absolute left-6 top-6 pointer-events-none flex flex-col gap-2">
                  <div className="rounded-full bg-black/60 px-3.5 py-1.5 backdrop-blur-md border border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#7FFF00] shadow-[0_0_8px_rgba(127,255,0,1)] animate-ping" />
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#7FFF00]">
                        stream_session_active
                      </span>
                    </div>
                  </div>
                </div>

                <div className="absolute right-6 top-6 pointer-events-none hidden md:block">
                  <div className="rounded-xl bg-black/60 px-4 py-3 backdrop-blur-md border border-white/5 text-right font-mono text-[9px] leading-relaxed text-white/40">
                    <span className="text-[#7FFF00] font-bold">
                      SYSTEM_KERN // OK
                    </span>
                    <br />
                    PACKETS_RECEIVED: 9,218
                    <br />
                    ENCRYPTION: AES_256_GCM
                  </div>
                </div>

                {/* Left Floating Dot Indicators */}
                <div className="absolute left-6 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-2.5">
                  {heroSlides.map((slide, index) => (
                    <button
                      key={slide.title}
                      type="button"
                      aria-label={`Go to slide ${index + 1}`}
                      onClick={() => showSlide(index)}
                      className="group relative flex items-center justify-center p-1"
                    >
                      <div
                        className={`rounded-full transition-all duration-300 ${
                          index === activeSlide
                            ? "h-5 w-1 bg-[#7FFF00]"
                            : "h-1.5 w-1 bg-white/20 hover:bg-white/40"
                        }`}
                      />
                    </button>
                  ))}
                </div>

                {/* Bottom Cyber-HUD Control Strip */}
                <div className="absolute bottom-6 left-6 right-6 z-20 flex items-end justify-between gap-4">
                  {/* Left Side: Slide Index Terminal */}
                  <div className="rounded-xl border border-white/10 bg-black/75 px-4 py-3 backdrop-blur-md">
                    <div className="mb-1.5 flex items-center gap-2">
                      <span className="material-symbols-outlined text-xs text-[#7FFF00]">
                        terminal
                      </span>
                      <span className="font-mono text-[10px] text-white/60">
                        SLIDE_NODE_0{activeSlide + 1}
                      </span>
                    </div>
                    <div className="h-1 w-32 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-[#7FFF00] shadow-[0_0_8px_#7FFF00] transition-all duration-500"
                        style={{
                          width: `${((activeSlide + 1) / heroSlides.length) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Right Side: Navigation Buttons */}
                  <div className="flex gap-2.5">
                    <button
                      type="button"
                      onClick={() => showSlide(activeSlide - 1)}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-md transition-all duration-300 hover:border-[#7FFF00]/40 hover:bg-[#7FFF00] hover:text-black hover:scale-105"
                      aria-label="Previous slide"
                    >
                      <span className="material-symbols-outlined text-sm font-semibold">
                        arrow_back
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => showSlide(activeSlide + 1)}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-md transition-all duration-300 hover:border-[#7FFF00]/40 hover:bg-[#7FFF00] hover:text-black hover:scale-105"
                      aria-label="Next slide"
                    >
                      <span className="material-symbols-outlined text-sm font-semibold">
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
    </section>
  );
}
