import Link from "next/link";
import { services } from "@/data/site";
import { ArrowRight } from "../icons";
import { Reveal } from "../reveal";
import { Eyebrow, SectionTitle } from "../section-heading";

export function Services() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-4">
          <Eyebrow>Usluge</Eyebrow>
          <SectionTitle className="mt-3">Putovanja po vašoj mjeri</SectionTitle>
          <p className="mt-4 text-[0.98rem] leading-relaxed text-fog">
            Osim grupnih aranžmana iz ponude, agencija priprema individualna putovanja za parove,
            porodice, firme i grupe.
          </p>
          <Link
            href="/kontakt"
            className="group mt-7 inline-flex items-center gap-2 rounded-lg bg-petrol px-5 py-3 font-semibold text-mist ring-1 ring-mist/10 transition hover:bg-[#2f5156]"
          >
            Zatražite ponudu
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-8">
          <ul className="grid gap-x-10 sm:grid-cols-2">
            {services.map((s) => (
              <li key={s.title} className="border-t border-mist/10 py-5">
                <h3 className="font-semibold text-mist">{s.title}</h3>
                <p className="mt-1.5 text-[0.93rem] leading-relaxed text-fog">{s.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
