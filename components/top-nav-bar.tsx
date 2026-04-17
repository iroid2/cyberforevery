"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";

export function TopNavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Curriculum", href: "#curriculum" },
    { name: "Bootcamp", href: "/bootcamp" },
    { name: "Mentors", href: "#mentors" },
    { name: "Pricing", href: "#pricing" },
  ];

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 mx-auto mt-6 w-[92%] max-w-7xl px-2">
      <div className="flex items-center justify-between rounded-full border border-white/5 bg-neutral-900/70 px-6 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl md:px-8">
        <Link
          href="/"
          className="shrink-0 font-['Space_Grotesk'] text-xl font-black italic tracking-tighter text-white md:text-2xl"
        >
          cyber4every1
        </Link>

        <div className="hidden items-center gap-8 font-['Space_Grotesk'] text-sm font-bold uppercase tracking-tight md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`transition-all duration-300 ${
                link.name === "Curriculum"
                  ? "flex items-center gap-2 text-[#BFFF00] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#BFFF00] before:content-['']"
                  : "text-neutral-400 hover:text-[#BFFF00]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden items-center gap-2 sm:flex md:gap-4">
            <AnimatedThemeToggler className="rounded-full border border-white/10 p-2 text-neutral-300 transition hover:border-[#BFFF00]/50 hover:text-[#BFFF00]" />

            <button className="hidden px-4 py-2 font-['Space_Grotesk'] text-xs font-bold uppercase tracking-tight text-neutral-400 transition hover:text-white md:block">
              Login
            </button>

            <Link
              href="/enroll"
              className="rounded-full bg-[#BFFF00] px-4 py-2.5 font-['Inter'] text-xs font-bold tracking-tight text-[#263500] transition-all duration-200 hover:shadow-[0_0_15px_rgba(191,255,0,0.4)] active:scale-95 md:px-6"
            >
              Apply Now
            </Link>
          </div>

          <button
            className="ml-2 rounded-full border border-white/10 p-2 text-neutral-300 transition hover:border-[#BFFF00]/50 hover:text-[#BFFF00] md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="material-symbols-outlined text-2xl">
              {isOpen ? "close" : "bolt"}
            </span>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mx-2 mt-4 animate-in slide-in-from-top-4 rounded-[2rem] border border-white/10 bg-neutral-900/95 p-6 shadow-2xl backdrop-blur-xl duration-300 md:hidden">
          <div className="flex flex-col gap-6 text-center font-['Space_Grotesk'] text-xs font-black uppercase tracking-widest">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="border-b border-white/10 pb-2 text-neutral-300 hover:text-[#BFFF00]"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-6 pt-2">
              <div className="flex justify-center border-b border-white/10 pb-4">
                <AnimatedThemeToggler className="rounded-full border border-white/10 p-2 text-neutral-300 transition hover:border-[#BFFF00]/50 hover:text-[#BFFF00]" />
              </div>
              <button className="text-xs font-black uppercase text-neutral-300 hover:text-[#BFFF00]">
                Login
              </button>
              <Link
                href="/enroll"
                className="rounded-full bg-[#BFFF00] py-4 text-xs font-bold uppercase tracking-widest text-[#263500] shadow-[0_10px_20px_rgba(191,255,0,0.2)]"
                onClick={() => setIsOpen(false)}
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
