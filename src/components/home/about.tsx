import Image from "next/image";
import Link from "next/link";
import { img } from "@/data/images";
import { site } from "@/data/site";
import { ArrowRight } from "../icons";
import { Reveal } from "../reveal";
import { DisplayTitle, Eyebrow } from "../section-heading";

const facts = [
  { k: "Sjedište", v: `${site.address.street}, ${site.address.city}` },
  { k: "Licenca organizatora putovanja", v: site.registry.license },
  { k: "Udruženje", v: "Član UTABIH" },
  { k: "Radno vrijeme", v: site.hours },
];

export function About() {
  return (
    <section className="bg-ink-2 py-24 lg:py-36">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-6 lg:px-12">
        <Reveal className="relative lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[16px]">
            <Image
              src={img.venecijaKanal.src}
              alt={img.venecijaKanal.alt}
              fill
              sizes="(min-width:1024px) 38vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-8 right-4 w-[46%] overflow-hidden rounded-[14px] ring-[6px] ring-ink-2 sm:right-8 lg:-right-10">
            <div className="relative aspect-[3/4]">
              <Image
                src={img.ohridPortret.src}
                alt={img.ohridPortret.alt}
                fill
                sizes="(min-width:1024px) 18vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-10">
          <Reveal>
            <Eyebrow index="04">O Riho Toursu</Eyebrow>
            <DisplayTitle before="Porodična" em="agencija" after="iz Breze" className="mt-6" />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 max-w-xl space-y-5 text-[1.04rem] font-light leading-relaxed text-mist/80">
              <p>
                Riho Tours je porodična turistička agencija sa dugogodišnjim iskustvom u
                turizmu. Organizujemo grupna i individualna putovanja, a uspjeh gradimo
                godinama rada, truda i dobre saradnje sa domaćim i stranim partnerima.
              </p>
              <p>
                Od ljetovanja u Turskoj, Egiptu, Tunisu, na Jadranu, u Crnoj Gori i Albaniji,
                do bračnih i poslovnih putovanja, teambuildinga, wellnessa i zimovanja – uz
                avio karte i putno zdravstveno osiguranje na jednom mjestu.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <dl className="mt-12 grid gap-x-8 gap-y-6 border-t border-mist/12 pt-8 sm:grid-cols-2">
              {facts.map((f) => (
                <div key={f.k}>
                  <dt className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-fog">
                    {f.k}
                  </dt>
                  <dd className="mt-1.5 text-[1rem] text-mist">{f.v}</dd>
                </div>
              ))}
            </dl>
            <Link
              href="/o-nama"
              className="group mt-10 inline-flex items-center gap-3 border-b border-mist/30 pb-1.5 text-sm font-medium uppercase tracking-[0.16em] text-mist transition hover:border-mist"
            >
              Više o agenciji
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
