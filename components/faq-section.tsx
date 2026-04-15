"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
  return (
    <div className={`border-b border-border/50 group transition-all duration-300 ${isOpen ? "bg-surface/30" : "hover:bg-surface/10"}`}>
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-8 px-6 text-left focus:outline-none"
      >
        <span className={`text-lg transition-colors font-headline font-bold uppercase tracking-tight ${isOpen ? "text-primary" : "text-foreground group-hover:text-primary"}`}>
          {question}
        </span>
        <div className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full border border-border flex items-center justify-center transition-all ${isOpen ? "bg-primary border-primary rotate-180" : "group-hover:border-primary"}`}>
          {isOpen ? (
            <Minus className="w-4 h-4 text-primary-foreground" />
          ) : (
            <Plus className="w-4 h-4 text-muted group-hover:text-primary" />
          )}
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-8 pt-0 text-muted text-sm leading-relaxed max-w-3xl font-medium">
          {answer}
        </div>
      </div>
    </div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Are these courses suitable for absolute beginners?",
      answer: "Absolutely! Our 'Adventures' are specifically designed for beginners. We start with the fundamentals and use visual learning aids and hands-on labs to ensure every child understands the core concepts before moving forward.",
    },
    {
      question: "What is the age recommendation for the bootcamp?",
      answer: "We typically recommend our programs for ages 10-17. However, we have specialized tracks for younger 'Junior Scouts' and more advanced tracks for older 'Digital Sentinels' who are looking for a bigger challenge.",
    },
    {
      question: "Will participants receive a certificate of completion?",
      answer: "Yes! Every participant who completes their final mission (project) will receive an official Cyber4Every1 Digital Defender Certificate, verifiable on the blockchain and suitable for their portfolio.",
    },
    {
      question: "What technical equipment is required?",
      answer: "For online courses, a laptop or PC with a stable internet connection is all you need. For our In-Person 'Intro to Hardware' sessions, all physical devices and components are provided by our lab.",
    },
    {
      question: "Can I switch between Online and In-Person classes?",
      answer: "For 'Hybrid' tracks (like Cybersecurity or Networking), yes! You can attend lectures online and join us in the physical lab for hands-on sessions. 'Online Only' tracks are strictly remote but include live mentor support.",
    },
    {
      question: "Is there mentorship available after the bootcamp?",
      answer: "Yes, all our graduates gain access to our Alumni Discord server, where they can participate in seasonal 'CTF' (Capture The Flag) competitions and receive career guidance from industry professionals.",
    },
  ];

  return (
    <section className="py-24 px-6 bg-background relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] block mb-4 font-headline">
            // INTEL_TERMINAL
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-foreground font-headline uppercase leading-tight tracking-tighter">
            FREQUENTLY ASKED <br />
            <span className="text-primary italic">QUERIES</span>
          </h2>
        </div>

        <div className="bg-surface/20 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden shadow-2xl">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        <div className="mt-12 p-8 rounded-2xl border border-border/50 border-dashed text-center">
          <p className="text-muted text-sm font-medium mb-4">
            Still have queries or need a custom assessment?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-black uppercase tracking-widest text-xs transition-all"
          >
            Contact System Support
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
}
