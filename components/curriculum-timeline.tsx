import React from "react";

const curriculum = [
  {
    week: "01",
    title: "Foundations & Setup",
    status: "ACTIVE",
    items: [
      "Introduction to Cybersecurity & AI",
      "Tool setup: VS Code, GitHub, ChatGPT",
      "How computers and the internet work",
      "IP addresses, DNS, and Router networking",
    ],
  },
  {
    week: "02",
    title: "Cyber Safety",
    items: [
      "Passwords, Auth & Multi-factor security",
      "Phishing, scams, and threat identification",
      "How to avoid common online threats",
      "Digital footprint management",
    ],
  },
  {
    week: "03",
    title: "AI in Action",
    items: [
      "Using AI tools responsibly and effectively",
      "AI risks, deepfakes, and misinformation",
      "Digital ethics in the age of intelligence",
      "Automating security tasks with AI",
    ],
  },
  {
    week: "04",
    title: "Build & Present",
    items: [
      "Final Capstone Project work session",
      "Demo Day: Presenting to the class",
      "Building your security portfolio",
      "Career guidance & next steps",
    ],
  },
];

export function CurriculumTimeline() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black text-foreground font-headline mb-20 text-center uppercase tracking-tighter">
          Bootcamp <span className="text-primary">Timeline</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          {curriculum.map((week, index) => (
            <div key={index} className="relative pl-16 py-8 border-l border-border group">
              <div className="absolute -left-6 top-6 h-12 w-12 bg-surface border-2 border-primary rounded-full flex items-center justify-center text-primary font-black text-xl font-headline">
                {week.week}
              </div>
              <div className="p-8 rounded-3xl bg-surface hover:bg-surface-variant transition-all border border-border/50 group-hover:border-primary/30">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-foreground uppercase font-headline">
                    {week.title}
                  </h3>
                  {week.status && (
                    <span className="text-xs font-bold text-primary px-3 py-1 bg-primary/10 rounded-full">
                      {week.status}
                    </span>
                  )}
                </div>
                <ul className="space-y-3">
                  {week.items.map((item, i) => (
                    <li key={i} className="text-muted flex gap-3 text-sm">
                      <span className="text-primary">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
