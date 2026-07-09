import { Hero } from "@/components/sections/home/Hero";
import { AboutUs } from "@/components/sections/home/AboutUs";
import { RecentProjects } from "@/components/sections/home/RecentProjects";
import { CoreServices } from "@/components/sections/home/CoreServices";
import { PartnersClients } from "@/components/sections/home/PartnersClients";
import { StartStory } from "@/components/sections/home/StartStory";
import { Reveal } from "@/components/ui/Reveal";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Reveal>
        <AboutUs />
      </Reveal>
      <Reveal>
        <RecentProjects />
      </Reveal>

      <div className="relative overflow-hidden bg-[linear-gradient(180deg,#0e1410_0%,#14241d_20%,#0c1411_38%,#241a13_55%,#0d1a16_75%,#0a0f0d_100%)]">
        {/* Continuous tilted grid backdrop shared by all three sections */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
        >
          <div className="bg-grid-perspective absolute left-1/2 top-1/2 h-[160%] w-[160%] -translate-x-1/2 -translate-y-1/2 opacity-40" />
        </div>

        <Reveal>
          <CoreServices />
        </Reveal>
        <Reveal>
          <PartnersClients />
        </Reveal>
        <Reveal>
          <StartStory />
        </Reveal>
      </div>
    </>
  );
}
