import type React from "react";
import { TopNavBar } from "@/components/top-nav-bar";

export default function FrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopNavBar />
      {children}
    </>
  );
}
