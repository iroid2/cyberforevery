import React from "react";

const stats = [
  { value: "4", label: "Weeks" },
  { value: "2x", label: "Per Week" },
  { value: "1.5h", label: "Per Session" },
  { value: "HYBRID", label: "Learning" },
];

export function StatsStrip() {
  return (
    <section className="bg-background py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="text-center p-8 rounded-xl bg-[#1C1B1B] border border-white/5 group hover:border-primary/30 transition-all"
          >
            <div className="text-4xl md:text-5xl font-black text-primary mb-2 font-headline uppercase">
              {stat.value}
            </div>
            <div className="text-muted font-bold uppercase tracking-widest text-xs">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
