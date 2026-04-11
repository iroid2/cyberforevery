import React from "react";

export function RegisterContent() {
  return (
    <div className="hidden lg:block space-y-8">
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-variant rounded-full">
        <div className="w-2 h-2 bg-primary rounded-full"></div>
        <span className="text-[10px] tracking-[0.2em] font-headline font-bold text-primary uppercase">
          // SYSTEM_READY
        </span>
      </div>
      <h1 className="font-headline text-7xl font-bold tracking-tighter leading-none text-foreground">
        IGNITE THEIR <br />
        <span className="text-primary italic">POTENTIAL.</span>
      </h1>
      <p className="text-muted max-w-md font-body text-lg leading-relaxed">
        Join the elite network of parents accelerating their teen's technical mastery through the cyber4every1 ecosystem.
      </p>
      <div className="flex flex-col gap-6 pt-8">
        <div className="flex items-start gap-4">
          <span className="material-symbols-outlined text-primary mt-1">verified_user</span>
          <div>
            <p className="font-headline font-bold text-foreground uppercase text-sm tracking-widest">Secure Guardian Portal</p>
            <p className="text-muted text-sm">Full transparency into learning velocity and milestone achievements.</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <span className="material-symbols-outlined text-primary mt-1">bolt</span>
          <div>
            <p className="font-headline font-bold text-foreground uppercase text-sm tracking-widest">Rapid Onboarding</p>
            <p className="text-muted text-sm">Deploy educational environments in seconds for your students.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
