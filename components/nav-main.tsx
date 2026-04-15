"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import { usePathname } from "next/navigation"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const pathname = usePathname()

  return (
    <SidebarGroup className="gap-4">
      <div className="px-2 pb-2">
        <h2 className="text-lg font-bold text-slate-900">Curator Suite</h2>
        <p className="text-sm font-medium text-slate-500">Academic Management</p>
      </div>
      <SidebarGroupLabel className="px-2 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
        Platform
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.items?.some((subItem) => pathname === subItem.url)}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                  className="rounded-lg px-3 py-2 text-slate-700 hover:bg-white hover:text-[#1a237e] data-[active=true]:bg-white/70 data-[active=true]:text-[#1a237e]"
                  isActive={item.items?.some((subItem) => pathname === subItem.url)}
                >
                  {item.icon && <item.icon className="text-slate-500" />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto text-slate-400 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub className="border-l-[#c6c5d4]/70">
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton
                        asChild
                        isActive={pathname === subItem.url}
                        className="rounded-md text-slate-600 hover:bg-white hover:text-[#1a237e] data-[active=true]:bg-white data-[active=true]:font-semibold data-[active=true]:text-[#1a237e]"
                      >
                        <a href={subItem.url}>
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
