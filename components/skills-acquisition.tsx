import React from "react";

const skills = [
  {
    icon: "lock_open",
    title: "Ethical Hacking",
    description: "Understand the adversary. Learn vulnerability assessment and penetration testing protocols.",
  },
  {
    icon: "psychology",
    title: "AI Defense",
    description: "Leverage LLMs and automated scripts to identify patterns and stop threats in milliseconds.",
  },
  {
    icon: "terminal",
    title: "Network Ops",
    description: "Master the terminal. Configure secure firewalls and monitor live traffic flows.",
  },
  {
    icon: "encrypted",
    title: "Cryptography",
    description: "The math of secrets. Deep dive into modern encryption standards and blockchain security.",
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
              <span className="text-muted">Digital Legacy</span>
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
