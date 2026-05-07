import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getCourseForLearn, submitQuiz } from "@/app/actions/student";
import { getActiveSessionInstance } from "@/app/actions/sessions";
import { LearnClient } from "./learn-client";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function LearnPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const jar = await cookies();
  const studentId = jar.get(`student_${courseId}`)?.value;

  if (!studentId) redirect(`/attend/${courseId}`);

  const { course, student } = await getCourseForLearn(courseId, studentId);

  if (!course || !student) notFound();

  // Check if student already submitted for the current session
  const activeSession = await getActiveSessionInstance(courseId);

  // If there is an active session, check if student already submitted for it
  if (activeSession) {
    const submissionForActiveSession = await prisma.submission.findFirst({
      where: { studentId, sessionInstanceId: activeSession.id },
    });
    if (submissionForActiveSession) {
      redirect(`/learn/${courseId}/result?sid=${submissionForActiveSession.id}`);
    }
  }

  const activeSessionDate = activeSession
    ? activeSession.date.toISOString().split("T")[0]
    : null;

  return (
    <LearnClient
      courseId={courseId}
      studentId={studentId}
      studentName={student.name}
      courseTitle={course.title}
      subject={course.subject}
      coverImage={(course as { coverImage?: string | null }).coverImage ?? undefined}
      lessons={course.lessons}
      questions={course.questions as { id: string; text: string; options: string[]; order: number }[]}
      initialQuestions={course.sessionQuestions.map((question) => ({
        id: question.id,
        text: question.text,
        resolved: question.resolved,
        createdAt: question.createdAt.toISOString(),
        student: { name: question.student.name },
      }))}
      activeSessionId={activeSession?.id ?? null}
      activeSessionDate={activeSessionDate}
    />
  );
}
