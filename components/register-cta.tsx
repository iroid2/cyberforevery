import React from "react";
import Link from "next/link";

export function RegisterCTA() {
  return (
    <section className="py-24 px-6 bg-background relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-primary opacity-[0.03] blur-[120px] rounded-full"></div>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="font-headline text-5xl md:text-7xl font-black text-foreground mb-10 tracking-tight">
          READY TO <br />
          <span className="text-primary uppercase">Initialize?</span>
        </h2>
        <p className="text-muted text-xl mb-12 max-w-xl mx-auto">
          Limited seats available for the Summer cohort. Secure your place in the future of cybersecurity today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/enroll"
            className="bg-primary text-primary-foreground px-12 py-6 rounded-full font-black text-xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(191,255,0,0.3)] flex items-center justify-center min-w-[300px]"
          >
            ENROLL IN BOOTCAMP
          </Link>
        </div>
        <p className="mt-8 text-muted text-sm uppercase tracking-widest font-bold">
          Enrollment deadline: June 1, 2026
        </p>
      </div>
    </section>
  );
}
