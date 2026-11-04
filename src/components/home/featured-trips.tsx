import Link from "next/link";
import { getTrip, trips } from "@/data/trips";
import type { Trip } from "@/data/types";
import { ArrowRight } from "../icons";
import { Reveal } from "../reveal";
import { SectionHeader } from "../section-heading";
import { TripCard } from "../trip-card";

const pick = (slug: string) => getTrip(slug) as Trip;

export function FeaturedTrips() {
  const feature = pick("nova-godina-boka-kotorska");
  const side = [pick("advent-u-pragu-i-dresdenu-avio"), pick("advent-u-budimpesti")];
  const row = [
    pick("festival-lala-u-istanbulu"),
    pick("milano-genova-lugano-como-verona"),
    pick("valentinovo-u-becu-scs-shopping"),
    pick("praznik-mimoze-herceg-novi-3-dana"),
  ];
  const all = [feature, ...side, ...row];

  return (
    <section id="aktuelno" className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <Reveal>
        <SectionHeader
          label="Aktuelna putovanja"
          title="Termini za zimu i proljeće"
          intro="Adventi, doček Nove godine, Valentinovo i Istanbul u vrijeme lala. Cijene i termini prema objavi agencije."
          action={
            <Link
              href="/putovanja"
              className="group inline-flex items-center gap-2 text-[0.95rem] font-medium text-mist hover:text-sand-light"
            >
              Sva putovanja ({trips.length})
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          }
        />
      </Reveal>

      {/* Phones & tablets: swipeable row */}
      <ul
        className="no-scrollbar -mx-5 mt-8 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:hidden"
        aria-label="Aktuelna putovanja"
      >
        {all.map((t) => (
          <li key={t.slug} className="w-[80vw] max-w-[21rem] shrink-0 snap-start">
            <TripCard trip={t} variant="landscape" sizes="(min-width:640px) 21rem, 80vw" />
          </li>
        ))}
      </ul>

      {/* Desktop: one large offer, two beside it, then a row of four */}
      <div className="mt-12 hidden gap-x-6 gap-y-12 lg:grid lg:grid-cols-12">
        <Reveal className="col-span-8">
          <TripCard trip={feature} variant="feature" sizes="62vw" />
        </Reveal>
        <div className="col-span-4 flex flex-col gap-y-8">
          {side.map((t, i) => (
            <Reveal key={t.slug} delay={0.06 * (i + 1)}>
              <TripCard trip={t} variant="wide" sizes="30vw" />
            </Reveal>
          ))}
        </div>
        {row.map((t, i) => (
          <Reveal key={t.slug} delay={0.05 * i} className="col-span-3">
            <TripCard trip={t} variant="portrait" sizes="24vw" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
