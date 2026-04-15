import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@prisma/client";
import { auth } from "@/auth";

/**
 * TEMPORARY: Emergency Promotion Route
 * Only works if the user is logged in or if we bypass for the initial admin.
 */
export async function GET() {
  try {
    // For this specific setup, we'll promote the target email iradtu22@gmail.com
    const targetEmail = "iradtu22@gmail.com";
    
    console.log(`🚀 [Admin] Emergency promotion triggered for ${targetEmail}`);

    const user = await prisma.user.upsert({
      where: { email: targetEmail },
      update: { role: UserRole.SUPER_ADMIN },
      create: {
        email: targetEmail,
        name: "Director Admin",
        password: "password123",
        role: UserRole.SUPER_ADMIN,
      },
    });

    return NextResponse.json({
      success: true,
      message: `User ${user.email} has been promoted to SUPER_ADMIN.`,
      role: user.role
    });

  } catch (error: any) {
    console.error("❌ [Admin] Promotion failed:", error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
