'use client'

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

import { sidebarMenuList } from "@/constants/app-sidebar.constants"

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-14 border-b flex items-center justify-center">
        Dark Angel
      </SidebarHeader>
      <SidebarContent>
        {sidebarMenuList.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((subitem) => {
                  const isActive =
                    subitem.url !== "#" &&
                    subitem.activePatterns?.some((pattern) =>
                      pattern.endsWith("/")
                        ? pathname.startsWith(pattern)
                        : pathname === pattern
                    )

                  // Icon handling
                  const IconComponent = subitem.icon || null

                  return (
                    <SidebarMenuItem key={subitem.title}>
                      <SidebarMenuButton
                        asChild
                        className={cn(
                          "flex items-center gap-2 cursor-pointer rounded-lg",
                          isActive
                            ? "bg-primary text-white hover:bg-primary/90"
                            : "hover:bg-primary/60"
                        )}
                      >
                        <Link href={subitem.url} className="w-full flex items-center gap-2">
                          {IconComponent && (
                            <IconComponent className="w-4 h-4 shrink-0" />
                          )}
                          <span>{subitem.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
