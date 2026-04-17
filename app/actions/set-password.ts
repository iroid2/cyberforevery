"use server";

import { prisma } from "@/lib/prisma";
import { consumePasswordSetupToken } from "@/lib/account-setup";
import { hashPassword } from "@/lib/security/password";
import { passwordSetupSchema } from "@/lib/validation/auth";

export async function setPassword(formData: FormData) {
  const parsed = passwordSetupSchema.safeParse({
    token: formData.get("token"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    const message = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0] ?? "Invalid request";
    return { success: false, error: message };
  }

  const email = await consumePasswordSetupToken(parsed.data.token);

  if (!email) {
    return { success: false, error: "This setup link is invalid or has expired." };
  }

  const password = await hashPassword(parsed.data.password);

  await prisma.user.update({
    where: { email },
    data: {
      password,
      emailVerified: new Date(),
    },
  });

  return { success: true };
}
