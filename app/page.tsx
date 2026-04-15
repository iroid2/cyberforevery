import React from "react";
import { TopNavBar } from "@/components/top-nav-bar";
import { Hero } from "@/components/hero";
import { ScrollingTicker } from "@/components/scrolling-ticker";
import { StatsStrip } from "@/components/stats-strip";
import { SkillsAcquisition } from "@/components/skills-acquisition";
import { Courses } from "@/components/courses";
import { CurriculumTimeline } from "@/components/curriculum-timeline";
import { InstructorProfile } from "@/components/instructor-profile";
import { RegisterCTA } from "@/components/register-cta";
import { FAQSection } from "@/components/faq-section";
import AnimatedTestimonialsDemo from "@/components/animated-testimonials";
import AnimatedWaveFooter from "@/components/animated-wave-footer";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <TopNavBar />
      
      <Hero />
      
      <ScrollingTicker />
      
      <StatsStrip />
      
      <SkillsAcquisition />

      <Courses />
      
      <CurriculumTimeline />
      
      <InstructorProfile />
      
      <AnimatedTestimonialsDemo />
      
      <FAQSection />

      <RegisterCTA />
      
      <AnimatedWaveFooter />
    </main>
  );
}
