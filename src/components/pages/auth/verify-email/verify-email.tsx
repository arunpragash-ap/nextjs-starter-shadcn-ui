import { useVerificationCode } from "@/hooks/verify-email/use-verification-code";
import { useVerifyEmail } from "@/hooks/verify-email/use-verify-email";
import { useSearchParams } from "next/navigation";
import { VerifyEmailForm } from "./verify-email-form";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const { values, inputs, handleChange, handleKeyDown, handlePaste } = useVerificationCode();
  const { loading, resending, verify, resend } = useVerifyEmail(email, values.join(""));

  return (
    <VerifyEmailForm
      values={values}
      inputs={inputs}
      handleChange={handleChange}
      handleKeyDown={handleKeyDown}
      handlePaste={handlePaste}
      loading={loading}
      resending={resending}
      onSubmit={verify}
      onResend={resend}
    />
  );
}
