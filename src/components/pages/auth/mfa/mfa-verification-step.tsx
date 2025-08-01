import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import MfaCodeInput from "./mfa-code-input";

interface MfaVerificationStepProps {
  mode: "setup" | "disable";
  loading: boolean;
  onSubmit: (token: string) => void;
}

export default function MfaVerificationStep({ mode, loading, onSubmit }: MfaVerificationStepProps) {
  const [values, setValues] = useState(["", "", "", "", "", ""]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values.join(""));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <Label>
          {mode === "setup"
            ? "Enter the 6-digit code to enable MFA"
            : "Enter the 6-digit code to disable MFA"}
        </Label>
        <MfaCodeInput values={values} onChange={setValues} />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading
            ? mode === "setup" ? "Enabling MFA..." : "Disabling MFA..."
            : mode === "setup" ? "Enable MFA" : "Disable MFA"}
        </Button>
      </div>
    </form>
  );
}
