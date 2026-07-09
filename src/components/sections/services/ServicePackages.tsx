import { SectionHeading } from "@/components/ui/SectionHeading";
import { servicePackages } from "@/data/services";
import { PackageCard } from "./PackageCard";

export function ServicePackages() {
  return (
    <section className="py-20 lg:py-24">
      <div className="container-page">
        <SectionHeading kicker="SERVICE" title="Packages" />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {servicePackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}
