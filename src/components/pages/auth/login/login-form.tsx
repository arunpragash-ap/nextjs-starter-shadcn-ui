// components/auth/LoginForm.tsx
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { authService } from "@/services";
import { useCustomToast } from "@/lib/toast-util";
import { useRouter } from "next/navigation";
import { FormHeader } from "../form-header";
import { LoginFormFields } from "./login-form-fields";
import { SocialLoginButtons } from "../social-login-buttons";
import { DividerWithText } from "../divider-with-text";
import { AuthLink } from "../auth-link";
import { formatApiErrorMessage } from "@/lib/errors/format-api-errors";

 const LoginForm = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useCustomToast();
  const router = useRouter();

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authService.loginWithMfaSupport({ identifier, password });
      if (res.accessToken && res.refreshToken) {
        localStorage.setItem("token", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        toast({ title: "Login successful!", level: "success" });
        router.push("/dashboard");
      } else if (res.mfaRequired && res.mfaToken) {
        toast({ 
          title: "MFA required", 
          description: "Please enter your MFA code.", 
          level: "warning" 
        });
        router.push(`/mfa-verify?mfaToken=${encodeURIComponent(res.mfaToken)}`);
      } else {
        toast({ 
          title: "Unexpected response", 
          description: "Please try again.", 
          level: "error" 
        });
      }
    } catch (err: unknown) {
      toast({
        title: "Login failed",
        description: formatApiErrorMessage(err),
        level: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="p-6 md:p-8 " onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6">
        <FormHeader 
          title="Welcome back" 
          description="Login to your Dark Angel" 
        />
        
        <LoginFormFields
          identifier={identifier}
          setIdentifier={setIdentifier}
          password={password}
          setPassword={setPassword}
          isValidEmail={isValidEmail}
        />
        
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
        
        <DividerWithText text="Or continue with" />
        
        <SocialLoginButtons />
        
        <AuthLink 
          text="Don't have an account?" 
          href="/signup" 
          linkText="Sign up" 
        />
      </div>
    </form>
  );
};

export default LoginForm;