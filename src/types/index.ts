/**
 * Shared domain types for the Gen Kreativ site.
 * Content is data-driven: edit the files in `src/data` to change copy/assets.
 */

/**
 * A picture used anywhere on the site.
 * Leave `src` empty ("") to render a labelled placeholder box. To go live,
 * drop a real file into `/public/assets/...` and set `src` to that path.
 */
export interface ImageAsset {
  /** Path under /public, e.g. "/assets/projects/kopi-sikunang.jpg". Empty => placeholder. */
  src?: string;
  /** Accessible description — always provide this. */
  alt: string;
  /** Short caption shown inside the placeholder while no real image is set. */
  label?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export type SocialPlatform =
  | "instagram"
  | "linkedin"
  | "whatsapp"
  | "email"
  | "youtube"
  | "website"
  | "tiktok";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  image: ImageAsset;
  /** External link opened when the active card is clicked (e.g. the video). */
  href?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  handle: string;
  source: string;
  quote: string;
  avatar: ImageAsset;
}

export interface Partner {
  id: string;
  name: string;
  logo: ImageAsset;
}

export interface CoreService {
  id: string;
  label: string;
}

export type PackageTier = "BASIC" | "PREMIUM" | "ADVANCED";

/** Visual accent applied to a package title. */
export type PackageAccent = "teal" | "primary" | "frost";

export interface ServicePackage {
  id: string;
  name: string;
  tier: PackageTier;
  tagline: string;
  accent: PackageAccent;
  /** Draws the orange border + makes it the visually featured card. */
  highlighted?: boolean;
  features: string[];
  notes: string[];
  addOns?: string[];
}

/** One Instagram feed for the socmed block: a label plus a strip of photos. */
export interface ServiceFeed {
  label: string;
  images: ImageAsset[];
}

export interface ServiceBlock {
  id: string;
  title: string;
  description: string;
  /** Which package tiers apply; omit to hide the package row. */
  packages?: PackageTier[];
  mostPopular?: PackageTier;
  /** Gallery images shown beside the copy. */
  media: ImageAsset[];
  /** Render `media` as a vertical scroller with the centre item highlighted. */
  scroller?: boolean;
  /** Instagram feeds for the socmed block; each renders as a horizontal photo strip. */
  feeds?: ServiceFeed[];
  /** Used by "Customizable Services": a stacked list of offerings instead of media. */
  optionsList?: string[];
  highlightedOption?: string;
}

export interface NewsItem {
  id: string;
  /** Small heading with the orange accent bar, e.g. "WIRAGAMA GRANT". */
  kicker: string;
  paragraphs: string[];
  period: string;
  image: ImageAsset;
  /** Which side the poster sits on for this row. */
  imageSide: "left" | "right";
}
