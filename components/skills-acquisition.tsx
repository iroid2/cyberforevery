import React from "react";

const skills = [
  {
    icon: "lock_open",
    title: "Online Safety",
    description: "Learn how to spot scams, create super-strong passwords, and protect your digital life.",
  },
  {
    icon: "psychology",
    title: "Tech Detectives",
    description: "Discover how computers think, build simple tech projects, and stay smart online.",
  },
  {
    icon: "videogame_asset",
    title: "Game Coding",
    description: "Build your first arcade games using block coding and simple logic. No typing required!",
  },
  {
    icon: "encrypted",
    title: "Secret Codes",
    description: "Learn the magic of cryptography! Send secret messages and understand how computers talk.",
  },
];

export function SkillsAcquisition() {
  return (
    <section className="py-24 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs block mb-4">
              // SKILL_SET_ACQUISITION
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-foreground font-headline leading-none uppercase">
              Build your <br />
              <span className="text-muted">Tech Skills</span>
            </h2>
          </div>
          <div className="flex flex-col gap-12">
            <div className="bg-surface p-8 rounded-xl border border-border">
              <h3 className="text-xl font-bold text-foreground mb-4 uppercase font-headline tracking-tight">
                Practical Training
              </h3>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className="p-8 rounded-3xl bg-surface-variant border border-border hover:border-primary/50 transition-all group"
            >
              <span className="material-symbols-outlined text-primary text-4xl mb-6 block">
                {skill.icon}
              </span>
              <h3 className="text-xl font-bold text-foreground mb-4 uppercase font-headline tracking-tight">
                {skill.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
