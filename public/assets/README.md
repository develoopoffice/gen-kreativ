# Assets

Every image on the site is a placeholder until you drop a real file here and
point the matching data entry at it. **You never touch component markup** — just
add a file and set its `src` path in the relevant file under `src/data/`.

## How replacement works

1. Add your file, e.g. `public/assets/projects/kopi-sikunang.jpg`.
2. Open the matching data file (e.g. `src/data/projects.ts`).
3. Set `image.src` to the public path **without** the `public/` prefix:

   ```ts
   image: { src: "/assets/projects/kopi-sikunang.jpg", alt: "Kopi Sikunang poster" }
   ```

That's it — `<AssetImage>` swaps the placeholder for the real image automatically.

## Folder map

| Folder                  | Used by                              | Data file                   |
| ----------------------- | ------------------------------------ | --------------------------- |
| `logo/`                 | Navbar + footer brand mark           | `components/layout/*`       |
| `hero/`                 | Home hero background video/image     | `components/sections/home/Hero.tsx` |
| `about/`                | About Us photo                       | `components/sections/home/AboutUs.tsx` |
| `projects/`             | Recent Projects carousel             | `src/data/projects.ts`      |
| `partners/`             | Partners & Clients logo wall         | `src/data/partners.ts`      |
| `services/`             | Service detail galleries             | `src/data/services.ts`      |
| `news/`                 | News & Collaboration posters         | `src/data/news.ts`          |
| `testimonials/`         | Testimonial avatars                  | `src/data/testimonials.ts`  |

## Hero background video

The hero supports a looping background video. Add `public/assets/hero/hero.mp4`
and set `heroVideoSrc` in `components/sections/home/Hero.tsx` (currently `""`,
which shows the animated placeholder backdrop).

## Recommended formats

- Photos / posters: `.webp` or `.jpg`
- Logos / marks: transparent `.svg` or `.png`
- Hero loop: `.mp4` (H.264), muted, a few seconds, optimized for web
