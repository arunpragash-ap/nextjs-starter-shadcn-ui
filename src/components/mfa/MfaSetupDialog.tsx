"use client";
import React, { useState, useRef, useEffect } from "react";
import { ResponsiveDialogDrawer } from "@/components/ui/ResponsiveDialogDrawer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { mfaService } from "@/services";
import { useCustomToast } from "@/lib/toast-util";
import { formatApiErrorMessage } from "@/lib/errors/format-api-errors";

interface MfaSetupDialogProps {
  open: boolean;
  onOpenChangeAction: (open: boolean) => void;
  mode: "setup" | "disable";
  onSuccessAction: () => void;
  trigger: React.ReactNode;
}

export default function MfaSetupDialog({
  open,
  onOpenChangeAction,
  mode,
  onSuccessAction,
  trigger,
}: MfaSetupDialogProps) {
  const [step, setStep] = useState<"initial" | "verification">(
    mode === "setup" ? "initial" : "verification"
  );
  const [loading, setLoading] = useState(false);
  const [secret, setSecret] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [values, setValues] = useState(["", "", "", "", "", ""]);
  const toast = useCustomToast();
  const inputs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Reset the component state when dialog opens
  useEffect(() => {
    if (open) {
      setValues(["", "", "", "", "", ""]);
      setStep(mode === "setup" ? "initial" : "verification");
      setLoading(false);
      // If setting up MFA, fetch the QR code and secret
      if (mode === "setup") {
        (async () => {
          try {
            setLoading(true);
            const response = await mfaService.setupMfa();
            setSecret(response.secret);
            setQrCode(response.qr);
          } catch (error: unknown) {
            toast({
              title: "Failed to setup MFA",
              description: formatApiErrorMessage(error),
              level: "error",
            });
            onOpenChangeAction(false);
          } finally {
            setLoading(false);
          }
        })();
      }
    }
  }, [open, mode]);

  const fetchMfaSetupData = async () => {
    try {
      setLoading(true);
      const response = await mfaService.setupMfa();
      setSecret(response.secret);
      setQrCode(response.qr);
    } catch (error: unknown) {
      toast({
        title: "Failed to setup MFA",
        description: formatApiErrorMessage(error),
        level: "error",
      });
      onOpenChangeAction(false);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/, "").slice(0, 1);
    const newValues = [...values];
    newValues[idx] = val;
    setValues(newValues);
    if (val && idx < 5) {
      setTimeout(() => {
        const nextInput = inputs[idx + 1].current;
        nextInput?.focus();
        if (nextInput) nextInput.selectionStart = nextInput.value.length;
      }, 0);
    }
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = inputs[idx].current;
    if (e.key === "Backspace" && !values[idx] && idx > 0) {
      const prevInput = inputs[idx - 1].current;
      prevInput?.focus();
      setTimeout(() => {
        if (prevInput) prevInput.selectionStart = prevInput.value.length;
      }, 0);
    } else if (e.key === "ArrowLeft" && idx > 0) {
      // Always move focus to previous input and set cursor at end
      const prevInput = inputs[idx - 1].current;
      prevInput?.focus();
      setTimeout(() => {
        if (prevInput) prevInput.selectionStart = prevInput.value.length;
      }, 0);
      e.preventDefault();
    } else if (e.key === "ArrowRight" && idx < 5) {
      if (input && input.selectionStart === input.value.length) {
        const nextInput = inputs[idx + 1].current;
        nextInput?.focus();
        setTimeout(() => {
          if (nextInput) nextInput.selectionStart = nextInput.value.length;
        }, 0);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, 6);
    if (paste.length > 1) {
      const chars = paste.split("");
      const newValues = ["", "", "", "", "", ""];
      for (let i = 0; i < 6; i++) {
        newValues[i] = chars[i] || "";
      }
      setValues(newValues);
      // Focus the last filled input
      const lastIdx = Math.min(paste.length - 1, 5);
      setTimeout(() => {
        const lastInput = inputs[lastIdx].current;
        lastInput?.focus();
        if (lastInput) lastInput.selectionStart = lastInput.value.length;
      }, 0);
      e.preventDefault();
    }
  };

  const handleFocus = (idx: number) => {
    const input = inputs[idx].current;
    if (input) input.selectionStart = input.value.length;
  };

  const handleContinue = () => {
    setStep("verification");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = values.join("");
    if (token.length !== 6) {
      toast({
        title: "Invalid code",
        description: "Please enter the 6-digit code.",
        level: "error",
      });
      return;
    }

    setLoading(true);
    try {
      if (mode === "setup") {
        await mfaService.verifyMfaSetup(token);
        toast({
          title: "MFA Enabled",
          description: "Multi-factor authentication has been successfully enabled.",
          level: "success",
        });
      } else {
        await mfaService.disableMfa(token);
        toast({
          title: "MFA Disabled",
          description: "Multi-factor authentication has been disabled.",
          level: "success",
        });
      }
      onSuccessAction();
      onOpenChangeAction(false);
    } catch (error: unknown) {
      toast({
        title: mode === "setup" ? "Failed to enable MFA" : "Failed to disable MFA",
        description: formatApiErrorMessage(error),
        level: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (mode === "setup" && step === "initial") {
      return (
        <>
          <div className="flex flex-col items-center space-y-4">
            {qrCode ? (
              <div className="relative w-56 h-56 mx-auto">
                <Image
                  src={qrCode}
                  alt="QR Code for MFA setup"
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="w-56 h-56 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">Loading QR code...</span>
              </div>
            )}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Scan this QR code with your authenticator app.
              </p>
              <div className="text-xs p-2 bg-muted rounded-md font-mono overflow-auto">
                {secret}
              </div>
            </div>
          </div>
          <Button
            onClick={handleContinue}
            className="w-full"
            disabled={loading || !qrCode}
          >
            Continue
          </Button>
        </>
      );
    }

    return (
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
          <Label htmlFor="mfaCode">
            {mode === "setup"
              ? "Enter the 6-digit code from your authenticator app to enable MFA"
              : "Enter the 6-digit code from your authenticator app to disable MFA"}
          </Label>
          <div className="flex gap-2 justify-center">
            {values.map((v, idx) => (
              <input
                key={idx}
                ref={inputs[idx]}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={v}
                onChange={(e) => handleChange(idx, e)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                onPaste={handlePaste}
                onFocus={() => handleFocus(idx)}
                className="w-10 h-12 text-center border rounded text-lg font-mono focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                autoFocus={idx === 0}
                aria-label={`Digit ${idx + 1}`}
              />
            ))}
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading
              ? mode === "setup"
                ? "Enabling MFA..."
                : "Disabling MFA..."
              : mode === "setup"
              ? "Enable MFA"
              : "Disable MFA"}
          </Button>
        </div>
      </form>
    );
  };

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
      {renderContent()}
    </ResponsiveDialogDrawer>
  );
}