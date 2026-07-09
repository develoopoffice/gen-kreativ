import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Small orange top line, e.g. "RECENT". */
  kicker: string;
  /** Large white headline, e.g. "PROJECTS". */
  title: string;
  align?: "center" | "left";
  className?: string;
}

/** Stacked two-tone heading used for big section titles. */
export function SectionHeading({
  kicker,
  title,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" ? "text-center" : "text-left", className)}>
      <p className="text-md font-bold uppercase tracking-[0.25em] text-primary sm:text-base">
        {kicker}
      </p>
      <h2 className="text-3xl font-extrabold uppercase leading-none tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
    </div>
  );
}

interface BarHeadingProps {
  children: ReactNode;
  className?: string;
  /** Override the h2's default text-size classes, e.g. to match the Hero headline. */
  headingClassName?: string;
}

/** Heading with the small vertical orange accent bar (e.g. "| ABOUT US"). */
export function BarHeading({ children, className, headingClassName }: BarHeadingProps) {
  return (
    <div className={cn("flex items-stretch gap-3", className)}>
      <span className="w-1.5 shrink-0 bg-primary" aria-hidden />
      <h2
        className={cn(
          "font-extrabold uppercase tracking-tight text-white",
          headingClassName ?? "text-2xl sm:text-3xl",
        )}
      >
        {children}
      </h2>
    </div>
  );
}
