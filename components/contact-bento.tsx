import React from "react";

export function ContactBento() {
  return (
    <div className="lg:col-span-5 space-y-8">
      {/* Map Card */}
      <div className="bg-surface rounded-lg h-64 relative overflow-hidden group border border-border">
        <img 
          className="w-full h-full object-cover grayscale opacity-40 group-hover:scale-110 transition-transform duration-700" 
          alt="Monochrome satellite city view"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDk_BAMLTgkVe5-vN-EF820fziTCk8Z7oOSR4sTGegoYVa2fPyx8cQhonjhWNa_CbbaWNon_j9uj6u-GTeE8Dc21QfSLvSQb3KCLhiLJsAE2nlrdJonCWrnBamavfL0qN-C5ZCPZhRA23vSzBau1XusGpNbWonKG-DbNMEpdSHrZ1DJ6eY3pbEtYG6se-tpBrMkHXktF9PL_fJGKDfTV2T9aZ3od6ouYQjobFhNLvm77wtSOwGJanMDAZt3CuSn9wEF4A1DN7YZmA" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
        <div className="absolute bottom-6 left-6">
          <div className="text-[10px] font-bold text-primary tracking-[0.3em] uppercase mb-1">// PHYSICAL_LOCALE</div>
          <div className="text-foreground font-headline font-bold text-xl uppercase">Chicago, IL HQ</div>
        </div>
      </div>
      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
        {/* Tech Support */}
        <div className="bg-surface rounded-lg p-6 relative border border-border">
          <div className="text-[10px] font-bold text-muted tracking-[0.2em] mb-4 uppercase">Direct_Link_01</div>
          <h3 className="text-foreground font-bold font-headline mb-1 uppercase">Support_Protocol</h3>
          <p className="text-muted text-sm mb-4">Immediate technical assistance for student portals.</p>
          <a className="text-primary text-sm font-bold border-b border-primary/30 hover:border-primary transition-all" href="mailto:support@cyber4every1.com">support@cyber4every1.com</a>
        </div>
        {/* Admissions */}
        <div className="bg-surface rounded-lg p-6 relative border border-border">
          <div className="text-[10px] font-bold text-muted tracking-[0.2em] mb-4 uppercase">Direct_Link_02</div>
          <h3 className="text-foreground font-bold font-headline mb-1 uppercase">Admissions_Core</h3>
          <p className="text-muted text-sm mb-4">Enrollment queries and curriculum deep-dives.</p>
          <a className="text-primary text-sm font-bold border-b border-primary/30 hover:border-primary transition-all" href="mailto:info@cyber4every1.com">info@cyber4every1.com</a>
        </div>
      </div>
      {/* Social/Community */}
      <div className="bg-surface-variant p-8 rounded-lg border border-border">
        <h3 className="text-foreground font-bold font-headline mb-6 uppercase tracking-widest text-center">Neural_Networks</h3>
        <div className="flex justify-center gap-8">
          <a className="text-muted hover:text-primary transition-colors" href="#">
            <span className="material-symbols-outlined text-3xl">share</span>
          </a>
          <a className="text-muted hover:text-primary transition-colors" href="#">
            <span className="material-symbols-outlined text-3xl">language</span>
          </a>
          <a className="text-muted hover:text-primary transition-colors" href="#">
            <span className="material-symbols-outlined text-3xl">code</span>
          </a>
        </div>
      </div>
    </div>
  );
}
