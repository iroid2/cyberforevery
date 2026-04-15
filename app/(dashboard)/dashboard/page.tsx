import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { UserRoleType } from "@/lib/config/routes"

export default async function Page() {
  const session = await auth();
  
  if (!session) {
    redirect("/login");
  }

  const role = (session.user as any)?.role as UserRoleType || UserRoleType.GUEST;
  
  // Smart Redirection to role-specific entry points
  switch (role) {
    case UserRoleType.SUPER_ADMIN:
      redirect("/dashboard/admin/users");
    case UserRoleType.INSTRUCTOR:
      redirect("/dashboard/instructor/roster");
    case UserRoleType.ADMIN_STAFF:
      redirect("/dashboard/bootcamp/cohorts");
    case UserRoleType.STUDENT:
    case UserRoleType.PARENT:
      redirect("/dashboard/student/schedule");
    default:
      // Keep GUEST on the overview page
      break;
  }

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b">
        <div className="flex items-center gap-2 px-4">
          <h1 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">// DASHBOARD_OVERVIEW</h1>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-6 p-8">
        <div className="max-w-4xl">
          <h2 className="text-4xl font-headline font-black uppercase tracking-tighter mb-2">
            WELCOME BACK, {session?.user?.name || "ENVOY"}
          </h2>
          <p className="text-muted-foreground font-headline text-sm tracking-widest uppercase">
            ROLE_PROFILE: <span className="text-primary">{role}</span> // SYSTEM_STATUS: OPERATIONAL
          </p>
        </div>

        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-surface/50 border border-border flex items-center justify-center">
            <p className="text-[10px] text-muted uppercase tracking-[0.3em]">COHORT_SUMMARY</p>
          </div>
          <div className="aspect-video rounded-xl bg-surface/50 border border-border flex items-center justify-center">
            <p className="text-[10px] text-muted uppercase tracking-[0.3em]">ACTIVE_TASKS</p>
          </div>
          <div className="aspect-video rounded-xl bg-surface/50 border border-border flex items-center justify-center">
            <p className="text-[10px] text-muted uppercase tracking-[0.3em]">PERFORMANCE_INDEX</p>
          </div>
        </div>
        
        <div className="flex-1 rounded-xl bg-surface/30 border border-border border-dashed p-12 flex flex-col items-center justify-center text-center opacity-40">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-3xl text-primary">data_usage</span>
          </div>
          <h3 className="text-lg font-bold uppercase tracking-tight mb-2">Initializing Module Feeds</h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            Please select a subsystem from the navigation terminal on the left to begin your operation.
          </p>
        </div>
      </div>
    </>
  )
}
