import React from "react";

export function ContactHero() {
  return (
    <header className="mb-20">
      <div className="flex flex-col md:flex-row items-baseline gap-4 md:gap-12">
        <h1 className="text-6xl md:text-8xl font-black font-headline text-foreground uppercase leading-none">
          CONNECT <br />
          <span className="text-transparent" style={{ WebkitTextStroke: "1px var(--primary)" }}>cyber4everyone</span>
        </h1>
        <div className="max-w-md">
          <div className="flex items-center gap-2 text-primary mb-4">
            <span className="w-2 h-2 bg-primary"></span>
            <span className="font-headline text-xs tracking-[0.2em] uppercase">// SYSTEM_STATUS: ONLINE</span>
          </div>
          <p className="text-muted font-light text-lg">
            Bridge the transmission gap. Our technical support and academic advisors are standing by for parental inquiries.
          </p>
        </div>
      </div>
    </header>
  );
}
