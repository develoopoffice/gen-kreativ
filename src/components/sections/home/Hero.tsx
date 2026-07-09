import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/layout/Logo";
import { siteConfig } from "@/data/site";

/**
 * Hero background video. Drop a file at /public/assets/hero/hero.mp4 and set
 * this to "/assets/hero/hero.mp4" to enable the looping video background.
 * While empty, a cinematic gradient placeholder is shown instead.
 */
const heroVideoSrc = "";

export function Hero() {
  const hasVideo = Boolean(heroVideoSrc);

  return (
    <section id="home" className="relative isolate overflow-hidden">
      {/* Background layer (video when provided, gradient placeholder otherwise) */}
      <div className="absolute inset-0 -z-10">
        {hasVideo ? (
          <video
            className="h-full w-full object-cover"
            src={heroVideoSrc}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,#23202f,transparent_55%),radial-gradient(circle_at_75%_60%,#2a1a14,transparent_55%),linear-gradient(180deg,#0c0c11,#08080a)]" />
        )}
        {/* Readability overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/30 to-ink" />
        {/* Extra fade at the very bottom to blend smoothly into the next section */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black" />
        {!hasVideo && (
          <span className="absolute bottom-4 right-4 rounded-full border border-white/10 px-3 py-1 text-[0.65rem] uppercase tracking-widest text-white/30">
            Background video placeholder
          </span>
        )}
      </div>

      <div className="container-page flex min-h-[80vh] flex-col items-center justify-center gap-6 py-24 text-center">
        <LogoMark className="h-14 w-14" />

        <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/700 sm:text-sm">
          Welcome to {siteConfig.name} {siteConfig.nameSuffix}
        </p>

        <h1 className="max-w-4xl text-4xl font-light uppercase leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
          Where <span className="font-extrabold">Science</span> Meets{" "}
          <br className="hidden sm:block" />
          <span className="font-extrabold">Visual</span> Storytelling
        </h1>

        <div className="mt-3 flex flex-col items-center gap-3 sm:flex-row">
          <Button
            href="/services"
            variant="light"
            size="lg"
            className="text-primary shadow-[0_0_15px_2px_rgba(255,255,255,0.5)] hover:shadow-[0_0_20px_4px_rgba(255,255,255,0.7)]"
          >
            OUR SERVICES
          </Button>
          <Button
            href="/#contact"
            variant="primary"
            size="lg"
            className="shadow-[0_0_15px_2px_rgba(241,90,36,0.6)] hover:shadow-[0_0_20px_4px_rgba(241,90,36,0.8)]"
          >
            CONTACT US
          </Button>
        </div>
      </div>
    </section>
  );
}
