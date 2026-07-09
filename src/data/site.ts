import type { NavItem, SocialLink } from "@/types";

/** Global brand + contact info. Edit here to update header, footer and CTAs. */
export const siteConfig = {
  name: "Gen Kreativ",
  nameSuffix: "Production",
  tagline: "Stay Absolute Scientific Cinema!",
  hashtag: "#StayAbsoluteScientificCinema",
  description:
    "A science communication production house weaving scientific values into storytelling that inspires curiosity, educates minds, and moves people.",
  contact: {
    email: "genkreativ@gmail.com",
    instagram: "@genkreativ",
    website: "https://www.genkreativ.id/",
    websiteLabel: "https://www.genkreativ.id/",
  },
} as const;

export const navItems: NavItem[] = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/#about" },
  { label: "SERVICES", href: "/services" },
  { label: "NEWS & COLLABORATION", href: "/news-collaboration" },
];

/** Header social row (left → right as in the mockup). */
export const socialLinks: SocialLink[] = [
  {
    platform: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/gen-kreativ-production/about/",
  },
  { platform: "whatsapp", label: "WhatsApp", href: "#" },
  { platform: "email", label: "Email", href: "#footer" },
  {
    platform: "youtube",
    label: "YouTube",
    href: "http://www.youtube.com/@GenKreativProduction",
  },
  {
    platform: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/gen.kreativ?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
];
