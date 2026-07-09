"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import { Logo } from "./Logo";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { navItems, socialLinks } from "@/data/site";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";

// Id section (tanpa "#") milik setiap menu yang mengarah ke "/#id".
const sectionIds = navItems
  .map((item) => item.href.match(/^\/#(.+)$/)?.[1])
  .filter((id): id is string => Boolean(id));

/**
 * Scroll-spy: menentukan section mana yang benar-benar terlihat di viewport.
 * Menggantikan pendekatan lama yang hanya membaca window.location.hash, sehingga
 * status "aktif" tidak lagi nyangkut di section terakhir yang di-klik saat user
 * scroll manual (mis. tetap di "About Us" padahal sudah balik ke section Home).
 */
function useActiveSectionId() {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== "/" || sectionIds.length === 0) {
      setActiveId(null);
      return;
    }

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const visibleIds = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleIds.add(entry.target.id);
          } else {
            visibleIds.delete(entry.target.id);
          }
        });

        // Section paling atas yang sedang terlihat menang saat lebih dari satu.
        const current = sections.find((s) => visibleIds.has(s.id));
        setActiveId(current ? current.id : null);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  return activeId;
}

function useIsActive() {
  const pathname = usePathname();
  const activeSectionId = useActiveSectionId();

  return (href: NavItem["href"]) => {
    // MENU HOME: Aktif jika di "/" dan tidak ada section yang sedang terlihat.
    if (href === "/") {
      return pathname === "/" && !activeSectionId;
    }

    const sectionMatch = href.match(/^\/#(.+)$/);

    if (sectionMatch) {
      return pathname === "/" && activeSectionId === sectionMatch[1];
    }

    return pathname.startsWith(href);
  };
}

function SocialRow({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {socialLinks.map((social) => (
        <a
          key={social.platform}
          href={social.href}
          aria-label={social.label}
          {...(social.href.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-full border border-white text-[0.7rem] transition-colors",
            social.platform === "linkedin"
              ? "bg-primary text-white hover:bg-primary-strong"
              : "text-white/75 hover:text-white",
          )}
        >
          <SocialIcon platform={social.platform} />
        </a>
      ))}
    </div>
  );
}

function normalizeHref(href: string) {
  const [path, hash = ""] = href.split(/(?=#)/);

  return {
    path,
    hash,
    href: `${path}${hash}`,
  };
}

export function Navbar() {
  const isActive = useIsActive();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pendingHash, setPendingHash] = useState<string | null>(null);

  // Setelah pindah halaman ke "/", scroll ke section yang ditarget (jika ada)
  // sekali saja — mencegah hash lama menumpuk dengan hash baru yang di-push.
  useEffect(() => {
    if (pathname !== "/" || !pendingHash) return;

    const element = document.querySelector(pendingHash);

    if (element) {
      window.history.replaceState(null, "", `/${pendingHash}`);
      element.scrollIntoView({ behavior: "smooth" });
    }

    setPendingHash(null);
  }, [pathname, pendingHash]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const { path, hash: targetHash } = normalizeHref(href);

    e.preventDefault();

    if (pathname === path) {
      if (!targetHash) {
        if (window.location.hash) {
          window.history.replaceState(null, "", window.location.pathname);
        }

        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const element = document.querySelector(targetHash);

        if (element) {
          window.history.replaceState(null, "", `${path}${targetHash}`);
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      // Push path-nya saja (tanpa hash) lalu scroll manual setelah section
      // ter-render, supaya router tidak menggabungkan hash lama + hash baru.
      setPendingHash(targetHash || null);
      router.push(path);
    }

    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-ink/80 backdrop-blur-md">
      <nav className="container-page flex items-center justify-between gap-4 py-3.5">
        <Logo />

        {/* Desktop nav */}
        <ul className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className={cn(
                  "text-xs uppercase tracking-wide transition-colors",
                  isActive(item.href)
                    ? "text-primary font-semibold"
                    : "text-white/75 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <SocialRow className="hidden lg:flex" />

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-white lg:hidden"
        >
          {open ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/5 bg-ink/95 px-5 py-4 lg:hidden">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={cn(
                    "block rounded-lg px-3 py-2.5 text-sm font-semibold uppercase tracking-wide",
                    isActive(item.href)
                      ? "bg-white/5 text-primary"
                      : "text-white/80 hover:bg-white/5 hover:text-white",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <SocialRow className="mt-4 px-3" />
        </div>
      )}
    </header>
  );
}