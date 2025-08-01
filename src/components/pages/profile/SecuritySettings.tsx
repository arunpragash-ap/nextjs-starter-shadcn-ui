"use client";
import { MfaSection } from "./MfaSection";
import { PasswordSection } from "./PasswordSection";

export function SecuritySettings() {
  return (
    <div className="space-y-6 pt-4">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Security Settings</h3>
        <MfaSection />
        <PasswordSection />
      </div>
    </div>
  );
}