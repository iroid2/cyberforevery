import { NextResponse } from 'next/server';
import { processEnrollment, EnrollmentData } from '@/lib/services/enrollment';
import * as z from 'zod';

// Validation Schema for the Enrollment API
const enrollmentSchema = z.object({
  parentFullName: z.string().min(2),
  parentEmail: z.string().email(),
  parentPhone: z.string().min(10),
  relationship: z.string().min(1),
  preferredContact: z.string().min(1),
  cityState: z.string().min(2),
  studentFirstName: z.string().min(2),
  studentLastName: z.string().min(2),
  studentDob: z.string().min(1),
  studentAge: z.string().min(1),
  studentGender: z.string().optional(),
  currentGrade: z.string().min(1),
  schoolName: z.string().min(2),
  techExperience: z.string().min(1),
  bootcampTrack: z.string().min(1),
  formatPreference: z.string().min(1),
  cohortDate: z.string().optional(), // We'll map this if provided
  sessionPreference: z.string().min(1),
  hasComputer: z.string().min(1),
  operatingSystem: z.string().min(1),
  hasInternet: z.string().min(1),
  hasEmail: z.string().min(1),
  emergencyName: z.string().min(2),
  emergencyPhone: z.string().min(10),
  emergencyRelation: z.string().min(1),
  accommodations: z.string().optional(),
  medicalConditions: z.string().optional(),
  studentGoal: z.string().min(10),
  parentExpectation: z.string().min(10),
  referralSource: z.string().min(1),
  planSelection: z.string().min(1),
  promoCode: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    // 1. Security Check
    const apiKey = req.headers.get('x-api-key');
    if (apiKey !== process.env.ENROLLMENT_API_KEY) {
      console.warn("🔐 [API] Unauthorized enrollment attempt (Invalid API Key)");
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Body Parsing & Validation
    const body = await req.json();
    const validatedData = enrollmentSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json({ 
        error: 'Validation Failed', 
        details: validatedData.error.format() 
      }, { status: 400 });
    }

    // 3. Process Enrollment via Service
    const enrollmentData = validatedData.data as EnrollmentData;
    const result = await processEnrollment(enrollmentData);

    console.log("✅ [API] Enrollment successful for student:", enrollmentData.studentFirstName);

    return NextResponse.json({
      success: true,
      message: 'Enrollment dossier created. Welcome to Cyber4Every1.',
      data: result
    }, { status: 201 });

  } catch (error: any) {
    console.error("🔥 [API] Enrollment error:", error);
    return NextResponse.json({ 
      error: 'System error during enrollment processing', 
      details: error.message 
    }, { status: 500 });
  }
}
