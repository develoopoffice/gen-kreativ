import { Fragment } from "react";
import { AssetImage } from "@/components/ui/AssetImage";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";
import type {
  ImageAsset,
  PackageTier,
  ServiceBlock as ServiceBlockType,
  ServiceFeed,
} from "@/types";
import { OptionsWheel } from "./OptionsWheel";
import { VerticalGallery } from "./VerticalGallery";

export function ServiceBlock({ block }: { block: ServiceBlockType }) {
  return (
    <article className="grid items-center gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-14">
      {/* Copy */}
      <div>
        <div className="flex items-center gap-2.5">
          <span className="h-5 w-1.5 rounded-full bg-primary" aria-hidden />
          <span className="text-sm font-bold uppercase tracking-wide text-white">
            Services
          </span>
        </div>

        <h3 className="mt-5 text-3xl font-extrabold text-white sm:text-4xl">
          {block.title}
        </h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">
          {block.description}
        </p>

        {block.packages && (
          <PackageRow packages={block.packages} mostPopular={block.mostPopular} />
        )}

        <div className="mt-7">
          <Button
            href={`mailto:${siteConfig.contact.email}`}
            variant="primary"
            pill
          >
            Order Now!
          </Button>
        </div>
      </div>

      {/* Media */}
      <div>
        {block.optionsList ? (
          <OptionsWheel
            options={block.optionsList}
            highlighted={block.highlightedOption}
          />
        ) : block.feeds ? (
          <SocialFeeds feeds={block.feeds} />
        ) : block.scroller ? (
          <VerticalGallery media={block.media} />
        ) : (
          <Gallery media={block.media} />
        )}
      </div>
    </article>
  );
}

function PackageRow({
  packages,
  mostPopular,
}: {
  packages: PackageTier[];
  mostPopular?: PackageTier;
}) {
  return (
    <div className="mt-6 pb-4">
      <p className="text-xs font-semibold text-white/80">Available Package:</p>
      <div className="mt-3 flex items-center gap-2.5 text-sm font-bold">
        {packages.map((tier, i) => (
          <Fragment key={tier}>
            {i > 0 && <span className="text-white/25">|</span>}
            <span className="relative inline-block bg-[#115671] px-3 py-1 text-white">
              {tier}
              {mostPopular === tier && (
                <img
                  src="/assets/services/most-popular.svg"
                  alt="Most Popular"
                  className="pointer-events-none absolute left-1/2 top-full mt-1 h-auto w-24 -translate-x-1/2 -rotate-[5deg]"
                />
              )}
            </span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

/**
 * Instagram feeds for the socmed block. Each feed is a horizontally-scrollable
 * strip showing ~3.5 portrait photos at a time.
 */
function SocialFeeds({ feeds }: { feeds: ServiceFeed[] }) {
  return (
    <div className="space-y-6">
      {feeds.map((feed) => (
        <div key={feed.label}>
          <p className="mb-2.5 text-sm font-semibold text-white/80">{feed.label}</p>
          <div className="scrollbar-hide flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1">
            {feed.images.map((image, i) => (
              <div
                key={image.src ?? i}
                className="shrink-0 snap-start"
                style={{ flexBasis: "calc((100% - 3 * 0.75rem) / 3.5)" }}
              >
                <AssetImage
                  image={image}
                  className="aspect-[4/5] w-full rounded-lg"
                  imgClassName="object-cover"
                  sizes="(min-width: 1024px) 20vw, 30vw"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Gallery({ media }: { media: ImageAsset[] }) {
  if (media.length === 0) return null;

  if (media.length === 1) {
    return (
      <AssetImage
        image={media[0]}
        className="aspect-video w-full"
        imgClassName="object-contain object-right"
        sizes="(min-width: 1024px) 70vw, 100vw"
      />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {media.map((item, i) => (
        <AssetImage
          key={item.label ?? i}
          image={item}
          className={i === 0 ? "col-span-2 aspect-video" : "aspect-square"}
          imgClassName="object-contain object-right"
          sizes="(min-width: 1024px) 34vw, 45vw"
        />
      ))}
    </div>
  );
}
