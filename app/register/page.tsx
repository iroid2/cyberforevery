import React from "react";
import { TopNavBar } from "@/components/top-nav-bar";
import { RegisterContent } from "@/components/register-content";
import { RegisterFormCard } from "@/components/register-form-card";
import { MainFooter } from "@/components/main-footer";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      {/* Background Accents */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]"></div>
      
      <TopNavBar />

      <main className="flex-grow flex items-center justify-center px-6 py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl w-full items-center">
          <RegisterContent />
          <RegisterFormCard />
        </div>
      </main>

      <MainFooter />
    </div>
  );
}
