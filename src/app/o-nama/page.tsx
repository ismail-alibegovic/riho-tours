import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "@/components/icons";
import { FinalCta } from "@/components/final-cta";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/section-heading";
import { img } from "@/data/images";
import { services, site } from "@/data/site";

export const metadata: Metadata = {
  title: "O nama",
  description:
    "Riho Tours je porodična turistička agencija iz Breze sa dugogodišnjim iskustvom – grupna i individualna putovanja po vašoj mjeri.",
};

export default function AboutPage() {
  const registry = [
    { k: "Naziv", v: site.legalName },
    { k: "Adresa", v: `${site.address.street}, ${site.address.city}` },
    { k: "ID broj", v: site.registry.id },
    { k: "PDV broj", v: site.registry.vat },
    { k: "Registarski broj", v: site.registry.court },
    { k: "Licenca organizatora putovanja", v: site.registry.license },
    { k: "Udruženje", v: "Član UTABIH – Udruženja turističkih agencija BiH" },
    { k: "Transakcijski račun", v: site.bank.account },
    { k: "Devizni račun (IBAN)", v: `${site.bank.iban} · SWIFT ${site.bank.swift}` },
  ];

  return (
    <>
      <PageHero image={img.ohridKaneo}>
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-sand-light">O nama</p>
        <h1 className="mt-5 font-sans text-[clamp(2.8rem,7vw,6rem)] font-normal uppercase leading-[0.95] text-mist">
          Putovanja{" "}
          <span className="font-serif text-[1.08em] normal-case italic">po Vašoj</span> mjeri
        </h1>
      </PageHero>

      <main id="sadrzaj">
        <section className="mx-auto grid max-w-[1440px] gap-14 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:px-12 lg:py-28">
          <Reveal className="lg:col-span-6">
            <Eyebrow>Riho Tours</Eyebrow>
            <p className="mt-8 font-serif text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.2] text-mist">
              Porodična turistička agencija sa dugogodišnjim iskustvom u turizmu, koja organizuje
              grupna i individualna putovanja.
            </p>
            <div className="mt-8 max-w-xl space-y-5 text-[1.04rem] font-light leading-relaxed text-mist/80">
              <p>
                Naš uspjeh rezultat je dugogodišnjeg rada i truda, kao i dobre saradnje sa domaćim
                i stranim partnerima. Svako putovanje prilagođavamo klijentu – zato kažemo:
                krojimo putovanja po Vašoj mjeri.
              </p>
              <p>
                Sjedište agencije je u Brezi, a polasci grupnih putovanja organizuju se iz
                Sarajeva, Breze, Visokog, Kaknja, Zenice, Doboja, Mostara i drugih gradova BiH,
                prema programu svakog aranžmana.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[16px]">
              <Image src={img.budva.src} alt={img.budva.alt} fill sizes="(min-width:1024px) 38vw, 100vw" className="object-cover" />
            </div>
          </Reveal>
        </section>

        <section className="bg-ink-2 py-20 lg:py-28">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <Reveal>
              <Eyebrow>Usluge</Eyebrow>
            </Reveal>
            <ul className="mt-10 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s, i) => (
                <li key={s.title} className="border-t border-mist/12 py-7">
                  <span className="text-xs tracking-[0.22em] text-sand-light">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="mt-3 font-sans text-[1.2rem] uppercase tracking-[0.04em] text-mist">{s.title}</h2>
                  <p className="mt-2 text-[0.95rem] font-light leading-relaxed text-fog">{s.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <Eyebrow>Podaci o agenciji</Eyebrow>
              <a
                href={site.terms}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 border-b border-mist/30 pb-1.5 text-sm uppercase tracking-[0.16em] text-mist hover:border-mist"
              >
                Opšti uslovi putovanja <ArrowUpRight className="size-4" />
              </a>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-8">
              <dl className="divide-y divide-mist/10 border-y border-mist/10">
                {registry.map((r) => (
                  <div key={r.k} className="grid gap-1 py-4 sm:grid-cols-[16rem_1fr] sm:gap-6">
                    <dt className="text-[0.75rem] uppercase tracking-[0.18em] text-fog">{r.k}</dt>
                    <dd className="break-words text-[1rem] text-mist">{r.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>
        <FinalCta />
      </main>
    </>
  );
}
