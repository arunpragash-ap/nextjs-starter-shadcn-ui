import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { authService } from "@/services";
import { useCustomToast } from "@/lib/toast-util";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, XCircle } from "lucide-react";
import { formatApiErrorMessage } from "@/lib/errors/format-api-errors";

export default function ResetPassword() {
  const [values, setValues] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const toast = useCustomToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) setEmail(emailParam);
  }, [searchParams]);

  const verifyOtp = async (otpCode: string) => {
    if (!email || otpCode.length !== 6) return;

    setVerifying(true);
    try {
      await authService.verifyForgotOtp({ email, otp: otpCode });
      setIsOtpVerified(true);
      toast({
        title: "OTP verified!",
        description: "You can now reset your password.",
        level: "success",
      });
    } catch (err: unknown) {
      setIsOtpVerified(false);
      toast({
        title: "Invalid OTP",
        description: formatApiErrorMessage(err),
        level: "error",
      });
    } finally {
      setVerifying(false);
    }
  };

  const handleChange = (
    idx: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const val = e.target.value.slice(0, 1);
    const newValues = [...values];
    newValues[idx] = val;
    setValues(newValues);

    // Reset verification status when OTP changes
    if (isOtpVerified) {
      setIsOtpVerified(false);
    }

    if (val && idx < 5) {
      setTimeout(() => {
        const nextInput = inputs[idx + 1].current;
        nextInput?.focus();
        if (nextInput) nextInput.selectionStart = nextInput.value.length;
      }, 0);
    }
    // Auto verify when all 6 digits are filled
    if (val && idx === 5) {
      const otpCode = [...newValues.slice(0, 5), val].join("").trim();
      if (otpCode.length === 6) {
        verifyOtp(otpCode);
      }
    }
  };

  const handleKeyDown = (
    idx: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
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
    const paste = e.clipboardData.getData("text").slice(0, 6);
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

        // Auto verify when pasting a complete code
        const otpCode = newValues.join("");
        if (otpCode.length === 6 && !otpCode.includes("")) {
          verifyOtp(otpCode);
        }
      }, 0);
      e.preventDefault();
    }
  };

  const handleFocus = (idx: number) => {
    const input = inputs[idx].current;
    if (input) input.selectionStart = input.value.length;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email required",
        description: "Email is missing.",
        level: "error",
      });
      return;
    }

    const otp = values.join("");
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the 6-digit OTP code.",
        level: "error",
      });
      return;
    }

    if (!newPassword) {
      toast({
        title: "Password required",
        description: "Please enter a new password.",
        level: "error",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure both passwords match.",
        level: "error",
      });
      return;
    }

    setLoading(true);
    try {
      await authService.resetPassword({ email, otp, newPassword });
      toast({
        title: "Password reset successful!",
        description: "You can now log in with your new password.",
        level: "success",
      });
      router.push("/login");
    } catch (err: unknown) {
      toast({
        title: "Password reset failed",
        description: formatApiErrorMessage(err),
        level: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="p-6 md:p-8" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold">Reset Password</h1>
          <p className="text-muted-foreground text-balance">
            Enter the 6-digit OTP sent to your email and create a new password
          </p>
        </div>

        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            readOnly={!!searchParams.get("email")}
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="otp">OTP Code</Label>
          <div className="flex gap-2 justify-center relative">
            {values.map((v, idx) => (
              <input
                key={idx}
                ref={inputs[idx]}
                type="text"
                inputMode="text"
                maxLength={1}
                value={v}
                onChange={(e) => handleChange(idx, e)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                onPaste={handlePaste}
                onFocus={() => handleFocus(idx)}
                className="w-10 h-12 text-center border rounded text-lg font-mono focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                autoFocus={idx === 0}
                aria-label={`Digit ${idx + 1}`}
                disabled={verifying}
              />
            ))}
            {values.join("").length === 6 && (
              <div className="absolute -right-1 top-1/2 transform -translate-y-1/2">
                {verifying ? (
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                ) : isOtpVerified ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-500" />
                )}
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-3">
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={loading || !isOtpVerified}
        >
          {loading ? "Resetting Password..." : "Reset Password"}
        </Button>

        <div className="text-center text-sm">
          <Link href="/login" className="underline underline-offset-4">
            Back to Login
          </Link>
        </div>
      </div>
    </form>
  );
}
