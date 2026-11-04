import Image from "next/image";
import Link from "next/link";
import { img } from "@/data/images";
import { site } from "@/data/site";
import { ArrowRight, Phone } from "./icons";
import { Reveal } from "./reveal";

export function FinalCta() {
  return (
    <section className="p-2 sm:p-3 lg:p-5">
      <div className="grain relative isolate overflow-hidden rounded-[18px] lg:rounded-[22px]">
        <Image
          src={img.budimpestaNoc.src}
          alt=""
          fill
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,17,21,.82)_0%,rgba(8,17,21,.5)_45%,rgba(8,17,21,.2)_100%)]" />
        <div className="mx-auto flex min-h-[30rem] max-w-[1440px] flex-col justify-center px-6 py-16 sm:min-h-[34rem] sm:py-20 sm:px-10 lg:min-h-[40rem] lg:px-[7.5rem]">
          <Reveal>
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-sand-light">
              Vaše sljedeće putovanje
            </p>
            <h2 className="mt-6 max-w-3xl font-sans text-[clamp(2.6rem,6.4vw,5.6rem)] font-normal uppercase leading-[0.95] text-mist">
              Gdje vas vodi{" "}
              <span className="font-serif text-[1.08em] normal-case italic">sljedeći</span>{" "}
              put?
            </h2>
            <p className="mt-6 max-w-lg text-[1.05rem] font-light leading-relaxed text-mist/85">
              Pregledajte aktuelne termine ili nam pošaljite upit – odgovaramo radnim danima
              od 08 do 16 h.
            </p>
            <div className="mt-8 grid gap-3 sm:mt-10 sm:flex sm:flex-wrap sm:items-center sm:gap-4">
              <Link
                href="/putovanja"
                className="group inline-flex items-center justify-center gap-3 rounded-[10px] bg-mist px-6 py-3.5 text-[0.98rem] font-medium text-ink transition hover:bg-white"
              >
                Istraži putovanja
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center gap-3 rounded-[10px] border border-mist/40 bg-white/5 px-6 py-3.5 text-[0.98rem] font-medium text-mist backdrop-blur-md transition hover:border-mist hover:bg-white/15"
              >
                Pošalji upit
              </Link>
              <a
                href={site.phones[0].href}
                className="inline-flex items-center justify-center gap-2 px-2 py-3 text-[0.98rem] text-mist/85 transition hover:text-mist"
              >
                <Phone className="size-4 text-sand-light" />
                {site.phones[0].display}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
