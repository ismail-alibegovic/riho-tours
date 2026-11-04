"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/data/site";
import { Close, Facebook, Instagram, Menu, Phone, Search } from "./icons";
import { Logo } from "./logo";

export function SiteHeader({ contained = false }: { contained?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // close on route change
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLElement>("a,button")?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href);

  return (
    <header
      className={`relative z-40 flex items-center justify-between gap-6 px-5 pt-5 sm:px-8 sm:pt-7 lg:px-12 lg:pt-8 ${
        contained ? "mx-auto w-full max-w-[1440px]" : ""
      }`}
    >
      <Logo />

      <nav aria-label="Glavna navigacija" className="hidden items-center lg:flex">
        <ul className="flex items-center gap-8 xl:gap-10">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="group relative font-serif text-[1.05rem] leading-none text-mist/85 transition-colors hover:text-mist aria-[current=page]:text-mist"
              >
                {item.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-mist/70 transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:scale-x-100 group-aria-[current=page]:scale-x-100" />
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/putovanja#pretraga"
          aria-label="Pretraži putovanja"
          className="ml-9 grid size-10 place-items-center rounded-full text-mist/85 transition hover:bg-white/10 hover:text-mist"
        >
          <Search />
        </Link>
        <span aria-hidden className="mx-5 h-7 w-px bg-mist/25" />
        <Link
          href="/kontakt"
          className="rounded-lg border border-mist/30 bg-white/5 px-4 py-2.5 text-sm font-semibold text-mist backdrop-blur-md transition hover:border-mist/60 hover:bg-white/15"
        >
          Pošalji upit
        </Link>
      </nav>

      <div className="flex items-center gap-2 lg:hidden">
        <Link
          href="/putovanja#pretraga"
          aria-label="Pretraži putovanja"
          className="grid size-11 place-items-center rounded-full bg-black/20 text-mist backdrop-blur-md"
        >
          <Search />
        </Link>
        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls="mobilni-meni"
          aria-label={open ? "Zatvori meni" : "Otvori meni"}
          onClick={() => setOpen((v) => !v)}
          className="grid size-11 place-items-center rounded-full bg-black/20 text-mist backdrop-blur-md"
        >
          <Menu />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobilni-meni"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Meni"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex flex-col bg-ink/97 px-6 pb-8 pt-6 backdrop-blur-xl lg:hidden"
          >
            <div className="flex items-center justify-between">
              <Logo />
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  toggleRef.current?.focus();
                }}
                aria-label="Zatvori meni"
                className="grid size-11 place-items-center rounded-full border border-mist/20 text-mist"
              >
                <Close />
              </button>
            </div>
            <nav aria-label="Mobilna navigacija" className="mt-14 flex-1">
              <ul className="space-y-1">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * i + 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="flex items-baseline gap-4 border-b border-mist/10 py-4 text-[1.6rem] font-semibold leading-none text-mist aria-[current=page]:text-sand-light"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="space-y-4 text-sm text-fog">
              <a href={site.phones[0].href} className="flex items-center gap-3 text-mist">
                <Phone className="text-sand-light" /> {site.phones[0].display}
              </a>
              <div className="flex gap-3">
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Riho Tours na Facebooku"
                  className="grid size-11 place-items-center rounded-full border border-mist/20 text-mist"
                >
                  <Facebook />
                </a>
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Riho Tours na Instagramu"
                  className="grid size-11 place-items-center rounded-full border border-mist/20 text-mist"
                >
                  <Instagram />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
