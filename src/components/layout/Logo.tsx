import Link from "next/link";
import { AssetImage } from "@/components/ui/AssetImage";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types";

/** Brand mark. Set `src` to swap the placeholder swirl for the real logo. */
export const brandLogo: ImageAsset = {
  src: "/assets/logo/logo.png",
  alt: "Gen Kreativ Production logo",
  label: "LOGO",
};

const hasLogo = Boolean(brandLogo.src && brandLogo.src.trim() !== "");

/** Square brand mark — real logo when set, otherwise a colourful CSS placeholder. */
export function LogoMark({ className }: { className?: string }) {
  if (hasLogo) {
    return (
      <AssetImage
        image={brandLogo}
        className={cn("rounded-full", className)}
        imgClassName="object-cover scale-125"
      />
    );
  }
  // Placeholder evoking the swirl logo: a colourful ring with a dark centre.
  return (
    <span className={cn("relative inline-block shrink-0 rounded-full", className)} aria-hidden>
      <span className="absolute inset-0 rounded-full bg-[conic-gradient(from_140deg,#f15a24,#ffc83d,#1ec8b0,#7c5cff,#f15a24)]" />
      <span className="absolute inset-[26%] rounded-full bg-ink" />
    </span>
  );
}

interface LogoProps {
  className?: string;
  showText?: boolean;
}

/** Clickable logo + wordmark for the header. */
export function Logo({ className, showText = true }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5", className)}>
      <LogoMark className="h-9 w-9" />
      {showText && (
        <span className="leading-tight">
          <span className="block text-sm font-extrabold uppercase tracking-wide text-white">
            {siteConfig.name}
          </span>
          <span className="block text-[0.6rem] font-medium uppercase tracking-[0.22em] text-white/55">
            {siteConfig.nameSuffix}
          </span>
        </span>
      )}
    </Link>
  );
}
