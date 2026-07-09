import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { BrushHighlight } from "@/components/ui/BrushHighlight";
import { Pill } from "@/components/ui/Pill";
import { coreServices } from "@/data/services";

export function CoreServices() {
  return (
    <section className="relative py-24">
      <div className="container-page relative flex flex-col items-center text-center">
        <Image
          src="/assets/core-services/we-foucesed-on.svg"
          alt="We focused on"
          width={1033}
          height={489}
          className="h-auto w-full max-w-[700px]"
        />

        <div className="mt-16 grid -rotate-[7deg] grid-cols-1 place-items-center gap-3 sm:grid-cols-2 sm:gap-5">
          <Pill className="whitespace-nowrap border-2 border-white px-4 py-2 text-sm sm:border-4 sm:px-6 sm:py-3 sm:text-lg lg:px-9 lg:py-5 lg:text-2xl">
            {coreServices[0].label}
          </Pill>
          <Pill className="whitespace-nowrap border-2 border-white px-4 py-2 text-sm sm:border-4 sm:px-6 sm:py-3 sm:text-lg lg:px-9 lg:py-5 lg:text-2xl">
            {coreServices[1].label}
          </Pill>
          <Pill className="whitespace-nowrap border-2 border-white px-4 py-2 text-sm sm:border-4 sm:px-6 sm:py-3 sm:text-lg lg:px-9 lg:py-5 lg:text-2xl">
            {coreServices[2].label}
          </Pill>
          <Pill className="whitespace-nowrap border-2 border-white px-4 py-2 text-sm sm:border-4 sm:px-6 sm:py-3 sm:text-lg lg:px-9 lg:py-5 lg:text-2xl">
            {coreServices[3].label}
          </Pill>
        </div>

        <Image
          src="/assets/core-services/stay-absolute-scientific-cinema.svg"
          alt="Stay Absolute Scientific Cinema!"
          width={673}
          height={144}
          className="mt-10 h-auto w-full max-w-[400px] -rotate-[7deg]"
        />

        <div className="mt-8">
          <Button
            href="/services"
            variant="outline"
            size="lg"
            className="rounded-none"
          >
            LEARN MORE
          </Button>
        </div>
      </div>
    </section>
  );
}
