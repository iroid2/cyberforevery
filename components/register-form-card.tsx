"use client";

import React from "react";

export function RegisterFormCard() {
  return (
    <div className="w-full max-w-md mx-auto lg:ml-auto">
      <div className="bg-surface/60 backdrop-blur-xl rounded-lg p-10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] relative overflow-hidden group border border-border">
        {/* Terminal Style Accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent opacity-50"></div>
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="font-headline text-3xl font-bold text-foreground tracking-tight uppercase">REGISTRATION</h2>
            <p className="text-muted text-xs font-headline tracking-widest uppercase mt-1">// PARENT_GATEWAY</p>
          </div>
          <div className="text-primary">
            <span className="material-symbols-outlined text-4xl material-fill">shield_person</span>
          </div>
        </div>
        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-6">
            {/* Parent Name */}
            <div className="group/input">
              <label className="block text-[10px] font-bold text-muted uppercase tracking-[0.2em] mb-2 group-focus-within/input:text-primary transition-colors">
                Parent Name
              </label>
              <input 
                className="w-full bg-transparent border-0 border-b border-border px-0 py-3 text-foreground placeholder:text-foreground/20 focus:ring-0 focus:border-primary transition-all duration-300 font-headline tracking-wide uppercase" 
                placeholder="ALEXANDER VANCE" 
                type="text"
              />
            </div>
            {/* Email */}
            <div className="group/input">
              <label className="block text-[10px] font-bold text-muted uppercase tracking-[0.2em] mb-2 group-focus-within/input:text-primary transition-colors">
                Email Address
              </label>
              <input 
                className="w-full bg-transparent border-0 border-b border-border px-0 py-3 text-foreground placeholder:text-foreground/20 focus:ring-0 focus:border-primary transition-all duration-300 font-headline tracking-wide uppercase" 
                placeholder="GUARDIAN@TERMINAL.IO" 
                type="email"
              />
            </div>
            {/* Password */}
            <div className="group/input">
              <label className="block text-[10px] font-bold text-muted uppercase tracking-[0.2em] mb-2 group-focus-within/input:text-primary transition-colors">
                Secure Password
              </label>
              <input 
                className="w-full bg-transparent border-0 border-b border-border px-0 py-3 text-foreground placeholder:text-foreground/20 focus:ring-0 focus:border-primary transition-all duration-300 font-headline tracking-wide" 
                placeholder="••••••••••••" 
                type="password"
              />
            </div>
          </div>
          <button 
            className="w-full py-5 bg-primary text-primary-foreground font-headline font-black uppercase tracking-widest rounded-full hover:shadow-[0_0_20px_2px_rgba(191,255,0,0.3)] transition-all duration-300 active:scale-[0.98]" 
            type="submit"
          >
            Create Parent Account
          </button>
          <div className="pt-4 text-center">
            <p className="text-xs text-muted tracking-wide">
              ALREADY REGISTERED? 
              <a className="text-foreground hover:text-primary font-bold ml-1 transition-colors underline decoration-primary/30" href="/login">AUTHENTICATE HERE</a>
            </p>
          </div>
        </form>
      </div>
      {/* Footnote Card */}
      <div className="mt-8 flex items-center justify-between px-2 opacity-50 hover:opacity-100 transition-opacity">
        <span className="text-[9px] font-headline text-muted uppercase tracking-[0.3em]">SEC_LEVEL: 04 // ENCRYPTED</span>
        <span className="text-[9px] font-headline text-muted uppercase tracking-[0.3em]">VERSION: 2.0.4-CYBER</span>
      </div>
    </div>
  );
}
