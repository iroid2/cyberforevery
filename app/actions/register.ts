"use server";

import { prisma } from "@/lib/prisma";
import { UserRole } from "@prisma/client";
import { sendOnboardingFlow } from "@/lib/emails/actions";
import { hashPassword } from "@/lib/security/password";
import { registerParentSchema } from "@/lib/validation/auth";

export async function registerParent(formData: FormData) {
  const parsed = registerParentSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    const fieldError = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
    return { error: fieldError ?? "Missing required fields" };
  }

  const { name, email, password } = parsed.data;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "This email is already registered." };
    }

    const hashedPassword = await hashPassword(password);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: UserRole.PARENT,
      },
    });

    void sendOnboardingFlow(email, name);

    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "An internal error occurred." };
  }
}
