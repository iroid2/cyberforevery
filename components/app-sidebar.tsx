"use client"

import * as React from "react"
import {
  AudioWaveform,
  GalleryVerticalEnd,
} from "lucide-react"

import { getRoutesByGroup, UserRoleType } from "@/lib/config/routes"

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
  const navMain = Array.from(routeGroups.entries()).map(([groupTitle, groupRoutes]) => ({
    title: groupTitle,
    url: "#",
    icon: AudioWaveform, // Group icon
    items: groupRoutes.map(route => ({
      title: route.title,
      url: route.href,
    }))
  }))

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-[#c6c5d4]/40 bg-[#f2f4f6] text-slate-900"
      {...props}
    >
      <SidebarHeader className="bg-[#f2f4f6] px-4 pt-6">
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent className="bg-[#f2f4f6] px-2">
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter className="bg-[#f2f4f6] px-2 pb-4">
        <NavUser user={{ ...user, avatar: user.avatar ?? "" }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
