import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "light" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-strong shadow-[0_10px_30px_-10px_rgba(241,90,36,0.8)]",
  light: "bg-white text-ink hover:bg-white/90",
  outline: "border border-white/30 text-white hover:bg-white/10",
  ghost: "text-white/80 hover:text-white",
};

const SIZES: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3 text-sm",
};

interface ButtonProps {
  children: ReactNode;
  /** Renders an internal <Link> or external <a> when provided, otherwise a <button>. */
  href?: string;
  variant?: Variant;
  size?: Size;
  /** Fully rounded (rounded-full) instead of the default rounded-lg. */
  pill?: boolean;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  ariaLabel?: string;
}

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  pill = false,
  className,
  type = "button",
  onClick,
  ariaLabel,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    pill ? "rounded-full" : "rounded-lg",
    VARIANTS[variant],
    SIZES[size],
    className,
  );

  if (href) {
    const external = /^(https?:|mailto:|tel:)/.test(href);
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
