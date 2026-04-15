import React from "react";
import { TopNavBar } from "@/components/top-nav-bar";
import { EnrollmentForm } from "@/components/enrollment-form";
import { MainFooter } from "@/components/main-footer";

export default function EnrollPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <TopNavBar />
      
      <main className="pt-48 pb-20 px-6 max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full mb-6">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            <span className="text-[10px] tracking-[0.2em] font-headline font-bold text-primary uppercase">
              // ENROLLMENT_INTERFACE_v2.0
            </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black font-headline text-white uppercase leading-none mb-4">
            STUDENT <span className="text-primary italic">ENROLLMENT</span>
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Initialize your teen's technical journey. Complete all sections to secure a seat in the upcoming cohort.
          </p>
        </header>

        <EnrollmentForm />
      </main>

      <MainFooter />
    </div>
  );
}
