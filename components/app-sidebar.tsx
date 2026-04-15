"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboard,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  ShieldCheck,
  GraduationCap,
  Users,
} from "lucide-react"

import { getRoutesByGroup, UserRoleType } from "@/lib/config/routes"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
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
    plan: "Master Admin",
  },
]

export function AppSidebar({ 
  user,
  ...props 
}: { 
  user: { name: string; email: string; avatar?: string; role: UserRoleType } 
} & React.ComponentProps<typeof Sidebar>) {
  
  // Dynamically get routes grouped for the specific role
  const routeGroups = getRoutesByGroup(user.role)
  
  // Transform groups into the structure NavMain expects
  const navMain = Object.entries(routeGroups).map(([groupTitle, groupRoutes]) => ({
    title: groupTitle,
    url: "#",
    icon: AudioWaveform, // Group icon
    items: groupRoutes.map(route => ({
      title: route.title,
      url: route.href,
    }))
  }))

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        {/* We map each role-specific group to a NavMain section */}
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
