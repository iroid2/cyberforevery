import React from "react";
import { TopNavBar } from "@/components/top-nav-bar";
import { MainFooter } from "@/components/main-footer";

const contactMethods = [
  {
    icon: "coffee",
    title: "Ready for some coffee?",
    description: "Visit our main hub for a consultation.",
    detail: "221B Baker Street, London Tech Hub",
  },
  {
    icon: "chat_bubble",
    title: "Don't hesitate to reach out!",
    description: "Direct access to our support engineers.",
    detail: "ops@cyber4every1.io",
  },
  {
    icon: "support_agent",
    title: "How can we assist you?",
    description: "Schedule a call with our curriculum lead.",
    detail: "+44 20 7946 0123",
  },
];

const interestOptions = ["OSINT", "REVERSE_ENG", "CLOUD_SEC"];

const partnerLogos = ["TECH_CORP", "SEC_LABS", "CYBER_SYS", "DATA_DEF", "NET_EDGE"];

const faqs = [
  {
    question: "How long do the certification courses take?",
    answer: null,
  },
  {
    question: "What hardware is required for the labs?",
    answer:
      "All lab environments are browser-based through our remote terminal interface. We recommend a minimum of 8GB RAM and a stable internet connection for the best low-latency experience.",
  },
  {
    question: "Is there a group discount for corporate teams?",
    answer: null,
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNavBar />

      <main>
        <header className="relative overflow-hidden px-6 pb-24 pt-40 md:px-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(191,255,0,0.14),transparent_42%)]" />
          <div className="pointer-events-none absolute left-1/2 top-28 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
          <div className="relative mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col items-baseline gap-4 md:flex-row">
              <span className="font-headline text-sm font-bold uppercase tracking-[0.4em] text-primary">
                // SECURE_CHANNEL
              </span>
              <div className="h-[2px] w-12 bg-primary" />
            </div>

            <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:items-end">
              <div>
                <h1 className="mb-6 font-headline text-5xl font-bold leading-none md:text-7xl lg:text-8xl">
                  READY TO{" "}
                  <span
                    className="text-transparent"
                    style={{ WebkitTextStroke: "1px #BFFF00" }}
                  >
                    ELEVATE
                  </span>
                  <br />
                  YOUR FUTURE?
                </h1>
                <p className="max-w-2xl text-lg font-light leading-relaxed text-secondary md:text-xl">
                  Connect with our cyber security experts to architect your
                  learning path. From red teaming to cloud defense, we bridge
                  the gap between amateur and elite professional.
                </p>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                <div className="mb-5 flex items-center gap-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_18px_rgba(191,255,0,0.6)]" />
                  <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-primary/80">
                    live_support
                  </p>
                </div>
                <div className="space-y-5">
                  <div>
                    <p className="mb-2 text-xs uppercase tracking-[0.3em] text-secondary">
                      Primary response window
                    </p>
                    <p className="font-headline text-3xl font-bold text-white">
                      &lt; 24 Hours
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                      <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-secondary">
                        Tracks
                      </p>
                      <p className="font-headline text-xl font-bold text-white">
                        3 Active
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                      <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-secondary">
                        Advisors
                      </p>
                      <p className="font-headline text-xl font-bold text-white">
                        On Standby
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="px-6 py-16 md:px-12">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-3">
            {contactMethods.map((item) => (
              <div key={item.title} className="group flex flex-col gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container transition-colors duration-300 group-hover:bg-primary">
                  <span className="material-symbols-outlined text-primary transition-colors duration-300 group-hover:text-black">
                    {item.icon}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white">{item.title}</h2>
                <p className="text-sm text-secondary">{item.description}</p>
                <p className="font-mono text-sm text-white/90">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 py-24 md:px-12">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-16 lg:grid-cols-2">
            <div className="rounded-[2rem] bg-surface-container-low p-8 md:p-12">
              <div className="mb-10">
                <p className="mb-2 font-headline text-xs uppercase tracking-widest text-primary">
                  // FORM_01
                </p>
                <h2 className="text-3xl font-bold text-white md:text-4xl">
                  TRANSMIT ENQUIRY
                </h2>
              </div>

              <div className="space-y-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div>
                    <input
                      className="w-full border-0 border-b border-white/15 bg-transparent px-0 py-3 font-mono text-sm text-white placeholder:text-secondary/50 focus:border-primary focus:ring-0"
                      placeholder="FULL_NAME"
                      type="text"
                    />
                  </div>
                  <div>
                    <input
                      className="w-full border-0 border-b border-white/15 bg-transparent px-0 py-3 font-mono text-sm text-white placeholder:text-secondary/50 focus:border-primary focus:ring-0"
                      placeholder="EMAIL_ADDRESS"
                      type="email"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-secondary">
                    Select Interests:
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {interestOptions.map((option) => (
                      <label
                        key={option}
                        className="group flex cursor-pointer items-center gap-2"
                      >
                        <input
                          className="h-4 w-4 rounded border-white/20 bg-transparent text-primary focus:ring-primary"
                          type="checkbox"
                        />
                        <span className="font-mono text-xs transition-colors group-hover:text-primary">
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <textarea
                    className="w-full resize-none border-0 border-b border-white/15 bg-transparent px-0 py-3 font-mono text-sm text-white placeholder:text-secondary/50 focus:border-primary focus:ring-0"
                    placeholder="MESSAGE_PAYLOAD"
                    rows={4}
                  />
                </div>

                <button
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] text-primary-foreground transition-all hover:shadow-[0_0_20px_rgba(191,255,0,0.4)]"
                  type="button"
                >
                  Send Message
                  <span className="material-symbols-outlined text-base">send</span>
                </button>
              </div>
            </div>

            <div className="relative min-h-[500px] overflow-hidden rounded-[2rem] border border-primary/10 bg-surface-container">
              <div className="pointer-events-none absolute inset-0 z-10 rounded-[2rem] bg-primary/5" />
              <div className="absolute left-4 top-4 z-20 flex items-center gap-3 rounded-xl border border-white/10 bg-black/80 px-4 py-2 backdrop-blur-md">
                <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-white">
                  Active_Terminal: London_HQ
                </span>
              </div>
              <img
                className="h-full w-full object-cover grayscale invert brightness-50 contrast-125"
                alt="Stylized dark satellite map of an urban area with neon green overlays"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAz8UaXFP_ypDbyNguUwIWnKykcDikdovahG1kLfgdjfAi7XB-VcYJES0mfFgppN-FNeqr7fqy99hwDc1tAWrwTiRHEDhFiU_GZG4huJ_OQVHEhDPn35Ab6y0tP4nuy39EoIDpWakXHr62KUV5HcHxaMaOkl9--cIyK4tEae19A6fpfD-nFFbelaNh-1NkeHO-qGhvxdaB9P1_kq6_DmK8FgYQ-rS-HmwXKzY9jKu070_AuQemsRcTH13390wYv0nmYrs2SOSlBTQ"
              />
            </div>
          </div>
        </section>

        <section className="border-y border-white/5 bg-surface-container-lowest py-24">
          <div className="mx-auto max-w-7xl px-6 text-center md:px-12">
            <p className="mb-12 text-xs font-bold uppercase tracking-[0.5em] text-secondary">
              Trusted by 1500+ elite students from
            </p>
            <div className="flex flex-wrap items-center justify-center gap-12 opacity-40 transition-opacity duration-700 hover:opacity-100 md:gap-24">
              {partnerLogos.map((logo) => (
                <span
                  key={logo}
                  className="font-headline text-2xl font-bold tracking-tighter text-white"
                >
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-24 md:px-12">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold md:text-5xl">
              ANSWERS TO YOUR MOST{" "}
              <span className="text-primary">COMMON</span> QUESTIONS
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((item) => {
              const isOpen = Boolean(item.answer);

              return (
                <div
                  key={item.question}
                  className={`rounded-[1.5rem] bg-surface-container p-6 ${
                    isOpen ? "border-l-2 border-primary" : ""
                  }`}
                >
                  <div className={`flex items-center justify-between ${isOpen ? "mb-4" : ""}`}>
                    <h3 className={`font-bold ${isOpen ? "text-primary" : "text-white"}`}>
                      {item.question}
                    </h3>
                    <span className="material-symbols-outlined text-primary">
                      {isOpen ? "remove" : "add"}
                    </span>
                  </div>
                  {item.answer ? (
                    <p className="text-sm leading-relaxed text-secondary">
                      {item.answer}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto mb-24 max-w-7xl px-6 md:px-12">
          <div className="relative overflow-hidden rounded-[2rem] bg-primary p-12 text-center md:p-20">
            <div className="absolute right-0 top-0 -mr-32 -mt-32 h-64 w-64 rounded-full bg-black/10 blur-3xl" />
            <div className="relative z-10">
              <h2 className="mb-8 font-headline text-4xl font-black tracking-tight text-black md:text-6xl">
                STAY IN THE LOOP
              </h2>
              <p className="mx-auto mb-12 max-w-lg font-medium text-black/70">
                Receive weekly vulnerability reports, lab updates, and early
                access to new curriculum modules.
              </p>
              <div className="mx-auto flex max-w-md flex-col gap-4 md:flex-row">
                <input
                  className="flex-1 rounded-full border border-black/20 bg-black/10 px-6 py-4 font-mono text-sm text-black placeholder:text-black/40 focus:border-black focus:ring-black"
                  placeholder="YOUR_EMAIL_ADDRESS"
                  type="email"
                />
                <button
                  className="rounded-full bg-black px-8 py-4 font-bold uppercase tracking-widest text-primary transition-colors hover:bg-black/90"
                  type="button"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MainFooter />
    </div>
  );
}
