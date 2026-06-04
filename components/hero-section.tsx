"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { featuredGalleryItems } from "@/lib/gallery-data";

// ─── Slide data ───────────────────────────────────────────────────────────────
const slides = [
  {
    tag: "// SESSION_01: INTERNET_SAFETY",
    headline: ["Better", "Digital Future", "For Your Kids"],
    accentLine: 1,
    sub: "Let the child be the director, and the actor in their own digital story.",
    note: "We don't just lecture — real experiments, workshops and field experiences throughout the journey!",
    ctaPrimary: { label: "Get Started", href: "#programs" },
    ctaSecondary: { label: "Explore Curriculum", href: "#programs" },
    badge: "// STUDENT_AT_WORK",
    image: {
      src: featuredGalleryItems[1]?.src ?? "/gallery/servers.png",
      alt: featuredGalleryItems[1]?.alt ?? "Child using laptop",
    },
  },
  {
    tag: "// SESSION_02: THREAT_INTELLIGENCE",
    headline: ["Identify &", "Neutralize", "Digital Threats"],
    accentLine: 1,
    sub: "Map real-world attack vectors and build your own threat detection model — no experience needed.",
    note: "Hands-on sessions where students simulate real hacking scenarios in a safe, guided environment.",
    ctaPrimary: { label: "Register Now", href: "#programs" },
    ctaSecondary: { label: "Learn More", href: "#contact" },
    badge: "// THREAT_ANALYST",
    image: {
      src: featuredGalleryItems[3]?.src ?? "/gallery/abt.png",
      alt: featuredGalleryItems[3]?.alt ?? "Child coding",
    },
  },
  {
    tag: "// SESSION_03: AI_AND_CODE",
    headline: ["Build with", "AI —", "Responsibly"],
    accentLine: 1,
    sub: "Explore how AI is weaponized and defended. Create real ML models that detect phishing and malware.",
    note: "Every student leaves the AI module with a working project they built themselves — from scratch.",
    ctaPrimary: { label: "Join Bootcamp", href: "#programs" },
    ctaSecondary: { label: "Have Questions?", href: "#faq" },
    badge: "// AI_BUILDER",
    image: {
      src: featuredGalleryItems[5]?.src ?? "/gallery/data.png",
      alt: featuredGalleryItems[5]?.alt ?? "Students collaborating",
    },
  },
];

