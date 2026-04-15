import React from "react";

const curriculum = [
  {
    week: "01",
    title: "Welcome to Tech Camp",
    status: "ACTIVE",
    items: [
      "Say hello! Introduction to computers",
      "Setting up our fun coding tools",
      "How the internet actually works",
      "Finding our way around the keyboard",
    ],
  },
  {
    week: "02",
    title: "Digital Defenders",
    items: [
      "Password Power-Ups!",
      "Spotting tricky online scams",
      "How to avoid bad links and downloads",
      "Being a good friend on the internet",
    ],
  },
  {
    week: "03",
    title: "Game Builders",
    items: [
      "Making our characters move",
      "Keeping score and adding sounds",
      "Adding cool game backgrounds",
      "Testing the game with friends",
    ],
  },
  {
    week: "04",
    title: "Showcase Party",
    items: [
      "Finishing our big final games",
      "Demo Day: Showing off to parents!",
      "Getting your Tech Ninja certificate",
      "Planning your next big invention",
    ],
  },
];

export function CurriculumTimeline() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black text-foreground font-headline mb-20 text-center uppercase tracking-tighter">
          Camp <span className="text-primary">Timeline</span>
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
