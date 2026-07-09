import Image from "next/image";
import { FiCheck } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import type { ServicePackage } from "@/types";

const TIER_IMAGE: Record<
  string,
  { src: string; width: number; height: number; maxWidth: number }
> = {
  basic: {
    src: "/assets/services/basic-package.svg",
    width: 246,
    height: 134,
    maxWidth: 160,
  },
  premium: {
    src: "/assets/services/premium-package.svg",
    width: 348,
    height: 137,
    maxWidth: 220,
  },
  advanced: {
    src: "/assets/services/advanced-package.svg",
    width: 397,
    height: 139,
    maxWidth: 220,
  },
};

export function PackageCard({ pkg }: { pkg: ServicePackage }) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-2xl border bg-surface/70 p-6 backdrop-blur",
        pkg.highlighted
          ? "border-primary shadow-[0_0_45px_-15px_rgba(241,90,36,0.7)]"
          : "border-white/10",
      )}
    >
      {/* Soft transparent white wash across the whole card */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-white/10"
      />

      <div className="relative flex justify-center">
        <Image
          src={TIER_IMAGE[pkg.id].src}
          alt={`${pkg.tier} Package`}
          width={TIER_IMAGE[pkg.id].width}
          height={TIER_IMAGE[pkg.id].height}
          className="h-auto w-full"
          style={{ maxWidth: TIER_IMAGE[pkg.id].maxWidth }}
        />
      </div>

      <p className="relative mt-4 text-center text-xs leading-relaxed text-white/60">
        {pkg.tagline}
      </p>

      <div className="relative mt-5">
        <Button
          href={`mailto:${siteConfig.contact.email}`}
          variant="primary"
          size="sm"
          className="w-full"
        >
          Get a Free Consultation
        </Button>
      </div>

      <ul className="relative mt-6 space-y-2.5">
        {pkg.features.map((feature, i) => (
          <li key={i} className="flex gap-2 text-xs leading-relaxed text-white/80">
            <FiCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="relative mt-auto grid gap-4 pt-6 sm:grid-cols-2">
        <div>
          <p className="text-[0.7rem] font-bold text-white">Notes:</p>
          <ul className="mt-1.5 space-y-1">
            {pkg.notes.map((note, i) => (
              <li key={i} className="text-[0.65rem] leading-snug text-white/55">
                • {note}
              </li>
            ))}
          </ul>
        </div>

        {pkg.addOns && (
          <div>
            <p className="text-[0.7rem] font-bold text-white">
              Complimentary Add-ons
            </p>
            <ul className="mt-1.5 space-y-1">
              {pkg.addOns.map((addOn, i) => (
                <li key={i} className="text-[0.65rem] leading-snug text-white/55">
                  • {addOn}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
