import Link from "next/link";
import { getTutorCourses } from "@/app/actions/courses";
import { BookOpen, Plus, Radio, Users, HelpCircle, Eye, Trash2 } from "lucide-react";
import { toggleCourseLive, deleteCourse } from "@/app/actions/courses";

export const dynamic = "force-dynamic";

function LiveToggle({ courseId, isLive }: { courseId: string; isLive: boolean }) {
  const action = toggleCourseLive.bind(null, courseId);
  return (
    <form action={action}>
      <button
        type="submit"
        className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
          isLive
            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
        }`}
      >
        {isLive ? "● Live" : "○ Inactive"}
      </button>
    </form>
  );
}

function DeleteButton({ courseId }: { courseId: string }) {
  const action = deleteCourse.bind(null, courseId);
  return (
    <form action={action}>
      <button
        type="submit"
        title="Delete course"
        className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </form>
  );
}

export default async function CoursesPage() {
  const courses = await getTutorCourses();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900">My Courses</h1>
            <p className="text-sm text-slate-500">{courses.length} course{courses.length !== 1 ? "s" : ""} total</p>
          </div>
          <Link
            href="/dashboard/courses/new"
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            New Course
          </Link>
        </div>
      </header>

      <div className="flex-1 p-6">
        {courses.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-24 text-center">
            <BookOpen className="mb-4 h-10 w-10 text-slate-300" />
            <p className="text-base font-semibold text-slate-600">No courses yet</p>
            <p className="mt-1 mb-6 text-sm text-slate-400">Create your first course to get started.</p>
            <Link
              href="/dashboard/courses/new"
              className="flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Create Course
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <th className="px-5 py-3 text-left">Course</th>
                  <th className="px-5 py-3 text-left">Status</th>
                  <th className="px-5 py-3 text-center">Lessons</th>
                  <th className="px-5 py-3 text-center">Questions</th>
                  <th className="px-5 py-3 text-center">Students</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-900">{course.title}</p>
                      <p className="text-xs text-slate-400">{course.subject}</p>
                    </td>
                    <td className="px-5 py-4">
                      <LiveToggle courseId={course.id} isLive={course.isLive} />
                    </td>
                    <td className="px-5 py-4 text-center text-slate-600">
                      {course._count.lessons}
                    </td>
                    <td className="px-5 py-4 text-center text-slate-600">
                      {course._count.questions}
                    </td>
                    <td className="px-5 py-4 text-center text-slate-600">
                      {course._count.students}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/dashboard/courses/${course.id}`}
                          title="Manage"
                          className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/dashboard/courses/${course.id}/results`}
                          title="Results"
                          className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                        >
                          <HelpCircle className="h-4 w-4" />
                        </Link>
                        <DeleteButton courseId={course.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
