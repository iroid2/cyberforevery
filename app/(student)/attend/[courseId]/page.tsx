import { notFound } from "next/navigation";
import { getCourseForJoin, joinCourse } from "@/app/actions/student";
import { BookOpen, GraduationCap, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function JoinCoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = await getCourseForJoin(courseId);
  if (!course) notFound();

  const action = joinCourse.bind(null, courseId);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md">
        <Link
          href="/attend"
          className="mb-6 flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to sessions
        </Link>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          {/* Course info */}
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">{course.title}</h1>
              <p className="text-sm text-slate-500">
                {course.subject} · by {course.tutor.name ?? "Tutor"}
              </p>
            </div>
          </div>

          <form action={action} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Your name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoFocus
                placeholder="Enter your full name"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-emerald-600 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 active:scale-[0.98]"
            >
              Join Session
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-xs text-slate-400">
          No account needed — just your name.
        </p>
      </div>
    </div>
  );
}
