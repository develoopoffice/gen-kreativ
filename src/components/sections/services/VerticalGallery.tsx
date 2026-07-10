"use client";

import { useEffect, useState } from "react";
import { AssetImage } from "@/components/ui/AssetImage";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types";

/** How long each image stays in the centre before advancing (ms). */
const INTERVAL = 3000;
/** Vertical gap between slots, as a share of an image's own height. */
const SPREAD = 80;

/**
 * Vertical coverflow carousel: the three images sit in a stack with one in the
 * centre — enlarged and at full opacity — and the others clearly visible above
 * and below but smaller and dimmer. The centre slot advances on a timer so every
 * image takes its turn at 100% opacity; clicking a neighbour jumps to it.
 */
export function VerticalGallery({ media }: { media: ImageAsset[] }) {
  const count = media.length;
  const [active, setActive] = useState(count > 1 ? 1 : 0);

  useEffect(() => {
    if (count <= 1) return;
    const id = setInterval(() => setActive((a) => (a + 1) % count), INTERVAL);
    return () => clearInterval(id);
  }, [count]);

  return (
    <div className="relative ml-auto h-[24rem] w-full max-w-sm">
      {media.map((image, i) => {
        // Signed distance from the centre, wrapped into [-half, +half] so one
        // neighbour always sits above the active item and one below it.
        let off = i - active;
        if (off > count / 2) off -= count;
        if (off < -count / 2) off += count;
        const dist = Math.abs(off);
        const isActive = dist === 0;

        return (
          <button
            type="button"
            key={image.src ?? i}
            onClick={() => setActive(i)}
            aria-label={`Show image ${i + 1} of ${count}`}
            aria-current={isActive}
            className={cn(
              "absolute left-1/2 top-1/2 w-full rounded-xl transition-all duration-500 ease-out",
              isActive
                ? "z-20 cursor-default shadow-2xl shadow-black/50 ring-1 ring-white/10"
                : "z-10 cursor-pointer",
            )}
            style={{
              opacity: isActive ? 1 : Math.max(0.4, 1 - dist * 0.45),
              transform: `translate(-50%, calc(-50% + ${off * SPREAD}%)) scale(${
                isActive ? 1 : 0.8
              })`,
            }}
          >
            <AssetImage
              image={image}
              className="aspect-video w-full rounded-xl"
              imgClassName="object-cover"
              sizes="(min-width: 1024px) 40vw, 90vw"
              loading="eager"
            />
          </button>
        );
      })}
    </div>
  );
}
