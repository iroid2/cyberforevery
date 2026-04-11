import React from "react";
import { TopNavBar } from "@/components/top-nav-bar";
import { MainFooter } from "@/components/main-footer";

export default function BootcampPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body selection:bg-primary selection:text-primary-foreground">
      <TopNavBar />
      
      <main className="pt-48 pb-24">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-8 mb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 mb-6 text-primary font-headline tracking-widest text-sm font-bold uppercase">
              <span className="w-2 h-2 bg-primary block"></span>
              Advanced Cybersecurity Path
            </div>
            <h1 className="font-headline text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8 uppercase">
              THE NEON <span className="text-primary">CIRCUIT</span><br/>
              <span className="font-thin text-muted italic">OFFENSIVE CORE</span>
            </h1>
            <p className="text-xl text-muted max-w-2xl leading-relaxed">
              Master the high-velocity world of terminal-based security. A 4-week intensive sprint from architecture fundamentals to advanced AI-augmented threat detection.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="bg-surface p-6 rounded-lg border-l-4 border-primary">
              <div className="text-xs font-headline uppercase tracking-widest text-muted mb-2">// SESSION_STATUS</div>
              <div className="text-2xl font-bold font-headline text-foreground uppercase tracking-tight">SPOTS: 12 LEFT</div>
            </div>
            <button className="w-full bg-primary text-primary-foreground font-headline font-black py-6 rounded-full text-lg tracking-widest uppercase hover:scale-[1.02] transition-transform shadow-[0_15px_30px_-10px_rgba(191,255,0,0.4)]">
              Enroll Today — Spots Are Limited
            </button>
          </div>
        </section>

        {/* Curriculum Bento Grid */}
        <section className="max-w-7xl mx-auto px-6 md:px-8 mb-32">
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4 uppercase tracking-tight">
            <span className="text-primary text-lg">//</span> 01. CURRICULUM_DEEP_DIVE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Week 1 */}
            <div className="md:col-span-7 bg-surface rounded-lg p-8 group hover:bg-surface-variant transition-colors relative overflow-hidden border border-border">
              <div className="absolute top-0 right-0 p-8 font-headline text-8xl font-black text-foreground/5 group-hover:text-primary/10 transition-colors">01</div>
              <div className="relative z-10">
                <div className="text-primary font-headline text-sm font-bold mb-4 uppercase tracking-[0.2em]">Week 1</div>
                <h3 className="text-3xl font-headline font-bold text-foreground mb-4 uppercase tracking-tight">Fundamentals</h3>
                <p className="text-muted max-w-md mb-6 leading-relaxed">Master the architecture of modern networks, Linux kernel internals, and the command-line interface as a primary offensive tool.</p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                    <span className="material-symbols-outlined text-primary text-lg">terminal</span> Kernel Architecture & Hooks
                  </li>
                  <li className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                    <span className="material-symbols-outlined text-primary text-lg">terminal</span> Custom Shell Scripting
                  </li>
                </ul>
              </div>
            </div>
            {/* Week 2 */}
            <div className="md:col-span-5 bg-surface rounded-lg p-8 group relative border-t-2 border-primary border-x border-b border-border">
              <div className="text-primary font-headline text-sm font-bold mb-4 uppercase tracking-[0.2em]">Week 2</div>
              <h3 className="text-3xl font-headline font-bold text-foreground mb-4 uppercase tracking-tight">Defensive Tactics</h3>
              <p className="text-muted mb-8">Shift perspective to harden infrastructures. Learn EDR evasion by understanding exactly how they catch you.</p>
              <div className="w-full h-32 rounded bg-surface-variant relative overflow-hidden">
                <img 
                  className="w-full h-full object-cover opacity-30 grayscale hover:grayscale-0 transition-all duration-700" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAopl213CPf9fVbRYcIt-c5aaSeU8Yt1wTkwfamNLtyY5sBbzZMICNX6Ggb0jggNhgSpuCXbU0PDD4CSuw3EbqVkp7hXB6K3kLd1Hx1Y5Zec4BLtTGI3kuGZSVeY6ZZaUQO3oS0hwu7lVRIlxpRWFDZhpxOyFJCbw273elg_FIF-qH7LnA7MWxpRE434ZoK-FasLB2pNEhCcMESCR1J1FarFKDDzVZVV9d4Qa3-ibAq6BGP4uK4F2ukKHVur2YAaFSNX2H8VHbcXg"
                  alt="Abstract Data visualization"
                />
              </div>
            </div>
            {/* Week 3 */}
            <div className="md:col-span-5 bg-surface rounded-lg p-8 relative border border-border">
              <div className="text-primary font-headline text-sm font-bold mb-4 uppercase tracking-[0.2em]">Week 3</div>
              <h3 className="text-3xl font-headline font-bold text-foreground mb-4 uppercase tracking-tight">AI in Security</h3>
              <p className="text-muted mb-6">Integrating LLMs into your workflow. Automated vulnerability scanning and synthetic identity generation for red teaming.</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-surface-variant rounded text-[10px] font-headline text-primary uppercase tracking-tighter">Neural Nets</span>
                <span className="px-3 py-1 bg-surface-variant rounded text-[10px] font-headline text-primary uppercase tracking-tighter">Prompt Injection</span>
                <span className="px-3 py-1 bg-surface-variant rounded text-[10px] font-headline text-primary uppercase tracking-tighter">Auto-Recon</span>
              </div>
            </div>
            {/* Week 4 */}
            <div className="md:col-span-7 bg-primary rounded-lg p-8 relative overflow-hidden">
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <div className="text-primary-foreground font-headline text-sm font-bold mb-2 uppercase tracking-[0.2em]">Week 4</div>
                  <h3 className="text-4xl md:text-5xl font-headline font-black text-primary-foreground mb-2 uppercase tracking-tighter leading-none">Capstone CTF</h3>
                  <p className="text-primary-foreground/80 font-medium text-lg">A 24-hour live environment breach challenge.</p>
                </div>
                <div className="mt-8 flex justify-between items-center text-primary-foreground">
                  <span className="text-[10px] font-headline font-black uppercase tracking-[0.3em]">FINAL_EXAM_004</span>
                  <div className="flex -space-x-2">
                    <div className="w-10 h-10 rounded-full border-2 border-primary bg-surface"></div>
                    <div className="w-10 h-10 rounded-full border-2 border-primary bg-surface-variant"></div>
                    <div className="w-10 h-10 rounded-full border-2 border-primary bg-surface flex items-center justify-center text-[10px] font-bold">+50</div>
                  </div>
                </div>
              </div>
              <div className="absolute -right-4 -bottom-12 opacity-10">
                <span className="material-symbols-outlined text-[15rem] leading-none" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
              </div>
            </div>
          </div>
        </section>

        {/* Learning Outcomes & Instructor */}
        <section className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4 uppercase tracking-tight">
              <span className="text-primary text-lg">//</span> 02. LEARNING_OUTCOMES
            </h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 flex-shrink-0 bg-surface flex items-center justify-center rounded">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2 uppercase tracking-tight text-foreground">Automated Threat Modeling</h4>
                  <p className="text-muted text-sm leading-relaxed">Build custom pipelines to predict and prevent multi-vector attacks before they materialize.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 flex-shrink-0 bg-surface flex items-center justify-center rounded">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2 uppercase tracking-tight text-foreground">Advanced Exfiltration</h4>
                  <p className="text-muted text-sm leading-relaxed">Understand data movement via DNS tunneling and non-standard protocols.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 flex-shrink-0 bg-surface flex items-center justify-center rounded">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2 uppercase tracking-tight text-foreground">Industry-Ready Portfolio</h4>
                  <p className="text-muted text-sm leading-relaxed">Walk away with documented exploit chains developed in our proprietary labs.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/5 rounded-lg -rotate-2"></div>
            <div className="relative bg-surface p-10 rounded-lg border border-border transition-colors">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 rounded-full overflow-hidden grayscale contrast-125 border-4 border-primary/20">
                  <img 
                    className="w-full h-full object-cover" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLL_ReFSza9sQOHRDYgXSl6IY7tpxDdf3Xs4msbpdhjCUGVqqAv2iEkRZquQe_pcKr-hmhH7ugMWoYHx7RijU7kt3VPOt9vnNlxgCN7VU-IaeaeZ5plWZNy2cQn5FObdSegAGr6-GX5p8LWiyqyGEYN5pPO_fJ3dRhUMZUjpDXPbjAwUe-JopWhEiWFWZxt1lehiV87NlVqr98jJFmSQn-Vb22qCRDlFb76p4PtWBWp7UJxiTJrBdFpY8CG9F8vYCtfDyDD2nzpA" 
                    alt="Lead Instructor"
                  />
                </div>
                <div>
                  <h4 className="font-headline text-2xl font-black uppercase tracking-tight text-foreground">ELIAS_VANCE</h4>
                  <div className="text-primary font-headline text-xs tracking-widest font-bold uppercase">Lead Instructor // Ex-NSA</div>
                </div>
              </div>
              <p className="text-muted italic leading-relaxed mb-8">
                "Security isn't about the tools; it's about the mindset. We don't just teach you how to use a terminal; we teach you how to think like the system itself."
              </p>
              <div className="grid grid-cols-3 gap-4 border-t border-border pt-8">
                <div>
                  <div className="text-2xl font-black font-headline text-foreground">15+</div>
                  <div className="text-[10px] text-muted uppercase tracking-widest font-bold">Years Experience</div>
                </div>
                <div>
                  <div className="text-2xl font-black font-headline text-foreground">400+</div>
                  <div className="text-[10px] text-muted uppercase tracking-widest font-bold">Students Graduated</div>
                </div>
                <div>
                  <div className="text-2xl font-black font-headline text-foreground">SEC+</div>
                  <div className="text-[10px] text-muted uppercase tracking-widest font-bold">Certified Mentor</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MainFooter />
    </div>
  );
}
