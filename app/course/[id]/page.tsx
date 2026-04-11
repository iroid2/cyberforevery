"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { courses } from "@/lib/courses-data";
import { TopNavBar } from "@/components/top-nav-bar";
import { MainFooter } from "@/components/main-footer";

export default function CourseDetailPage() {
  const { id } = useParams();
  const course = courses.find((c) => c.id === id);

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-headline font-black text-foreground mb-5 uppercase">System Error</h1>
          <p className="text-muted mb-8 uppercase tracking-widest">// DATA_NOT_FOUND</p>
          <Link href="/" className="text-primary font-bold hover:underline">Return to Terminal</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-body selection:bg-primary selection:text-primary-foreground">
      <TopNavBar />
      
      <main className="pt-32 md:pt-48 pb-24">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-8 mb-24 md:mb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 mb-6 text-primary font-headline tracking-[0.2em] text-xs md:text-sm font-bold uppercase">
              <span className="w-2 h-2 bg-primary block"></span>
              {course.level} // Educational Path
            </div>
            <h1 className="font-headline text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8 uppercase">
              {course.title.split(":")[0]} <br/>
              <span className="text-primary italic">{course.title.split(":")[1] || "MODULE"}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
              {course.description}
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="bg-surface p-6 rounded-lg border-l-4 border-primary">
              <div className="text-[10px] font-headline uppercase tracking-widest text-muted mb-2 tracking-[0.3em] font-bold">// COURSE_VALUATION</div>
              <div className="text-3xl font-black font-headline text-foreground uppercase tracking-tight">{course.price}</div>
            </div>
            <Link 
              href="/checkout"
              className="w-full bg-primary text-primary-foreground font-headline font-black py-6 rounded-full text-lg tracking-widest uppercase hover:scale-[1.02] text-center transition-all shadow-[0_15px_30px_-10px_rgba(191,255,0,0.4)] active:scale-95"
            >
              Initialize Deployment
            </Link>
          </div>
        </section>

        {/* Curriculum Bento Grid */}
        <section className="max-w-7xl mx-auto px-6 md:px-8 mb-24 md:mb-32">
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4 uppercase tracking-tight">
            <span className="text-primary text-lg font-black">//</span> 01. CURRICULUM_PAYLOAD
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {course.curriculum.map((week, index) => (
              <div 
                key={index} 
                className={`p-8 rounded-lg group transition-all relative overflow-hidden border border-border
                  ${index === 0 ? "md:col-span-7 bg-surface hover:bg-surface-variant" : 
                    index === 1 ? "md:col-span-5 bg-surface border-t-2 border-primary" :
                    index === 2 ? "md:col-span-5 bg-surface" :
                    "md:col-span-7 bg-primary text-primary-foreground"}`}
              >
                <div className={`absolute top-0 right-0 p-8 font-headline text-7xl md:text-8xl font-black opacity-5 transition-colors
                  ${index === 3 ? "text-primary-foreground" : "text-foreground group-hover:text-primary"}`}>
                  {week.week}
                </div>
                <div className="relative z-10">
                  <div className={`font-headline text-sm font-bold mb-4 uppercase tracking-[0.2em] 
                    ${index === 3 ? "text-primary-foreground/70" : "text-primary"}`}>
                    Week {week.week}
                  </div>
                  <h3 className={`text-2xl md:text-3xl font-headline font-bold mb-4 uppercase tracking-tight
                    ${index === 3 ? "text-primary-foreground" : "text-foreground"}`}>
                    {week.title}
                  </h3>
                  <p className={`max-w-md mb-6 leading-relaxed text-sm md:text-base
                    ${index === 3 ? "text-primary-foreground/80" : "text-muted"}`}>
                    {week.description}
                  </p>
                  <ul className="space-y-3">
                    {week.items.map((item, i) => (
                      <li key={i} className={`flex items-center gap-3 text-sm font-medium
                        ${index === 3 ? "text-primary-foreground/90" : "text-foreground/80"}`}>
                        <span className={`material-symbols-outlined text-lg
                          ${index === 3 ? "text-primary-foreground" : "text-primary"}`}>
                          terminal
                        </span> 
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Learning Outcomes & Instructor */}
        <section className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <div>
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4 uppercase tracking-tight text-foreground">
              <span className="text-primary text-lg font-black">//</span> 02. SYSTEM_UPGRADES
            </h2>
            <div className="space-y-8">
              {course.outcomes.map((outcome, index) => (
                <div key={index} className="flex gap-6 group">
                  <div className="w-12 h-12 flex-shrink-0 bg-surface flex items-center justify-center rounded border border-border group-hover:border-primary transition-colors">
                    <span className="material-symbols-outlined text-primary">check_circle</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2 uppercase tracking-tight text-foreground">MODULE_OUTCOME_{index + 1}</h4>
                    <p className="text-muted text-sm leading-relaxed">{outcome}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/5 rounded-lg -rotate-1 hidden md:block"></div>
            <div className="relative bg-surface p-8 md:p-12 rounded-lg border border-border">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden grayscale contrast-125 border-4 border-primary/20">
                  <img 
                    className="w-full h-full object-cover" 
                    src={course.instructor.image} 
                    alt={course.instructor.name}
                  />
                </div>
                <div>
                  <h4 className="font-headline text-2xl font-black uppercase tracking-tight text-foreground">{course.instructor.name.replace(" ", "_").toUpperCase()}</h4>
                  <div className="text-primary font-headline text-[10px] md:text-xs tracking-widest font-bold uppercase">{course.instructor.role} // MENTOR</div>
                </div>
              </div>
              <p className="text-muted italic leading-relaxed mb-8 text-sm md:text-base">
                "{course.instructor.bio}"
              </p>
              <div className="grid grid-cols-3 gap-4 border-t border-border pt-8">
                <div className="text-center md:text-left">
                  <div className="text-xl md:text-2xl font-black font-headline text-foreground">98%</div>
                  <div className="text-[9px] md:text-[10px] text-muted uppercase tracking-widest font-bold">Rating</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-xl md:text-2xl font-black font-headline text-foreground">1.2k</div>
                  <div className="text-[9px] md:text-[10px] text-muted uppercase tracking-widest font-bold">Grads</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-xl md:text-2xl font-black font-headline text-foreground">24/7</div>
                  <div className="text-[9px] md:text-[10px] text-muted uppercase tracking-widest font-bold">Support</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MainFooter />
    </div>
  );
}
