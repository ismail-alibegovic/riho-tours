import Image from "next/image";
import Link from "next/link";
import { img } from "@/data/images";
import { categories, externalCollections } from "@/data/site";
import { trips } from "@/data/trips";
import type { CategoryId, TripImage } from "@/data/types";
import { aranzmanWord } from "@/lib/format";
import { ArrowUpRight } from "../icons";
import { Reveal } from "../reveal";
import { DisplayTitle, Eyebrow } from "../section-heading";

const tiles: { id: CategoryId; image: TripImage; className: string; ratio: string }[] = [
  { id: "adventi", image: img.pragAdvent, className: "lg:col-span-4 lg:row-span-2", ratio: "aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[36rem]" },
  { id: "istanbul", image: img.istanbulBosfor, className: "lg:col-span-5", ratio: "aspect-[4/3] lg:aspect-[16/10]" },
  { id: "metropole", image: img.budimpestaNoc, className: "lg:col-span-3", ratio: "aspect-[4/3] lg:aspect-[4/5]" },
  { id: "primorje", image: img.kotorZaljev, className: "lg:col-span-3", ratio: "aspect-[4/3] lg:aspect-[4/5]" },
  { id: "balkan", image: img.ohridPortret, className: "lg:col-span-5", ratio: "aspect-[4/3] lg:aspect-[16/10]" },
];

const count = (id: CategoryId) => trips.filter((t) => t.categories.includes(id)).length;

export function Destinations() {
  return (
    <section id="destinacije" className="scroll-mt-6 bg-ink-2 py-16 sm:py-24 lg:py-36">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <Eyebrow index="02">Istražite destinacije</Eyebrow>
            <DisplayTitle before="Od Bosfora" em="do" after="Dunava" className="mt-6" />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <p className="text-[0.98rem] font-light leading-relaxed text-fog sm:text-[1.02rem]">
              Ponuda organizovana onako kako putujete – po temama, regijama i dužini
              putovanja. Odaberite smjer i pogledajte aktuelne termine.
            </p>
          </Reveal>
        </div>

        {/* Mobile: swipeable tiles */}
        <ul
          className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 sm:hidden"
          aria-label="Destinacije"
        >
          {tiles.map((t) => (
            <li key={t.id} className="w-[64vw] shrink-0 snap-start">
              <Link
                href={`/putovanja?kategorija=${t.id}`}
                className="relative block aspect-[3/4] overflow-hidden rounded-[14px] bg-petrol"
              >
                <Image src={t.image.src} alt={t.image.alt} fill sizes="64vw" className="object-cover" />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-4">
                  <span className="block font-serif text-[1.7rem] italic leading-none text-mist">
                    {categories[t.id].label}
                  </span>
                  <span className="mt-1.5 block text-[0.8rem] text-mist/75">
                    {count(t.id)} {aranzmanWord(count(t.id))}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-16 hidden gap-5 sm:grid sm:grid-cols-2 lg:mt-20 lg:grid-cols-12 lg:gap-6">
          {tiles.map((t, i) => (
            <Reveal key={t.id} delay={0.06 * i} className={`${t.className} min-w-0`}>
              <Link
                href={`/putovanja?kategorija=${t.id}`}
                className={`group relative block w-full overflow-hidden rounded-[16px] bg-petrol ${t.ratio}`}
              >
                <Image
                  src={t.image.src}
                  alt={t.image.alt}
                  fill
                  sizes="(min-width:1024px) 40vw, (min-width:640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-editorial)] group-hover:scale-[1.05]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-ink/10" />
                <span className="absolute left-5 top-5 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-mist/85">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                  <span>
                    <span className="block font-serif text-[clamp(1.8rem,2.6vw,2.6rem)] italic leading-none text-mist">
                      {categories[t.id].label}
                    </span>
                    <span className="mt-2 block text-sm text-mist/75">
                      {categories[t.id].description} · {count(t.id)}{" "}
                      {aranzmanWord(count(t.id))}
                    </span>
                  </span>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-mist/40 text-mist transition group-hover:border-mist group-hover:bg-mist group-hover:text-ink">
                    <ArrowUpRight className="size-4" />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}

        </div>
          <Reveal delay={0.2} className="mt-6">
            <div className="flex h-full flex-col gap-6 rounded-[16px] border border-mist/12 p-6 lg:flex-row lg:items-center lg:gap-12 lg:p-8">
              <div className="lg:w-[28%] lg:shrink-0">
                <p className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-sand-light">
                  Još u ponudi agencije
                </p>
                <p className="mt-3 font-serif text-[1.6rem] italic leading-tight text-mist">
                  Ljetovanja, hoteli na Jadranu i zimovanja
                </p>
              </div>
              <ul className="grid flex-1 divide-y divide-mist/10 border-t border-mist/10 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4 lg:divide-y-0 lg:border-t-0">
                {externalCollections.map((c) => (
                  <li key={c.href}>
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between gap-4 py-3.5 lg:border-l lg:border-mist/10 lg:py-1 lg:pl-5"
                    >
                      <span>
                        <span className="block text-[0.98rem] text-mist">{c.title}</span>
                        <span className="block text-[0.8rem] text-fog">{c.text}</span>
                      </span>
                      <ArrowUpRight className="size-4 shrink-0 text-fog transition group-hover:text-mist" />
                      <span className="sr-only">(otvara rihotours.ba)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
      </div>
    </section>
  );
}
