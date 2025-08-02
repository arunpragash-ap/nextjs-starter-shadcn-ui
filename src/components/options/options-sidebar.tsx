import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export type MenuItem = {
  name: string
  value: string
  icon?: LucideIcon
}

interface OptionsSidebarProps {
  menuItems: MenuItem[]
  activeValue: string
  onSelect: (value: string) => void
}

export function OptionsSidebar({ menuItems, activeValue, onSelect }: OptionsSidebarProps) {
  return (
    <SidebarContent className="bg-gray-100 dark:bg-slate-800 rounded-lg h-full">
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {menuItems.map((item) => {
              const isActive = activeValue === item.value
              return (
                <SidebarMenuItem key={item.value}>
                  <SidebarMenuButton
                    onClick={() => onSelect(item.value)}
                    className={cn(
                      "flex items-center justify-center md:justify-start gap-2 cursor-pointer",
                      isActive ?   "bg-primary text-white hover:bg-primary/90"
                            : "hover:bg-primary/60"
                    )}
                  >
                    {item.icon && <item.icon size={18} />}
                    <span className="hidden md:block">{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  )
}
