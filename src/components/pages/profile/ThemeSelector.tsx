"use client";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setColorTheme } from "@/store/theme/slice";

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

export function ThemeSelector() {
  const dispatch = useAppDispatch();
  const colorTheme = useAppSelector((state) => state.theme.colorTheme);

  return (
    <div className="space-y-2">
      <Label htmlFor="color-theme">Color Theme</Label>
      <Select value={colorTheme} onValueChange={(theme) => dispatch(setColorTheme(theme))}>
        <SelectTrigger className="w-full">
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
    </div>
  );
}