import Image from "next/image";
import { FiImage } from "react-icons/fi";
import type { ImageAsset } from "@/types";
import { cn } from "@/lib/utils";

interface AssetImageProps {
  image: ImageAsset;
  /** Sizing/aspect classes for the wrapper, e.g. "aspect-video w-full". */
  className?: string;
  /** Object-fit etc. for the real image. Use literal classes (Tailwind scans source). */
  imgClassName?: string;
  /** next/image `sizes` hint for responsive loading. */
  sizes?: string;
  priority?: boolean;
  /** Set "eager" for carousel slides that must not fetch/decode mid-animation. */
  loading?: "eager" | "lazy";
}

/**
 * Renders a real image when `image.src` is set, otherwise a labelled placeholder.
 *
 * This is the seam for swapping in real assets later: keep using <AssetImage />
 * everywhere, and the moment you set `src` in the data files (pointing at a file
 * under /public/assets), the live image appears with no markup changes.
 */
export function AssetImage({
  image,
  className,
  imgClassName = "object-cover",
  sizes = "100vw",
  priority,
  loading,
}: AssetImageProps) {
  const hasSrc = Boolean(image.src && image.src.trim() !== "");

  return (
    <div className={cn("relative overflow-hidden", hasSrc ? "" : "bg-surface-2", className)}>
      {hasSrc ? (
        <Image
          src={image.src as string}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={loading}
          className={imgClassName}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 border border-dashed border-white/15 bg-[linear-gradient(135deg,#1b1b22,#121217)] p-3 text-center">
          <FiImage aria-hidden className="h-7 w-7 text-white/25" />
          <span className="text-[0.7rem] font-medium uppercase tracking-wide text-white/40">
            {image.label ?? image.alt}
          </span>
        </div>
      )}
    </div>
  );
}
