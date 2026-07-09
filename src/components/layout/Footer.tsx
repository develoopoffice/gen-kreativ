import { SocialIcon } from "@/components/ui/SocialIcon";
import { siteConfig } from "@/data/site";
import type { SocialPlatform } from "@/types";

interface FooterChip {
  platform: SocialPlatform;
  text: string;
  href: string;
}

const chips: FooterChip[] = [
  {
    platform: "instagram",
    text: siteConfig.contact.instagram,
    href: "https://www.instagram.com/gen.kreativ?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
  {
    platform: "email",
    text: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    platform: "website",
    text: siteConfig.contact.websiteLabel,
    href: siteConfig.contact.website,
  },
];

export function Footer() {
  return (
    <footer id="footer" className="border-t border-white/10 bg-ink">
      <div className="container-page flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
        <ul className="flex flex-wrap items-center gap-3">
          {chips.map((chip) => (
            <li key={chip.platform}>
              <a
                href={chip.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/75 transition-colors hover:border-white/30 hover:text-white"
              >
                <SocialIcon platform={chip.platform} className="h-3.5 w-3.5" />
                {chip.text}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-sm font-semibold tracking-wide text-white/70">
          {siteConfig.hashtag}
        </p>
      </div>
    </footer>
  );
}
