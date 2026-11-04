import { About } from "@/components/home/about";
import { Destinations } from "@/components/home/destinations";
import { FeaturedTrips } from "@/components/home/featured-trips";
import { Hero } from "@/components/home/hero";
import { Services } from "@/components/home/services";
import { TripFinder } from "@/components/home/trip-finder";
import { FinalCta } from "@/components/final-cta";
import { getTrip, heroSlugs, trips } from "@/data/trips";
import type { Trip } from "@/data/types";

export default function HomePage() {
  const slides = heroSlugs.map((s) => {
    const t = getTrip(s) as Trip;
    return {
      slug: t.slug,
      name: t.name,
      tagline: t.tagline,
      country: t.country,
      region: t.region,
      image: t.image,
      heroImage: t.heroImage ?? t.image,
      // never repeat the background photo inside the floating card
      cardImage: t.heroImage ? t.image : (t.imageAlt ?? t.image),
      dates: t.dates,
      priceFrom: t.priceFrom,
      transport: t.transport,
      duration: t.duration,
    };
  });

  return (
    <>
      <Hero slides={slides} finder={<TripFinder trips={trips} variant="hero" />} />
      <main id="sadrzaj">
        <TripFinder trips={trips} className="lg:hidden" />
        <FeaturedTrips />
        <Destinations />
        <Services />
        <About />
        <FinalCta />
      </main>
    </>
  );
}
