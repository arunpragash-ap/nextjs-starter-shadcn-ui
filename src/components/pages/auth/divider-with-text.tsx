// components/auth/DividerWithText.tsx
export const DividerWithText = ({ text }: { text: string }) => (
  <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
    <span className="bg-card text-muted-foreground relative z-10 px-2">
      {text}
    </span>
  </div>
);