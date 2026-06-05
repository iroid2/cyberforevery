"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import HeroSlider, { HeroSection } from "@/components/hero-section";
import { featuredGalleryItems } from "@/lib/gallery-data";
import { PricingSection } from "@/components/pricing-section";

const programCards = [
  {
    icon: "🛡️",
    title: "Internet Safety",
    subtitle: "Strong digital habits",
    description:
      "Password hygiene, phishing checks, account protection, and everyday security habits for families.",
  },
  {
    icon: "💥",
    title: "Ethical Hacking",
    subtitle: "Think like an attacker",
    description:
      "Hands-on security thinking, basic lab simulations, and the mindset behind defensive cybersecurity.",
  },
  {
    icon: "🤖",
    title: "AI & Code",
    subtitle: "Creative digital building",
    description:
      "Safe AI usage, beginner-friendly coding, and practical exercises that prepare students for the future.",
  },
];

const superstars = [
  {
    name: "Jaydn Niles",
    detail: "Age: 5 - Internet Safety",
    accent: "#7FFF00",
  },
  { name: "Lisa Ava", detail: "Age: 6 - Cryptography", accent: "#A87FFF" },
  { name: "Sophia Mia", detail: "Age: 8 - Ethical Hacking", accent: "#FFD600" },
  { name: "Amir Hassan", detail: "Age: 9 - AI & Code", accent: "#3DAAFF" },
];

const faqs = [
  {
    question: "What age group is Cyber4Every1 designed for?",
    answer:
      "Our programs are designed for children and students aged 5 to 18 years. Each module is age-calibrated so younger students start with internet safety and older students can explore ethical hacking, cryptography, and AI.",
  },
  {
    question: "Does my child need prior coding or tech knowledge?",
    answer:
      "Absolutely not. Every bootcamp starts from zero, and our instructors guide each student step by step regardless of their starting point.",
  },
  {
    question: "How long is a typical bootcamp program?",
    answer:
      "Programs range from 1-day intensive workshops to multi-week cohorts, and we can tailor the length to fit a school or community schedule.",
  },
  {
    question: "Can I bring Cyber4Every1 to my school or organization?",
    answer:
      "Yes. We partner with schools, NGOs, community centers, and other groups to deliver programs that fit their needs and budget.",
  },
  {
    question: "Are the bootcamps online or in person?",
    answer:
      "We offer both. In-person sessions are available in partner locations, while online programs can be accessed globally.",
  },
  {
    question: "What do students receive after completing a program?",
    answer:
      "Every graduate receives a digital certificate of completion, a project portfolio entry, and access to the alumni community.",
  },
];

const highlights = [
  "Master's in Cyber Forensics & Security",
  "Top Graduating Student at IIT",
  "300+ hours of 1-on-1 tutoring",
  "6+ Chicago middle schools",
  "200+ students guided",
  "Outstanding Graduate Teaching Assistant",
];

type FormState = "idle" | "loading" | "success" | "error";

