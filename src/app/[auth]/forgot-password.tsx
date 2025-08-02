import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { authService } from "@/services";
import { useCustomToast } from "@/lib/toast-util";
import { formatApiErrorMessage } from "@/lib/errors/format-api-errors";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();
    const toast = useCustomToast();

    useEffect(() => {
        const emailParam = searchParams.get("email");
        if (emailParam) setEmail(emailParam);
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await authService.forgotPassword({ email });
            toast({ 
                title: "OTP Sent", 
                description: "Please check your email for the OTP code.", 
                level: "success" 
            });
            router.push(`/reset-password?email=${encodeURIComponent(email)}`);
        } catch (err: unknown) {
            toast({
                title: "Failed to send OTP",
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
                    <h1 className="text-2xl font-bold">Forgot Password</h1>
                    <p className="text-muted-foreground text-balance">
                        Enter your email to receive a password reset OTP
                    </p>
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Sending..." : "Send OTP to Email"}
                </Button>
                <div className="text-center text-sm">
                    Remembered your password?{' '}
                    <Link href="/login" className="underline underline-offset-4">
                        Login
                    </Link>
                </div>
            </div>
        </form>
    )
} 