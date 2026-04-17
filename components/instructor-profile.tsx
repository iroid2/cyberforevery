import React from "react";

export function InstructorProfile() {
  return (
    <section
      id="mentors"
      className="relative overflow-hidden bg-[#0e0e0e] px-6 py-24 text-white md:px-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_25%,rgba(191,255,0,0.07),transparent_45%)]" />
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#131313] shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
          <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-[#BFFF00]/10 blur-[120px]" />
          <div className="flex flex-col items-stretch lg:flex-row">
            <div className="relative min-h-[420px] lg:w-[46%]">
              <div className="absolute left-6 right-6 top-6 z-10 flex items-center justify-between rounded-md border border-[#BFFF00]/20 bg-black/70 px-3 py-2 backdrop-blur-md">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#BFFF00]/70">
                  // MENTOR_PROFILE_ACTIVE
                </span>
                <span className="font-mono text-[10px] text-white/60">
                  NODE: 01
                </span>
              </div>
              <img
                alt="Ivan Zziwa - Chief Mentor"
                className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0 hover:scale-[1.03]"
                src="/ivan.png"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 z-10 rounded-2xl border border-white/10 bg-neutral-900/85 p-4 backdrop-blur-md">
                <div className="mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#BFFF00]">
                    verified
                  </span>
                  <span className="font-['Space_Grotesk'] text-xs font-bold uppercase tracking-[0.2em] text-white/80">
                    Lead Instructor Profile
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-4/5 bg-[#BFFF00] shadow-[0_0_12px_rgba(191,255,0,0.65)]" />
                </div>
              </div>
            </div>
            <div className="relative flex flex-col justify-center p-10 lg:w-[54%] lg:p-16">
              <span className="mb-4 block font-['Space_Grotesk'] text-xs font-bold uppercase tracking-[0.3em] text-[#BFFF00]">
                // CHIEF_MENTOR_01
              </span>
              <h2 className="mb-6 font-['Space_Grotesk'] text-4xl font-bold leading-tight tracking-tighter text-white md:text-6xl">
                IVAN ZZIWA
              </h2>
              <p className="max-w-2xl font-['Inter'] text-lg leading-relaxed text-neutral-300">
                My teaching philosophy centers on hands-on, project-based
                learning that removes technical barriers and builds genuine
                confidence. The goal is to make advanced cyber concepts feel
                practical, accessible, and exciting for every learner in the
                room.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {[
                  "MS Cyber Forensics (IIT)",
                  "Top Graduate @ IIT",
                  "STEM Educator",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-center font-['Inter'] text-xs font-bold uppercase tracking-[0.18em] text-[#BFFF00]"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-[#181818] p-5">
                  <p className="font-['Space_Grotesk'] text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500">
                    Focus
                  </p>
                  <p className="mt-3 text-sm leading-6 text-neutral-300">
                    Project-led cybersecurity instruction, confidence building,
                    and foundational AI literacy.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#181818] p-5">
                  <p className="font-['Space_Grotesk'] text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500">
                    Mission
                  </p>
                  <p className="mt-3 text-sm leading-6 text-neutral-300">
                    Help learners bridge digital curiosity into real-world
                    technical confidence with structure and clarity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
