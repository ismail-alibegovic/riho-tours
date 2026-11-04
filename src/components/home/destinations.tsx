import Image from "next/image";
import Link from "next/link";
import { img } from "@/data/images";
import { categories, externalCollections } from "@/data/site";
import { trips } from "@/data/trips";
import type { CategoryId, TripImage } from "@/data/types";
import { aranzmanWord } from "@/lib/format";
import { ArrowUpRight } from "../icons";
import { Reveal } from "../reveal";
import { SectionHeader } from "../section-heading";

const tiles: { id: CategoryId; image: TripImage; className: string }[] = [
  { id: "adventi", image: img.pragAdvent, className: "lg:col-span-4 lg:row-span-2" },
  { id: "istanbul", image: img.istanbulBosfor, className: "lg:col-span-5" },
  { id: "metropole", image: img.budimpestaNoc, className: "lg:col-span-3" },
  { id: "primorje", image: img.kotorZaljev, className: "lg:col-span-3" },
  { id: "balkan", image: img.ohridPortret, className: "lg:col-span-5" },
];

const count = (id: CategoryId) => trips.filter((t) => t.categories.includes(id)).length;

function Tile({ id, image, tall }: { id: CategoryId; image: TripImage; tall?: boolean }) {
  const n = count(id);
  return (
    <Link
      href={`/putovanja?kategorija=${id}`}
      className={`group relative block overflow-hidden rounded-xl bg-petrol ${
        tall ? "aspect-[3/4] sm:aspect-[4/3] lg:aspect-auto lg:h-full" : "aspect-[3/4] sm:aspect-[4/3] lg:aspect-auto lg:h-full"
      }`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width:1024px) 40vw, (min-width:640px) 50vw, 70vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/5 to-transparent" />
      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
        <span>
          <span className="block text-xl font-semibold text-mist sm:text-2xl">{categories[id].label}</span>
          <span className="mt-1 block text-sm text-mist/75">
            {n} {aranzmanWord(n)} · {categories[id].description}
          </span>
        </span>
        <ArrowUpRight className="mb-1 size-5 shrink-0 text-mist/80 transition group-hover:text-mist" />
      </span>
    </Link>
  );
}

export function Destinations() {
  return (
    <section id="destinacije" className="scroll-mt-6 bg-ink-2 py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <SectionHeader
            label="Destinacije"
            title="Gdje putujemo"
            intro="Ponuda složena po vrsti putovanja – od jednodnevnih adventskih izleta do Istanbula avionom iz Sarajeva."
          />
        </Reveal>

        {/* Phones: swipeable tiles */}
        <ul className="no-scrollbar -mx-5 mt-8 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 sm:hidden" aria-label="Destinacije">
          {tiles.map((t) => (
            <li key={t.id} className="w-[68vw] shrink-0 snap-start">
              <Tile id={t.id} image={t.image} />
            </li>
          ))}
        </ul>

        <div className="mt-12 hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[19rem] lg:gap-6">
          {tiles.map((t, i) => (
            <Reveal key={t.id} delay={0.05 * i} className={`${t.className} min-w-0`}>
              <Tile id={t.id} image={t.image} tall={i === 0} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <div className="grid gap-x-10 gap-y-1 border-t border-mist/10 pt-6 sm:grid-cols-2 lg:grid-cols-[1fr_repeat(4,auto)] lg:items-center">
            <p className="mb-3 text-[0.95rem] text-fog lg:mb-0">Ljetovanja, hoteli i zimovanje – ponuda na rihotours.ba:</p>
            {externalCollections.map((c) => (
              <a
                key={c.href}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                title={c.text}
                className="inline-flex items-center gap-1.5 py-2 text-[0.95rem] font-medium text-mist hover:text-sand-light"
              >
                {c.title}
                <ArrowUpRight className="size-3.5" />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
