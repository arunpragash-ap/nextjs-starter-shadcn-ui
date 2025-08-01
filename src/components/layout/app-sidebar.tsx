'use client'

import * as React from "react"

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

import { usePathname } from "next/navigation"
import Link from "next/link"
import { sidebarMenuList } from "@/constants/app-sidebar.constants"



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-14 border-b flex items-center justify-center">
            Dark Angel
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {sidebarMenuList.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((subitem) => {
                  // Check if current pathname matches any of the active patterns
                  const isActive = subitem.url !== '#' && subitem.activePatterns?.some(pattern => {
                    if (pattern.endsWith('/')) {
                      // If pattern ends with '/', check if pathname starts with it
                      return pathname.startsWith(pattern);
                    } else {
                      // Otherwise, check for exact match
                      return pathname === pattern;
                    }
                  });
                  
                  return (
                    <SidebarMenuItem key={subitem.title}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link href={subitem.url}>{subitem.title}</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
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
