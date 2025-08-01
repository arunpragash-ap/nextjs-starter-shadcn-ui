// components/auth/LoginFormFields.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

interface LoginFormFieldsProps {
  identifier: string;
  setIdentifier: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  isValidEmail: (email: string) => boolean;
}

export const LoginFormFields = ({
  identifier,
  setIdentifier,
  password,
  setPassword,
  isValidEmail,
}: LoginFormFieldsProps) => (
  <>
    <div className="grid gap-3">
      <Label htmlFor="identifier">Email or Username</Label>
      <Input
        id="identifier"
        type="text"
        placeholder="m@example.com or username"
        required
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
      />
    </div>
    <div className="grid gap-3">
      <div className="flex items-center justify-between">
        <Label htmlFor="password">Password</Label>
        <Link
          href={`/forgot-password${
            isValidEmail(identifier)
              ? `?email=${encodeURIComponent(identifier)}`
              : ""
          }`}
          className="text-xs text-primary hover:underline"
        >
          Forgot Password?
        </Link>
      </div>
      <Input
        id="password"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  </>
);