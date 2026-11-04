import Image from "next/image";
import Link from "next/link";
import { img } from "@/data/images";
import { site } from "@/data/site";
import { Phone } from "./icons";
import { Reveal } from "./reveal";

export function FinalCta() {
  return (
    <section className="p-2 sm:p-3 lg:p-5">
      <div className="relative isolate overflow-hidden rounded-[18px] lg:rounded-[22px]">
        <Image src={img.ohridKaneo.src} alt="" fill sizes="100vw" className="-z-10 object-cover" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,17,21,.85)_0%,rgba(8,17,21,.55)_50%,rgba(8,17,21,.2)_100%)]" />
        <div className="mx-auto flex min-h-[26rem] max-w-[1440px] flex-col justify-center px-6 py-14 sm:px-8 lg:min-h-[32rem] lg:px-12">
          <Reveal>
            <h2 className="max-w-2xl text-[clamp(1.9rem,4vw,3.2rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-mist">
              Niste pronašli pravo putovanje?
            </h2>
            <p className="mt-4 max-w-lg text-[1rem] leading-relaxed text-mist/85">
              Javite nam destinaciju, termin i broj putnika – pripremit ćemo individualnu ponudu.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/kontakt"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-mist px-6 font-semibold text-ink transition hover:bg-white"
              >
                Pošaljite upit
              </Link>
              <a
                href={site.phones[0].href}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-mist/30 px-6 font-semibold text-mist transition hover:border-mist/70"
              >
                <Phone className="size-4" />
                {site.phones[0].display}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
