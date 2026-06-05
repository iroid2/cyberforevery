import Link from "next/link";
import React from "react";
const navLinks = [
  { href: "#programs", label: "Programs" },
  { href: "#mission", label: "Mission" },
  { href: "#founder", label: "About" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];
export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050D05] px-5 py-10 md:px-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#7FFF00] font-mono text-xs font-bold text-black">
            C4E
          </span>
          <span className="text-lg font-black tracking-tight text-white">
            Cyber<span className="text-[#7FFF00]">4</span>Every1
          </span>
        </Link>

        <ul className="flex flex-wrap items-center justify-center gap-5 text-sm text-[#B4CCB4]">
          {navLinks.map((item: any) => (
            <li key={item.href}>
              <a href={item.href} className="transition hover:text-[#7FFF00]">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="text-[10px] uppercase tracking-[0.3em] text-[#6A8A6A]">
          © 2026 Cyber4Every1 NFP. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
