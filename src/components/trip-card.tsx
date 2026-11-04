import Image from "next/image";
import Link from "next/link";
import type { Trip } from "@/data/types";
import { formatKM } from "@/lib/format";
import { Bus, Plane } from "./icons";

type Variant = "feature" | "portrait" | "landscape" | "compact" | "wide";

const ratio: Record<Variant, string> = {
  feature: "aspect-[4/5] sm:aspect-[3/2]",
  portrait: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
  compact: "aspect-[3/2]",
  wide: "aspect-[2/1]",
};

const dateLine = (t: Trip) =>
  t.dates.length > 1 ? `${t.dates.length} termina, od ${t.dates[0]}` : t.dates[0];

function TransportTag({ trip }: { trip: Trip }) {
  const Icon = trip.transport === "avio" ? Plane : Bus;
  return (
    <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md bg-ink/70 px-2 py-1 text-xs font-medium text-mist backdrop-blur">
      <Icon className="size-3.5" />
      {trip.transport === "avio" ? "Avionom" : "Autobusom"}
    </span>
  );
}

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
  const big = variant === "feature";
  return (
    <article className={`group ${className}`}>
      <Link href={`/putovanja/${trip.slug}`} className="block rounded-xl focus-visible:outline-offset-4">
        <div className={`relative overflow-hidden rounded-xl bg-petrol ${ratio[variant]}`}>
          <Image
            src={trip.image.src}
            alt={trip.image.alt}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <TransportTag trip={trip} />
        </div>
        <div className="mt-4">
          <p className="text-[0.8rem] text-fog">
            {trip.country} · {trip.duration}
          </p>
          <h3
            className={`mt-1 font-semibold leading-snug text-mist decoration-mist/40 underline-offset-4 group-hover:underline ${
              big ? "text-[1.3rem] sm:text-[1.45rem]" : "text-[1.02rem]"
            }`}
          >
            {trip.title}
          </h3>
          <p className="mt-2 flex items-baseline justify-between gap-4 text-[0.85rem] text-fog">
            <span className="truncate">{dateLine(trip)}</span>
            <span className="shrink-0 whitespace-nowrap">
              od <span className="text-[1.05rem] font-semibold text-mist">{formatKM(trip.priceFrom)}</span>
            </span>
          </p>
        </div>
      </Link>
    </article>
  );
}

/** Compact horizontal card for long lists on phones. */
export function TripRow({ trip, className = "" }: { trip: Trip; className?: string }) {
  const Icon = trip.transport === "avio" ? Plane : Bus;
  return (
    <article className={className}>
      <Link
        href={`/putovanja/${trip.slug}`}
        className="grid grid-cols-[6.5rem_1fr] gap-3.5 rounded-xl border border-mist/10 bg-ink-2 p-2 pr-3.5 transition active:bg-petrol-2"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-petrol">
          <Image src={trip.image.src} alt={trip.image.alt} fill sizes="7rem" className="object-cover" />
        </div>
        <div className="flex min-w-0 flex-col py-1">
          <p className="flex items-center gap-1.5 text-[0.75rem] text-fog">
            <Icon className="size-3.5 text-sand-light" />
            {trip.country}
          </p>
          <h3 className="mt-1 line-clamp-2 text-[0.95rem] font-semibold leading-snug text-mist">{trip.title}</h3>
          <p className="mt-1 truncate text-[0.78rem] text-fog">{dateLine(trip)}</p>
          <p className="mt-auto flex items-baseline justify-between gap-2 pt-1.5">
            <span className="truncate text-[0.75rem] text-fog">{trip.duration}</span>
            <span className="shrink-0 text-[0.8rem] text-fog">
              od <span className="text-[1rem] font-semibold text-mist">{formatKM(trip.priceFrom)}</span>
            </span>
          </p>
        </div>
      </Link>
    </article>
  );
}
