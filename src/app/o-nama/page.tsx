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
        <p className="text-sm font-medium text-sand-light">O nama</p>
        <h1 className="mt-3 text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-mist">Putovanja po Vašoj mjeri</h1>
      </PageHero>

      <main id="sadrzaj">
        <section className="mx-auto grid max-w-[1440px] gap-14 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:px-12 lg:py-28">
          <Reveal className="lg:col-span-6">
            <Eyebrow>Riho Tours</Eyebrow>
            <p className="mt-4 text-[clamp(1.4rem,2.4vw,1.9rem)] font-semibold leading-[1.3] tracking-[-0.01em] text-mist">
              Porodična turistička agencija sa dugogodišnjim iskustvom u turizmu, koja organizuje
              grupna i individualna putovanja.
            </p>
            <div className="mt-6 max-w-xl space-y-4 text-[1rem] leading-relaxed text-mist/80">
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
              {services.map((s) => (
                <li key={s.title} className="border-t border-mist/10 py-6">
                  <h2 className="font-semibold text-mist">{s.title}</h2>
                  <p className="mt-1.5 text-[0.93rem] leading-relaxed text-fog">{s.text}</p>
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
                className="mt-5 inline-flex items-center gap-2 text-[0.95rem] font-medium text-mist hover:text-sand-light"
              >
                Opšti uslovi putovanja <ArrowUpRight className="size-4" />
              </a>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-8">
              <dl className="divide-y divide-mist/10 border-y border-mist/10">
                {registry.map((r) => (
                  <div key={r.k} className="grid gap-1 py-4 sm:grid-cols-[16rem_1fr] sm:gap-6">
                    <dt className="text-[0.85rem] text-fog">{r.k}</dt>
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
