"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { AssetImage } from "@/components/ui/AssetImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { recentProjects } from "@/data/projects";
import { cn } from "@/lib/utils";

export function RecentProjects() {
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const settleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Start on the second item so the featured card sits centred (as in the design).
  const [active, setActive] = useState(Math.min(1, recentProjects.length - 1));
  // Text label lags one tick behind `active` and crossfades in, instead of
  // flashing through every intermediate slide while the scroll is in motion.
  const [labelActive, setLabelActive] = useState(active);
  const [labelVisible, setLabelVisible] = useState(true);

  const centerSlide = (idx: number, behavior: ScrollBehavior) => {
    const track = trackRef.current;
    const el = slideRefs.current[idx];
    if (!track || !el) return;
    track.scrollTo({
      left: el.offsetLeft + el.clientWidth / 2 - track.clientWidth / 2,
      behavior,
    });
  };

  const goTo = (i: number) => {
    const idx = Math.max(0, Math.min(recentProjects.length - 1, i));
    setActive(idx);
    centerSlide(idx, "smooth");
  };

  // Centre the initial slide on mount (no smooth scroll).
  useEffect(() => {
    centerSlide(active, "auto");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Once the active slide settles, crossfade the title/subtitle to it instead
  // of flashing through every intermediate slide while the scroll is moving.
  useEffect(() => {
    if (active === labelActive) return;

    setLabelVisible(false);
    if (settleTimeoutRef.current) clearTimeout(settleTimeoutRef.current);
    settleTimeoutRef.current = setTimeout(() => {
      setLabelActive(active);
      setLabelVisible(true);
    }, 150);

    return () => {
      if (settleTimeoutRef.current) clearTimeout(settleTimeoutRef.current);
    };
  }, [active, labelActive]);

  // Keep the emphasis in sync when the user scrolls/swipes manually.
  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let nearest = 0;
    let min = Infinity;
    slideRefs.current.forEach((el, i) => {
      if (!el) return;
      const elCenter = el.offsetLeft + el.clientWidth / 2;
      const distance = Math.abs(elCenter - center);
      if (distance < min) {
        min = distance;
        nearest = i;
      }
    });
    setActive(nearest);
  };

  const labelProject = recentProjects[labelActive];

  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-ink py-20 lg:py-24">
      {/* Layered neon-blur background, same treatment as About Us: purple dominant on
          the left, green dominant on the right. */}
      <div className="pointer-events-none absolute inset-0 z-40" aria-hidden="true">
        <div className="absolute -left-48 inset-y-0 h-full w-80 rounded-full bg-[#793B92] opacity-40 blur-[130px]" />
        <div className="absolute -right-48 inset-y-0 h-full w-80 rounded-full bg-[#4FB665] opacity-40 blur-[130px]" />
      </div>

      <div className="container-page relative">
        <SectionHeading kicker="RECENT" title="PROJECTS" />
      </div>

      <div className="relative mt-12">
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="scrollbar-hide flex snap-x snap-mandatory items-center overflow-x-auto px-[4%] sm:px-[8%]"
        >
          {recentProjects.map((project, i) => (
            <div
              key={project.id}
              ref={(el) => {
                slideRefs.current[i] = el;
              }}
              className={cn(
                "w-[92%] shrink-0 snap-center sm:w-[78%] lg:w-[62%]",
                i !== 0 && "-ml-10 sm:-ml-14 lg:-ml-16",
                i === active ? "z-20" : "z-10",
              )}
            >
              {i === active && project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Watch ${project.title}`}
                  className="block w-full scale-100 opacity-100 transition-all duration-300"
                >
                  <AssetImage
                    image={project.image}
                    className="aspect-video w-full"
                    sizes="(min-width: 1024px) 62vw, 92vw"
                  />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Show ${project.title}`}
                  className={cn(
                    "block w-full transition-all duration-300",
                    i === active ? "scale-100 opacity-100" : "scale-[0.82] opacity-40",
                  )}
                >
                  <AssetImage
                    image={project.image}
                    className="aspect-video w-full"
                    sizes="(min-width: 1024px) 62vw, 92vw"
                  />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="container-page mt-8 flex items-center justify-center gap-5">
        <ArrowButton
          label="Previous project"
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
        >
          <FiArrowLeft className="h-4 w-4" />
        </ArrowButton>

        <div className="flex min-w-0 items-center gap-3 text-left">
          <span className="h-9 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
          <div
            className={cn(
              "min-w-0 transition-opacity duration-150",
              labelVisible ? "opacity-100" : "opacity-0",
            )}
          >
            <p className="truncate text-base font-extrabold uppercase tracking-wide text-white">
              {labelProject.title}
            </p>
            <p className="truncate text-xs text-white/60">
              {labelProject.subtitle}
            </p>
          </div>
        </div>

        <ArrowButton
          label="Next project"
          onClick={() => goTo(active + 1)}
          disabled={active === recentProjects.length - 1}
        >
          <FiArrowRight className="h-4 w-4" />
        </ArrowButton>
      </div>
    </section>
  );
}

interface ArrowButtonProps {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  label: string;
}

function ArrowButton({ children, onClick, disabled, label }: ArrowButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
    >
      {children}
    </button>
  );
}
