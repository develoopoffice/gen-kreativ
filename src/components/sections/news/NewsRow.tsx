import { AssetImage } from "@/components/ui/AssetImage";
import { cn } from "@/lib/utils";
import type { NewsItem } from "@/types";

export function NewsRow({ item }: { item: NewsItem }) {
  const imageRight = item.imageSide === "right";

  return (
    <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      {/* Copy */}
      <div className={cn("order-2", imageRight ? "lg:order-1" : "lg:order-2")}>
        <div
          className={cn(
            "flex items-center gap-3",
            imageRight ? "justify-start" : "lg:justify-end",
          )}
        >
          {imageRight && (
            <span className="h-6 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
          )}
          <h2 className="text-lg font-bold text-white sm:text-xl">
            {item.kicker}
          </h2>
          {!imageRight && (
            <span className="hidden h-6 w-1.5 shrink-0 rounded-full bg-primary lg:block" aria-hidden />
          )}
        </div>

        <div className="mt-6 space-y-4">
          {item.paragraphs.map((paragraph, i) => (
            <p
              key={i}
              className="text-justify text-sm leading-relaxed text-white/75 sm:text-[0.95rem]"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <p
          className={cn(
            "mt-6 text-xs text-white/45",
            imageRight ? "text-left" : "lg:text-right",
          )}
        >
          {item.period}
        </p>
      </div>

      {/* Poster */}
      <div className={cn("order-1", imageRight ? "lg:order-2" : "lg:order-1")}>
        <AssetImage
          image={item.image}
          className="mx-auto aspect-[4/5] w-full max-w-sm"
          imgClassName="object-contain"
          sizes="(min-width: 1024px) 40vw, 100vw"
        />
      </div>
    </article>
  );
}
