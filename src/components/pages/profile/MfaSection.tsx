"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import MfaSetupDialog from "@/components/pages/auth/mfa/mfa-setup-dialog";

export function MfaSection() {
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [mfaDialogOpen, setMfaDialogOpen] = useState(false);
  const [mfaMode, setMfaMode] = useState<"setup" | "disable">("setup");

  const handleMfaToggle = async () => {
    if (mfaEnabled) {
      setMfaMode("disable");
    } else {
      setMfaMode("setup");
    }
    setMfaDialogOpen(true);
  };

  const handleMfaSuccess = () => {
    setMfaEnabled((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <Label htmlFor="mfa">Multi-Factor Authentication</Label>
        <p className="text-sm text-muted-foreground">
          Add an extra layer of security to your account
        </p>
      </div>
      <Switch
        id="mfa"
        checked={mfaEnabled}
        onCheckedChange={handleMfaToggle}
      />
      <MfaSetupDialog
        open={mfaDialogOpen}
        onOpenChangeAction={setMfaDialogOpen}
        mode={mfaMode}
        onSuccessAction={handleMfaSuccess}
        trigger={<span></span>}
      />
    </div>
  );
}