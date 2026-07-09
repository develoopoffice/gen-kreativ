import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BrushColor = "sun" | "teal" | "primary";

const COLORS: Record<BrushColor, string> = {
  sun: "bg-sun text-ink",
  teal: "bg-teal text-ink",
  primary: "bg-primary text-white",
};

interface BrushHighlightProps {
  children: ReactNode;
  color?: BrushColor;
  className?: string;
}

/**
 * Painted highlight behind a word — a CSS approximation of the brush graphics
 * in the mockups. Swap `.brush` (globals.css) for a real brush image later.
 */
export function BrushHighlight({
  children,
  color = "sun",
  className,
}: BrushHighlightProps) {
  return (
    <span className={cn("brush", COLORS[color], className)}>{children}</span>
  );
}
