import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services";
import { useCustomToast } from "@/lib/toast-util";
import { formatApiErrorMessage } from "@/lib/errors/format-api-errors";

export function useVerifyEmail(email: string, code: string) {
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const toast = useCustomToast();
  const router = useRouter();

  const verify = async () => {
    if (!email || code.length !== 6) {
      toast({ title: "Invalid", description: "Please enter a valid email and 6-digit code.", level: "error" });
      return;
    }
    setLoading(true);
    try {
      await authService.verifyEmailWithCode({ email, code });
      toast({ title: "Success", description: "Email verified!", level: "success" });
      router.push("/login");
    } catch (err) {
      toast({ title: "Failed", description: formatApiErrorMessage(err), level: "error" });
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    if (!email) {
      toast({ title: "Email required", description: "Email is missing.", level: "error" });
      return;
    }
    setResending(true);
    try {
      await authService.resendVerificationCode({ email });
      toast({ title: "Code resent", description: "Check your email.", level: "success" });
    } catch (err) {
      toast({ title: "Failed", description: formatApiErrorMessage(err), level: "error" });
    } finally {
      setResending(false);
    }
  };

  return { loading, resending, verify, resend };
}
