"use client";

import { CreditCard } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function CheckoutButton({ enrollmentId }: { enrollmentId: string }) {
  const [isPending, setIsPending] = useState(false);

  const handlePay = async () => {
    setIsPending(true);
    try {
      const resp = await fetch("/api/v1/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enrollmentId })
      });
      
      const data = await resp.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.error || "System failure initializing checkout");
      }
    } catch (e) {
      toast.error("Network error: Failed to connect to terminal");
      console.error(e);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <button 
      onClick={handlePay}
      disabled={isPending}
      className={`w-full md:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-full font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(191,255,0,0.3)] flex items-center justify-center gap-3 group ${
        isPending ? "opacity-50 cursor-not-allowed" : "hover:scale-105 active:scale-95"
      }`}
    >
      <CreditCard className={`w-5 h-5 ${isPending ? "animate-pulse" : "group-hover:rotate-12 transition-transform"}`} />
      {isPending ? "INITIALIZING..." : "Secure Student Seat"}
    </button>
  );
}
