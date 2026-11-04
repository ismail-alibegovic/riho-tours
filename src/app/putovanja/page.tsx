import type { Metadata } from "next";
import { Suspense } from "react";
import { FinalCta } from "@/components/final-cta";
import { PageHero } from "@/components/page-hero";
import { TripBrowser, TripGridFallback } from "@/components/trips/trip-browser";
import { img } from "@/data/images";
import { trips } from "@/data/trips";

export const metadata: Metadata = {
  title: "Sva putovanja",
  description:
    "Aktuelni aranžmani Riho Toursa: adventi, Istanbul, evropske metropole, praznici i jednodnevni izleti – pretraga po destinaciji, mjesecu, prevozu i cijeni.",
};

export default function TripsPage() {
  return (
    <>
      <PageHero image={img.venecijaSalute}>
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-sand-light">
          Ponuda · {trips.length} aranžmana
        </p>
        <h1 className="mt-5 font-sans text-[clamp(2.8rem,7vw,6rem)] font-normal uppercase leading-[0.95] text-mist">
          Sva{" "}
          <span className="font-serif text-[1.08em] normal-case italic">putovanja</span>
        </h1>
        <p className="mt-5 max-w-xl text-[1.05rem] font-light leading-relaxed text-mist/85">
          Pretražite objavljene aranžmane po destinaciji, mjesecu polaska, prevozu i cijeni.
          Sve cijene su u KM, prema objavi agencije.
        </p>
      </PageHero>
      <main id="sadrzaj" className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <Suspense fallback={<TripGridFallback trips={trips} />}>
          <TripBrowser trips={trips} />
        </Suspense>
      </main>
      <FinalCta />
    </>
  );
}
