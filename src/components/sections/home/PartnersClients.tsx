import { AssetImage } from "@/components/ui/AssetImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { partners } from "@/data/partners";

export function PartnersClients() {
  return (
    <section className="relative py-20 lg:py-24">
      <div className="container-page">
        <SectionHeading kicker="OUR" title="Partners & Clients" />

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {partners.map((partner) => (
            <AssetImage
              key={partner.id}
              image={partner.logo}
              className="h-16 w-24 rounded-xl sm:h-20 sm:w-32 md:h-24 md:w-40 lg:h-28 lg:w-44"
              imgClassName="object-contain p-3"
              sizes="(min-width: 1024px) 16vw, 40vw"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
