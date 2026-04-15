"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TopNavBar } from "@/components/top-nav-bar";
import AnimatedWaveFooter from "@/components/animated-wave-footer";
import { SocialAuth } from "@/components/social-auth";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email: email.toLowerCase(),
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid credentials. Access Denied.");
      } else {
        toast.success("AUTHENTICATION_SUCCESSFUL // WELCOME BACK, AGENT");
        router.push("/dashboard");
      }
    } catch (err) {
      setError("System malfunction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      <TopNavBar />
      
      <main className="flex-grow flex items-center justify-center px-6 py-32 relative z-10">
        <div className="w-full max-w-md">
          <div className="bg-surface/60 backdrop-blur-xl rounded-lg p-10 border border-border shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent opacity-50"></div>
            
            <div className="mb-8">
              <h2 className="font-headline text-3xl font-bold text-foreground tracking-tight uppercase tracking-tighter">AUTHENTICATE</h2>
              <p className="text-muted text-xs font-headline tracking-widest uppercase mt-1">// ENTRY_POINT_01</p>
            </div>

            {error && (
              <div className="bg-destructive/20 border border-destructive/50 text-destructive text-xs p-4 rounded mb-6 font-mono">
                [ERROR]: {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="group/input">
                <label className="block text-[10px] font-bold text-muted uppercase tracking-[0.2em] mb-2 group-focus-within/input:text-primary transition-colors">
                  IDENTIFIER (EMAIL)
                </label>
                <input 
                  className="w-full bg-transparent border-0 border-b border-border px-0 py-3 text-foreground placeholder:text-foreground/20 focus:ring-0 focus:border-primary transition-all duration-300 font-headline tracking-wide" 
                  placeholder="AGENT@CYBER.COM" 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="group/input">
                <label className="block text-[10px] font-bold text-muted uppercase tracking-[0.2em] mb-2 group-focus-within/input:text-primary transition-colors">
                  SECURE TOKEN (PASSWORD)
                </label>
                <input 
                  className="w-full bg-transparent border-0 border-b border-border px-0 py-3 text-foreground placeholder:text-foreground/20 focus:ring-0 focus:border-primary transition-all duration-300 font-headline tracking-wide" 
                  placeholder="••••••••••••" 
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button 
                className="w-full py-5 bg-primary text-primary-foreground font-headline font-black uppercase tracking-widest rounded-full hover:shadow-[0_0_20px_2px_rgba(191,255,0,0.3)] transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2" 
                type="submit"
                disabled={loading}
              >
                {loading ? "INITIALIZING..." : "LOG INTO SYSTEMS"}
                {!loading && <span className="material-symbols-outlined text-xl">login</span>}
              </button>
            </form>

            <SocialAuth />

            <div className="pt-8 text-center">
              <p className="text-xs text-muted tracking-wide">
                NEW AGENT? 
                <a className="text-foreground hover:text-primary font-bold ml-1 transition-colors underline decoration-primary/30" href="/register">ENROLL HERE</a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <AnimatedWaveFooter />
    </div>
  );
}
