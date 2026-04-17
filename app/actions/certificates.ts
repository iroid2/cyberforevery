"use server";

import { revalidatePath } from "next/cache";
import { UserRole } from "@prisma/client";
import { auth } from "@/auth";
import { issueCertificateForEnrollment } from "@/lib/services/certificates";

export async function issueCertificateAction(formData: FormData) {
  const session = await auth();
  const role = (session?.user as { role?: UserRole } | undefined)?.role;

  if (
    !session?.user?.id ||
    (role !== UserRole.SUPER_ADMIN && role !== UserRole.ADMIN_STAFF && role !== UserRole.INSTRUCTOR)
  ) {
    return;
  }

  const enrollmentId = String(formData.get("enrollmentId") || "");

  if (!enrollmentId) {
    return;
  }

  await issueCertificateForEnrollment(enrollmentId, session.user.id);

  revalidatePath("/dashboard/enrollments");
  revalidatePath("/dashboard/certificates");
  revalidatePath("/dashboard/progress");
}
