import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Bed,
  Bus,
  Calendar,
  Check,
  Clock,
  Info,
  Minus,
  Phone,
  Pin,
  Plane,
} from "@/components/icons";
import { InquiryForm } from "@/components/inquiry-form";
import { MobileInquiryBar } from "@/components/mobile-inquiry-bar";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { TripCard, TripRow } from "@/components/trip-card";
import { SectionNav } from "@/components/trips/section-nav";
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

function SectionHead({ id, title, sub }: { id: string; title: string; sub?: string }) {
  return (
    <div className="mb-6">
      <h2 id={`${id}-naslov`} className="text-[1.6rem] font-semibold tracking-[-0.01em] text-mist">
        {title}
      </h2>
      {sub && <p className="mt-1 text-[0.95rem] text-fog">{sub}</p>}
    </div>
  );
}

const card = "rounded-2xl border border-mist/10 bg-ink-2";

export default async function TripPage({ params }: PageProps<"/putovanja/[slug]">) {
  const { slug } = await params;
  const trip = getTrip(slug);
  if (!trip) notFound();

  const heroImg = trip.heroImage ?? trip.image;
  const gallery = [trip.image, trip.imageAlt].filter((g): g is NonNullable<typeof g> => !!g && g.src !== heroImg.src);
  const related = trips
    .filter((t) => t.slug !== trip.slug && t.categories.some((c) => trip.categories.includes(c)))
    .slice(0, 3);
  const TransportIcon = trip.transport === "avio" ? Plane : Bus;
  const price = formatKM(trip.priceFrom);

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
    { icon: Calendar, k: trip.dates.length > 1 ? "Termini" : "Termin", v: trip.dates.join(", ") },
    { icon: Clock, k: "Trajanje", v: trip.duration },
    { icon: TransportIcon, k: "Prevoz", v: transportLabel(trip.transport) },
    { icon: Pin, k: "Polazak", v: trip.departures.length > 2 ? `${trip.departures[0]} i još ${trip.departures.length - 1}` : trip.departures.join(", ") },
  ];

  const nav = [
    { id: "pregled", label: "Pregled" },
    { id: "program", label: "Program" },
    { id: "cijena", label: "Cijena" },
    { id: "uslovi", label: "Uslovi" },
    { id: "upit", label: "Upit" },
  ];

  return (
    <>
      <PageHero image={heroImg} size="lg">
        <Link href="/putovanja" className="mb-6 inline-flex w-fit items-center gap-1.5 text-sm text-mist/80 transition hover:text-mist">
          <ArrowLeft className="size-4" /> Sva putovanja
        </Link>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {trip.categories.map((c) => (
            <Link
              key={c}
              href={`/putovanja?kategorija=${c}`}
              className="rounded-md bg-ink/50 px-2.5 py-1 font-medium text-mist/90 backdrop-blur transition hover:bg-ink/70"
            >
              {categories[c].label}
            </Link>
          ))}
          <span className="ml-1 text-mist/75">
            {trip.country} · {trip.region}
          </span>
        </div>
        <h1 className="mt-4 max-w-4xl text-[clamp(2rem,4.6vw,3.6rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-mist">
          {trip.title}
        </h1>

        <div className="mt-8 grid gap-4 rounded-2xl border border-mist/15 bg-ink/55 p-4 backdrop-blur-xl sm:p-5 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-8">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
            {facts.map(({ icon: Icon, k, v }) => (
              <div key={k} className="flex gap-3">
                <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg bg-mist/10 text-sand-light">
                  <Icon className="size-[18px]" />
                </span>
                <div className="min-w-0">
                  <dt className="text-[0.78rem] text-mist/60">{k}</dt>
                  <dd className="mt-0.5 text-[0.92rem] font-medium leading-snug text-mist">{v}</dd>
                </div>
              </div>
            ))}
          </dl>
          <div className="flex items-center justify-between gap-5 border-t border-mist/10 pt-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <p className="text-sm text-mist/70">
              od
              <span className="ml-1.5 text-[1.7rem] font-semibold leading-none text-mist">{price}</span>
            </p>
            <a href="#upit" className="inline-flex h-11 items-center rounded-lg bg-mist px-5 font-semibold text-ink transition hover:bg-white">
              Pošalji upit
            </a>
          </div>
        </div>
      </PageHero>

      <SectionNav items={nav} price={price} />

      <main id="sadrzaj" className="mx-auto max-w-[1440px] px-5 pb-16 pt-10 sm:px-8 lg:px-12 lg:pb-24 lg:pt-14">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="space-y-16 lg:col-span-8">
            {/* Pregled */}
            <section id="pregled" aria-labelledby="pregled-naslov" className="scroll-mt-24">
              <Reveal>
                <h2 id="pregled-naslov" className="sr-only">
                  Pregled
                </h2>
                <p className="max-w-3xl text-[1.05rem] leading-relaxed text-mist/90 sm:text-[1.3rem]">{trip.summary}</p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {trip.highlights.map((h) => (
                    <li key={h} className={`${card} flex gap-3 p-4 text-[0.93rem] leading-relaxed text-mist/90`}>
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-riho-green/15 text-riho-green">
                        <Check className="size-3.5" />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
                {trip.accommodation && (
                  <div className="mt-3 flex items-start gap-3 rounded-2xl bg-petrol/40 p-4 text-[0.93rem]">
                    <Bed className="mt-0.5 size-5 shrink-0 text-sand-light" />
                    <p className="text-mist/85">
                      <span className="font-semibold text-mist">Smještaj: </span>
                      {trip.accommodation}
                    </p>
                  </div>
                )}
              </Reveal>

              {gallery.length > 0 && (
                <Reveal className={`mt-8 grid gap-3 ${gallery.length > 1 ? "grid-cols-2 sm:grid-cols-[1.4fr_1fr]" : ""}`}>
                  {gallery.map((g) => (
                    <div
                      key={g.src}
                      className={`relative overflow-hidden rounded-2xl ${gallery.length > 1 ? "aspect-[4/5] sm:aspect-[4/3.4]" : "aspect-[16/9]"}`}
                    >
                      <Image src={g.src} alt={g.alt} fill sizes="(min-width:1024px) 40vw, 50vw" className="object-cover" />
                    </div>
                  ))}
                </Reveal>
              )}
            </section>

            {/* Program */}
            <section id="program" aria-labelledby="program-naslov" className="scroll-mt-24">
              <SectionHead id="program" title="Program putovanja" sub={trip.duration} />
              <ol className="relative">
                {trip.program.map((d, i) => (
                  <li key={d.day} className="relative grid grid-cols-[2rem_1fr] gap-3 pb-5 last:pb-0 sm:grid-cols-[2.5rem_1fr] sm:gap-5 sm:pb-6">
                    {i < trip.program.length - 1 && (
                      <span aria-hidden className="absolute bottom-0 left-4 top-10 w-px sm:left-5 sm:top-11 -translate-x-1/2 bg-mist/15" />
                    )}
                    <span className="relative z-10 grid size-8 place-items-center rounded-full sm:size-10 border border-sand-light/40 bg-ink text-sm font-semibold text-sand-light">
                      {i + 1}
                    </span>
                    <div className={`${card} p-4 sm:p-5`}>
                      <p className="text-[0.8rem] font-medium text-sand-light">{d.day}</p>
                      <h3 className="mt-1 text-[1.05rem] font-semibold text-mist">{d.title}</h3>
                      <p className="mt-2 text-[0.93rem] leading-relaxed text-mist/75">{d.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Cijena */}
            <section id="cijena" aria-labelledby="cijena-naslov" className="scroll-mt-24">
              <SectionHead id="cijena" title="Cijena i usluge" sub="Cijene su po osobi, prema objavi agencije." />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className={`${card} p-5`}>
                  <h3 className="flex items-center gap-2 font-semibold text-mist">
                    <span className="grid size-6 place-items-center rounded-full bg-riho-green/15 text-riho-green">
                      <Check className="size-3.5" />
                    </span>
                    Cijena uključuje
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {trip.included.map((x) => (
                      <li key={x} className="flex gap-2.5 text-[0.92rem] leading-relaxed text-mist/85">
                        <span className="mt-[0.6rem] size-1 shrink-0 rounded-full bg-riho-green" />
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`${card} p-5`}>
                  <h3 className="flex items-center gap-2 font-semibold text-mist">
                    <span className="grid size-6 place-items-center rounded-full bg-mist/10 text-fog">
                      <Minus className="size-3.5" />
                    </span>
                    Cijena ne uključuje
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {trip.excluded.map((x) => (
                      <li key={x} className="flex gap-2.5 text-[0.92rem] leading-relaxed text-mist/75">
                        <span className="mt-[0.6rem] size-1 shrink-0 rounded-full bg-fog/60" />
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {trip.optional && trip.optional.length > 0 && (
                <div className={`${card} mt-4 p-5`}>
                  <h3 className="font-semibold text-mist">Fakultativni izleti</h3>
                  <table className="mt-3 w-full text-left text-[0.92rem]">
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
                </div>
              )}
            </section>

            {/* Uslovi */}
            <section id="uslovi" aria-labelledby="uslovi-naslov" className="scroll-mt-24">
              <SectionHead id="uslovi" title="Dokumenti i uslovi" />
              <div className={`${card} divide-y divide-mist/10`}>
                {trip.documents && (
                  <div className="flex gap-3 p-5">
                    <Info className="mt-0.5 size-5 shrink-0 text-sand-light" />
                    <div>
                      <h3 className="font-semibold text-mist">Putne isprave</h3>
                      <p className="mt-1 text-[0.92rem] leading-relaxed text-mist/80">{trip.documents}</p>
                    </div>
                  </div>
                )}
                {trip.notes && (
                  <div className="p-5">
                    <h3 className="font-semibold text-mist">Napomene</h3>
                    <ul className="mt-3 space-y-2">
                      {trip.notes.map((n) => (
                        <li key={n} className="flex gap-2.5 text-[0.9rem] leading-relaxed text-fog">
                          <span className="mt-[0.55rem] size-1 shrink-0 rounded-full bg-fog/60" />
                          {n}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={site.terms}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-mist hover:text-sand-light"
                    >
                      Opšti uslovi putovanja <ArrowUpRight className="size-3.5" />
                    </a>
                  </div>
                )}
              </div>
            </section>

            {/* Upit */}
            <section id="upit" aria-labelledby="upit-naslov" className="scroll-mt-24">
              <div className={`${card} grid gap-8 p-5 sm:p-8 md:grid-cols-[1fr_1.35fr] md:gap-10`}>
                <div>
                  <h2 id="upit-naslov" className="text-[1.6rem] font-semibold tracking-[-0.01em] text-mist">
                    Pošaljite upit
                  </h2>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-fog">
                    Agencija potvrđuje slobodna mjesta i šalje uputstvo za rezervaciju. Upit vas ne obavezuje.
                  </p>
                  <ul className="mt-6 space-y-3 text-[0.92rem]">
                    {site.phones.map((p) => (
                      <li key={p.raw}>
                        <a href={p.href} className="inline-flex items-center gap-2.5 font-medium text-mist hover:text-sand-light">
                          <Phone className="size-4 text-sand-light" />
                          {p.display}
                        </a>
                      </li>
                    ))}
                    <li className="text-fog">{site.hours}</li>
                  </ul>
                  <a
                    href={trip.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm text-fog hover:text-mist"
                  >
                    Originalna objava na rihotours.ba <ArrowUpRight className="size-3.5" />
                  </a>
                </div>
                <InquiryForm tripTitle={trip.title} dates={trip.dates} departures={trip.departures} />
              </div>
            </section>
          </div>

          {/* Sticky price summary */}
          <aside className="hidden lg:col-span-4 lg:block" aria-label="Cijena">
            <div className={`${card} sticky top-20 p-6`}>
              <p className="text-sm text-fog">Cijena po osobi</p>
              <ul className="mt-2 divide-y divide-mist/10">
                {trip.prices.map((p) => (
                  <li key={p.label} className="flex items-center justify-between gap-4 py-3">
                    <span>
                      <span className="block text-[0.93rem] font-medium text-mist">{p.label}</span>
                      {p.condition && <span className="block text-[0.78rem] text-fog">{p.condition}</span>}
                    </span>
                    <span className="text-[1.35rem] font-semibold text-mist">{formatKM(p.amount)}</span>
                  </li>
                ))}
              </ul>
              <dl className="mt-2 space-y-3 border-t border-mist/10 pt-4 text-[0.88rem]">
                <div>
                  <dt className="text-fog">{trip.dates.length > 1 ? "Termini" : "Termin"}</dt>
                  <dd className="mt-0.5 font-medium text-mist">{trip.dates.join(", ")}</dd>
                </div>
                <div>
                  <dt className="text-fog">Polasci</dt>
                  <dd className="mt-0.5 leading-relaxed text-mist/85">{trip.departures.join(", ")}</dd>
                </div>
                {trip.departureNote && <dd className="text-fog">{trip.departureNote}</dd>}
              </dl>
              <a
                href="#upit"
                className="mt-6 flex h-12 items-center justify-center rounded-lg bg-mist font-semibold text-ink transition hover:bg-white"
              >
                Pošalji upit
              </a>
              <a
                href={site.phones[0].href}
                className="mt-2 flex h-11 items-center justify-center gap-2 rounded-lg border border-mist/20 text-sm font-semibold text-mist transition hover:border-mist/50"
              >
                <Phone className="size-4" /> {site.phones[0].display}
              </a>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-20 border-t border-mist/10 pt-12 sm:mt-24" aria-labelledby="slicna">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="slicna" className="text-[1.6rem] font-semibold text-mist">
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

      <MobileInquiryBar price={price} />
    </>
  );
}
