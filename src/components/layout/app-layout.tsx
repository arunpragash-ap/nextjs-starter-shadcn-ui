import { AppSidebar } from "@/components/layout/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppHeader from "./header/app-header";
import { Card } from "../ui/card";

const AppLayout = ({ children }: {children: React.ReactNode}) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen">
        <div className="sticky top-0 z-10 bg-background border-b">
          <AppHeader />
        </div>
        
        <div className="flex-1 overflow-y-auto p-1.5">
          <Card className="min-h-full rounded-xl m-2 p-1.5">
            {children}
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default AppLayout;