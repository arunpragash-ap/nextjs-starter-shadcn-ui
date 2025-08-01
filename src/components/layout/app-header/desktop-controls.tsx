"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { DesktopControlsProps } from "@/types/app-header";

export const DesktopControls = ({ pathname }: DesktopControlsProps) => {
  const router = useRouter();

  return (
    <div className="hidden md:flex items-center gap-2">
      {/* Profile button - desktop only */}
      <Button
        variant="secondary"
        size="icon"
        onClick={() => router.push("/profile")}
        className={`flex items-center justify-center ${pathname === "/profile" ? "bg-primary" : ""}`}
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
  );
};