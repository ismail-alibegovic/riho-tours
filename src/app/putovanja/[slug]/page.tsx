import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Bus, Calendar, Check, Clock, Minus, Phone, Pin, Plane } from "@/components/icons";
import { InquiryForm } from "@/components/inquiry-form";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/section-heading";
import { TripCard } from "@/components/trip-card";
import { categories, site } from "@/data/site";
import { getTrip, trips } from "@/data/trips";
import { formatKM, transportLabel } from "@/lib/format";

export function generateStaticParams() {
  return trips.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/putovanja/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const trip = getTrip(slug);
  if (!trip) return {};
  return {
    title: trip.title,
    description: `${trip.summary} Od ${formatKM(trip.priceFrom)} · ${trip.dates.join(", ")}.`,
    openGraph: { images: [{ url: (trip.heroImage ?? trip.image).src }] },
  };
}

export default async function TripPage({ params }: PageProps<"/putovanja/[slug]">) {
  const { slug } = await params;
  const trip = getTrip(slug);
  if (!trip) notFound();

  const TransportIcon = trip.transport === "avio" ? Plane : Bus;
  const related = trips
    .filter((t) => t.slug !== trip.slug && t.categories.some((c) => trip.categories.includes(c)))
    .slice(0, 3);
  const gallery = [trip.image, trip.imageAlt].filter(Boolean) as (typeof trip.image)[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: trip.title,
    description: trip.summary,
    touristType: categories[trip.categories[0]].label,
    offers: trip.prices.map((p) => ({
      "@type": "Offer",
      name: p.label,
      price: p.amount,
      priceCurrency: "BAM",
    })),
    provider: { "@type": "TravelAgency", name: site.legalName, telephone: site.phones[0].raw },
  };

  return (
    <>
      <PageHero image={trip.heroImage ?? trip.image} size="lg">
        <Link
          href="/putovanja"
          className="mb-8 inline-flex w-fit items-center gap-2 text-[0.82rem] text-mist/80 transition hover:text-mist"
        >
          <ArrowLeft className="size-4" /> Sva putovanja
        </Link>
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-sand-light">
          {trip.country} · {trip.region}
        </p>
        <h1 className="mt-5 max-w-4xl font-sans text-[clamp(2.6rem,6.6vw,5.8rem)] font-normal uppercase leading-[0.95] text-mist">
          {trip.name}
          <span className="mt-2 block font-serif text-[0.5em] normal-case italic leading-tight text-mist/90">
            {trip.tagline}
          </span>
        </h1>
        <p className="mt-5 max-w-2xl text-[1rem] font-light leading-relaxed text-mist/80">{trip.title}</p>

        <dl className="mt-10 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-[14px] bg-mist/15 ring-1 ring-mist/15 backdrop-blur-md sm:grid-cols-4">
          {[
            { icon: Calendar, k: trip.dates.length > 1 ? "Termini" : "Termin", v: trip.dates.join(" · ") },
            { icon: Clock, k: "Trajanje", v: trip.duration },
            { icon: TransportIcon, k: "Prevoz", v: transportLabel(trip.transport) },
            { icon: Pin, k: "Cijena", v: `od ${formatKM(trip.priceFrom)}` },
          ].map(({ icon: Icon, k, v }) => (
            <div key={k} className="bg-ink/55 p-4 sm:p-5">
              <dt className="flex items-center gap-2 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-fog">
                <Icon className="size-3.5 text-sand-light" />
                {k}
              </dt>
              <dd className="mt-2 text-[0.95rem] leading-snug text-mist">{v}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <main id="sadrzaj" className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>O putovanju</Eyebrow>
              <p className="mt-6 font-serif text-[clamp(1.6rem,2.6vw,2.2rem)] leading-[1.25] text-mist">
                {trip.summary}
              </p>
              <ul className="mt-10 grid gap-4 sm:grid-cols-2">
                {trip.highlights.map((h) => (
                  <li key={h} className="flex gap-3 border-t border-mist/12 pt-4 text-[0.98rem] leading-relaxed text-mist/85">
                    <Check className="mt-0.5 size-4 shrink-0 text-sand-light" />
                    {h}
                  </li>
                ))}
              </ul>
              {trip.accommodation && (
                <p className="mt-8 text-[0.95rem] text-fog">
                  <span className="text-mist">Smještaj:</span> {trip.accommodation}
                </p>
              )}
            </Reveal>

            {gallery.length > 0 && (
              <Reveal className="mt-14 grid gap-4 sm:grid-cols-5">
                {gallery.map((g, i) => (
                  <figure key={g.src} className={i === 0 ? "sm:col-span-3" : "sm:col-span-2"}>
                    <div className={`relative overflow-hidden rounded-[14px] ${i === 0 ? "aspect-[4/3]" : "aspect-[4/3] sm:aspect-[3/4]"}`}>
                      <Image src={g.src} alt={g.alt} fill sizes="(min-width:1024px) 34vw, 100vw" className="object-cover" />
                    </div>
                    <figcaption className="mt-2 text-[0.72rem] text-fog">
                      Foto:{" "}
                      {g.creditUrl ? (
                        <a href={g.creditUrl} target="_blank" rel="noreferrer" className="underline-offset-2 hover:underline">
                          {g.credit}
                        </a>
                      ) : (
                        g.credit
                      )}
                    </figcaption>
                  </figure>
                ))}
              </Reveal>
            )}

            <section className="mt-20" aria-labelledby="program">
              <Reveal>
                <Eyebrow>Program putovanja</Eyebrow>
                <h2 id="program" className="sr-only">
                  Program putovanja
                </h2>
              </Reveal>
              <ol className="relative mt-8 border-l border-mist/15 pl-8 sm:pl-10">
                {trip.program.map((d, i) => (
                  <li key={d.day} className="relative pb-10 last:pb-0">
                    <span className="absolute -left-[calc(2rem+5px)] top-1.5 size-[9px] rounded-full bg-sand-light ring-4 ring-ink sm:-left-[calc(2.5rem+5px)]" />
                    <Reveal delay={0.03 * i}>
                      <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-sand-light">{d.day}</p>
                      <h3 className="mt-2 font-sans text-[1.35rem] font-normal uppercase tracking-[0.03em] text-mist">
                        {d.title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-[1rem] font-light leading-relaxed text-mist/80">{d.text}</p>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </section>

            <section className="mt-20 grid gap-10 sm:grid-cols-2" aria-label="Uslovi aranžmana">
              <Reveal>
                <h2 className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-sand-light">Cijena uključuje</h2>
                <ul className="mt-5 space-y-3">
                  {trip.included.map((x) => (
                    <li key={x} className="flex gap-3 text-[0.95rem] leading-relaxed text-mist/85">
                      <Check className="mt-0.5 size-4 shrink-0 text-riho-green" />
                      {x}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-sand-light">Cijena ne uključuje</h2>
                <ul className="mt-5 space-y-3">
                  {trip.excluded.map((x) => (
                    <li key={x} className="flex gap-3 text-[0.95rem] leading-relaxed text-mist/75">
                      <Minus className="mt-0.5 size-4 shrink-0 text-fog" />
                      {x}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </section>

            {trip.optional && trip.optional.length > 0 && (
              <Reveal className="mt-16">
                <h2 className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-sand-light">Fakultativni izleti</h2>
                <table className="mt-5 w-full text-left text-[0.95rem]">
                  <caption className="sr-only">Fakultativni izleti i cijene</caption>
                  <tbody className="divide-y divide-mist/10 border-y border-mist/10">
                    {trip.optional.map((o) => (
                      <tr key={o.name}>
                        <th scope="row" className="py-3.5 pr-6 font-normal text-mist/85">
                          {o.name}
                        </th>
                        <td className="whitespace-nowrap py-3.5 text-right font-serif text-[1.2rem] text-mist">{o.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Reveal>
            )}

            {(trip.documents || trip.notes) && (
              <Reveal className="mt-16 space-y-6 rounded-[16px] border border-mist/10 p-6 sm:p-8">
                {trip.documents && (
                  <div>
                    <h2 className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-sand-light">Putni dokumenti</h2>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-mist/85">{trip.documents}</p>
                  </div>
                )}
                {trip.notes && (
                  <div>
                    <h2 className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-sand-light">Napomene i uslovi</h2>
                    <ul className="mt-3 space-y-2.5 text-[0.9rem] leading-relaxed text-fog">
                      {trip.notes.map((n) => (
                        <li key={n}>— {n}</li>
                      ))}
                    </ul>
                    <a
                      href={site.terms}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-[0.88rem] text-mist underline-offset-4 hover:underline"
                    >
                      Opšti uslovi putovanja <ArrowUpRight className="size-3.5" />
                    </a>
                  </div>
                )}
              </Reveal>
            )}
          </div>

          <aside className="lg:col-span-5 lg:col-start-8 xl:col-span-4 xl:col-start-9" aria-label="Cijene i upit">
            <div className="space-y-6 lg:sticky lg:top-6">
              <div className="rounded-[18px] border border-mist/12 bg-ink-2 p-6 sm:p-7">
                <h2 className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-sand-light">Cijena po osobi</h2>
                <ul className="mt-4 divide-y divide-mist/10">
                  {trip.prices.map((p) => (
                    <li key={p.label} className="flex items-baseline justify-between gap-4 py-3.5">
                      <span>
                        <span className="block text-[0.95rem] text-mist">{p.label}</span>
                        {p.condition && <span className="block text-[0.8rem] text-fog">{p.condition}</span>}
                      </span>
                      <span className="font-serif text-[1.9rem] leading-none text-mist">{formatKM(p.amount)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 space-y-3 border-t border-mist/10 pt-5 text-[0.88rem] text-fog">
                  <p>
                    <span className="text-mist">{trip.dates.length > 1 ? "Termini" : "Termin"}:</span> {trip.dates.join(", ")}
                  </p>
                  <p>
                    <span className="text-mist">Polasci:</span> {trip.departures.join(", ")}
                  </p>
                  {trip.departureNote && <p>{trip.departureNote}</p>}
                </div>
              </div>

              <div id="upit" className="scroll-mt-6 rounded-[18px] border border-mist/12 bg-ink-2 p-6 sm:p-7">
                <h2 className="font-serif text-[1.7rem] italic leading-tight text-mist">Pošaljite upit</h2>
                <p className="mb-6 mt-1.5 text-[0.88rem] text-fog">Agencija odgovara radnim danima, 08–16 h.</p>
                <InquiryForm tripTitle={trip.title} dates={trip.dates} departures={trip.departures} compact />
              </div>

              <div className="flex flex-col gap-2 px-1 text-[0.88rem] text-fog">
                {site.phones.map((p) => (
                  <a key={p.raw} href={p.href} className="inline-flex items-center gap-2 text-mist hover:underline">
                    <Phone className="size-4 text-sand-light" /> {p.display}
                  </a>
                ))}
                <a href={trip.sourceUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1.5 hover:text-mist">
                  Originalna objava na rihotours.ba <ArrowUpRight className="size-3.5" />
                </a>
              </div>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-28 border-t border-mist/10 pt-16" aria-labelledby="slicna">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="slicna" className="font-sans text-[clamp(1.8rem,3.4vw,2.8rem)] font-normal uppercase leading-none text-mist">
                Možda vas{" "}
                <span className="font-serif normal-case italic">zanima</span>
              </h2>
              <Link href="/putovanja" className="text-sm uppercase tracking-[0.16em] text-mist/80 hover:text-mist">
                Sva putovanja →
              </Link>
            </div>
            <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((t) => (
                <li key={t.slug}>
                  <TripCard trip={t} variant="landscape" sizes="(min-width:1024px) 30vw, 100vw" />
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      <div aria-hidden className="h-20 lg:hidden" />
      {/* mobile quick action */}
      <div className="fixed inset-x-3 bottom-3 z-30 flex items-center justify-between gap-3 rounded-[14px] border border-mist/15 bg-ink/90 p-3 pl-5 backdrop-blur-xl lg:hidden">
        <span>
          <span className="block text-[0.65rem] uppercase tracking-[0.18em] text-fog">od</span>
          <span className="font-serif text-[1.5rem] leading-none text-mist">{formatKM(trip.priceFrom)}</span>
        </span>
        <a href="#upit" className="rounded-[10px] bg-mist px-5 py-3 text-[0.9rem] font-medium text-ink">
          Pošalji upit
        </a>
      </div>
    </>
  );
}
