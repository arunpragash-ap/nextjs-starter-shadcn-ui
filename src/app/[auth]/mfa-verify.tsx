import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { authService } from "@/services";
import { useCustomToast } from "@/lib/toast-util";
import { useRouter, useSearchParams } from "next/navigation";
import { formatApiErrorMessage } from "@/lib/utils";

export default function MfaVerify() {
    const [values, setValues] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [mfaToken, setMfaToken] = useState("");
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
        const token = searchParams.get("mfaToken");
        if (token) setMfaToken(token);
    }, [searchParams]);

    const handleChange = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/[^0-9]/, "").slice(0, 1);
        const newValues = [...values];
        newValues[idx] = val;
        setValues(newValues);
        if (val && idx < 5) {
            setTimeout(() => {
                const nextInput = inputs[idx + 1].current;
                nextInput?.focus();
                if (nextInput) nextInput.selectionStart = nextInput.value.length;
            }, 0);
        }
    };

    const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
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
        const paste = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, 6);
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
        const mfaCode = values.join("");
        if (!mfaToken) {
            toast({ title: "MFA token missing", description: "Please login again.", level: "error" });
            return;
        }
        if (mfaCode.length !== 6) {
            toast({ title: "Invalid code", description: "Please enter the 6-digit code.", level: "error" });
            return;
        }
        setLoading(true);
        try {
            const res = await authService.mfaVerify({ mfaToken, mfaCode });
            if (res.accessToken && res.refreshToken) {
                localStorage.setItem("token", res.accessToken);
                localStorage.setItem("refreshToken", res.refreshToken);
                toast({ title: "MFA verified!", description: "You are now logged in.", level: "success" });
                router.push("/dashboard");
            } else {
                toast({ title: "Unexpected response", description: "Please try again.", level: "error" });
            }
        } catch (err: unknown) {
            toast({
                title: "MFA verification failed",
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
                <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">MFA Verification</h1>
                    <p className="text-muted-foreground text-balance">
                        Enter the 6-digit code from your authenticator app
                    </p>
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="mfaCode">MFA Code</Label>
                    <div className="flex gap-2 justify-center">
                        {values.map((v, idx) => (
                            <input
                                key={idx}
                                ref={inputs[idx]}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={v}
                                onChange={e => handleChange(idx, e)}
                                onKeyDown={e => handleKeyDown(idx, e)}
                                onPaste={handlePaste}
                                onFocus={() => handleFocus(idx)}
                                className="w-10 h-12 text-center border rounded text-lg font-mono focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                autoFocus={idx === 0}
                                aria-label={`Digit ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Verifying..." : "Verify"}
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