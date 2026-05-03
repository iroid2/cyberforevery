"use server";

import { redirect } from "next/navigation";
import { signOut } from "@/auth";

export async function loginUser() {
  redirect("/login");
}

export async function logoutUser() {
  await signOut({ redirectTo: "/login" });
}
