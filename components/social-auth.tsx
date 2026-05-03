"use client";

export function SocialAuth() {
  return (
    <div className="space-y-6 mt-10">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border/50"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-4 text-muted font-headline tracking-[0.3em]">
            CREDENTIALS_ONLY
          </span>
        </div>
      </div>

      <p className="rounded-xl border border-border/50 bg-surface/40 px-4 py-3 text-xs text-muted">
        Social login is disabled in this build. Use your email and password to sign in.
      </p>
    </div>
  );
}
