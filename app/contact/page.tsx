import React from "react";
import { TopNavBar } from "@/components/top-nav-bar";
import { ContactHero } from "@/components/contact-hero";
import { ContactForm } from "@/components/contact-form";
import { ContactBento } from "@/components/contact-bento";
import { MainFooter } from "@/components/main-footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <TopNavBar />
      
      <main className="pt-48 pb-20 px-6 max-w-7xl mx-auto">
        <ContactHero />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <ContactForm />
          <ContactBento />
        </div>
      </main>

      <MainFooter />
    </div>
  );
}