export function LandingPage() {
  const [openFaq, setOpenFaq] = useState(0);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "Enrolling my child",
    message: "",
  });
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function updateForm(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      setFormState("success");
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        subject: "Enrolling my child",
        message: "",
      });
    } catch (err: unknown) {
      setFormState("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Failed to send. Please try again.",
      );
    }
  }

  return (
    <main className="min-h-screen bg-[#050D05] text-[#EEFFEE] selection:bg-[#7FFF00] selection:text-black">
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      <HeroSlider />

      <section className="border-y border-white/10 bg-[#0F1F0F] px-5 py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-6 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#6A8A6A]">
            Trusted by families and young learners
          </span>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              "Internet Safety",
              "AI Literacy",
              "Ethical Hacking",
              "Community Education",
            ].map((item) => (
              <span key={item} className="text-sm font-bold text-white/65">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="programs" className="bg-[#091209] px-5 py-20 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[220px_1fr]">
          <div>
            <h2 className="text-3xl font-black text-white md:text-4xl">
              Programs
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#6A8A6A]">
              Three core tracks that make cybersecurity approachable, practical,
              and exciting.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {programCards.map((card) => (
              <article
                key={card.title}
                className="rounded-[1.25rem] border border-white/10 bg-[#1E301E] p-6 text-center shadow-[0_10px_40px_rgba(0,0,0,0.25)] transition hover:-translate-y-1 hover:border-[#7FFF00]/35"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#7FFF00]/10 text-2xl">
                  {card.icon}
                </div>
                <h3 className="text-lg font-black text-white">{card.title}</h3>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#7FFF00]">
                  {card.subtitle}
                </p>
                <p className="mt-4 text-sm leading-7 text-[#B4CCB4]">
                  {card.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="mission" className="bg-[#050D05] px-5 py-20 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-[#7FFF00]/15 bg-[#0F1F0F]">
            <div className="relative aspect-[4/3]">
              <Image
                src="/gallery/abt.png"
                alt={featuredGalleryItems[0]?.alt ?? "Workshop classroom photo"}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
              <div className="absolute bottom-4 left-4 rounded-full border border-[#7FFF00]/20 bg-black/75 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#7FFF00]">
                // LIVE_BOOTCAMP_SESSION
              </div>
            </div>
          </div>

          <div>
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-[#7FFF00]">
              // WHY_CYBER4EVERY1
            </div>
            <h2 className="mt-4 text-3xl font-black leading-tight text-white md:text-5xl">
              Traditional learning becomes powerful when students can touch the
              tools.
            </h2>
            <ul className="mt-8 space-y-4">
              {[
                "Focus for long periods of time with guided exercises",
                "Engage deeply with peers through team challenges",
                "Understand complicated concepts through simulation",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-7 text-[#B4CCB4]"
                >
                  <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#7FFF00] text-[10px] font-black text-black">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-2xl text-sm leading-8 text-[#6A8A6A] md:text-base">
              We take the best of in-person education and supercharge it with
              cybersecurity, creating a generation of digitally fearless
              problem-solvers.
            </p>
            <a
              href="#programs"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-[#7FFF00] px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black"
            >
              Explore Curriculum
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#091209] px-5 py-20 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <div className="rounded-[1.5rem] border border-[#7FFF00]/15 bg-[#1E301E] p-7">
            <div className="text-3xl">🧠</div>
            <h3 className="mt-4 text-2xl font-black text-white">
              Children will be tested with online quiz games
            </h3>
            <p className="mt-3 text-sm leading-7 text-[#B4CCB4]">
              Students are assessed through trivia games, capture-the-flag
              challenges, and live quiz battles.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10">
            <div className="relative aspect-[16/9]">
              <Image
                src={featuredGalleryItems[1]?.src ?? "/gallery/servers.png"}
                alt={featuredGalleryItems[1]?.alt ?? "Quiz activity image"}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
              <div className="absolute bottom-4 left-4 rounded-full border border-[#7FFF00]/20 bg-black/75 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#7FFF00]">
                // ONLINE_QUIZ_SYSTEM
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#050D05] px-5 py-20 md:px-6" id="superstars">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-[#7FFF00]">
                // SUPERSTARS
              </div>
              <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">
                Our Bootcamp Superstars
              </h2>
            </div>
            <a
              href="#contact"
              className="rounded-full bg-[#7FFF00] px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-black"
            >
              See All
            </a>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {superstars.map((student) => (
              <article
                key={student.name}
                className="rounded-[1.25rem] border border-white/10 bg-[#1E301E] p-5 text-center"
              >
                <div
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 bg-[#0F1F0F] text-sm font-black text-white"
                  style={{ borderColor: student.accent }}
                >
                  {student.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </div>
                <div className="text-base font-black text-white">
                  {student.name}
                </div>
                <div className="mt-1 text-xs text-[#B4CCB4]">
                  {student.detail}
                </div>
                <div
                  className="mx-auto mt-4 inline-flex rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]"
                  style={{
                    borderColor: `${student.accent}55`,
                    color: student.accent,
                    backgroundColor: `${student.accent}12`,
                  }}
                >
                  Featured Learner
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="founder" className="bg-[#0B130B] px-5 py-20 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[320px_1fr] lg:items-start">
          <div className="overflow-hidden rounded-[1.75rem] border border-[#7FFF00]/15 bg-[#1E301E]">
            <div className="relative aspect-[4/5]">
              <Image
                src="/ivan.png"
                alt="Ivan Zziwa, founder of Cyber4Every1"
                fill
                priority
                sizes="(min-width: 1024px) 300px, 100vw"
                className="object-cover object-center grayscale"
              />
            </div>
            <div className="border-t border-white/10 p-5 text-center">
              <div className="text-xl font-black text-white">Ivan Zziwa</div>
              <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#7FFF00]">
                Founder & Executive Director
              </div>
            </div>
          </div>

          <div>
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-[#7FFF00]">
              // MEET_THE_FOUNDER
            </div>
            <h2 className="mt-4 text-3xl font-black leading-tight text-white md:text-5xl">
              Building a safer digital generation.
            </h2>
            <p className="mt-6 max-w-4xl text-sm leading-8 text-[#B4CCB4] md:text-base">
              Ivan Zziwa is a cybersecurity educator, youth advocate, and
              award-winning innovator committed to driving digital safety
              literacy across communities. Through hands-on bootcamps, community
              outreach, and school partnerships, Ivan has trained hundreds of
              students to think critically, code fearlessly, and navigate the
              internet with confidence.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-[1rem] border border-white/10 bg-[#1E301E] px-4 py-4 text-center text-xs font-bold uppercase tracking-[0.16em] text-[#7FFF00]"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.5rem] border border-white/10 bg-[#1E301E] p-6">
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#6A8A6A]">
                  Teaching Philosophy
                </div>
                <p className="mt-3 text-sm leading-7 text-[#B4CCB4]">
                  Clear explanations, mission-based labs, and practical systems
                  thinking that helps young learners build serious technical
                  confidence.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-[#1E301E] p-6">
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#6A8A6A]">
                  Mission
                </div>
                <p className="mt-3 text-sm leading-7 text-[#B4CCB4]">
                  Help learners move from curiosity to technical confidence with
                  structure, clarity, and support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0F1F0F] px-5 py-16 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <div>
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-[#7FFF00]">
              // PLATFORM_PARTNERS
            </div>
            <h3 className="mt-3 text-2xl font-black text-white">
              We integrate with familiar learning and communication platforms.
            </h3>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#B4CCB4]">
              We support the tools families and schools already use, making the
              learning experience easier to adopt.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Google",
                "YouTube",
                "Zoom",
                "Slack",
                "GitHub",
                "Discord",
                "Classroom",
                "Notion",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-[#1E301E] px-4 py-2 text-xs font-bold text-white/75"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-[#7FFF00]">
              // OUR_STORY
            </div>
            <h3 className="mt-3 text-2xl font-black text-white">
              From one bootcamp to a growing movement for youth cyber education.
            </h3>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#B4CCB4]">
              From a single school bootcamp to community-based programs, our
              journey shows that cybersecurity education belongs to everyone.
            </p>
            <a
              href="#mission"
              className="mt-5 inline-flex text-sm font-bold text-[#7FFF00]"
            >
              Read story →
            </a>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-[#050D05] px-5 py-20 md:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-[#7FFF00]">
              // FREQUENTLY_ASKED
            </div>
            <h2 className="mt-3 text-3xl font-black text-white md:text-5xl">
              Got Questions? We&apos;ve Got Answers.
            </h2>
          </div>

          <div className="mt-10 space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <button
                  key={faq.question}
                  type="button"
                  onClick={() =>
                    setOpenFaq((prev) => (prev === index ? -1 : index))
                  }
                  className={`w-full rounded-[1.25rem] border px-6 py-5 text-left transition ${
                    isOpen
                      ? "border-[#7FFF00]/30 bg-[#1E301E]"
                      : "border-white/10 bg-[#1E301E]/70"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-black text-white md:text-base">
                      {faq.question}
                    </span>
                    <span
                      className={`text-2xl text-[#7FFF00] transition-transform ${isOpen ? "rotate-45" : ""}`}
                    >
                      +
                    </span>
                  </div>
                  {isOpen ? (
                    <p className="mt-4 text-sm leading-7 text-[#B4CCB4]">
                      {faq.answer}
                    </p>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </section>
      <PricingSection />
      <section id="contact" className="bg-[#091209] px-5 py-20 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div className="rounded-[1.75rem] border border-white/10 bg-[#1E301E] p-7 md:p-10">
            <div className="mb-8">
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-[#7FFF00]">
                // REACH_OUT
              </div>
              <h2 className="mt-3 text-3xl font-black text-white">
                Contact Us
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#B4CCB4]">
                Want to enroll your school, partner with us, or just say hi?
                We&apos;d love to hear from you.
              </p>
            </div>

            {formState === "success" ? (
              <div className="flex flex-col items-center gap-4 rounded-2xl border border-[#7FFF00]/25 bg-[#7FFF00]/8 px-6 py-10 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#7FFF00]/30 bg-[#7FFF00]/12 text-2xl">
                  ✅
                </div>
                <h3 className="text-xl font-black text-white">Message sent!</h3>
                <p className="max-w-xs text-sm leading-7 text-[#B4CCB4]">
                  Thanks for reaching out. We&apos;ll reply within 1–2 business
                  days. Check your inbox for a confirmation email.
                </p>
                <button
                  type="button"
                  onClick={() => setFormState("idle")}
                  className="mt-2 rounded-full border border-[#7FFF00]/30 px-6 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-[#7FFF00] transition hover:bg-[#7FFF00]/10"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    required
                    value={form.firstName}
                    onChange={(e) => updateForm("firstName", e.target.value)}
                    className="rounded-xl border border-white/10 bg-[#0F1F0F] px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-[#7FFF00] focus:outline-none"
                    placeholder="First name"
                  />
                  <input
                    required
                    value={form.lastName}
                    onChange={(e) => updateForm("lastName", e.target.value)}
                    className="rounded-xl border border-white/10 bg-[#0F1F0F] px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-[#7FFF00] focus:outline-none"
                    placeholder="Last name"
                  />
                </div>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => updateForm("email", e.target.value)}
                  className="mt-4 w-full rounded-xl border border-white/10 bg-[#0F1F0F] px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-[#7FFF00] focus:outline-none"
                  placeholder="Email address"
                />
                <select
                  value={form.subject}
                  onChange={(e) => updateForm("subject", e.target.value)}
                  className="mt-4 w-full rounded-xl border border-white/10 bg-[#0F1F0F] px-4 py-3 text-sm text-white focus:border-[#7FFF00] focus:outline-none"
                >
                  <option>Enrolling my child</option>
                  <option>Bootcamp for my school</option>
                  <option>Partnership / Sponsorship</option>
                  <option>Media / Press</option>
                  <option>Other</option>
                </select>
                <textarea
                  required
                  value={form.message}
                  onChange={(e) => updateForm("message", e.target.value)}
                  className="mt-4 min-h-36 w-full rounded-xl border border-white/10 bg-[#0F1F0F] px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-[#7FFF00] focus:outline-none"
                  placeholder="Tell us more about your inquiry..."
                />
                {formState === "error" && (
                  <p className="mt-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-400">
                    ⚠ {errorMsg}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={formState === "loading"}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#7FFF00] px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {formState === "loading" ? (
                    <>
                      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                      Sending…
                    </>
                  ) : (
                    "Send Message →"
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-[#1E301E] p-7 md:p-10">
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-[#7FFF00]">
              // FIND_US
            </div>
            <h3 className="mt-3 text-3xl font-black text-white">
              Let&apos;s Build Together
            </h3>
            <p className="mt-3 text-sm leading-7 text-[#B4CCB4]">
              Whether you&apos;re a parent, teacher, school administrator, or
              organizational partner, we welcome every conversation.
            </p>

            <div className="mt-8 space-y-5">
              {[
                ["Location", "Chicago, IL (Serving globally)"],
                ["Email", "ivan@cyberforevery.com"],
                ["Phone / WhatsApp", "+1 (312) 468-3844"],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#7FFF00]/10 text-lg">
                    {label === "Location"
                      ? "📍"
                      : label === "Email"
                        ? "✉️"
                        : "📞"}
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6A8A6A]">
                      {label}
                    </div>
                    <div className="mt-1 text-sm font-bold text-white">
                      {value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#6A8A6A]">
                Follow Us
              </div>
              <div className="flex gap-3">
                {["𝕏", "in", "▶", "📘"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#0F1F0F] text-sm text-white/80 transition hover:border-[#7FFF00]/30 hover:text-[#7FFF00]"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#7FFF00] px-5 py-16 text-black md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-black leading-tight md:text-6xl">
            Better Digital Future
            <br />
            for Your Kids
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-black/70 md:text-base">
            Get our free cybersecurity starter guide for parents and educators.
          </p>
          <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <input
              className="flex-1 rounded-full border border-black/15 bg-black/10 px-5 py-4 text-sm placeholder:text-black/45 focus:outline-none"
              placeholder="Your E-mail"
            />
            <button
              type="button"
              className="rounded-full bg-black px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#7FFF00]"
            >
              Get Free Guide →
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
