import React from "react";

export function InstructorProfile() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-stretch bg-surface rounded-[3rem] overflow-hidden shadow-2xl border border-border">
          <div className="lg:w-1/2 min-h-[400px] relative">
            <img 
              alt="Ivan Zziwa - Chief Mentor" 
              className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
              src="/ivan.png"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface hidden lg:block"></div>
          </div>
          <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center">
            <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs block mb-4">// CHIEF_MENTOR_01</span>
            <h2 className="text-4xl md:text-5xl font-black text-foreground font-headline mb-8 leading-tight">IVAN ZZIWA</h2>
            <div className="space-y-6">
              <p className="text-muted text-lg leading-relaxed italic">
                "My teaching philosophy centers on hands-on, project-based learning that removes technical barriers and builds genuine confidence."
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="px-4 py-1.5 rounded-full bg-surface-variant text-primary text-xs font-bold uppercase border border-primary/20">
                  MS Cyber Forensics (IIT)
                </span>
                <span className="px-4 py-1.5 rounded-full bg-surface-variant text-primary text-xs font-bold uppercase border border-primary/20">
                  Top Graduate @ IIT
                </span>
                <span className="px-4 py-1.5 rounded-full bg-surface-variant text-primary text-xs font-bold uppercase border border-primary/20">
                  STEM Educator
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
