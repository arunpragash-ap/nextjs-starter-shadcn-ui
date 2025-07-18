"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SearchDialog } from "./search-modal";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, User, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import breadcrumbConfig, {
  BreadcrumbItem as BreadcrumbConfigItem,
} from "./breadcrumb-config";

const AppHeader = () => {
  const pathname = usePathname();
  const router = useRouter();
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
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {/* Back Arrow Button */}
            {segments.length > 0 && (
              <BreadcrumbItem>
                <Button
                  variant="secondary"
                  size="icon"
                  className="mr-2"
                  aria-label="Go back"
                  onClick={() => router.back()}
                >
                  <span className="text-muted-foreground">←</span>
                </Button>
              </BreadcrumbItem>
            )}
            {/* Dynamic Breadcrumbs */}
            {allCrumbs.map((crumb, idx) => (
              <React.Fragment key={crumb.href || idx}>
                <BreadcrumbItem>
                  {crumb.isLast || idx === allCrumbs.length - 1 ? (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={crumb.href}>
                      {crumb.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {idx < allCrumbs.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {/* Right Side Controls */}
      <div className="flex items-center gap-2">
        {/* Desktop Controls - visible on medium screens and larger */}
        <div className="hidden md:flex items-center gap-2">
          {/* Search button - desktop only */}
          <SearchDialog />

          {/* Profile button - desktop only */}
          <Button
            variant="secondary"
            size="icon"
            onClick={() => router.push("/profile")}
            className={`flex items-center justify-center  ${pathname === "/profile" ? "bg-primary" : ""}`}
            aria-label="Profile"
          >
            <User className="h-5 w-5" />
          </Button>

          {/* Logout button - desktop only */}
          <Button
            variant="secondary"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("refreshToken");
              router.push("/login");
            }}
            className="flex items-center gap-1"
            size="sm"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>

        {/* Mobile Controls - only show dropdown on small screens */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="secondary" className="md:hidden">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52 md:hidden">
            {/* Search button in dropdown - mobile only */}
            <DropdownMenuItem asChild>
              <SearchDialog />
            </DropdownMenuItem>

            {/* Profile in dropdown - mobile only */}
            <DropdownMenuItem
              className={`flex items-center gap-2 px-2 py-1.5  ${pathname === "/profile" ? "bg-primary" : ""}`}
              onClick={() => router.push("/profile")}
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>

            {/* Logout in dropdown - mobile only */}
            <DropdownMenuItem
              className="flex items-center gap-2 px-2 py-1.5"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("refreshToken");
                router.push("/login");
              }}
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AppHeader;
