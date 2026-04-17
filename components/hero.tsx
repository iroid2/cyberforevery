import React from "react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#131313] px-6 pb-20 pt-32 text-white md:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(191,255,0,0.08),transparent_65%)]" />
      <div className="pointer-events-none absolute left-[-5rem] top-1/4 h-80 w-80 rounded-full bg-[#BFFF00]/5 blur-[120px]" />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="flex flex-col items-start lg:col-span-7">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-0.5 w-8 bg-[#BFFF00]" />
              <span className="font-['Space_Grotesk'] text-xs font-bold uppercase tracking-[0.3em] text-[#BFFF00]">
                Next cohort starting soon
              </span>
            </div>

            <h1 className="mb-8 max-w-5xl font-['Space_Grotesk'] text-5xl font-bold leading-[1.05] tracking-tighter text-white md:text-7xl lg:text-8xl">
              Cybersecurity &amp; <span className="italic text-[#BFFF00]">AI</span> Bootcamp
            </h1>

            <p className="mb-10 max-w-xl text-lg font-light leading-relaxed text-neutral-400 md:text-xl">
              Master the elite defensive and offensive protocols of tomorrow. Bridge the gap
              between human intuition and machine intelligence in our immersive technical
              environment.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/enroll"
                className="rounded-full bg-[#BFFF00] px-10 py-5 text-lg font-bold text-[#263500] transition-all hover:tracking-[0.08em] hover:shadow-[0_0_30px_rgba(191,255,0,0.3)] active:scale-95"
              >
                Register Now
              </Link>
              <Link
                href="/bootcamp"
                className="rounded-full border border-white/20 px-10 py-5 text-lg font-bold text-white backdrop-blur-sm transition-all hover:border-[#BFFF00]/50 hover:bg-white/5 active:scale-95"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="relative group lg:col-span-5">
            <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-tr from-[#BFFF00]/20 to-transparent blur-2xl opacity-50" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-[#1c1b1b] shadow-2xl">
              <img
                alt="AI Cyber Security"
                className="h-full w-full object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCV1y-MJf9xGbE6p7UQmhil_MrzeI5yCdE5EH_rTuNFAXC0_f4bHkjFx_Ll8QzzrxW68CKQxisYTotMj8HG4TQPeUBVEVD7kUhHefl42wZGoptQx57hVA6OC31vBYKheinEcczp1jYXbTvjnEzvvZWdTEymF1VNpsjkViSpu6kfnzGoVpUb8x9V9BGvZ4JUKw_HamEIC8pDZqvCNBmUJRT1X85iLs0NDlRONBJVujM94WvruH9QTL0QeJ_RJB57hqP2If8In_UKpA"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

              <div className="absolute left-6 right-6 top-6 flex flex-col gap-2">
                <div className="flex items-center justify-between rounded-md border border-[#BFFF00]/20 bg-black/80 px-3 py-1.5 backdrop-blur-md">
                  <div className="flex gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-red-500/60" />
                    <div className="h-2 w-2 rounded-full bg-yellow-500/60" />
                    <div className="h-2 w-2 rounded-full bg-green-500/60" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#BFFF00]/70">
                    // SYSTEM_ACTIVE
                  </span>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <div className="rounded-xl border border-white/5 bg-neutral-900/90 p-4 backdrop-blur-md">
                  <div className="mb-2 flex items-center gap-3">
                    <span
                      className="material-symbols-outlined text-sm text-[#BFFF00]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      terminal
                    </span>
                    <span className="font-mono text-xs text-white/80">INJECT_PAYLOAD: 0x8F22</span>
                  </div>
                  <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-2/3 bg-[#BFFF00] shadow-[0_0_10px_#BFFF00]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 w-full border-t-2 border-[#BFFF00] py-12">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { label: "Status", value: "98.4%", detail: "System Load" },
              { label: "Validation", value: "450+", detail: "Success Stories" },
              { label: "Architecture", value: "Hybrid", detail: "Tech Stack" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col">
                <span className="mb-1 font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                  {item.label}
                </span>
                <div className="flex items-baseline gap-3">
                  <h3 className="font-['Space_Grotesk'] text-4xl font-bold italic text-white">
                    {item.value}
                  </h3>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#BFFF00]">
                    {item.detail}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
