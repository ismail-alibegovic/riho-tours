import Link from "next/link";
import { categories, nav, site } from "@/data/site";
import type { CategoryId } from "@/data/types";
import { Facebook, Instagram } from "./icons";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="bg-ink pt-14 text-fog sm:pt-20">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 border-b border-mist/10 pb-10 sm:gap-12 sm:pb-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo onPhoto={false} />
            <p className="mt-6 max-w-sm font-serif text-[1.45rem] italic leading-snug text-mist">
              Krojimo putovanja po Vašoj mjeri.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Riho Tours na Facebooku"
                className="grid size-11 place-items-center rounded-full border border-mist/20 text-mist transition hover:border-mist hover:bg-white/10"
              >
                <Facebook />
              </a>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Riho Tours na Instagramu"
                className="grid size-11 place-items-center rounded-full border border-mist/20 text-mist transition hover:border-mist hover:bg-white/10"
              >
                <Instagram />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-8">
            <div className="col-span-2 sm:col-span-1">
              <h2 className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-sand-light">
                Kontakt
              </h2>
              <address className="mt-4 space-y-2 text-[0.95rem] not-italic">
                <a href={site.mapUrl} target="_blank" rel="noreferrer" className="block text-mist hover:underline">
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.country}
                </a>
                {site.phones.map((p) => (
                  <a key={p.raw} href={p.href} className="block text-mist hover:underline">
                    {p.display}
                  </a>
                ))}
                <p className="pt-2 text-[0.85rem]">{site.hours}</p>
                <p className="text-[0.85rem]">
                  Reklamacije:{" "}
                  <a href={site.complaints.href} className="text-mist hover:underline">
                    {site.complaints.display}
                  </a>
                </p>
              </address>
            </div>
            <div>
              <h2 className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-sand-light">
                Putovanja
              </h2>
              <ul className="mt-4 space-y-2 text-[0.9rem] sm:text-[0.95rem]">
                {(Object.keys(categories) as CategoryId[]).map((id) => (
                  <li key={id}>
                    <Link href={`/putovanja?kategorija=${id}`} className="text-mist hover:underline">
                      {categories[id].label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-sand-light">
                Agencija
              </h2>
              <ul className="mt-4 space-y-2 text-[0.9rem] sm:text-[0.95rem]">
                {nav.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="text-mist hover:underline">
                      {n.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a href={site.terms} target="_blank" rel="noreferrer" className="text-mist hover:underline">
                    Opšti uslovi putovanja
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 py-8 text-[0.78rem] leading-relaxed lg:flex-row lg:items-start lg:justify-between">
          <p className="max-w-2xl">
            {site.legalName} · ID {site.registry.id} · PDV {site.registry.vat} · Reg.{" "}
            {site.registry.court} · Licenca {site.registry.license} · {site.registry.membership}
          </p>
          <p className="max-w-md lg:text-right">
            Demo redizajn – nije službena stranica agencije. Ponude preuzete sa rihotours.ba;
            fotografije: Riho Tours i Unsplash (Unsplash License).
          </p>
        </div>
      </div>
    </footer>
  );
}
