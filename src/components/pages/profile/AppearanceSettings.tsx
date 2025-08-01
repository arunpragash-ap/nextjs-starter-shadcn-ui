"use client";
import { ThemeSelector } from "./ThemeSelector";
import { ModeToggle } from "./ModeToggle";

export function AppearanceSettings() {
  return (
    <div className="space-y-6 pt-4">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Appearance Settings</h3>
        <ThemeSelector />
        <ModeToggle />
      </div>
    </div>
  );
}