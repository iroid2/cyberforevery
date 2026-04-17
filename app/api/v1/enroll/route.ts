import { NextResponse } from "next/server";
import { processEnrollment, EnrollmentData } from "@/lib/services/enrollment";
import { enrollmentSchema } from "@/lib/validation/enrollment";
import { checkRateLimit } from "@/lib/security/rate-limit";

export async function POST(req: Request) {
  try {
    const forwardedFor = req.headers.get("x-forwarded-for") || "unknown";
    const rateLimit = checkRateLimit(`enroll:${forwardedFor}`, 10, 60_000);

    if (!rateLimit.allowed) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const apiKey = req.headers.get("x-api-key");
    if (apiKey !== process.env.ENROLLMENT_API_KEY) {
      console.warn("[API] Unauthorized enrollment attempt (Invalid API Key)");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = enrollmentSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        {
          error: "Validation Failed",
          details: validatedData.error.format(),
        },
        { status: 400 },
      );
    }

    const enrollmentData = validatedData.data as EnrollmentData;
    const result = await processEnrollment(enrollmentData);

    console.log("[API] Enrollment successful for student:", enrollmentData.studentFirstName);

    return NextResponse.json(
      {
        success: true,
        message: "Enrollment dossier created. Welcome to Cyber4Every1.",
        data: result,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("[API] Enrollment error:", error);
    return NextResponse.json(
      {
        error: "System error during enrollment processing",
      },
      { status: 500 },
    );
  }
}
