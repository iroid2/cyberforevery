"use server";

import { prisma } from "@/lib/prisma";
import { UserRole } from "@prisma/client";
import { sendOnboardingFlow } from "@/lib/emails/actions";

export async function registerParent(formData: FormData) {
  const name = formData.get("name") as string;
  const email = (formData.get("email") as string).toLowerCase();
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "Missing required fields" };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "This email is already registered." };
    }

    // In a real app, we would hash the password here.
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password, // TODO: Hash password
        role: UserRole.PARENT,
      },
    });

    // Trigger Onboarding Flow (Async - don't block response)
    sendOnboardingFlow(email, name);

    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "An internal error occurred." };
  }
}
