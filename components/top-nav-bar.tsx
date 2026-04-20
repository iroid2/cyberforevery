"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const primaryLinks = [
  { label: "Curriculum", href: "/course" },
  { label: "Bootcamp", href: "/bootcamp" },
  { label: "Mentors", href: "/about" },
  { label: "Pricing", href: "/checkout" },
  { label: "Enroll", href: "/enroll" },
  { label: "Gallery", href: "/gallery" },
];

const secondaryLinks = [
  { label: "Login", href: "/login" },
  { label: "Register", href: "/register" },
];

const mobileLinks = [
  ...primaryLinks,
  ...secondaryLinks,
  { label: "Get in Touch", href: "/contact" },
];

const DESKTOP_BREAKPOINT = 920;

export function TopNavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [viewportWidth, setViewportWidth] = useState<number>(0);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    const updateViewportWidth = () => {
      setViewportWidth(window.innerWidth);
    };

    updateViewportWidth();
    window.addEventListener("resize", updateViewportWidth);

    return () => window.removeEventListener("resize", updateViewportWidth);
  }, []);

  useEffect(() => {
    if (viewportWidth >= DESKTOP_BREAKPOINT && isOpen) {
      setIsOpen(false);
    }
  }, [isOpen, viewportWidth]);

  const isDesktop = viewportWidth >= DESKTOP_BREAKPOINT;
  const isLoggedIn = !!session?.user;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  const userInitials = session?.user?.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : session?.user?.email?.[0].toUpperCase() || "U";

  return (
    <header className="fixed left-0 right-0 top-0 z-50 mx-auto mt-8 w-[95%] max-w-6xl px-4 sm:px-6">
      <div className={`rounded-2xl border border-white/8 bg-black/80 px-4 py-3 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.4)] backdrop-blur-2xl sm:px-6 ${!isDesktop && isOpen ? "rounded-3xl" : "sm:rounded-full"}`}>
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
          <Link
            href="/"
            className="group flex items-center gap-2 transition-transform active:scale-95"
            onClick={() => setIsOpen(false)}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span className="material-symbols-outlined text-[20px]">
                shield
              </span>
            </div>
            <span className="font-headline text-xl font-extrabold tracking-tighter text-white">
              cyber4every1
            </span>
          </Link>

          {isDesktop ? (
            <nav className="flex items-center justify-center gap-3 lg:gap-6">
              {primaryLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative font-headline text-sm font-bold uppercase tracking-widest transition-all duration-300 active:scale-95 ${
                    isActive(link.href)
                      ? "text-primary after:absolute after:-bottom-1 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-primary after:content-['']"
                      : "text-white/70 hover:scale-105 hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-headline text-xs font-bold text-primary-foreground transition-all duration-300 hover:scale-105"
                  >
                    {userInitials}
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-white/10 bg-black/90 py-2 shadow-xl backdrop-blur-2xl">
                      <div className="border-b border-white/10 px-4 py-2">
                        <p className="font-headline text-xs font-bold text-white">{session.user?.name || session.user?.email}</p>
                      </div>
                      <Link href="/profile" className="block px-4 py-2 font-headline text-xs text-white/70 hover:bg-white/5 hover:text-white">
                        Profile
                      </Link>
                      <button
                        onClick={() => signOut()}
                        className="w-full px-4 py-2 text-left font-headline text-xs text-white/70 hover:bg-white/5 hover:text-white"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                secondaryLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="rounded-full border border-white/20 px-4 py-2 font-headline text-[11px] font-bold uppercase tracking-widest text-white transition-all duration-300 hover:scale-105 hover:bg-white/10 active:scale-95"
                  >
                    {link.label}
                  </Link>
                ))
              )}
            </nav>
          ) : (
            <div />
          )}

          <div className="flex items-center justify-end gap-3 sm:gap-4">
            {!isDesktop ? (
              <Link
                href="/register"
                className="rounded-full bg-primary px-4 py-2.5 font-headline text-[11px] font-bold uppercase tracking-widest text-primary-foreground shadow-[0_0_20px_rgba(191,255,0,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(191,255,0,0.5)] active:scale-95 sm:px-6 sm:text-xs"
              >
                Register
              </Link>
            ) : null}

            {!isDesktop ? (
              <button
                type="button"
                className="flex items-center justify-center p-1 text-white"
                onClick={() => setIsOpen((value) => !value)}
                aria-label="Toggle navigation menu"
              >
                <span className="material-symbols-outlined">
                  {isOpen ? "close" : "menu"}
                </span>
              </button>
            ) : null}
          </div>
        </div>

        {!isDesktop && isOpen ? (
          <div className="mt-4 border-t border-white/10 pt-4">
            <nav className="flex flex-col gap-3">
              {mobileLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`rounded-2xl border px-4 py-3 font-headline text-xs font-bold uppercase tracking-widest transition ${
                    isActive(link.href)
                      ? "border-primary/35 bg-primary/10 text-primary"
                      : "border-white/10 text-white/75 hover:border-primary/30 hover:text-primary"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
