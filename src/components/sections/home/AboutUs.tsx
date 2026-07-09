import { FiChevronDown } from "react-icons/fi";
import { AssetImage } from "@/components/ui/AssetImage";
import { BarHeading } from "@/components/ui/SectionHeading";
import type { ImageAsset } from "@/types";

const aboutImage: ImageAsset = {
  src: "/assets/about/about-us-photo.png",
  alt: "Gen Kreativ crew on a film production set",
  label: "About Us Photo",
};

export function AboutUs() {
  return (
    <section
      id="about"
      className="scroll-mt-24 relative flex min-h-screen flex-col justify-center overflow-hidden bg-ink py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#FFC24D] opacity-30 blur-[100px]" />
        <div className="absolute -right-20 top-10 h-96 w-96 rounded-full bg-[#793B92] opacity-35 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-[#4FB665] opacity-25 blur-[110px]" />
        <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-[#025671] opacity-40 blur-[100px]" />
      </div>

      {/* Fade at the top so the seam with the Hero section above blends smoothly */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" />

      <div className="container-page relative grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <BarHeading headingClassName="text-4xl sm:text-5xl lg:text-6xl">
            <span className="text-primary">About</span> Us
          </BarHeading>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg lg:text-xl">
            We are a science communication production house weaving scientmindsific
            values into storytelling that inspires curiosity, educates ,
            and moves people.
          </p>

          <h3 className="mt-8 text-2xl font-bold text-sun drop-shadow-[0_0_12px_rgba(255,193,77,0.8)] sm:text-3xl lg:text-4xl">
            Why us?
          </h3>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg lg:text-xl">
            Gen Kreativ Production combines scientific understanding with
            creative storytelling to transform complex research into accurate,
            contextual, and engaging stories that connect science with the
            public, industry, and wider communities.
          </p>
        </div>

        <AssetImage
          image={aboutImage}
          className="aspect-[4/3] w-full"
          sizes="(min-width: 1024px) 40vw, 100vw"
        />
      </div>

      <div className="relative mt-12 flex justify-center text-white/40">
        <FiChevronDown className="h-6 w-6 animate-bounce" />
      </div>
    </section>
  );
}
