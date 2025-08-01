// components/auth/AuthLink.tsx
import Link from "next/link";

interface AuthLinkProps {
  text: string;
  href: string;
  linkText: string;
}

export const AuthLink = ({ text, href, linkText }: AuthLinkProps) => (
  <div className="text-center text-sm">
    {text}{" "}
    <Link href={href} className="underline underline-offset-4">
      {linkText}
    </Link>
  </div>
);