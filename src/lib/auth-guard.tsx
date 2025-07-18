"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const allowedUrls = useMemo(() => [
    "/login",
    "/signup",
    "/verify-email",
    "/mfa-verify",
    "/forgot-password",
    "/reset-password",
  ], []);
  useEffect(() => {
    // Allow access to allowedUrls without token
    // For all other URLs, require token
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      if (allowedUrls.includes(pathname)) return;
      router.replace("/login");
    } else {
      if (allowedUrls.includes(pathname)) router.replace("/dashboard");
    }
  }, [pathname, router, allowedUrls]);
  return <>{children}</>;
}
