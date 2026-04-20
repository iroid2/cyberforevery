"use client"

import * as React from "react"
import {
  AudioWaveform,
  LayoutDashboard,
  ShieldCheck,
  GalleryVerticalEnd,
} from "lucide-react"

import { getRoutesByGroup, getRoutesByRole, normalizeUserRole, UserRoleType } from "@/lib/config/routes"
import { useIsMobile } from "@/hooks/use-mobile"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// Static branding data
const teams = [
  {
    name: "cyber4every1",
    logo: GalleryVerticalEnd,
    plan: "Bootcamp workspace",
  },
]

export function AppSidebar({ 
  user,
  ...props 
}: { 
  user: { name: string; email: string; avatar?: string; role: UserRoleType } 
} & React.ComponentProps<typeof Sidebar>) {
  const isMobile = useIsMobile()
  const normalizedRole = normalizeUserRole(user.role)

  // Dynamically get routes grouped for the specific role
  const routeGroups = getRoutesByGroup(normalizedRole)
  const fallbackRoutes = getRoutesByRole(normalizedRole)
  
  // Transform groups into the structure NavMain expects
  const navMain = Array.from(routeGroups.entries()).map(([groupTitle, groupRoutes]) => ({
    title: groupTitle,
    url: "#",
    icon: AudioWaveform, // Group icon
    items: groupRoutes.map(route => ({
      title: route.title,
      url: route.href,
    }))
  }))

  const safeNavMain = navMain.length
    ? navMain
    : [{
        title: "Workspace",
        url: "#",
        icon: LayoutDashboard,
        items: fallbackRoutes.map((route) => ({
          title: route.title,
          url: route.href,
        })),
      }]

  return (
    <Sidebar
      collapsible={isMobile ? "offcanvas" : "none"}
      variant="inset"
      className="border-r border-sidebar-border/70 bg-sidebar text-sidebar-foreground"
      {...props}
    >
      <SidebarHeader className="bg-sidebar px-4 pt-5">
        <TeamSwitcher teams={teams} />
        <div className="rounded-2xl border border-sidebar-border/70 bg-sidebar-accent/60 px-3 py-3">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-sidebar-primary p-2 text-sidebar-primary-foreground">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sidebar-foreground/60">
                Active workspace
              </p>
              <p className="truncate text-sm font-semibold text-sidebar-foreground">
                {normalizedRole.replaceAll("_", " ")}
              </p>
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-sidebar px-2">
        <NavMain items={safeNavMain} />
      </SidebarContent>
      <SidebarFooter className="bg-sidebar px-2 pb-4">
        <NavUser user={{ name: user.name, email: user.email, avatar: user.avatar ?? "" }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
