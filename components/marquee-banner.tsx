"use client";

import { LoaderPinwheel } from "lucide-react";

export function MarqueeBanner() {
  const messages = ["SITE UNDER DEVELOPMENT", "THANK YOU FOR VISITING"];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 overflow-hidden bg-[#BFFF00] py-4">
      <div className="flex animate-marquee whitespace-nowrap">
        {/* Duplicate the messages array to create seamless loop */}
        {[...messages, ...messages, ...messages].map((message, index) => (
          <span
            key={index}
            className="mx-8 font-sans text-sm font-bold uppercase tracking-wider text-black md:text-base"
          >
            {message}
          </span>
        ))}
      </div>
    </div>
  );
}
