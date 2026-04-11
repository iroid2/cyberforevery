import { CourseCard } from "./course-card";
import { courses } from "@/lib/courses-data";

export function Courses() {
  return (
    <section id="courses" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs block mb-4">
            // EDUCATIONAL_ROADMAP
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-foreground font-headline leading-none uppercase">
            Active <br />
            <span className="text-primary italic">Learning Paths</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((track) => (
            <CourseCard key={track.id} {...track} />
          ))}
        </div>
      </div>
    </section>
  );
}
