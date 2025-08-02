import { type ElementType } from "react"

export interface SidebarSubItem {
  title: string
  url: string
  activePatterns: string[]
  icon?: ElementType // <-- optional icon component
}

export interface SidebarMenuGroup {
  title: string
  items: SidebarSubItem[]
}

export interface SidebarMenuList {
  navMain: SidebarMenuGroup[]
}
// This is sample data.
export const sidebarMenuList: SidebarMenuList = {
  navMain: [
    {
      title: "Masters",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          activePatterns: ["/dashboard"],
        },
        {
          title: "Analytics",
          url: "#",
          activePatterns: ["/analytics"],
        },
        {
          title: "Options",
          url: "/options",
          activePatterns: ["/options"],
        },
      ],
    }
  ],
}