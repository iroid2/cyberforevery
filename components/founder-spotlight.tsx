import Image from "next/image";

const founderHighlights = [
  "Master's in Cyber Forensics & Security",
  "Top Graduating Student at IIT",
  "300+ hours of 1-on-1 tutoring",
  "6+ Chicago middle schools",
  "200+ students guided",
  "Outstanding Graduate Teaching Assistant",
];

export function FounderSpotlight() {
  return (
    <section
      id="founder"
      className="relative overflow-hidden bg-[#0e0e0e] px-6 py-24 text-white md:px-8 lg:px-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(127,255,0,0.1),transparent_40%)]" />
      <div className="pointer-events-none absolute left-[-5rem] top-24 h-72 w-72 rounded-full bg-white/[0.03] blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid overflow-hidden rounded-[2.25rem] border border-white/10 bg-[#121212] shadow-[0_30px_80px_rgba(0,0,0,0.55)] lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative min-h-[520px] overflow-hidden border-b border-white/10 lg:border-b-0 lg:border-r">
            <Image
              src="/ivan.png"
              alt="Ivan Zziwa, founder and instructor of cyber4every1"
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover object-center grayscale transition duration-700 hover:scale-[1.02] hover:grayscale-0"
              priority
            />

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.12)_0%,rgba(8,8,8,0.02)_28%,rgba(8,8,8,0.5)_68%,#121212_100%)]" />

            <div className="absolute left-6 right-6 top-6 z-20 flex items-center justify-between rounded-full border border-[#7FFF00]/15 bg-black/55 px-4 py-2 backdrop-blur-xl">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#7FFF00]/85">
                // FOUNDER_PROFILE_ACTIVE
              </span>
              <span className="font-mono text-[10px] text-white/55">NODE: 01</span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 z-20">
              <div className="rounded-[1.75rem] border border-white/10 bg-neutral-950/75 p-5 backdrop-blur-xl">
                <div className="mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#7FFF00]">
                    verified
                  </span>
                  <span className="font-headline text-xs font-bold uppercase tracking-[0.22em] text-white/80">
                    Lead Instructor Profile
                  </span>
                </div>
                <p className="max-w-sm text-sm leading-6 text-white/70">
                  Hands-on, project-based learning that removes technical
                  barriers and helps young learners build real confidence.
                </p>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col justify-center p-8 md:p-10 lg:p-14">
            <span className="mb-4 block font-mono text-xs font-bold uppercase tracking-[0.3em] text-[#7FFF00]">
              // ABOUT_THE_FOUNDER
            </span>

            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-headline text-4xl font-black leading-tight tracking-tight text-white md:text-6xl">
                  IVAN ZZIWA
                </h2>
                <p className="mt-2 font-mono text-sm font-bold uppercase tracking-[0.22em] text-white/45">
                  Cybersecurity & AI Instructor
                </p>
              </div>
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#7FFF00]/15 bg-[#7FFF00]/8 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7FFF00]">
                <span className="h-2 w-2 rounded-full bg-[#7FFF00] shadow-[0_0_10px_rgba(127,255,0,0.75)]" />
                Live Faculty Node
              </div>
            </div>

            <p className="max-w-2xl text-lg leading-relaxed text-neutral-300">
              CyberSecurity for Everyone was founded to make cybersecurity
              education accessible, practical, and engaging for every
              individual, regardless of age, background, or technical
              experience.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {founderHighlights.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-4 text-center text-xs font-bold uppercase tracking-[0.16em] text-[#7FFF00] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.6rem] border border-white/10 bg-[#181818] p-5">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500">
                  Teaching Philosophy
                </p>
                <p className="mt-3 text-sm leading-6 text-neutral-300">
                  Project-based learning, clear explanations, and practical
                  security thinking that keeps the classroom approachable.
                </p>
              </div>
              <div className="rounded-[1.6rem] border border-white/10 bg-[#181818] p-5">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500">
                  Mission
                </p>
                <p className="mt-3 text-sm leading-6 text-neutral-300">
                  Help learners move from curiosity to technical confidence with
                  structure, clarity, and support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
