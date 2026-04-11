import React from "react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 hero-gradient overflow-hidden">
      <div 
        className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none" 
        style={{ 
          backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDgXj4ARzQqDjF5GzTxJPhs5jKTOP_CH7zKsA9p9bpmgc4xk5t7SKrrnJOdu9JNieaGdl-HxcjvCitx0M_xnE4Fx_b_dqchfSKwr34fGx37qkwGo1-DhmLxLprg45yPSk3QKwTBdHPfQJZRnvTZJj6clg7vYv2ILDZcOCN-ynNOJlygygU_3X8D4v_o42Q0LrwG2rXUO4ZSTPZFWaHHqmc8tG-r50Fhbb4HX5_DipR1HNA4ErpIQAPMCPdiCxXiI97CNNZ1_ck6ag')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      ></div>
      <div className="relative z-10 max-w-6xl w-full text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Cohort 04 Now Open
        </div>
        <h1 className="font-headline text-4xl sm:text-6xl md:text-8xl font-black text-foreground leading-[0.9] mb-8 tracking-tighter uppercase text-center">
          CYBERSECURITY & <br />
          <span className="text-primary">AI BOOTCAMP</span>
        </h1>
        <p className="text-muted text-base md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
          Master the frontier of digital defense. Learn to secure systems and leverage artificial intelligence for high-velocity threat detection in 4 intensive weeks.
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <Link 
            href="/register"
            className="bg-primary text-primary-foreground px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(191,255,0,0.3)]"
          >
            Register Now
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
          <button className="bg-surface text-foreground border border-border px-10 py-5 rounded-full font-bold text-lg hover:bg-surface-variant transition-all flex items-center justify-center gap-3">
            Learn More
            <span className="material-symbols-outlined">info</span>
          </button>
        </div>
      </div>
    </section>
  );
}
