import Image from "next/image";
import Link from "next/link";
import type { Trip } from "@/data/types";
import { formatKM } from "@/lib/format";
import { ArrowUpRight, Bus, Calendar, Clock, Plane } from "./icons";

type Variant = "feature" | "portrait" | "landscape" | "compact";

const ratio: Record<Variant, string> = {
  feature: "aspect-[4/5] sm:aspect-[16/11] lg:aspect-[16/12]",
  portrait: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
  compact: "aspect-[3/2]",
};

export function TripCard({
  trip,
  variant = "portrait",
  sizes = "(min-width:1024px) 33vw, 100vw",
  className = "",
}: {
  trip: Trip;
  variant?: Variant;
  sizes?: string;
  className?: string;
}) {
  const TransportIcon = trip.transport === "avio" ? Plane : Bus;
  const isFeature = variant === "feature";
  return (
    <article className={`group relative ${className}`}>
      <Link
        href={`/putovanja/${trip.slug}`}
        className="block rounded-[16px] focus-visible:outline-offset-4"
      >
        <div className={`relative overflow-hidden rounded-[16px] bg-petrol ${ratio[variant]}`}>
          <Image
            src={trip.image.src}
            alt={trip.image.alt}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-editorial)] group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/5 to-transparent" />
          <div className="absolute left-4 top-4 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/50 px-2.5 py-1 text-[0.66rem] sm:px-3 sm:py-1.5 sm:text-[0.7rem] font-medium uppercase tracking-[0.14em] text-mist backdrop-blur-md">
              <TransportIcon className="size-3.5" />
              {trip.transport === "avio" ? "Avio" : "Bus"}
            </span>
          </div>
          <span className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-mist/90 text-ink opacity-0 transition-all duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 max-lg:hidden">
            <ArrowUpRight className="size-4" />
          </span>
          {isFeature && (
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <p className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-mist/80">
                {trip.country} · {trip.region}
              </p>
              <h3 className="mt-2 font-sans text-[clamp(2rem,4vw,3.4rem)] font-normal uppercase leading-[0.95] text-mist">
                {trip.name}
              </h3>
              <p className="mt-2 font-serif text-[1.35rem] italic text-mist/90">{trip.tagline}</p>
            </div>
          )}
        </div>

        <div className={`flex items-start justify-between gap-5 ${isFeature ? "pt-5" : "pt-4"}`}>
          <div className="min-w-0">
            {!isFeature && (
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-fog">
                {trip.country}
              </p>
            )}
            <h3
              className={`${
                isFeature ? "text-[1.05rem] text-mist/85" : "mt-1 text-[1.12rem] text-mist"
              } font-medium leading-snug`}
            >
              {trip.title}
            </h3>
            <dl className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1 text-[0.84rem] text-fog">
              <div className="flex items-center gap-1.5">
                <dt className="sr-only">Termin</dt>
                <Calendar className="size-3.5 text-sand-light" />
                <dd>{trip.dates.length > 1 ? `${trip.dates.length} termina od ${trip.dates[0]}` : trip.dates[0]}</dd>
              </div>
              <div className="flex items-center gap-1.5">
                <dt className="sr-only">Trajanje</dt>
                <Clock className="size-3.5 text-sand-light" />
                <dd>{trip.duration}</dd>
              </div>
            </dl>
          </div>
          <p className="shrink-0 text-right">
            <span className="block text-[0.68rem] uppercase tracking-[0.18em] text-fog">od</span>
            <span className="block font-serif text-[1.7rem] leading-none text-mist">
              {formatKM(trip.priceFrom)}
            </span>
          </p>
        </div>
      </Link>
    </article>
  );
}

/** Compact horizontal card for long lists on phones. */
export function TripRow({ trip, className = "" }: { trip: Trip; className?: string }) {
  const TransportIcon = trip.transport === "avio" ? Plane : Bus;
  return (
    <article className={className}>
      <Link
        href={`/putovanja/${trip.slug}`}
        className="grid grid-cols-[6.75rem_1fr] gap-4 rounded-[14px] border border-mist/10 bg-ink-2/70 p-2.5 pr-4 transition active:bg-ink-2"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-[10px] bg-petrol">
          <Image src={trip.image.src} alt={trip.image.alt} fill sizes="7rem" className="object-cover" />
        </div>
        <div className="flex min-w-0 flex-col py-1">
          <p className="flex items-center gap-1.5 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-fog">
            <TransportIcon className="size-3 text-sand-light" />
            {trip.country}
          </p>
          <h3 className="mt-1 line-clamp-2 text-[0.98rem] font-medium leading-snug text-mist">
            {trip.title}
          </h3>
          <p className="mt-1 truncate text-[0.78rem] text-fog">
            {trip.dates.length > 1 ? `${trip.dates.length} termina od ${trip.dates[0]}` : trip.dates[0]}
          </p>
          <p className="truncate text-[0.78rem] text-fog">{trip.duration}</p>
          <p className="mt-auto flex items-baseline justify-end pt-2">
            <span className="shrink-0 font-serif text-[1.35rem] leading-none text-mist">
              <span className="mr-1 font-sans text-[0.6rem] uppercase tracking-[0.16em] text-fog">od</span>
              {formatKM(trip.priceFrom)}
            </span>
          </p>
        </div>
      </Link>
    </article>
  );
}
