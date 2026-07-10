"use client";

import { useEffect, useRef, useState } from "react";

const ITEM_HEIGHT = 56; // px — harus sama dengan tinggi tiap <li>
const VISIBLE = 5; // jumlah slot terlihat (ganjil, agar ada slot tengah)
const PAD = ((VISIBLE - 1) / 2) * ITEM_HEIGHT;

/**
 * Daftar opsi bergaya "wheel picker": bisa di-scroll vertikal, item yang berada
 * di tengah paling terang + glowing, dan memudar bergradasi ke atas & bawah.
 */
export function OptionsWheel({
  options,
  highlighted,
}: {
  options: string[];
  highlighted?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  // Posisikan opsi yang di-highlight di tengah saat pertama tampil.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const start = Math.max(0, options.indexOf(highlighted ?? ""));
    el.scrollTop = start * ITEM_HEIGHT;
    setScrollTop(el.scrollTop);
  }, [options, highlighted]);

  const activeFractional = scrollTop / ITEM_HEIGHT;

  return (
    <div
      ref={ref}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
      className="scrollbar-hide relative mx-auto max-w-md snap-y snap-mandatory overflow-y-auto lg:ml-auto lg:mr-0"
      style={{
        height: VISIBLE * ITEM_HEIGHT,
        maskImage:
          "linear-gradient(to bottom, transparent, #000 32%, #000 68%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, #000 32%, #000 68%, transparent)",
      }}
    >
      <ul style={{ paddingTop: PAD, paddingBottom: PAD }}>
        {options.map((option, i) => {
          const distance = Math.abs(i - activeFractional);
          const opacity = Math.max(0.12, 1 - distance * 0.42);
          const glow = Math.max(0, 1 - distance);
          return (
            <li
              key={option}
              style={{
                height: ITEM_HEIGHT,
                opacity,
                textShadow:
                  glow > 0.01
                    ? `0 0 ${16 * glow}px rgba(252,113,56,${0.75 * glow})`
                    : undefined,
              }}
              className="flex snap-center items-center justify-center text-center text-xl font-bold text-white transition-[opacity,text-shadow] duration-150 sm:text-2xl lg:justify-end lg:text-right"
            >
              {option}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
