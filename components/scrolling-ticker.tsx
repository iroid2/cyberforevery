"use client";

import React from "react";

export function ScrollingTicker() {
  const content = "CYBERSECURITY & AI BOOTCAMP · GRADES 8–12 · ENROLLING NOW · NEXT COHORT STARTS JUNE 15 · ";
  
  return (
    <div className="bg-primary py-4 border-y-2 border-primary overflow-hidden flex whitespace-nowrap">
      <div className="ticker-content flex gap-12 text-[#0E0E0E] font-black uppercase text-xl md:text-2xl">
        <span>{content}</span>
        <span>{content}</span>
        <span>{content}</span>
        <span>{content}</span>
      </div>
    </div>
  );
}
