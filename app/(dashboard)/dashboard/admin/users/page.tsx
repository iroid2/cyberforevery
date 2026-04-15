import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { Users, CreditCard, Layers, Activity, Search, Filter } from "lucide-react";

export default async function AdminUsersDashboardPage() {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== UserRole.SUPER_ADMIN) {
    redirect("/dashboard");
  }

  // Fetch all enrollments for admin oversight
  const enrollments = await prisma.enrollment.findMany({
    include: {
      student: {
        include: {
          parent: true
        }
      },
      cohort: {
        include: {
          course: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  const totalRevenue = enrollments
    .filter(e => e.paymentStatus === "PAID")
    .length * 199; // Placeholder for simple report

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 max-w-[1600px] mx-auto overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-border pb-8">
        <div>
          <h1 className="text-4xl md:text-6xl font-black font-headline uppercase tracking-tighter text-foreground mb-2">
            COMMAND <span className="text-primary italic">CENTER</span>
          </h1>
          <p className="text-muted text-[10px] md:text-sm font-headline tracking-widest uppercase">
            OPERATOR: {session.user.name} // CLEARANCE: OMEGA_LEVEL
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-auto">
          <StatCard icon={<Users className="w-4 h-4" />} label="Total Agents" value={enrollments.length.toString()} />
          <StatCard icon={<CreditCard className="w-4 h-4 text-primary" />} label="Revenue" value={`$${totalRevenue}`} />
          <StatCard icon={<Activity className="w-4 h-4 text-blue-500" />} label="Active" value={enrollments.filter(e => e.status === 'ACCEPTED').length.toString()} />
          <StatCard icon={<Layers className="w-4 h-4 text-orange-500" />} label="Pending" value={enrollments.filter(e => e.status === 'PENDING').length.toString()} />
        </div>
      </div>

      {/* Main Intel Table */}
      <div className="bg-surface/40 backdrop-blur-xl border border-border rounded-[2rem] overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-border flex justify-between items-center bg-foreground/5">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-bold font-headline uppercase italic">Recruit_Database</h3>
            <span className="text-[10px] text-muted-foreground uppercase mono tracking-[0.3em]">v4.0.2</span>
          </div>
          <div className="flex gap-2">
             <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input className="bg-background/50 border border-border rounded-full py-2 pl-10 pr-4 text-xs focus:ring-1 focus:ring-primary outline-none min-w-[240px]" placeholder="Search Agent Dossiers..." />
             </div>
             <button className="p-2 bg-foreground/5 border border-border rounded-lg hover:bg-foreground/10 transition-colors">
                <Filter className="w-4 h-4" />
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-foreground/5 text-[10px] font-black uppercase tracking-[0.2em] text-muted border-b border-border">
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Parent / Contact</th>
                <th className="px-6 py-4">Course / Cohort</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4 text-right">Ops</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {enrollments.map((e) => (
                <tr key={e.id} className="hover:bg-primary/5 transition-all group cursor-pointer">
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                      e.status === 'ACCEPTED' ? "bg-primary/20 text-primary border border-primary/40" : "bg-orange-500/20 text-orange-500 border border-orange-500/40"
                    }`}>
                      {e.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-foreground/10 flex items-center justify-center text-[10px] font-bold border border-border">
                        {e.student.firstName[0]}{e.student.lastName[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground font-headline uppercase tracking-tight">{e.student.firstName} {e.student.lastName}</p>
                        <p className="text-[10px] text-muted italic">Grade {e.student.grade}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-foreground">{e.student.parent.name}</p>
                    <p className="text-[10px] text-muted lowercase">{e.student.parent.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-foreground font-headline uppercase">{e.cohort.course.title}</p>
                    <p className="text-[10px] text-muted uppercase tracking-tighter">{e.cohort.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-black italic uppercase ${
                      e.paymentStatus === 'PAID' ? "text-primary shadow-[0_0_10px_rgba(191,255,0,0.2)]" : "text-red-500"
                    }`}>
                      // {e.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[10px] font-black uppercase text-muted hover:text-primary transition-colors border border-border px-3 py-1 rounded-lg">
                      View_Dossier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="bg-surface/30 border border-border rounded-2xl p-4 flex flex-col gap-1 items-start min-w-[120px]">
      <div className="flex items-center gap-2 opacity-60">
        {icon}
        <span className="text-[8px] font-black uppercase tracking-widest">{label}</span>
      </div>
      <p className="text-2xl font-black font-headline tracking-tighter text-foreground">{value}</p>
    </div>
  )
}
