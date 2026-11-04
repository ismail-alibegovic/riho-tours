import Link from "next/link";
import { getTrip, trips } from "@/data/trips";
import type { Trip } from "@/data/types";
import { ArrowRight } from "../icons";
import { Reveal } from "../reveal";
import { DisplayTitle, Eyebrow } from "../section-heading";
import { TripCard } from "../trip-card";

const pick = (slug: string) => getTrip(slug) as Trip;

export function FeaturedTrips() {
  const feature = pick("nova-godina-boka-kotorska");
  const tall = pick("advent-u-pragu-i-dresdenu-avio");
  const row = [
    pick("milano-genova-lugano-como-verona"),
    pick("festival-lala-u-istanbulu"),
    pick("valentinovo-u-becu-scs-shopping"),
  ];
  const wide = pick("praznik-mimoze-herceg-novi-3-dana");
  const side = pick("advent-u-tvrdi-osijek");

  return (
    <section id="aktuelno" className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-36">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-7">
          <Eyebrow index="01">Aktuelna putovanja</Eyebrow>
          <DisplayTitle before="Sezona" em="koja" after="dolazi" className="mt-6" />
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-5 lg:pb-2">
          <p className="max-w-md text-[0.98rem] font-light leading-relaxed text-fog sm:text-[1.02rem]">
            Adventi Srednje Evrope, novogodišnja Boka, Valentinovo u Beču i Budimpešti,
            Istanbul u vrijeme lala – {trips.length} objavljenih aranžmana sa provjerenim
            cijenama i terminima.
          </p>
          <Link
            href="/putovanja"
            className="group mt-6 inline-flex items-center gap-3 border-b border-mist/30 pb-1.5 text-sm font-medium uppercase tracking-[0.16em] text-mist transition hover:border-mist"
          >
            Sva putovanja
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>

      {/* Mobile & tablet: swipeable row */}
      <ul
        className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:hidden"
        aria-label="Aktuelna putovanja"
      >
        {[feature, tall, ...row, side, wide].map((t) => (
          <li key={t.slug} className="w-[78vw] max-w-[22rem] shrink-0 snap-start">
            <TripCard trip={t} variant="portrait" sizes="(min-width:640px) 22rem, 78vw" />
          </li>
        ))}
      </ul>

      <div className="mt-20 hidden gap-x-6 gap-y-14 lg:grid lg:grid-cols-12">
        <Reveal className="lg:col-span-8">
          <TripCard trip={feature} variant="feature" sizes="(min-width:1024px) 62vw, 100vw" />
        </Reveal>
        <Reveal delay={0.12} className="lg:col-span-4 lg:pt-24">
          <TripCard trip={tall} variant="portrait" sizes="(min-width:1024px) 30vw, 100vw" />
        </Reveal>

        {row.map((t, i) => (
          <Reveal key={t.slug} delay={0.08 * i} className={`lg:col-span-4 ${i === 1 ? "lg:-mt-6" : ""} ${i === 2 ? "lg:mt-10" : ""}`}>
            <TripCard
              trip={t}
              variant={i === 1 ? "portrait" : "landscape"}
              sizes="(min-width:1024px) 30vw, 100vw"
            />
          </Reveal>
        ))}

        <Reveal className="lg:col-span-5 lg:mt-24">
          <TripCard trip={side} variant="compact" sizes="(min-width:1024px) 38vw, 100vw" />
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7">
          <TripCard trip={wide} variant="landscape" sizes="(min-width:1024px) 46vw, 100vw" />
        </Reveal>
      </div>
    </section>
  );
}
