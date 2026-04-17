import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@prisma/client";
import { auth } from "@/auth";
import { issuePasswordSetupToken } from "@/lib/account-setup";
import { sendAdminPromotionEmail } from "@/lib/emails/actions";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const requesterRole = (session?.user as { role?: UserRole } | undefined)?.role;

    if (!session?.user || requesterRole !== UserRole.SUPER_ADMIN) {
      return NextResponse.json(
        {
          success: false,
          error: "Forbidden",
        },
        { status: 403 },
      );
    }

    const body = await req.json();
    const targetEmail = String(body?.email || "").trim().toLowerCase();

    if (!targetEmail) {
      return NextResponse.json(
        {
          success: false,
          error: "Target email is required",
        },
        { status: 400 },
      );
    }

    console.log("[Admin] Promotion triggered for", targetEmail);

    const user = await prisma.user.upsert({
      where: { email: targetEmail },
      update: { role: UserRole.SUPER_ADMIN },
      create: {
        email: targetEmail,
        name: "Director Admin",
        role: UserRole.SUPER_ADMIN,
      },
    });

    const token = await issuePasswordSetupToken(targetEmail);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || "http://localhost:3000";
    const setupUrl = `${appUrl}/set-password?token=${token.rawToken}`;

    await sendAdminPromotionEmail(user.email ?? targetEmail, user.name ?? "Admin", setupUrl);

    return NextResponse.json({
      success: true,
      message: `User ${user.email} has been promoted to SUPER_ADMIN.`,
      role: user.role,
      setupUrl,
    });
  } catch (error: any) {
    console.error("[Admin] Promotion failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    );
  }
}
