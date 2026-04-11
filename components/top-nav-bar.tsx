"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";

export function TopNavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Bootcamp", href: "/bootcamp" },
    { name: "Pricing", href: "#" },
    { name: "About", href: "#" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 mt-6 mx-auto w-[95%] max-w-7xl px-4">
      <div className="flex justify-between items-center px-6 md:px-8 py-4 rounded-full bg-background/60 backdrop-blur-xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.4)] border border-border">
        <Link href="/" className="text-lg md:text-2xl font-black tracking-tighter text-foreground font-headline uppercase shrink-0">
          cyber4every1
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8 font-headline uppercase tracking-tight text-xs lg:text-sm">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href}
              className={`transition-all hover:text-primary hover:scale-105 duration-300 ${
                link.name === "Bootcamp" ? "text-primary font-bold" : "text-foreground/70 font-medium"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden sm:flex items-center gap-2 md:gap-4">
            <AnimatedThemeToggler className="text-foreground/70 hover:text-primary transition-colors p-2" />
            
            <button className="hidden md:block text-foreground/70 font-headline uppercase tracking-tight text-xs font-bold hover:text-foreground px-4 py-2 transition-colors">
              Login
            </button>
            
            <Link 
              href="/enroll"
              className="bg-primary text-primary-foreground font-headline tracking-tight uppercase px-4 md:px-6 py-2.5 rounded-full font-bold text-xs hover:scale-105 hover:shadow-[0_0_20px_rgba(191,255,0,0.3)] transition-all active:scale-95 duration-200"
            >
              Get Started
            </Link>
          </div>
          
          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-foreground/70 hover:text-primary transition-colors ml-2 p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="material-symbols-outlined text-2xl">
              {isOpen ? "close" : "bolt"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden mt-4 mx-2 p-6 rounded-3xl bg-surface/95 backdrop-blur-xl border border-border shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-6 font-headline uppercase tracking-widest text-xs font-black text-center">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href}
                className="text-foreground/80 hover:text-primary border-b border-border pb-2"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-6 pt-2">
              <div className="flex justify-center border-b border-border pb-4">
                <AnimatedThemeToggler className="text-foreground/70 hover:text-primary transition-colors p-2" />
              </div>
              <button className="text-foreground/80 hover:text-primary uppercase text-xs font-black">
                Login
              </button>
              <Link 
                href="/enroll" 
                className="bg-primary text-primary-foreground py-4 rounded-full text-xs font-bold tracking-widest uppercase shadow-[0_10px_20px_rgba(191,255,0,0.2)]"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
