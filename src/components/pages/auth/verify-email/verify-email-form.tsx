import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { VerificationCodeInput } from "./verification-code-input";

interface VerifyEmailFormProps {
  values: string[];
  inputs: React.RefObject<HTMLInputElement | null>[];
  handleChange: (idx: number, val: string) => void;
  handleKeyDown: (idx: number, key: string) => void;
  handlePaste: (text: string) => void;
  loading: boolean;
  resending: boolean;
  onSubmit: () => void;
  onResend: () => void;
}

export function VerifyEmailForm({ values, inputs, handleChange, handleKeyDown, handlePaste, loading, resending, onSubmit, onResend }: VerifyEmailFormProps) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="p-6 md:p-8">
      <div className="flex flex-col gap-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Verify Email</h1>
          <p className="text-muted-foreground">Enter the 6-digit code sent to your email</p>
        </div>
        <Label>Verification Code</Label>
        <VerificationCodeInput
          values={values}
          inputs={inputs}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Verifying..." : "Verify"}
        </Button>
        <Button type="button" variant="outline" className="w-full" onClick={onResend} disabled={resending}>
          {resending ? "Resending..." : "Resend Code"}
        </Button>
      </div>
    </form>
  );
}
