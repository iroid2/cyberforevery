"use server";

import { processEnrollment, EnrollmentData } from "@/lib/services/enrollment";

export async function enrollStudent(data: EnrollmentData) {
  console.log("🛠️ [Diagnostics] DATABASE_URL present:", !!process.env.DATABASE_URL);
  try {
    const result = await processEnrollment(data);
    return { success: true, data: result };
  } catch (error: any) {
    console.error("🔥 [Actions] Enrollment failure:", error);
    return { success: false, error: error.message };
  }
}
