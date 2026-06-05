import type React from "react";
import Navbar from "@/components/top-nav-bar";
import Footer from "@/components/footer";

export default function FrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
