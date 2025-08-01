// components/auth/SignupFormFields.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SignupFormFieldsProps {
  username: string;
  setUsername: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
}

export const SignupFormFields = ({
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
}: SignupFormFieldsProps) => (
  <>
    <div className="grid gap-3">
      <Label htmlFor="username">Username</Label>
      <Input
        id="username"
        type="text"
        placeholder="your username"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
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
    <div className="grid gap-3">
      <Label htmlFor="password">Password</Label>
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