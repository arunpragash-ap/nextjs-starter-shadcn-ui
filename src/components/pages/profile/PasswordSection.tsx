"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function PasswordSection() {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <Label>Password</Label>
        <p className="text-sm text-muted-foreground">
          Change your password
        </p>
      </div>
      <Button variant="outline" size="sm">
        Change
      </Button>
    </div>
  );
}