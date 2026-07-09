import type { Metadata } from "next";
import { ServicePackages } from "@/components/sections/services/ServicePackages";
import { ServiceBlock } from "@/components/sections/services/ServiceBlock";
import { serviceBlocks } from "@/data/services";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Service packages and offerings — science communication, social media management, event documentation and custom services.",
};

export default function ServicesPage() {
  return (
    <div className="relative overflow-hidden bg-[linear-gradient(180deg,#0a0a0f,#141019_35%,#0e1a16_70%,#0b0f0d)]">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#FFC24D] opacity-30 blur-[100px]" />
        <div className="absolute -right-20 top-1/4 h-96 w-96 rounded-full bg-[#793B92] opacity-35 blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 h-80 w-80 rounded-full bg-[#4FB665] opacity-25 blur-[110px]" />
        <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-[#025671] opacity-40 blur-[100px]" />
      </div>

      <div className="relative">
        <ServicePackages />

        <section className="py-20 lg:py-24">
          <div className="container-page space-y-20 lg:space-y-28">
            {serviceBlocks.map((block) => (
              <Reveal key={block.id}>
                <ServiceBlock block={block} />
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
