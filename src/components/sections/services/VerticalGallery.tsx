import { AssetImage } from "@/components/ui/AssetImage";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types";

/**
 * Overlapping vertical stack (coverflow-style): the middle image is largest and
 * sits in front at full opacity, while the images above and below are narrower,
 * dimmer, and tucked partly behind it. The centre item's negative vertical
 * margins pull its neighbours in so they overlap.
 */
export function VerticalGallery({ media }: { media: ImageAsset[] }) {
  const middle = Math.floor(media.length / 2);

  return (
    <div className="relative flex flex-col items-center">
      {media.map((image, i) => {
        const dist = Math.abs(i - middle);
        const isCenter = dist === 0;
        return (
          <div
            key={image.src ?? i}
            className={cn(
              "w-full",
              isCenter
                ? "z-20 -my-[8%] shadow-2xl shadow-black/50 ring-1 ring-white/10"
                : "z-10",
            )}
            style={{
              maxWidth: isCenter ? "100%" : `${100 - dist * 22}%`,
              opacity: isCenter ? 1 : Math.max(0.4, 1 - dist * 0.45),
            }}
          >
            <AssetImage
              image={image}
              className="aspect-video w-full rounded-xl"
              imgClassName="object-cover"
              sizes="(min-width: 1024px) 55vw, 100vw"
            />
          </div>
        );
      })}
    </div>
  );
}
