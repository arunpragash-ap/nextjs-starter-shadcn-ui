
// components/input-error-tooltip.tsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface InputErrorTooltipProps {
  error?: string;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
}

export function InputErrorTooltip({ error, children, side}: InputErrorTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip open={!!error}>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        {error && <TooltipContent side={side}>{error}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
}