import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NewsRow } from "@/components/sections/news/NewsRow";
import { newsItems } from "@/data/news";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "News & Collaboration",
  description:
    "Grants, awards and collaborations Gen Kreativ Production is part of.",
};

export default function NewsCollaborationPage() {
  return (
    <div className="bg-[linear-gradient(180deg,#0a0a0f,#171122_30%,#241a13_70%,#0d1a16)]">
      <div className="container-page py-20 lg:py-28">
        <SectionHeading kicker="NEWS &" title="Collaboration" />

        <div className="mt-16 space-y-20 lg:mt-24 lg:space-y-28">
          {newsItems.map((item) => (
            <Reveal key={item.id}>
              <NewsRow item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
