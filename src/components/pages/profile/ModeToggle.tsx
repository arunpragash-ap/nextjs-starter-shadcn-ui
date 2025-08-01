"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Moon, Sun } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setThemeMode } from "@/store/theme/slice";

export function ModeToggle() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.theme.mode);

  return (
    <div className="space-y-2">
      <Label htmlFor="display-mode">Display Mode</Label>
      <div className="flex space-x-2">
        <Button
          variant={mode === "light" ? "default" : "outline"}
          className="flex-1"
          onClick={() => dispatch(setThemeMode("light"))}
        >
          <Sun className="h-4 w-4 mr-2" />
          Light
        </Button>
        <Button
          variant={mode === "dark" ? "default" : "outline"}
          className="flex-1"
          onClick={() => dispatch(setThemeMode("dark"))}
        >
          <Moon className="h-4 w-4 mr-2" />
          Dark
        </Button>
      </div>
    </div>
  );
}