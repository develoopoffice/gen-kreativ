import { AssetImage } from "@/components/ui/AssetImage";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/layout/Logo";
import { siteConfig } from "@/data/site";
import { testimonials } from "@/data/testimonials";
import type { Testimonial } from "@/types";

export function StartStory() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-24 py-16 lg:py-20"
    >
      <div className="container-page">
        {/* Divider with the brand mark */}
        <div className="flex items-center gap-4 pb-14">
          <span className="h-px flex-1 bg-white/10" />
          <LogoMark className="h-8 w-8" />
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Call to action */}
          <div>
            <h2 className="text-4xl  leading-[1.05] text-white sm:text-5xl">
              Start your
              <br />
              science story
              <br />
              <span className="text-primary">with us!</span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
              Do not hesitate to ask about our services and let us know your{" "}
              <span className="text-primary">mind-blowing ideas.</span>
            </p>
            <div className="mt-8">
              <Button
                href={`mailto:${siteConfig.contact.email}`}
                variant="primary"
                size="lg"
                className="rounded-none"
              >
                CONTACT US
              </Button>
            </div>
          </div>

          {/* Testimonials */}
          <div>
            <div className="flex items-center justify-end gap-3">
              <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-primary">
                Testimonials
              </h3>
              <span className="h-6 w-1.5 rounded-full bg-primary" aria-hidden />
            </div>
            <p className="mt-2 text-right text-lg font-semibold text-white">
              What they say about our quality?
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center gap-3">
        <AssetImage
          image={testimonial.avatar}
          className="h-10 w-10 shrink-0 rounded-full"
          sizes="40px"
        />
        <figcaption className="min-w-0">
          <p className="truncate text-xs font-semibold text-white">
            {testimonial.handle}
          </p>
          <p className="truncate text-[0.7rem] text-white/50">
            {testimonial.source}
          </p>
        </figcaption>
      </div>
      <blockquote className="mt-3 text-sm leading-relaxed text-white/80">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
    </figure>
  );
}
