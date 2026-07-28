"use client";

import { useEffect, useState } from "react";
import { AssetImage } from "@/components/ui/AssetImage";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types";

/** How many cards are on screen at once, front card included. */
const VISIBLE = 3;
/** Offsets applied per step back in the queue. */
const STEP_X = 4;
const STEP_Y = 3.5;
const STEP_SCALE = 0.06;
const STEP_DIM = 0.2;

interface PhotoStackProps {
  photos: ImageAsset[];
  /** Sizing/aspect classes for the stack, e.g. "aspect-[4/3] w-full". */
  className?: string;
  sizes?: string;
  /** Time each photo stays in front. */
  intervalMs?: number;
}

/**
 * A deck of photos that cycles automatically: the front card sinks back into
 * the deck while the next one steps forward, with the rest queued behind it.
 *
 * Every card animates between fixed slots (0 = front, VISIBLE = parked and
 * invisible), so there is no teleporting — a card that leaves the front simply
 * travels to the parked slot, and the one that was parked fades in at the back.
 */
export function PhotoStack({
  photos,
  className,
  sizes = "100vw",
  intervalMs = 4000,
}: PhotoStackProps) {
  const count = photos.length;
  const [front, setFront] = useState(0);

  useEffect(() => {
    if (count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => setFront((f) => (f + 1) % count), intervalMs);
    return () => clearInterval(id);
  }, [count, intervalMs]);

  if (count === 0) {
    return (
      <AssetImage
        image={{ src: "", alt: "About Us photos", label: "About Us Photos" }}
        className={className}
      />
    );
  }

  return (
    <div className={cn("relative", className)}>
      {photos.map((photo, i) => {
        // 0 = front, 1 = next in the queue, … anything past VISIBLE is parked.
        const pos = (i - front + count) % count;
        const slot = Math.min(pos, VISIBLE);

        return (
          <div
            key={photo.src ?? i}
            aria-hidden={pos !== 0}
            className="absolute inset-0 transition-all duration-700 ease-out"
            style={{
              zIndex: count - pos,
              opacity: pos >= VISIBLE ? 0 : 1,
              transform: `translate(${slot * STEP_X}%, ${slot * STEP_Y}%) scale(${
                1 - slot * STEP_SCALE
              })`,
            }}
          >
            <AssetImage
              image={photo}
              className="h-full w-full rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] ring-1 ring-white/10"
              sizes={sizes}
            />
            {/* Cards further back sit deeper in shadow. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl bg-ink transition-opacity duration-700 ease-out"
              style={{ opacity: slot * STEP_DIM }}
            />
          </div>
        );
      })}
    </div>
  );
}
