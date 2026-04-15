import { prisma } from "@/lib/prisma";
import { UserRole, EnrollmentStatus, PaymentStatus } from "@prisma/client";
import { sendAdminEnrollmentNotification, sendOnboardingFlow } from "@/lib/emails/actions";

export interface EnrollmentData {
  // Parent
  parentFullName: string;
  parentEmail: string;
  parentPhone: string;
  relationship: string;
  preferredContact: string;
  cityState: string;
  // Student
  studentFirstName: string;
  studentLastName: string;
  studentDob: string;
  studentAge: string;
  studentGender?: string;
  currentGrade: string;
  schoolName: string;
  techExperience: string;
  // Preferences
  bootcampTrack: string;
  formatPreference: string;
  cohortId?: string;
  sessionPreference: string;
  // Tech Access
  hasComputer: string;
  operatingSystem: string;
  hasInternet: string;
  hasEmail: string;
  // Emergency
  emergencyName: string;
  emergencyPhone: string;
  emergencyRelation: string;
  accommodations?: string;
  medicalConditions?: string;
  // Goals
  studentGoal: string;
  parentExpectation: string;
  referralSource: string;
  // Selection
  planSelection: string;
  promoCode?: string;
}

/**
 * Service to handle the cross-model student enrollment transaction.
 */
export async function processEnrollment(data: EnrollmentData) {
  console.log(`🔷 [Service] Processing enrollment for student ${data.studentFirstName} via parent ${data.parentEmail}`);

  // 1. DATABASE MISSION: Execute everything within an atomic transaction
  const result = await prisma.$transaction(async (tx) => {
    // 1.1 Find or Create Parent User
    let parent = await tx.user.findUnique({
      where: { email: data.parentEmail.toLowerCase() },
    });

    if (!parent) {
      console.log("👤 [Service] Registering new Parent account...");
      parent = await tx.user.create({
        data: {
          name: data.parentFullName,
          email: data.parentEmail.toLowerCase(),
          password: "password123", // Temporary password
          role: UserRole.PARENT,
        },
      });
    }

    // 1.2 Create Student Record
    const student = await tx.student.create({
      data: {
        firstName: data.studentFirstName,
        lastName: data.studentLastName,
        dob: data.studentDob ? new Date(data.studentDob) : null,
        age: parseInt(data.studentAge),
        gender: data.studentGender,
        grade: data.currentGrade,
        school: data.schoolName,
        parentId: parent.id,
        additionalInfo: {
          parentPhone: data.parentPhone,
          relationship: data.relationship,
          preferredContact: data.preferredContact,
          cityState: data.cityState,
          techExperience: data.techExperience,
          formatPreference: data.formatPreference,
          sessionPreference: data.sessionPreference,
          techAccess: {
            hasComputer: data.hasComputer,
            operatingSystem: data.operatingSystem,
            hasInternet: data.hasInternet,
            hasEmail: data.hasEmail,
          },
          emergency: {
            name: data.emergencyName,
            phone: data.emergencyPhone,
            relation: data.emergencyRelation,
          },
          needs: {
            accommodations: data.accommodations,
            medicalConditions: data.medicalConditions,
          },
          intent: {
            studentGoal: data.studentGoal,
            parentExpectation: data.parentExpectation,
            referralSource: data.referralSource,
          },
          selection: {
            plan: data.planSelection,
            promo: data.promoCode,
          }
        },
      },
    });

    // 1.3 Create Enrollment Record
    const enrollment = await tx.enrollment.create({
      data: {
        studentId: student.id,
        cohortId: data.cohortId || "cmld68j2m000008j7c4h7e3p5", // Fallback
        status: EnrollmentStatus.PENDING,
        paymentStatus: PaymentStatus.UNPAID,
      },
    });

    return {
      parentId: parent.id,
      studentId: student.id,
      enrollmentId: enrollment.id,
    };
  }, {
    maxWait: 15000, // Connection acquisition timeout
    timeout: 30000  // Total transaction timeout
  });

  // 2. COMMUNICATION MISSION: Dispatch notifications (Outside DB transaction)
  // This drastically reduces DB holding time and prevents P2028 timeouts
  console.log("📧 [Service] Dispatching mission notifications...");
  try {
    await sendOnboardingFlow(data.parentEmail, data.parentFullName);
    await sendAdminEnrollmentNotification(data);
  } catch (commError) {
    console.warn("⚠️ [Service] Communications dispatched with errors, but enrollment was successful:", commError);
  }

  return result;
}
