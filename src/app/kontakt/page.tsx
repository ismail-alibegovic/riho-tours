import type { Metadata } from "next";
import { Facebook, Instagram, Message, Phone, Pin } from "@/components/icons";
import { InquiryForm } from "@/components/inquiry-form";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/section-heading";
import { img } from "@/data/images";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontaktirajte Riho Tours u Brezi – telefon, adresa, radno vrijeme i upit za putovanje.",
};

export default function ContactPage() {
  const channels = [
    ...site.phones.map((p) => ({ icon: Phone, label: "Telefon", value: p.display, href: p.href, external: false })),
    { icon: Message, label: "Messenger", value: "m.me/rihotours", href: site.social.messenger, external: true },
    { icon: Facebook, label: "Facebook", value: "facebook.com/rihotours", href: site.social.facebook, external: true },
    { icon: Instagram, label: "Instagram", value: "@rihotours", href: site.social.instagram, external: true },
    {
      icon: Pin,
      label: "Adresa",
      value: `${site.address.street}, ${site.address.city}`,
      href: site.mapUrl,
      external: true,
    },
  ];

  return (
    <>
      <PageHero image={img.kotorZaljev}>
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-sand-light">Kontakt</p>
        <h1 className="mt-5 font-sans text-[clamp(2.8rem,7vw,6rem)] font-normal uppercase leading-[0.95] text-mist">
          Javite{" "}
          <span className="font-serif text-[1.08em] normal-case italic">nam</span> se
        </h1>
        <p className="mt-5 max-w-xl text-[1.05rem] font-light leading-relaxed text-mist/85">
          {site.hours}. Pozovite, pošaljite poruku ili pripremite upit ispod – javljamo se sa
          prijedlogom i dostupnim terminima.
        </p>
      </PageHero>

      <main id="sadrzaj" className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <Eyebrow>Riho Tours d.o.o.</Eyebrow>
            <ul className="mt-8 divide-y divide-mist/10 border-y border-mist/10">
              {channels.map((c) => (
                <li key={c.label + c.value}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="group flex items-center gap-5 py-5"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-full border border-mist/20 text-sand-light transition group-hover:border-mist group-hover:text-mist">
                      <c.icon className="size-4" />
                    </span>
                    <span>
                      <span className="block text-[0.7rem] uppercase tracking-[0.2em] text-fog">{c.label}</span>
                      <span className="mt-0.5 block text-[1.05rem] text-mist group-hover:underline">{c.value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <dl className="mt-10 space-y-4 text-[0.92rem]">
              <div>
                <dt className="text-[0.7rem] uppercase tracking-[0.2em] text-fog">Radno vrijeme</dt>
                <dd className="mt-1 text-mist">{site.hours}</dd>
              </div>
              <div>
                <dt className="text-[0.7rem] uppercase tracking-[0.2em] text-fog">Reklamacije</dt>
                <dd className="mt-1">
                  <a href={site.complaints.href} className="text-mist hover:underline">
                    {site.complaints.display}
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <div className="rounded-[18px] border border-mist/12 bg-ink-2 p-6 sm:p-9">
              <h2 className="font-sans text-[clamp(1.8rem,3vw,2.4rem)] font-normal uppercase leading-none text-mist">
                Upit za{" "}
                <span className="font-serif normal-case italic">putovanje</span>
              </h2>
              <p className="mb-8 mt-3 text-[0.95rem] text-fog">
                Grupno, individualno, bračno ili poslovno putovanje – opišite šta planirate.
              </p>
              <InquiryForm />
            </div>
          </Reveal>
        </div>
      </main>
    </>
  );
}
