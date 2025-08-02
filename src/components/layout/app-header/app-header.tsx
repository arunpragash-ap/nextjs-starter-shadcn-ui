"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import breadcrumbConfig, {
  BreadcrumbItem as BreadcrumbConfigItem,
} from "../../../config/breadcrumb-config";
import { DesktopControls } from "./desktop-controls";
import { MobileControls } from "./mobile-controls";
import { Breadcrumbs } from "./breadcrumbs";

const AppHeader = () => {
  const pathname = usePathname();
  // Split path and filter empty segments
  const segments = pathname.split("/").filter(Boolean);
  // Build breadcrumb items
  let pathAcc = "";
  const crumbs: BreadcrumbConfigItem[] = segments.map((seg, idx) => {
    pathAcc += "/" + seg;
    const config = breadcrumbConfig[seg] || { label: seg };
    return {
      ...config,
      href: config.href || pathAcc,
      isLast: idx === segments.length - 1,
    };
  });
  // Add Home as first crumb
  const allCrumbs: BreadcrumbConfigItem[] = [
    breadcrumbConfig[""] || { label: "Home", href: "/" },
    ...crumbs,
  ];

  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-2 border-b px-4">
      <div className="flex items-center">
        <SidebarTrigger className="-ml-1 " variant="secondary" />
        <Separator orientation="vertical" className="mx-2 h-4" />
        <Breadcrumbs segments={segments} allCrumbs={allCrumbs} />
      </div>
      {/* Right Side Controls */}
      <div className="flex items-center gap-2">
        <DesktopControls pathname={pathname} />
        <MobileControls pathname={pathname} />
      </div>
    </header>
  );
};

export default AppHeader;