// ─── SVG Decorations per slide (left-side only, right cleared for image panel) ─
const SlideDecos = ({ index }: { index: number }) => {
  if (index === 0)
    return (
      <>
        <svg
          className="absolute top-[12%] left-[4%] w-12 opacity-50 pointer-events-none"
          viewBox="0 0 50 50"
          fill="none"
        >
          <ellipse
            cx="25"
            cy="25"
            rx="23"
            ry="9"
            stroke="#7FFF00"
            strokeWidth="1.4"
          />
          <circle cx="25" cy="25" r="4.5" fill="#7FFF00" fillOpacity="0.65" />
          <line
            x1="25"
            y1="2"
            x2="25"
            y2="15"
            stroke="#7FFF00"
            strokeWidth="1.2"
          />
        </svg>
        <svg
          className="absolute bottom-[22%] left-[6%] w-10 opacity-45 pointer-events-none"
          viewBox="0 0 42 42"
          fill="none"
        >
          <path
            d="M21 4L25 16H38L28 24L32 37L21 29L10 37L14 24L4 16H17L21 4Z"
            stroke="#7FFF00"
            strokeWidth="1.2"
            fill="none"
          />
        </svg>
        <svg
          className="absolute top-[18%] left-[20%] w-9 opacity-40 pointer-events-none"
          viewBox="0 0 36 36"
          fill="none"
        >
          <circle
            cx="18"
            cy="18"
            r="16"
            stroke="#3DAAFF"
            strokeWidth="1"
            strokeDasharray="4 3"
          />
          <circle cx="18" cy="18" r="4.5" fill="#3DAAFF" fillOpacity="0.6" />
        </svg>
        <svg
          className="absolute bottom-[26%] left-[7%] w-8 opacity-45 pointer-events-none"
          viewBox="0 0 32 32"
          fill="none"
        >
          <rect
            x="4"
            y="4"
            width="24"
            height="24"
            rx="4"
            stroke="#FF7A3D"
            strokeWidth="1.2"
            fill="none"
            transform="rotate(18 16 16)"
          />
        </svg>
        <svg
          className="absolute top-[52%] left-[3%] w-7 opacity-30 pointer-events-none"
          viewBox="0 0 28 28"
          fill="none"
        >
          <path
            d="M14 3L17 10H24L18 15L20 22L14 17L8 22L10 15L4 10H11L14 3Z"
            fill="#7FFF00"
          />
        </svg>
        <svg
          className="absolute top-[30%] left-[35%] w-6 opacity-20 pointer-events-none"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="#FFD600"
            strokeWidth="1"
            strokeDasharray="3 2"
          />
        </svg>
      </>
    );

  if (index === 1)
    return (
      <>
        <svg
          className="absolute top-[14%] left-[10%] w-11 opacity-50 pointer-events-none"
          viewBox="0 0 46 46"
          fill="none"
        >
          <path
            d="M23 4L28 16H41L30 24L35 37L23 29L11 37L16 24L5 16H18L23 4Z"
            stroke="#A87FFF"
            strokeWidth="1.3"
            fill="none"
          />
        </svg>
        <svg
          className="absolute bottom-[22%] left-[5%] w-11 opacity-45 pointer-events-none"
          viewBox="0 0 44 44"
          fill="none"
        >
          <circle
            cx="22"
            cy="22"
            r="20"
            stroke="#3DAAFF"
            strokeWidth="1.2"
            strokeDasharray="5 3"
          />
        </svg>
        <svg
          className="absolute top-[24%] left-[4%] w-9 opacity-40 pointer-events-none"
          viewBox="0 0 34 34"
          fill="none"
        >
          <rect
            x="5"
            y="5"
            width="24"
            height="24"
            rx="5"
            stroke="#7FFF00"
            strokeWidth="1.2"
            fill="none"
            transform="rotate(10 17 17)"
          />
        </svg>
        <svg
          className="absolute bottom-[17%] left-[20%] w-8 opacity-45 pointer-events-none"
          viewBox="0 0 30 30"
          fill="none"
        >
          <polygon
            points="15,3 27,24 3,24"
            stroke="#FFD600"
            strokeWidth="1.2"
            fill="none"
          />
        </svg>
      </>
    );

  return (
    <>
      <svg
        className="absolute top-[13%] left-[6%] w-11 opacity-45 pointer-events-none"
        viewBox="0 0 42 42"
        fill="none"
      >
        <path
          d="M21 4c0 0 8 5.5 8 17S21 38 21 38S13 32.5 13 21 21 4 21 4z"
          stroke="#7FFF00"
          strokeWidth="1.2"
          fill="none"
        />
        <circle cx="21" cy="21" r="4" fill="#7FFF00" fillOpacity="0.5" />
      </svg>
      <svg
        className="absolute bottom-[20%] left-[7%] w-10 opacity-40 pointer-events-none"
        viewBox="0 0 38 38"
        fill="none"
      >
        <circle
          cx="19"
          cy="19"
          r="17"
          stroke="#FF7A3D"
          strokeWidth="1"
          fill="none"
        />
        <line
          x1="2"
          y1="19"
          x2="36"
          y2="19"
          stroke="#FF7A3D"
          strokeWidth="1"
          strokeOpacity="0.6"
        />
        <line
          x1="19"
          y1="2"
          x2="19"
          y2="36"
          stroke="#FF7A3D"
          strokeWidth="1"
          strokeOpacity="0.6"
        />
      </svg>
      <svg
        className="absolute top-[48%] left-[3%] w-9 opacity-50 pointer-events-none"
        viewBox="0 0 36 36"
        fill="none"
      >
        <path
          d="M18 4L22 13H32L24 19L27 29L18 23L9 29L12 19L4 13H14L18 4Z"
          stroke="#7FFF00"
          strokeWidth="1.2"
          fill="#7FFF00"
          fillOpacity="0.08"
        />
      </svg>
      <svg
        className="absolute top-[20%] left-[28%] w-6 opacity-25 pointer-events-none"
        viewBox="0 0 22 22"
        fill="none"
      >
        <circle
          cx="11"
          cy="11"
          r="9"
          stroke="#FFD600"
          strokeWidth="1"
          strokeDasharray="3 2"
        />
      </svg>
    </>
  );
};

