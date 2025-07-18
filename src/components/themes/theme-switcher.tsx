"use client";

import * as React from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setColorTheme } from "@/store/theme/slice";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ThemeSwitcher() {
  const dispatch = useAppDispatch();
  const colorTheme = useAppSelector((state) => state.theme.colorTheme);

  const themes = [
    { label: "Orange", value: "orange-theme" },
    { label: "Blue", value: "blue-theme" },
    { label: "Red", value: "red-theme" },
    { label: "Violet", value: "violet-theme" },
    { label: "Green", value: "green-theme" },
    { label: "Rose", value: "rose-theme" },
    { label: "Yellow", value: "yellow-theme" },
    { label: "Default", value: "default-theme" },
  ];

  const handleThemeChange = (theme: string) => {
    dispatch(setColorTheme(theme));
  };

  return (
    <Select value={colorTheme} onValueChange={handleThemeChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {themes.map((t) => (
            <SelectItem key={t.value} value={t.value}>
              {t.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
