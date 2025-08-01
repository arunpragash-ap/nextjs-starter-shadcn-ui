'use client';
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppHeader from "./app-header/app-header";
import { Card } from "../ui/card";
import { useAppSelector } from "@/store/hooks";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { mode, colorTheme } = useAppSelector((state) => state.theme);
  const themeClass = mode === "dark" ? `dark ${colorTheme}` : colorTheme;
  return (
    <div className={themeClass} suppressHydrationWarning>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="flex flex-col h-screen">
          <div className="sticky top-0 z-10 bg-background border-b">
            <AppHeader />
          </div>

          <div className="flex-1 overflow-y-auto p-1.5">
            <Card className="h-full rounded-xl p-1.5 overflow-y-auto">
              {children}
            </Card>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default AppLayout;
