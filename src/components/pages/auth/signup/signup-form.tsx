// components/auth/SignupForm.tsx
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { authService } from "@/services";
import { useCustomToast } from "@/lib/toast-util";
import { useRouter } from "next/navigation";
import { FormHeader } from "../form-header";
import { SignupFormFields } from "./signup-form-fields";
import { DividerWithText } from "../divider-with-text";
import { SocialLoginButtons } from "../social-login-buttons";
import { AuthLink } from "../auth-link";
import { formatApiErrorMessage } from "@/lib/errors/format-api-errors";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useCustomToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.registerWithCode({ username, email, password });
      toast({ 
        title: "Registration successful!", 
        description: "Please check your email to verify your account.", 
        level: "success" 
      });
      router.push("/verify-email?email=" + encodeURIComponent(email));
    } catch (err: unknown) {
      toast({
        title: "Registration failed",
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
        <FormHeader 
          title="Welcome back" 
          description="Register to your Dark Angel" 
        />
        
        <SignupFormFields
          username={username}
          setUsername={setUsername}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />
        
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>
        
        <DividerWithText text="Or continue with" />
        
        <SocialLoginButtons />
        
        <AuthLink 
          text="Already have an account?" 
          href="/login" 
          linkText="Sign in" 
        />
      </div>
    </form>
  );
};

export default SignupForm;