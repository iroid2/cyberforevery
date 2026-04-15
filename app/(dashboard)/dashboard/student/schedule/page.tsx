import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { PaymentStatus } from "@prisma/client";
import { redirect } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import CheckoutButton from "@/components/checkout-button";

export default async function ParentDashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const parentId = (session.user as any).id;

  // Fetch all students and their enrollments for this parent
  const students = await prisma.student.findMany({
    where: { parentId },
    include: {
      enrollments: {
        include: {
          cohort: {
            include: {
              course: true
            }
          }
        }
      }
    }
  });

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-end border-b border-border pb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-black font-headline uppercase tracking-tighter text-foreground mb-2">
            MISSION <span className="text-primary italic">CONTROL</span>
          </h1>
          <p className="text-muted text-[10px] md:text-sm font-headline tracking-widest uppercase">
            PARENT_TERMINAL: {session.user.name} // SYSTEM_STATUS: ONLINE
          </p>
        </div>
      </div>

      {students.length === 0 ? (
        <div className="p-20 text-center bg-surface/30 border border-border border-dashed rounded-3xl">
          <p className="text-muted uppercase tracking-[0.3em] font-headline">No students found in your roster.</p>
        </div>
      ) : (
        <div className="grid gap-8">
          {students.map((student) => (
            <div key={student.id} className="bg-surface/40 backdrop-blur-xl border border-border rounded-3xl p-6 md:p-8 overflow-hidden relative">
              <div className="flex flex-col gap-8 items-start relative z-10">
                {/* Student Avatar/Info */}
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center border-2 border-primary/50 shadow-[0_0_15px_rgba(191,255,0,0.2)]">
                    <span className="font-black text-primary text-xl uppercase">
                      {student.firstName[0]}{student.lastName[0]}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground font-headline uppercase tracking-tight">{student.firstName} {student.lastName}</h3>
                    <p className="text-muted text-[10px] uppercase tracking-[0.2em]">GRADE_{student.grade} // {student.school}</p>
                  </div>
                </div>

                {/* Enrollment Card */}
                <div className="w-full space-y-6">
                  {student.enrollments.map((enrollment) => {
                    const isPaid = enrollment.paymentStatus === PaymentStatus.PAID;
                    
                    return (
                      <div key={enrollment.id} className="bg-foreground/5 rounded-2xl p-6 border border-foreground/10 flex flex-col md:flex-row justify-between items-center gap-6 group hover:border-primary/30 transition-colors">
                        <div className="flex items-center gap-6 text-left w-full">
                          <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 border border-border">
                            <Image 
                              src={enrollment.cohort.course.image || "/placeholder.jpg"} 
                              alt="Course" 
                              fill 
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-black text-lg uppercase font-headline tracking-tight">{enrollment.cohort.course.title}</h4>
                            <p className="text-muted text-[10px] uppercase tracking-widest">{enrollment.cohort.name}</p>
                            <div className="flex gap-4 mt-3">
                              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                isPaid ? "bg-primary/20 text-primary border border-primary/40" : "bg-red-500/20 text-red-500 border border-red-500/40"
                              }`}>
                                {enrollment.paymentStatus}
                              </span>
                              <span className="px-4 py-1.5 rounded-full bg-foreground/10 text-muted-foreground text-[10px] font-black uppercase tracking-widest border border-border">
                                {enrollment.status}
                              </span>
                            </div>
                          </div>
                        </div>

                        {!isPaid ? (
                          <div className="w-full md:w-auto">
                            <CheckoutButton enrollmentId={enrollment.id} />
                          </div>
                        ) : (
                          <div className="flex items-center gap-3 text-primary bg-primary/10 px-8 py-4 rounded-full border border-primary/30 shadow-[0_0_20px_rgba(191,255,0,0.1)]">
                            <CheckCircle2 className="w-5 h-5" />
                            <span className="font-black uppercase tracking-widest text-xs">Access Granted</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Decorative Tech Grid */}
              <div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none">
                <div className="w-full h-full border-r border-b border-foreground/20 grid grid-cols-4 grid-rows-4">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className="border border-foreground/10" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
