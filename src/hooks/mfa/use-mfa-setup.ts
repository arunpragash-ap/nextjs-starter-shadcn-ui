import { useState, useCallback } from "react";
import { mfaService } from "@/services";
import { useCustomToast } from "@/lib/toast-util";
import { formatApiErrorMessage } from "@/lib/errors/format-api-errors";

// ✅ Define the interface so TypeScript knows the expected props
export interface UseMfaSetupProps {
  readonly mode: "setup" | "disable";
  readonly onOpenChangeAction: (open: boolean) => void;
  readonly onSuccessAction: () => void;
}

export function useMfaSetup({
  mode,
  onOpenChangeAction,
  onSuccessAction,
}: UseMfaSetupProps) {
  const [step, setStep] = useState<"initial" | "verification">(
    mode === "setup" ? "initial" : "verification"
  );
  const [qrCode, setQrCode] = useState("");
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useCustomToast();

  // ✅ Memoized to prevent QR API loop
  const initSetup = useCallback(async () => {
    try {
      setLoading(true);
      const res = await mfaService.setupMfa();
      setSecret(res.secret);
      setQrCode(res.qr);
    } catch (err) {
      toast({
        title: "Failed to setup MFA",
        description: formatApiErrorMessage(err),
        level: "error",
      });
      onOpenChangeAction(false);
    } finally {
      setLoading(false);
    }
  }, [onOpenChangeAction, toast]);

  const verifyCode = useCallback(
    async (token: string) => {
      if (token.length !== 6) {
        toast({
          title: "Invalid code",
          description: "Please enter 6 digits",
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
            description: "Successfully enabled",
            level: "success",
          });
        } else {
          await mfaService.disableMfa(token);
          toast({
            title: "MFA Disabled",
            description: "Successfully disabled",
            level: "success",
          });
        }
        onSuccessAction();
        onOpenChangeAction(false);
      } catch (err) {
        toast({
          title:
            mode === "setup"
              ? "Failed to enable MFA"
              : "Failed to disable MFA",
          description: formatApiErrorMessage(err),
          level: "error",
        });
      } finally {
        setLoading(false);
      }
    },
    [mode, onSuccessAction, onOpenChangeAction, toast]
  );

  return { step, setStep, qrCode, secret, loading, initSetup, verifyCode };
}
