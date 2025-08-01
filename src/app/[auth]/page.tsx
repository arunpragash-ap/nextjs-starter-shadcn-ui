'use client';
import { Card, CardContent } from "@/components/ui/card";
import LoginForm from "../../components/pages/auth/login/login-form";
import SignupForm from "../../components/pages/auth/signup/signup-form";
import ForgotPassword from "../../components/pages/auth/password/forgot-password";
import VerifyEmail from "../../components/pages/auth/verify-email/verify-email";
import MfaVerify from "../../components/pages/auth/mfa/mfa-verify";
import ResetPassword from "../../components/pages/auth/password/reset-password";
import { notFound } from "next/navigation";
import Image from "next/image";
import { use } from "react";
import Link from "next/link";

interface AuthPageProps {
  params: Promise<{
    auth: string;
  }>;
}

export default function AuthPage({
  params,
}: AuthPageProps) {
  const { auth } = use(params);

  // Check if the auth parameter is valid
  const validAuth = ["login", "signup", "forgot-password", "verify-email", "mfa-verify", "reset-password"];
  if (!validAuth.includes(auth)) {
    notFound();
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-6xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
            <div className="relative hidden md:block ">
                <Image
                  width={100}
                  height={100}
                  src="/assets/login_cropped.png"
                  alt="Login Image"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              {auth === "login" && <LoginForm />}
              {auth === "signup" && <SignupForm />}
              {auth === "forgot-password" && <ForgotPassword />}
              {auth === "verify-email" && <VerifyEmail />}
              {auth === "mfa-verify" && <MfaVerify />}
              {auth === "reset-password" && <ResetPassword />}
              
            </CardContent>
          </Card>
          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking continue, you agree to our <Link href="#">Terms of Service</Link>{" "}
            and <Link href="#">Privacy Policy</Link>.
          </div>
        </div>
      </div>
    </div>
  );
}