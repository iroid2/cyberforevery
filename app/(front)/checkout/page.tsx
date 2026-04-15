import React from "react";
import { TopNavBar } from "@/components/top-nav-bar";
import { MainFooter } from "@/components/main-footer";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <TopNavBar />
      
      <main className="pt-32 md:pt-48 pb-24 px-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-12 md:mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-[2px] bg-primary"></span>
            <span className="text-primary font-headline text-sm tracking-[0.3em] uppercase">Secure Checkout</span>
          </div>
          <h1 className="font-headline text-4xl md:text-7xl font-black tracking-tighter leading-none uppercase">
            FINALIZE <span className="text-transparent" style={{ WebkitTextStroke: "1px var(--primary)" }}>DEPLOYMENT</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Left Column: Order Summary */}
          <div className="lg:col-span-5 space-y-8">
            <section className="bg-surface rounded-xl p-8 relative overflow-hidden border border-border">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="material-symbols-outlined text-9xl">shield_person</span>
              </div>
              <div className="relative z-10">
                <p className="text-muted font-label text-xs uppercase tracking-widest mb-6">// SELECTION_ID: 088-EP</p>
                <h2 className="text-3xl font-headline font-bold mb-2 uppercase tracking-tight">Elite Operator</h2>
                <p className="text-muted text-sm mb-8 max-w-xs leading-relaxed">Full access to advanced offensive security modules, lab environments, and 1-on-1 mentorship.</p>
                
                <div className="space-y-4 border-t-2 border-primary/10 pt-8">
                  <div className="flex justify-between items-center">
                    <span className="text-muted font-label uppercase text-xs tracking-widest">Program Fee</span>
                    <span className="text-foreground font-headline font-bold">$2,499.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted font-label uppercase text-xs tracking-widest">Cloud Lab Access</span>
                    <span className="text-primary font-headline font-bold text-xs italic">INCLUDED</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted font-label uppercase text-xs tracking-widest">Certification Exam</span>
                    <span className="text-primary font-headline font-bold text-xs italic">INCLUDED</span>
                  </div>
                  
                  <div className="pt-4 mt-4 border-t-2 border-primary/10 flex justify-between items-end">
                    <span className="text-primary font-headline font-black text-xl uppercase italic">Total Due</span>
                    <div className="text-right">
                      <span className="block text-muted text-[10px] uppercase tracking-tighter font-bold font-headline mb-1">Encrypted Payment</span>
                      <span className="text-4xl font-headline font-black text-primary tracking-tighter">$2,499.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-surface border border-border">
                <div className="bg-primary/10 p-3 rounded-full">
                  <span className="material-symbols-outlined text-primary">lock</span>
                </div>
                <div>
                  <p className="text-foreground font-bold text-sm">256-Bit SSL Encryption</p>
                  <p className="text-muted text-xs">Your data is secured by industry-leading protocols.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-lg bg-surface border border-border">
                <div className="bg-primary/10 p-3 rounded-full">
                  <span className="material-symbols-outlined text-primary">verified_user</span>
                </div>
                <div>
                  <p className="text-foreground font-bold text-sm">PCI-DSS Compliant</p>
                  <p className="text-muted text-xs">Secure transaction handling via certified gateways.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Payment Form */}
          <div className="lg:col-span-7 bg-surface p-6 md:p-12 rounded-xl shadow-2xl relative border border-border mt-8 lg:mt-0">
            <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-primary hidden md:block"></div>
            <form className="space-y-6 md:space-y-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-headline text-2xl font-bold uppercase tracking-tight text-foreground">Payment Method</h3>
                <div className="flex gap-2">
                  <span className="material-symbols-outlined text-muted hover:text-primary cursor-default transition-colors">credit_card</span>
                  <span className="material-symbols-outlined text-muted hover:text-primary cursor-default transition-colors">account_balance_wallet</span>
                </div>
              </div>

              {/* Input Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-[10px] text-muted uppercase tracking-[0.2em] font-bold">Cardholder Name</label>
                  <input 
                    className="w-full bg-transparent border-0 border-b border-border focus:ring-0 focus:border-primary text-foreground font-headline tracking-widest placeholder:text-foreground/10 uppercase transition-all duration-300 py-2" 
                    placeholder="JACKSON R. CYBER" 
                    type="text"
                  />
                </div>
                <div className="space-y-2 md:col-span-2 relative">
                  <label className="block text-[10px] text-muted uppercase tracking-[0.2em] font-bold">Card Number</label>
                  <input 
                    className="w-full bg-transparent border-0 border-b border-border focus:ring-0 focus:border-primary text-foreground font-headline tracking-widest placeholder:text-foreground/10 transition-all duration-300 py-2" 
                    placeholder="0000 0000 0000 0000" 
                    type="text"
                  />
                  <div className="absolute right-0 bottom-2 flex gap-2">
                    <span className="material-symbols-outlined text-foreground/10 text-xl">contactless</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] text-muted uppercase tracking-[0.2em] font-bold">Expiry Date</label>
                  <input 
                    className="w-full bg-transparent border-0 border-b border-border focus:ring-0 focus:border-primary text-foreground font-headline tracking-widest placeholder:text-foreground/10 transition-all duration-300 py-2" 
                    placeholder="MM/YY" 
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] text-muted uppercase tracking-[0.2em] font-bold">CVV Code</label>
                  <input 
                    className="w-full bg-transparent border-0 border-b border-border focus:ring-0 focus:border-primary text-foreground font-headline tracking-widest placeholder:text-foreground/10 transition-all duration-300 py-2" 
                    placeholder="***" 
                    type="password"
                  />
                </div>
              </div>

              <div className="pt-8">
                <label className="flex items-start gap-4 cursor-pointer group">
                  <div className="relative flex items-center mt-1">
                    <input className="w-5 h-5 rounded-none bg-transparent border-2 border-border text-primary focus:ring-0 focus:ring-offset-0 transition-colors" type="checkbox"/>
                  </div>
                  <span className="text-xs text-muted leading-relaxed group-hover:text-foreground transition-colors">
                    I confirm that I have read and agree to the <a className="text-primary hover:underline" href="#">cyber4every1 Terms of Service</a> and the Admission Agreement for the Elite Operator program. I authorize the transaction amount listed.
                  </span>
                </label>
              </div>

              <div className="pt-4">
                <button 
                  className="w-full bg-primary text-primary-foreground py-5 rounded-full font-headline font-black text-lg uppercase tracking-[0.2em] hover:shadow-[0_0_30px_rgba(191,255,0,0.3)] hover:scale-[1.02] active:scale-95 transition-all duration-300 group" 
                  type="button"
                >
                  <span className="flex items-center justify-center gap-3">
                    AUTHORIZE PAYMENT
                    <span className="material-symbols-outlined font-bold group-hover:translate-x-2 transition-transform">bolt</span>
                  </span>
                </button>
              </div>

              <div className="flex justify-center items-center gap-6 pt-4 opacity-20">
                <span className="material-symbols-outlined text-4xl text-foreground">payments</span>
                <span className="material-symbols-outlined text-4xl text-foreground">security</span>
                <span className="material-symbols-outlined text-4xl text-foreground">hub</span>
              </div>
            </form>
          </div>
        </div>

        {/* Featured Visual Element */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { tag: "SECURE_CORE", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZzHafO5vEawEk-YRfgmGPRzBRUP9EroFOa_RehucVJRUDfdF1G5BvxJjFiSyZ9PdLcq797REEgiLpw71g0oGbjWMaV-ENQ4pW26qU_XyCuwMq2SRVKfhovMDmWIda2xM6EN27SazuMCXBdlXvt9PChTxjhkQqAy2y6DwYnKvdy_NZGM2-V4oNNdyHHTOp2PR2ghqqubruypiuaAztcg47a8EElruXk1GebIYhZ-tTxMhYB4dDrIFeyA0ek0X190Cobb1dqhdehg" },
            { tag: "ENCRYPTED_PATH", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQMj_Kib8MMtNsl3hvL88kTL45yqiDuNh2GHBs14jeDe-faT6Axfk0E8TbFAaEVNSgz0Otoh-N4iAyRdkjLu2XOf3hzu4cKFv1-VKqE2ldMG7s_kmEzmvds2cO_ogcJK_adf20_sLZ6foBe2d03x3cnLXH_73JYnGEjToDJ1_NYtRjPMfpqGJOro9FoFdRoTqIxFRixjBRRxbCtwLVNJSAL1BkO_z7LAWSyhFAoHmo3sLgnxt_uoOsushuHEAokGL0ViNRi6ncYQ" },
            { tag: "VERIFIED_NODE", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9By-RsO02gSwYwVwHsH_w_c5vCFFKukwHUo6nbOkm1q8bdgdiYQ2p8bs2jOKYp6O_f4nf_eLiGs9DaiIfGfgcGF3BSgk3vVU35dWepDeihsF1Z7KWl3wa2A-ZzjcsMLniQ5HX7NG-NEP1y1qUXJCsQ64-P1kog3yhZg4iB5ShVNTL3UGZ9ejof1bZrX1IFdLW9sX2ZYkG4kyJ6NOKAaNocWNELzXo2B3e6MBzNdhXoAnjV4bNAcg_aPVlezUllxSvQmsuOR9wrg" }
          ].map((item, i) => (
            <div key={i} className="relative h-48 rounded-2xl overflow-hidden group border border-border">
              <img src={item.img} alt={item.tag} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80"></div>
              <div className="absolute bottom-4 left-4">
                <p className="font-headline font-bold text-sm tracking-widest text-primary uppercase">{item.tag}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <MainFooter />
    </div>
  );
}
