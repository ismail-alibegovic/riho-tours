import Image from "next/image";
import Link from "next/link";
import { img } from "@/data/images";
import { site } from "@/data/site";
import { ArrowRight } from "../icons";
import { Reveal } from "../reveal";
import { Eyebrow, SectionTitle } from "../section-heading";

const facts = [
  { k: "Sjedište", v: `${site.address.street}, ${site.address.city}` },
  { k: "Licenca", v: site.registry.license },
  { k: "Udruženje", v: "Član UTABIH" },
  { k: "Radno vrijeme", v: "Pon – pet, 08 – 16 h" },
];

export function About() {
  return (
    <section className="bg-ink-2 py-16 sm:py-24 lg:py-28">
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12">
        <Reveal className="lg:col-span-5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl sm:aspect-[5/4]">
            <Image src={img.budva.src} alt={img.budva.alt} fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
          </div>
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <Eyebrow>O agenciji</Eyebrow>
            <SectionTitle className="mt-3">Porodična agencija iz Breze</SectionTitle>
            <div className="mt-5 space-y-4 text-[0.98rem] leading-relaxed text-mist/80">
              <p>
                Riho Tours je porodična turistička agencija sa dugogodišnjim iskustvom. Organizujemo
                grupna i individualna putovanja, uz saradnju sa domaćim i stranim partnerima.
              </p>
              <p>
                Pored ponude na ovoj stranici: ljetovanja u Turskoj, Egiptu, Tunisu, na Jadranu i u
                Albaniji, bračna i poslovna putovanja, teambuilding, wellness, zimovanja, avio karte i
                putno zdravstveno osiguranje.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-mist/10 pt-6">
              {facts.map((f) => (
                <div key={f.k}>
                  <dt className="text-[0.8rem] text-fog">{f.k}</dt>
                  <dd className="mt-1 text-[0.93rem] font-medium text-mist">{f.v}</dd>
                </div>
              ))}
            </dl>
            <Link
              href="/o-nama"
              className="group mt-8 inline-flex items-center gap-2 text-[0.95rem] font-medium text-mist hover:text-sand-light"
            >
              Više o agenciji
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
