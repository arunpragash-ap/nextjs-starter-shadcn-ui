import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import LoginForm from "./login-form";
import SignupForm from "./signup-form";
import { notFound } from "next/navigation";

interface AuthPageProps {
  params: {
    auth: string;
  };
  className?: string;
}

export default function AuthPage({
  params,
  className,
}: AuthPageProps) {
  const { auth } = params;

  // Check if the auth parameter is valid
  if (auth !== "login" && auth !== "signup") {
    notFound();
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-6xl">
        <div className={cn("flex flex-col gap-6", className)}>
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              {auth === "login" ? <LoginForm /> : <SignupForm />}
              <div className="relative hidden md:block ">
                <img
                  src="/assets/login_cropped.png"
                  alt="Login Image"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </CardContent>
          </Card>
          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
            and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
