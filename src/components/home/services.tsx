import Link from "next/link";
import { services } from "@/data/site";
import { ArrowRight } from "../icons";
import { Reveal } from "../reveal";
import { Eyebrow } from "../section-heading";

export function Services() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-36">
      <div className="grid gap-10 sm:gap-14 lg:grid-cols-12">
        <Reveal className="lg:sticky lg:top-12 lg:col-span-5 lg:self-start">
          <div>
            <Eyebrow index="03">Putovanja po vašoj mjeri</Eyebrow>
            <p className="mt-6 font-serif text-[clamp(2rem,4.2vw,3.7rem)] sm:mt-8 font-normal leading-[1.04] text-mist">
              <span className="italic">„Krojimo putovanja</span>
              <br />
              po Vašoj mjeri.”
            </p>
            <p className="mt-5 max-w-md text-[0.98rem] font-light sm:mt-7 sm:text-[1.02rem] leading-relaxed text-fog">
              Pored organizovanih grupnih putovanja, Riho Tours priprema i individualne
              aranžmane – za parove, porodice, firme i grupe – uz saradnju sa domaćim i
              stranim partnerima.
            </p>
            <Link
              href="/kontakt"
              className="group mt-7 inline-flex sm:mt-9 items-center gap-3 rounded-[10px] bg-petrol px-6 py-3.5 text-[0.98rem] font-medium text-mist ring-1 ring-mist/10 transition hover:bg-[#2f5156]"
            >
              Zatražite ponudu
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-6 lg:col-start-7">
        <ol>
          {services.map((s, i) => (
              <li key={s.title} className="group grid grid-cols-[2.25rem_1fr] gap-3 border-t border-mist/12 py-5 last:border-b sm:grid-cols-[4.5rem_1fr] sm:gap-4 sm:py-7">
                <span className="pt-1 font-sans text-xs tracking-[0.22em] text-sand-light">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-sans text-[1.02rem] font-normal uppercase tracking-[0.04em] text-mist sm:text-[1.3rem]">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 max-w-lg text-[0.9rem] font-light leading-relaxed text-fog sm:mt-2 sm:text-[0.98rem]">
                    {s.text}
                  </p>
                </div>
              </li>
          ))}
        </ol>
        </Reveal>
      </div>
    </section>
  );
}
