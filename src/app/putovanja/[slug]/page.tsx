import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, Minus, Phone } from "@/components/icons";
import { InquiryForm } from "@/components/inquiry-form";
import { MobileInquiryBar } from "@/components/mobile-inquiry-bar";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { TripCard, TripRow } from "@/components/trip-card";
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

function Block({ title, children, id }: { title: string; children: React.ReactNode; id?: string }) {
  return (
    <section aria-labelledby={id} className="border-t border-mist/10 pt-8">
      <h2 id={id} className="text-xl font-semibold text-mist">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default async function TripPage({ params }: PageProps<"/putovanja/[slug]">) {
  const { slug } = await params;
  const trip = getTrip(slug);
  if (!trip) notFound();

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
    offers: trip.prices.map((p) => ({ "@type": "Offer", name: p.label, price: p.amount, priceCurrency: "BAM" })),
    provider: { "@type": "TravelAgency", name: site.legalName, telephone: site.phones[0].raw },
  };

  const facts = [
    { k: trip.dates.length > 1 ? "Termini" : "Termin", v: trip.dates.join(", ") },
    { k: "Trajanje", v: trip.duration },
    { k: "Prevoz", v: transportLabel(trip.transport) },
    { k: "Cijena", v: `od ${formatKM(trip.priceFrom)}` },
  ];

  return (
    <>
      <PageHero image={trip.heroImage ?? trip.image} size="lg">
        <Link
          href="/putovanja"
          className="mb-6 inline-flex w-fit items-center gap-1.5 text-sm text-mist/80 transition hover:text-mist"
        >
          <ArrowLeft className="size-4" /> Sva putovanja
        </Link>
        <p className="text-sm font-medium text-sand-light">
          {trip.country} · {trip.region}
        </p>
        <h1 className="mt-3 max-w-4xl text-[clamp(2rem,4.6vw,3.6rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-mist">
          {trip.title}
        </h1>

        <dl className="mt-8 grid max-w-4xl grid-cols-2 gap-x-8 gap-y-5 border-t border-mist/20 pt-6 sm:grid-cols-4">
          {facts.map(({ k, v }) => (
            <div key={k}>
              <dt className="text-[0.8rem] text-mist/65">{k}</dt>
              <dd className="mt-1 text-[0.95rem] font-medium leading-snug text-mist">{v}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <main id="sadrzaj" className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-12 lg:col-span-7">
            <Reveal>
              <p className="text-[1.15rem] leading-relaxed text-mist/90 sm:text-[1.25rem]">{trip.summary}</p>
              <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {trip.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-[0.95rem] leading-relaxed text-mist/85">
                    <Check className="mt-1 size-4 shrink-0 text-riho-green" />
                    {h}
                  </li>
                ))}
              </ul>
              {trip.accommodation && (
                <p className="mt-6 rounded-lg bg-ink-2 px-4 py-3 text-[0.92rem] text-fog">
                  <span className="font-medium text-mist">Smještaj:</span> {trip.accommodation}
                </p>
              )}
            </Reveal>

            {gallery.length > 0 && (
              <Reveal className="grid grid-cols-2 gap-3 sm:grid-cols-5 sm:gap-4">
                {gallery.map((g, i) => (
                  <div
                    key={g.src}
                    className={`relative aspect-[4/5] overflow-hidden rounded-xl ${gallery.length === 1 ? "col-span-2" : ""} ${
                      i === 0 ? "sm:col-span-3 sm:aspect-[4/3]" : "sm:col-span-2 sm:aspect-auto"
                    }`}
                  >
                    <Image src={g.src} alt={g.alt} fill sizes="(min-width:1024px) 34vw, 50vw" className="object-cover" />
                  </div>
                ))}
              </Reveal>
            )}

            <Block title="Program putovanja" id="program">
              <ol className="space-y-7">
                {trip.program.map((d) => (
                  <li key={d.day} className="grid gap-1 sm:grid-cols-[9.5rem_1fr] sm:gap-6">
                    <p className="text-sm font-medium text-sand-light">{d.day}</p>
                    <div>
                      <h3 className="font-semibold text-mist">{d.title}</h3>
                      <p className="mt-1.5 text-[0.95rem] leading-relaxed text-mist/75">{d.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Block>

            <div className="grid gap-12 sm:grid-cols-2 sm:gap-8">
              <Block title="Cijena uključuje">
                <ul className="space-y-2.5">
                  {trip.included.map((x) => (
                    <li key={x} className="flex gap-3 text-[0.93rem] leading-relaxed text-mist/85">
                      <Check className="mt-1 size-4 shrink-0 text-riho-green" />
                      {x}
                    </li>
                  ))}
                </ul>
              </Block>
              <Block title="Cijena ne uključuje">
                <ul className="space-y-2.5">
                  {trip.excluded.map((x) => (
                    <li key={x} className="flex gap-3 text-[0.93rem] leading-relaxed text-mist/75">
                      <Minus className="mt-1 size-4 shrink-0 text-fog" />
                      {x}
                    </li>
                  ))}
                </ul>
              </Block>
            </div>

            {trip.optional && trip.optional.length > 0 && (
              <Block title="Fakultativni izleti">
                <table className="w-full text-left text-[0.93rem]">
                  <caption className="sr-only">Fakultativni izleti i cijene</caption>
                  <tbody className="divide-y divide-mist/10">
                    {trip.optional.map((o) => (
                      <tr key={o.name}>
                        <th scope="row" className="py-3 pr-6 font-normal text-mist/85">
                          {o.name}
                        </th>
                        <td className="whitespace-nowrap py-3 text-right font-semibold text-mist">{o.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Block>
            )}

            {(trip.documents || trip.notes) && (
              <Block title="Dokumenti i uslovi">
                {trip.documents && <p className="text-[0.93rem] leading-relaxed text-mist/85">{trip.documents}</p>}
                {trip.notes && (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-[0.88rem] leading-relaxed text-fog marker:text-fog/50">
                    {trip.notes.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                )}
                <a
                  href={site.terms}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-mist underline-offset-4 hover:underline"
                >
                  Opšti uslovi putovanja <ArrowUpRight className="size-3.5" />
                </a>
              </Block>
            )}
          </div>

          <aside className="lg:col-span-5 xl:col-span-4 xl:col-start-9" aria-label="Cijene i upit">
            <div className="space-y-5">
              <div className="rounded-2xl border border-mist/10 bg-ink-2 p-6">
                <h2 className="text-base font-semibold text-mist">Cijena po osobi</h2>
                <ul className="mt-3 divide-y divide-mist/10">
                  {trip.prices.map((p) => (
                    <li key={p.label} className="flex items-center justify-between gap-4 py-3">
                      <span>
                        <span className="block text-[0.93rem] text-mist">{p.label}</span>
                        {p.condition && <span className="block text-[0.8rem] text-fog">{p.condition}</span>}
                      </span>
                      <span className="text-[1.35rem] font-semibold text-mist">{formatKM(p.amount)}</span>
                    </li>
                  ))}
                </ul>
                <dl className="mt-3 space-y-2 border-t border-mist/10 pt-4 text-[0.85rem]">
                  <div>
                    <dt className="inline text-fog">Polasci: </dt>
                    <dd className="inline text-mist/85">{trip.departures.join(", ")}</dd>
                  </div>
                  {trip.departureNote && <dd className="text-fog">{trip.departureNote}</dd>}
                </dl>
              </div>

              <div id="upit" className="scroll-mt-6 rounded-2xl border border-mist/10 bg-ink-2 p-6">
                <h2 className="text-xl font-semibold text-mist">Pošaljite upit</h2>
                <p className="mb-6 mt-1 text-sm text-fog">Provjera slobodnih mjesta i rezervacija preko agencije.</p>
                <InquiryForm tripTitle={trip.title} dates={trip.dates} departures={trip.departures} />
              </div>

              <div className="flex flex-col gap-2 px-1 text-sm text-fog">
                {site.phones.map((p) => (
                  <a key={p.raw} href={p.href} className="inline-flex items-center gap-2 text-mist hover:underline">
                    <Phone className="size-4 text-sand-light" /> {p.display}
                  </a>
                ))}
                <a href={trip.sourceUrl} target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-1.5 hover:text-mist">
                  Originalna objava na rihotours.ba <ArrowUpRight className="size-3.5" />
                </a>
              </div>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-20 border-t border-mist/10 pt-12 sm:mt-24" aria-labelledby="slicna">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="slicna" className="text-2xl font-semibold text-mist">
                Slična putovanja
              </h2>
              <Link href="/putovanja" className="text-sm font-medium text-mist/80 hover:text-mist">
                Sva putovanja →
              </Link>
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3">
              {related.map((t) => (
                <li key={t.slug}>
                  <TripRow trip={t} className="sm:hidden" />
                  <TripCard trip={t} variant="landscape" className="hidden sm:block" sizes="(min-width:1024px) 30vw, 50vw" />
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      <MobileInquiryBar price={formatKM(trip.priceFrom)} />
    </>
  );
}
