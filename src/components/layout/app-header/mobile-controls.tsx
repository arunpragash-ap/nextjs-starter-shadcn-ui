"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { SearchDialog } from "./search-modal";
import { MobileControlsProps } from "@/types/app-header";

export const MobileControls = ({ pathname }: MobileControlsProps) => {
  const router = useRouter();

  return (
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
          className={`flex items-center gap-2 px-2 py-1.5 ${pathname === "/profile" ? "bg-primary" : ""}`}
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
  );
};