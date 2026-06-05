"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Programs", href: "#programs" },
  { label: "Mission", href: "#mission" },
  { label: "About", href: "#founder" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const Logo = () => (
  <Link href="/" className="flex items-center gap-2.5 group">
    <div className="w-8 h-8 bg-[#7FFF00] rounded-[7px] flex items-center justify-center font-mono font-bold text-[11px] text-[#050D05] tracking-tight flex-shrink-0">
      C4E
    </div>
    <span className="font-black text-[17px] text-[#EEFFEE] leading-none">
      Cyber<span className="text-[#7FFF00]">4</span>Every1
      <span className="inline-block w-2 h-2 rounded-full bg-[#7FFF00] ml-0.5 mb-0.5 align-bottom animate-pulse" />
    </span>
  </Link>
);

const HamburgerIcon = ({ open }: { open: boolean }) => (
  <span className="flex flex-col justify-center gap-[5px] w-6 h-6">
    <span
      className={`block h-[2px] bg-[#7FFF00] rounded-full transition-all duration-300 origin-center ${
        open ? "rotate-45 translate-y-[7px]" : ""
      }`}
    />
    <span
      className={`block h-[2px] bg-[#7FFF00] rounded-full transition-all duration-300 ${
        open ? "opacity-0 scale-x-0" : ""
      }`}
    />
    <span
      className={`block h-[2px] bg-[#7FFF00] rounded-full transition-all duration-300 origin-center ${
        open ? "-rotate-45 -translate-y-[7px]" : ""
      }`}
    />
  </span>
);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", "")).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-[70px] flex items-center bg-black transition-shadow duration-300 ${
          scrolled ? "shadow-[0_1px_0_rgba(255,255,255,0.08)]" : ""
        }`}
      >
        <div className="max-w-6xl mx-auto w-full px-4 md:px-5 flex items-center justify-between">
          <Logo />

          <nav
            className="max-md:hidden md:flex items-center gap-6 lg:gap-8"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors duration-200 ${
                    isActive
                      ? "text-[#7FFF00]"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="max-md:hidden md:flex items-center gap-3">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-bold text-white/60 hover:text-white transition-colors"
              >
                <span className="w-[22px] h-[22px] bg-red-600 rounded-full flex items-center justify-center text-white text-[9px]">
                  ▶
                </span>
                YouTube
              </a>
              <Link
                href="/login"
                className="text-sm font-semibold uppercase tracking-[0.1em] text-white/80 border border-white/10 px-4 py-2.5 rounded-[7px] hover:text-white hover:border-white/20 transition-colors"
              >
                Login
              </Link>
              <Link
                href="#contact"
                className="font-mono text-[11px] font-semibold tracking-[0.8px] uppercase text-[#050D05] bg-[#7FFF00] px-4 py-2.5 rounded-[7px] hover:bg-[#A3FF4D] transition-colors"
              >
                Enroll Now →
              </Link>
            </div>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex md:hidden items-center justify-center w-10 h-10 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <HamburgerIcon open={menuOpen} />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          menuOpen ? "visible" : "invisible"
        }`}
      >
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          className={`absolute top-[70px] left-0 right-0 bg-black transition-all duration-300 ${
            menuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
        >
          <nav
            className="flex flex-col px-5 py-4"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link, i) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  style={{ transitionDelay: menuOpen ? `${i * 40}ms` : "0ms" }}
                  className={`flex items-center justify-between py-4 border-b border-white/5 text-sm font-bold transition-all duration-200 ${
                    menuOpen
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-3 opacity-0"
                  } ${isActive ? "text-[#7FFF00]" : "text-white/60 hover:text-white"}`}
                >
                  <span>{link.label}</span>
                  <span className="text-[10px] font-mono tracking-widest text-white/20">
                    {isActive ? "●" : "→"}
                  </span>
                </Link>
              );
            })}

            <div className="flex flex-col gap-3 pt-5 pb-2">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                className="flex items-center justify-center gap-2.5 text-sm font-bold text-white/60 border border-white/10 rounded-xl py-3 hover:text-white hover:border-white/20 transition-colors"
              >
                <span className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-[10px]">
                  ▶
                </span>
                Watch on YouTube
              </a>
              <Link
                href="/login"
                onClick={handleLinkClick}
                className="text-center text-sm font-semibold uppercase tracking-[0.1em] text-white/80 border border-white/10 rounded-xl py-3 hover:text-white hover:border-white/20 transition-colors"
              >
                Login
              </Link>
              <Link
                href="#contact"
                onClick={handleLinkClick}
                className="text-center font-mono text-[13px] font-semibold tracking-[0.8px] uppercase text-[#050D05] bg-[#7FFF00] py-3.5 rounded-xl hover:bg-[#A3FF4D] transition-colors"
              >
                Enroll Now →
              </Link>
            </div>
          </nav>
        </div>
      </div>

      <div className="h-[70px]" aria-hidden="true" />
    </>
  );
}

export { Navbar as TopNavBar };
