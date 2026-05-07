"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/security/password";

async function requireAuth() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  return session.user.id;
}

export async function updateProfile(formData: FormData) {
  const userId = await requireAuth();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) throw new Error("Name is required");

  await prisma.user.update({ where: { id: userId }, data: { name } });
  revalidatePath("/dashboard/profile");
}

export async function changePassword(formData: FormData) {
  const userId = await requireAuth();
  const current = String(formData.get("current") ?? "");
  const next = String(formData.get("next") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (!current || !next || !confirm) throw new Error("All fields are required");
  if (next.length < 8) throw new Error("New password must be at least 8 characters");
  if (next !== confirm) throw new Error("Passwords do not match");

  const user = await prisma.user.findUnique({ where: { id: userId }, select: { password: true } });
  const valid = await verifyPassword(current, user?.password);
  if (!valid) throw new Error("Current password is incorrect");

  const hashed = await hashPassword(next);
  await prisma.user.update({ where: { id: userId }, data: { password: hashed } });
  revalidatePath("/dashboard/change-password");
}
