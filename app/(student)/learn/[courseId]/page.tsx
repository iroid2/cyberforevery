import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getCourseForLearn } from "@/app/actions/student";
import { LearnClient } from "./learn-client";

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

  if (student.submission) {
    redirect(`/learn/${courseId}/result?sid=${student.submission.id}`);
  }

  return (
    <LearnClient
      courseId={courseId}
      studentId={studentId}
      studentName={student.name}
      courseTitle={course.title}
      subject={course.subject}
      lessons={course.lessons}
      questions={course.questions as { id: string; text: string; options: string[]; order: number }[]}
      initialQuestions={course.sessionQuestions.map((question) => ({
        id: question.id,
        text: question.text,
        resolved: question.resolved,
        createdAt: question.createdAt.toISOString(),
        student: { name: question.student.name },
      }))}
    />
  );
}
