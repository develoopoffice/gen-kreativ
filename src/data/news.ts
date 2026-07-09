import type { NewsItem } from "@/types";

/** Items on the News & Collaboration page. */
export const newsItems: NewsItem[] = [
  {
    id: "wiragama-grant",
    kicker: "WIRAGAMA GRANT",
    imageSide: "right",
    period: "February – June 2026.",
    paragraphs: [
      "WIRAGAMA is a startup development and incubation initiative under Universitas Gadjah Mada (UGM) that supports innovation-driven ventures through mentorship, business validation, networking opportunities, and ecosystem support. The program aims to help emerging startups transform innovative ideas into sustainable and impactful businesses.",
      "Gen Kreativ was selected as one of the startups receiving support through the WIRAGAMA program, recognizing our commitment to advancing science communication, creative media, and visual storytelling for research and innovation.",
    ],
    image: {
      src: "/assets/news/Perayaan Wiragama.png",
      alt: "Perayaan Wiragama — coming soon poster",
      label: "Wiragama Poster",
    },
  },
  {
    id: "ibc-2025",
    kicker: "International Bioinformatics Competition 2025",
    imageSide: "left",
    period: "October 2025.",
    paragraphs: [
      "Organized by the Indonesian Bioinformatics Association (INBIO), the International Bioinformatics Competition (IBC) 2025 brought together participants to explore ideas in bioinformatics and life sciences.",
      "Gen Kreativ was awarded Best Creative Video for introducing Pangenomism, a creative philosophy inspired by the scientific concept of the pangenome, the complete set of shared and unique genetic information within a species. Through 'Pangenomism', we reimagined this concept as a way of thinking that celebrates diversity, interdisciplinary collaboration, and the integration of knowledge. By introducing this new terminology, we hope to inspire broader public engagement and encourage people to see diversity of ideas as a foundation for innovation and collective progress.",
    ],
    image: {
      src: "/assets/news/International Bioinformatics.png",
      alt: "Congratulation winner — Best Creative Video, IBC 2025",
      label: "Award Poster",
    },
  },
];
