"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function AnimatedWaveFooter() {
  return (
    <footer className="relative bg-gradient-to-b from-background to-primary/10 pt-20 border-t border-border">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 h-[500px] w-[1800px] animate-wave">
          <svg
            className="h-full w-full"
            viewBox="0 0 1800 500"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 250C200 150 400 50 600 100C800 150 1000 350 1200 300C1400 250 1600 150 1800 250V500H0V250Z"
              fill="currentColor"
              className="text-primary/5"
            />
            <path
              d="M0 250C200 200 400 100 600 150C800 200 1000 350 1200 300C1400 250 1600 200 1800 250V500H0V250Z"
              fill="currentColor"
              className="text-primary/10"
            />
          </svg>
        </div>
      </div>
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="mb-4 text-2xl font-bold font-headline uppercase text-foreground">Stay Connected</h2>
            <form className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email" className="text-muted text-xs tracking-widest uppercase">Email Data-Stream</Label>
                <Input
                  id="email"
                  placeholder="Enter your transmission address..."
                  type="email"
                  className="bg-surface/50 backdrop-blur-sm border-border text-foreground focus-visible:ring-primary"
                />
              </div>
              <Button type="submit" className="w-full bg-primary text-primary-foreground font-bold hover:scale-[1.02] transition-transform">
                Initiate Link
              </Button>
            </form>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold font-headline uppercase text-primary tracking-widest">Sector Maps</h3>
            <nav className="space-y-2 text-sm font-medium">
              <a
                href="#"
                className="block text-muted transition-colors hover:text-primary"
              >
                // HOME
              </a>
              <a
                href="#"
                className="block text-muted transition-colors hover:text-primary"
              >
                // MISSIONS
              </a>
              <a
                href="#"
                className="block text-muted transition-colors hover:text-primary"
              >
                // ABOUT BASE
              </a>
              <a
                href="#"
                className="block text-muted transition-colors hover:text-primary"
              >
                // CONTACT HUD
              </a>
            </nav>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold font-headline uppercase text-primary tracking-widest">Comm Relay</h3>
            <address className="space-y-2 text-sm not-italic text-muted">
              <p>Chicago, Illinois</p>
              <p>Cyber City, CC 10101</p>
              <p>call : +1 (312) 468-3844 </p>
              <p>Email: ivan@cyberforevery.com</p>
            </address>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold font-headline uppercase text-primary tracking-widest">Network Nodes</h3>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full bg-surface border border-border text-muted hover:text-primary hover:border-primary transition-colors">
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full bg-surface border border-border text-muted hover:text-primary hover:border-primary transition-colors">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full bg-surface border border-border text-muted hover:text-primary hover:border-primary transition-colors">
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full bg-surface border border-border text-muted hover:text-primary hover:border-primary transition-colors">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 pb-8 text-center">
          <p className="text-sm text-muted font-mono">
            // © 2026 CYBERFOREVERY. ALL SYSTEMS NOMINAL. //
          </p>
        </div>
      </div>
      <style jsx>{`
        @keyframes wave {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-wave {
          animation: wave 15s linear infinite;
        }
      `}</style>
    </footer>
  );
}
