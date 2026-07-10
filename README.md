# Gen Kreativ Production — Website

Marketing site for **Gen Kreativ Production**, a science-communication / visual
storytelling production house. Built from the design mockups in 
[`docs/design`](docs/design).

> **Status:** all imagery is placeholder by design. Components and layout are
> final; drop in real assets when ready (see [Replacing assets](#replacing-assets)).

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19
- TypeScript
- Tailwind CSS v4 (CSS-first `@theme` tokens in `src/app/globals.css`)
- [react-icons](https://react-icons.github.io/react-icons/) for UI/social icons
- Fonts: Poppins (display/body) + Caveat (handwritten accent) via `next/font`

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (also type-checks)
npm run lint
```

## Pages

| Route                  | Source                                | Sections                                                                           |
| ---------------------- | ------------------------------------- | ---------------------------------------------------------------------------------- |
| `/`                    | `src/app/page.tsx`                    | Hero · About Us · Recent Projects · 4 Core Services · Partners · CTA + Testimonials |
| `/services`            | `src/app/services/page.tsx`           | Service Packages · Service detail blocks                                           |
| `/news-collaboration`  | `src/app/news-collaboration/page.tsx` | News & Collaboration items                                                          |

## Project structure

```
src/
├─ app/                       # routes + root layout (Navbar/Footer shell, fonts)
│  ├─ globals.css             # design tokens (colors, fonts) + utilities
│  ├─ page.tsx                # home
│  ├─ services/page.tsx
│  └─ news-collaboration/page.tsx
├─ components/
│  ├─ layout/                 # Navbar, Footer, Logo
│  ├─ ui/                     # AssetImage, Button, SectionHeading, Pill, BrushHighlight, SocialIcon
│  └─ sections/
│     ├─ home/                # Hero, AboutUs, RecentProjects, CoreServices, PartnersClients, StartStory
│     ├─ services/            # ServicePackages, PackageCard, ServiceBlock
│     └─ news/                # NewsRow
├─ data/                      # all content lives here (copy + asset paths)
│  ├─ site.ts                 # brand, nav, socials, contact
│  ├─ projects.ts  partners.ts  testimonials.ts  services.ts  news.ts
├─ lib/utils.ts               # cn() class helper
└─ types/index.ts             # shared types

public/assets/                # drop real assets here (see its README)
docs/design/                  # the source mockups
```

## Editing content

All text and image references are data-driven — **you rarely touch component
markup**. Edit the relevant file under `src/data/` (e.g. `projects.ts` to change
the carousel, `services.ts` for packages/blocks, `news.ts` for news items).

## Replacing assets

Every image is rendered through the `<AssetImage>` component. While an entry's
`src` is empty, a labelled placeholder box is shown. To go live:

1. Add the file under `public/assets/...` (folders are pre-created per section).
2. Set `src` on the matching entry in `src/data/...` to the public path, e.g.

   ```ts
   image: { src: "/assets/projects/kopi-sikunang.jpg", alt: "Kopi Sikunang poster" }
   ```

No markup changes needed — the placeholder swaps for the real image instantly.
See [`public/assets/README.md`](public/assets/README.md) for the full folder map,
including the hero background video slot.

## Rebranding

Brand colours and fonts are defined once as Tailwind v4 theme tokens in
[`src/app/globals.css`](src/app/globals.css) (`--color-primary`, `--color-teal`,
`--color-sun`, …). Change them there to restyle the whole site.
