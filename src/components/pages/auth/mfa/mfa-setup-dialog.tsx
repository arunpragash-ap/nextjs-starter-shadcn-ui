"use client";
import React, { useEffect } from "react";
import { ResponsiveDialogDrawer } from "@/components/ui/ResponsiveDialogDrawer";
import { useMfaSetup } from "@/hooks/mfa/use-mfa-setup";
import MfaQrStep from "./mfa-qr-step";
import MfaVerificationStep from "./mfa-verification-step";

interface MfaSetupDialogProps {
  readonly open: boolean;
  readonly onOpenChangeAction: (open: boolean) => void;
  readonly mode: "setup" | "disable";
  readonly onSuccessAction: () => void;
  readonly trigger: React.ReactNode;
}

export default function MfaSetupDialog({
  open,
  onOpenChangeAction,
  mode,
  onSuccessAction,
  trigger,
}: MfaSetupDialogProps) {
  const { step, setStep, qrCode, secret, loading, initSetup, verifyCode } =
    useMfaSetup({
      mode,
      onOpenChangeAction,
      onSuccessAction,
    });

  useEffect(() => {
    if (mode === "setup" && open) {
      initSetup();
    }
  }, [open, mode]);

  return (
    <ResponsiveDialogDrawer
      open={open}
      onOpenChange={onOpenChangeAction}
      trigger={trigger}
      title={mode === "setup" ? "Setup MFA" : "Disable MFA"}
      description={
        mode === "setup"
          ? "Secure your account with multi-factor authentication"
          : "Remove multi-factor authentication from your account"
      }
    >
      {mode === "setup" && step === "initial" ? (
        <MfaQrStep
          qrCode={qrCode}
          secret={secret}
          loading={loading}
          onContinue={() => setStep("verification")}
        />
      ) : (
        <MfaVerificationStep
          mode={mode}
          loading={loading}
          onSubmit={verifyCode}
        />
      )}
    </ResponsiveDialogDrawer>
  );
}
