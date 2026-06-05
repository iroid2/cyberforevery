import type React from "react";

export const metadata = {
  title: "Cyber4Every1 — Sign In",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
