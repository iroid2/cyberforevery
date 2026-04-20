import React from "react";

const instructorHighlights = [
  "MS Cyber Forensics (IIT)",
  "Top Graduate @ IIT",
  "STEM Educator",
];

export function InstructorProfile() {
  return (
    <section
      id="mentors"
      className="relative overflow-hidden bg-[#0e0e0e] px-6 py-24 text-white md:px-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_24%,rgba(191,255,0,0.08),transparent_42%)]" />
      <div className="pointer-events-none absolute left-[-6rem] top-32 h-72 w-72 rounded-full bg-white/[0.03] blur-[120px]" />

      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-[#131313] shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.02),transparent_28%,transparent_72%,rgba(191,255,0,0.04))]" />
          <div className="pointer-events-none absolute right-[-5rem] top-[-4rem] h-72 w-72 rounded-full bg-[#BFFF00]/10 blur-[140px]" />

          <div className="grid items-stretch gap-0 lg:grid-cols-[0.94fr_1.06fr]">
            <div className="relative min-h-[520px] overflow-hidden border-b border-white/10 lg:min-h-[640px] lg:border-b-0 lg:border-r">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(191,255,0,0.18),transparent_36%)]" />

              <div className="absolute left-6 right-6 top-6 z-20 flex items-center justify-between rounded-full border border-[#BFFF00]/15 bg-black/55 px-4 py-2 backdrop-blur-xl">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#BFFF00]/80">
                  // MENTOR_PROFILE_ACTIVE
                </span>
                <span className="font-mono text-[10px] text-white/55">NODE: 01</span>
              </div>

              <img
                alt="Ivan Zziwa - Chief Mentor"
                className="absolute inset-0 h-full w-full object-cover object-center grayscale transition-all duration-700 hover:scale-[1.02] hover:grayscale-0"
                src="/ivan.png"
              />

              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.18)_0%,rgba(8,8,8,0.02)_28%,rgba(8,8,8,0.48)_65%,#131313_100%)]" />
              <div className="absolute inset-y-0 right-0 hidden w-32 bg-[linear-gradient(90deg,transparent,rgba(19,19,19,0.9)_78%,#131313)] lg:block" />
              <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(19,19,19,0.92)_72%,#131313)]" />

              <div className="absolute bottom-6 left-6 right-6 z-20">
                <div className="rounded-[1.75rem] border border-white/10 bg-neutral-950/72 p-5 backdrop-blur-xl">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-[#BFFF00]">
                      verified
                    </span>
                    <span className="font-['Space_Grotesk'] text-xs font-bold uppercase tracking-[0.22em] text-white/80">
                      Lead Instructor Profile
                    </span>
                  </div>
                  <p className="max-w-sm text-sm leading-6 text-white/70">
                    Guiding students from curiosity to technical confidence
                    through structured labs, practical security thinking, and
                    modern AI awareness.
                  </p>
                  <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-4/5 bg-[#BFFF00] shadow-[0_0_12px_rgba(191,255,0,0.65)]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative flex flex-col justify-center p-8 md:p-10 lg:p-14">
              <div className="absolute inset-y-0 left-0 hidden w-px bg-[linear-gradient(180deg,transparent,rgba(191,255,0,0.35),transparent)] lg:block" />

              <span className="mb-4 block font-['Space_Grotesk'] text-xs font-bold uppercase tracking-[0.3em] text-[#BFFF00]">
                // CHIEF_MENTOR_01
              </span>

              <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="font-['Space_Grotesk'] text-4xl font-bold leading-tight tracking-tighter text-white md:text-6xl">
                    IVAN ZZIWA
                  </h2>
                  <p className="mt-2 font-['Space_Grotesk'] text-sm font-bold uppercase tracking-[0.22em] text-white/45">
                    Cybersecurity Mentor / AI Learning Advocate
                  </p>
                </div>
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#BFFF00]/15 bg-[#BFFF00]/8 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#BFFF00]">
                  <span className="h-2 w-2 rounded-full bg-[#BFFF00] shadow-[0_0_10px_rgba(191,255,0,0.75)]" />
                  Live Faculty Node
                </div>
              </div>

              <p className="max-w-2xl font-['Inter'] text-lg leading-relaxed text-neutral-300">
                My teaching philosophy centers on hands-on, project-based
                learning that removes technical barriers and builds genuine
                confidence. The goal is to make advanced cyber concepts feel
                practical, accessible, and exciting for every learner in the
                room.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {instructorHighlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-4 text-center font-['Inter'] text-xs font-bold uppercase tracking-[0.18em] text-[#BFFF00] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.6rem] border border-white/10 bg-[#181818] p-5">
                  <p className="font-['Space_Grotesk'] text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500">
                    Focus
                  </p>
                  <p className="mt-3 text-sm leading-6 text-neutral-300">
                    Project-led cybersecurity instruction, confidence building,
                    and foundational AI literacy.
                  </p>
                </div>
                <div className="rounded-[1.6rem] border border-white/10 bg-[#181818] p-5">
                  <p className="font-['Space_Grotesk'] text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500">
                    Mission
                  </p>
                  <p className="mt-3 text-sm leading-6 text-neutral-300">
                    Help learners bridge digital curiosity into real-world
                    technical confidence with structure and clarity.
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-['Space_Grotesk'] text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500">
                      Teaching Signature
                    </p>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-300">
                      Clear explanations, mission-based labs, and practical
                      systems thinking that help young learners build serious
                      technical confidence.
                    </p>
                  </div>
                  <div className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white/70">
                    Student-first delivery
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
