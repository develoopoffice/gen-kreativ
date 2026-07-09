import type { CoreService, ServiceBlock, ServicePackage } from "@/types";

/** The 4 pills under "4 CORE VISUAL SERVICES" on the home page. */
export const coreServices: CoreService[] = [
  { id: "science-communication", label: "Science Communication" },
  { id: "event-documentation", label: "Event Documentation" },
  { id: "social-media-management", label: "Social Media Management" },
  { id: "custom-service", label: "Custom Service" },
];

/** Pricing tiers shown at the top of the Services page. */
export const servicePackages: ServicePackage[] = [
  {
    id: "basic",
    name: "Basic",
    tier: "BASIC",
    accent: "teal",
    tagline: "For bringing your ideas to life with professional visuals.",
    features: [
      "Ideation and script",
      "Shooting session: multi-angle recording with 2-camera setup, 1-lighting setup, and audio setup",
      "Full-HD quality with MP4 video format",
      "Professional-quality editing without compromising visual impact",
      "Motion graphic essentials with contextual meaning",
      "1 round of revisions",
    ],
    notes: [
      "Exclude location set",
      "Exclude Talent",
      "Using 2 camera set for Podcast service",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    tier: "PREMIUM",
    accent: "primary",
    highlighted: true,
    tagline: "For stories that deserve more than just good visuals.",
    features: [
      "Ideation, script, and creative brief",
      "Shooting session: multi-angle recording with 2-camera setup, Premium lens set, 3-lighting setup, and audio setup with professional recording equipment",
      "4k quality resolution with MP4 / MOV video format",
      "Professional-quality editing with cinematic color grading and visual refinement",
      "Custom motion graphic with illustration and visual effects",
      "3 rounds of revisions",
    ],
    notes: [
      "Exclude location set",
      "Include Talent",
      "Include Voice Over",
      "Using 3 camera set for Podcast service",
    ],
    addOns: [
      "Gimbal Stabilization (when required)",
      "External Monitor (when required)",
      "Social Media Thumbnail",
    ],
  },
  {
    id: "advanced",
    name: "Advanced",
    tier: "ADVANCED",
    accent: "frost",
    tagline:
      "For creating unforgettable experiences through powerful storytelling.",
    features: [
      "Ideation, script, and creative brief",
      "Shooting session: multi-angle recording with 3-camera setup, cinema or GM lens setup, 3-lighting setup, and audio setup with professional recording equipment",
      "4k quality resolution with MP4 / MOV video format",
      "Professional-quality editing with cinematic color grading and visual refinement",
      "Custom motion graphic with illustration, visual effects, and 3D assets",
      "3 rounds of revisions",
    ],
    notes: [
      "Exclude location set",
      "Include Voice Over",
      "Using 3 camera set for Podcast service",
    ],
    addOns: [
      "Gimbal Stabilization (when required)",
      "External Monitor (when required)",
      "Composer / License (when required)",
      "Add-on lighting set (when required)",
      "Social Media Thumbnail",
    ],
  },
];

/** Detailed service rows below the pricing table on the Services page. */
export const serviceBlocks: ServiceBlock[] = [
  {
    id: "science-communication",
    title: "Science Communication",
    description:
      "We translate scientific research into clear, compelling stories, accurate, and engaging. We help science communication for brands, researcher, and media.",
    packages: ["BASIC", "PREMIUM", "ADVANCED"],
    mostPopular: "PREMIUM",
    media: [
      {
        src: "/assets/services/science-documentation.png",
        alt: "Science documentation feature",
        label: "Science Documentary",
      },
    ],
  },
  {
    id: "socmed-management",
    title: "Socmed Management",
    description:
      "Strategic social media management that turns scientific credibility into audience growth and engagement.",
    media: [
      {
        src: "/assets/services/jtbb-ugm.png",
        alt: "@jtbb.ugm instagram feed",
        label: "@jtbb.ugm",
      },
      {
        src: "/assets/services/igf-ignome.png",
        alt: "@igf.genome instagram feed",
        label: "@igf.genome",
      },
    ],
  },
  {
    id: "event-documentation",
    title: "Event Documentation",
    description:
      "We capture the key moments, atmosphere, and human stories behind your events through professional photo and video documentation.",
    packages: ["BASIC", "PREMIUM", "ADVANCED"],
    mostPopular: "PREMIUM",
    media: [
      {
        src: "/assets/services/event-documentation.png",
        alt: "Research Day 2025 event documentation",
        label: "Event Documentation",
      },
    ],
  },
  {
    id: "customizable-services",
    title: "Customizable Services",
    description:
      "We offer flexible services tailored to your goals, timeline, and budget. Best for brands, research teams, campaign and clients who want a service with specific goals.",
    media: [],
    optionsList: [
      "Video Editing",
      "Photography Service",
      "Research Poster Design",
      "Carousel Copywriting",
      "Video Scriptwriting",
      "Science Carousel",
    ],
    highlightedOption: "Research Poster Design",
  },
];
