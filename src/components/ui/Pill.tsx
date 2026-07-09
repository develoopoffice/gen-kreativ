import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PillProps {
  children: ReactNode;
  className?: string;
}

/** Rounded outlined tag used for the core-service chips. */
export function Pill({ children, className }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/25 bg-white/5 px-5 py-2 text-lg font-medium text-white/90 backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </span>
  );
}