// ─── Animated Image Panel ─────────────────────────────────────────────────────
const AnimatedImagePanel = ({
  src,
  alt,
  badge,
  slideKey,
  animating,
}: {
  src: string;
  alt: string;
  badge: string;
  slideKey: number;
  animating: boolean;
}) => (
  <div
    className="relative flex-none"
    style={{
      transition: "opacity 0.4s ease, transform 0.4s ease",
      opacity: animating ? 0 : 1,
      transform: animating ? "translateX(40px)" : "translateX(0px)",
    }}
  >
    {/* Dotted wavy arc behind the card */}
    <svg
      className="absolute -left-8 top-[15%] pointer-events-none opacity-25 hidden sm:block"
      width="44"
      height="180"
      viewBox="0 0 44 180"
      fill="none"
    >
      <path
        d="M38 4 Q4 45 38 90 Q4 135 38 176"
        stroke="#7FFF00"
        strokeWidth="1.3"
        strokeDasharray="4 3"
      />
    </svg>

    {/* Orbit ring — hidden on mobile, shown on sm+ */}
    <div
      className="hidden sm:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{ width: "calc(100% + 64px)", aspectRatio: "1" }}
    >
      <div
        className="w-full h-full"
        style={{ animation: "heroOrbit 8s linear infinite" }}
      >
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <circle
            cx="50"
            cy="50"
            r="47"
            stroke="rgba(127,255,0,0.22)"
            strokeWidth="1"
            strokeDasharray="5 4"
          />
          {/* Dot marker that makes the orbit visible */}
          <circle cx="50" cy="3" r="2.5" fill="#7FFF00" fillOpacity="0.75" />
        </svg>
      </div>
    </div>

    {/* Spinning star — hidden on mobile */}
    <div
      className="hidden sm:block absolute -top-4 -right-4 z-20 pointer-events-none w-7 h-7"
      style={{ animation: "heroStarSpin 7s linear infinite" }}
    >
      <svg viewBox="0 0 28 28" fill="none" className="w-full h-full">
        <path
          d="M14 3L17 10H24L18 15L20 22L14 17L8 22L10 15L4 10H11L14 3Z"
          fill="#7FFF00"
          fillOpacity="0.9"
        />
      </svg>
    </div>

    {/* Float layer — translateY only */}
    <div style={{ animation: "heroFloat 3s ease-in-out infinite" }}>
      {/* Wiggle layer — rotate only, re-mounts on each slide change to replay */}
      <div
        key={slideKey}
        style={{ animation: "heroWiggle 0.6s ease-out forwards" }}
      >
        {/* Card with glow pulse */}
        <div
          className="relative overflow-hidden rounded-4xl w-44 sm:w-60 md:w-75 lg:w-95"
          style={{ animation: "heroGlowPulse 2s ease-in-out infinite" }}
        >
          {/* Outer lime glow border */}
          <div className="absolute inset-0 z-10 pointer-events-none rounded-4xl border-2 border-[rgba(127,255,0,0.5)]" />
          {/* Inner subtle border */}
          <div
            className="absolute inset-0.75 z-10 pointer-events-none rounded-[29px] border"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          />

          <div className="relative aspect-3/4">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 180px, (max-width: 768px) 240px, (max-width: 1024px) 300px, 380px"
            />
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/5 to-black/65" />

            {/* Badge pill */}
            <div className="absolute bottom-4 left-3 right-3 z-20">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-[#EEFFEE] backdrop-blur-sm"
                style={{
                  backgroundColor: "rgba(127,255,0,0.15)",
                  border: "1px solid rgba(127,255,0,0.45)",
                  boxShadow: "0 0 14px rgba(127,255,0,0.2)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#7FFF00] animate-pulse" />
                {badge}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── Stats ────────────────────────────────────────────────────────────────────
const stats = [
  { n: "29+", l: "Total Active Students" },
  { n: "04", l: "Available Field Programs" },

  { n: "3+", l: "Years Running" },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (n: number) => {
      if (animating) return;
      setAnimating(true);
      setTimeout(() => {
        setCurrent((n + slides.length) % slides.length);
        setAnimating(false);
      }, 350);
    },
    [animating],
  );

  useEffect(() => {
    const t = setInterval(() => goTo(current + 1), 5200);
    return () => clearInterval(t);
  }, [current, goTo]);

  const slide = slides[current];

  return (
    <>
      <style>{`
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes heroGlowPulse {
          0%, 100% { box-shadow: 0 0 60px rgba(127,255,0,0.15), 0 40px 80px rgba(0,0,0,0.4); }
          50%       { box-shadow: 0 0 60px rgba(127,255,0,0.40), 0 40px 80px rgba(0,0,0,0.5); }
        }
        @keyframes heroWiggle {
          0%   { transform: rotate(2deg); }
          33%  { transform: rotate(-2deg); }
          66%  { transform: rotate(3deg); }
          100% { transform: rotate(3deg); }
        }
        @keyframes heroOrbit {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes heroStarSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>

      <section className="relative bg-[#091209] overflow-hidden ">
        {/* Grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(127,255,0,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(127,255,0,0.035) 1px,transparent 1px)",
            backgroundSize: "55px 55px",
          }}
        />

        {/* Glow orbs */}
        <div className="absolute -top-40 -right-32 w-150 h-150 rounded-full bg-[radial-gradient(circle,rgba(127,255,0,0.06)_0%,transparent_65%)] pointer-events-none" />
        <div className="absolute -bottom-48 -left-24 w-100 h-100 rounded-full bg-[radial-gradient(circle,rgba(127,255,0,0.04)_0%,transparent_65%)] pointer-events-none" />

        {/* ── SLIDE AREA ── */}
        <div className="relative min-h-0 sm:min-h-[calc(100vh-70px)] flex flex-col justify-center">
          <SlideDecos index={current} />

          <div className="relative mx-auto max-w-6xl w-full px-4 sm:px-6 md:px-10 py-8 sm:py-12 md:py-20">
            <div className="hero-two-col">
              {/* Image panel — top on mobile (order-first), right on desktop (order-last) */}
              <div className="order-first md:order-last flex-none flex justify-center">
                <AnimatedImagePanel
                  src={slide.image.src}
                  alt={slide.image.alt}
                  badge={slide.badge}
                  slideKey={current}
                  animating={animating}
                />
              </div>

              {/* Text content — fades on slide change */}
              <div
                className="order-last md:order-first w-full md:flex-1 flex flex-col items-center md:items-start gap-3 sm:gap-4 md:gap-5 text-center md:text-left md:max-w-130"
                style={{
                  transition: "opacity 0.35s ease",
                  opacity: animating ? 0 : 1,
                }}
              >
                {/* Session tag */}
                <span className="inline-flex items-center gap-1.5 sm:gap-2 font-mono text-[8px] sm:text-[10px] font-medium tracking-[1.5px] sm:tracking-[2px] uppercase text-[#7FFF00] bg-[rgba(127,255,0,0.1)] border border-[rgba(127,255,0,0.22)] px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full max-w-[85vw] overflow-hidden">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7FFF00] animate-pulse shrink-0" />
                  <span className="truncate">{slide.tag}</span>
                </span>

                {/* Headline */}
                <h1 className="font-black text-[1.65rem] sm:text-4xl md:text-5xl lg:text-6xl leading-[1.08] text-[#EEFFEE]">
                  {slide.headline.map((line, i) => (
                    <span
                      key={i}
                      className={`block ${i === slide.accentLine ? "text-[#7FFF00]" : ""}`}
                      dangerouslySetInnerHTML={{ __html: line }}
                    />
                  ))}
                </h1>

                {/* Italic sub */}
                <p className="hidden sm:block italic text-[#6A8A6A] text-sm max-w-95 leading-relaxed">
                  {slide.sub}
                </p>

                {/* CTA buttons */}
                <div className="flex gap-2 sm:gap-3 flex-wrap justify-center md:justify-start">
                  <a
                    href={slide.ctaPrimary.href}
                    className="inline-flex items-center gap-2 font-black text-xs sm:text-sm text-[#050D05] bg-[#7FFF00] px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full hover:bg-[#A3FF4D] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(127,255,0,0.3)] transition-all duration-200"
                  >
                    {slide.ctaPrimary.label}
                    <span>→</span>
                  </a>
                  <a
                    href={slide.ctaSecondary.href}
                    className="inline-flex items-center gap-2 font-bold text-xs sm:text-sm text-[#7FFF00] border border-[rgba(127,255,0,0.22)] px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full hover:bg-[rgba(127,255,0,0.1)] hover:border-[rgba(127,255,0,0.45)] transition-all duration-200"
                  >
                    {slide.ctaSecondary.label}
                  </a>
                </div>

                {/* Note text */}
                <p className="hidden sm:block text-[#6A8A6A] text-xs max-w-100 leading-relaxed">
                  {slide.note}
                </p>
              </div>
            </div>
          </div>

          {/* Slide dots */}
          <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2.5 z-10">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 sm:h-2.5 rounded-full border border-[rgba(127,255,0,0.22)] transition-all duration-300 ${
                  i === current
                    ? "bg-[#7FFF00] w-5 sm:w-7"
                    : "bg-[#203520] w-1.5 sm:w-2.5"
                }`}
              />
            ))}
          </div>

          {/* Prev / Next arrows */}
          <button
            onClick={() => goTo(current - 1)}
            aria-label="Previous slide"
            className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#1E301E] border border-[rgba(127,255,0,0.22)] text-[#7FFF00] flex items-center justify-center text-sm sm:text-lg hover:bg-[#203520] transition-colors"
          >
            ←
          </button>
          <button
            onClick={() => goTo(current + 1)}
            aria-label="Next slide"
            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#1E301E] border border-[rgba(127,255,0,0.22)] text-[#7FFF00] flex items-center justify-center text-sm sm:text-lg hover:bg-[#203520] transition-colors"
          >
            →
          </button>
        </div>

        {/* ── STATS BAR ── */}
        <div className="border-t border-[rgba(127,255,0,0.1)] bg-[#091209]">
          <div className="max-w-5xl mx-auto px-5 py-6 flex flex-wrap justify-center gap-8 md:gap-12">
            {stats.map((s) => (
              <div key={s.l} className="text-center">
                <div
                  className="text-4xl leading-none text-[#7FFF00]"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {s.n}
                </div>
                <div className="font-mono text-[10px] text-[#6A8A6A] uppercase tracking-[1.5px] mt-1.5">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export { HeroSlider as HeroSection };
