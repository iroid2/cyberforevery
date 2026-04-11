"use client";

import React from "react";

export function ContactForm() {
  return (
    <div className="lg:col-span-7 bg-surface rounded-lg p-8 md:p-12 relative overflow-hidden border border-border">
      <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl select-none font-headline text-foreground">INPUT</div>
      <div className="mb-10">
        <h2 className="text-2xl font-headline font-bold text-foreground mb-2 uppercase tracking-tight">Parent Transmission Interface</h2>
        <div className="flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-full w-fit">
          <span className="material-symbols-outlined text-primary text-sm material-fill">bolt</span>
          <span className="text-primary text-xs font-bold tracking-widest uppercase">Responds within 24 hours</span>
        </div>
      </div>
      <form action="#" className="space-y-12" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="relative">
            <label className="block text-muted text-[10px] uppercase tracking-widest mb-2 font-bold">01_Sender_Name</label>
            <input 
              className="w-full bg-transparent border-0 border-b border-border py-3 px-0 text-foreground focus:ring-0 focus:border-primary transition-all placeholder:text-foreground/20 uppercase text-sm tracking-widest" 
              placeholder="FULL NAME" 
              type="text"
            />
          </div>
          <div className="relative">
            <label className="block text-muted text-[10px] uppercase tracking-widest mb-2 font-bold">02_Return_Path</label>
            <input 
              className="w-full bg-transparent border-0 border-b border-border py-3 px-0 text-foreground focus:ring-0 focus:border-primary transition-all placeholder:text-foreground/20 uppercase text-sm tracking-widest" 
              placeholder="EMAIL ADDRESS" 
              type="email"
            />
          </div>
        </div>
        <div className="relative">
          <label className="block text-muted text-[10px] uppercase tracking-widest mb-2 font-bold">03_Subject_Line</label>
          <select className="w-full bg-transparent border-0 border-b border-border py-3 px-0 text-foreground focus:ring-0 focus:border-primary transition-all uppercase text-sm tracking-widest appearance-none cursor-pointer">
            <option className="bg-surface text-foreground">ENROLLMENT INQUIRY</option>
            <option className="bg-surface text-foreground">TECHNICAL SUPPORT</option>
            <option className="bg-surface text-foreground">ACADEMIC PROGRESS</option>
            <option className="bg-surface text-foreground">FINANCIAL_BILLING</option>
            <option className="bg-surface text-foreground">OTHER</option>
          </select>
        </div>
        <div className="relative">
          <label className="block text-muted text-[10px] uppercase tracking-widest mb-2 font-bold">04_Message_Payload</label>
          <textarea 
            className="w-full bg-transparent border-0 border-b border-border py-3 px-0 text-foreground focus:ring-0 focus:border-primary transition-all placeholder:text-foreground/20 uppercase text-sm tracking-widest resize-none" 
            placeholder="ENTER YOUR MESSAGE HERE..." 
            rows={4}
          ></textarea>
        </div>
        <button 
          className="group flex items-center justify-between w-full md:w-auto md:min-w-[280px] bg-primary text-primary-foreground font-black py-5 px-8 rounded-full hover:scale-105 transition-all duration-300 shadow-[0_10px_30px_-5px_rgba(191,255,0,0.4)] uppercase tracking-widest border-none" 
          type="submit"
        >
          <span>Send Us a Message</span>
          <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
        </button>
      </form>
    </div>
  );
}
