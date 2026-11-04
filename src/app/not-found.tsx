import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { img } from "@/data/images";

export default function NotFound() {
  return (
    <PageHero image={img.zlatibor} size="lg">
      <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-sand-light">404</p>
      <h1 className="mt-5 font-sans text-[clamp(2.6rem,6vw,5rem)] font-normal uppercase leading-[0.95] text-mist">
        Ova stranica je{" "}
        <span className="font-serif normal-case italic">na putu</span>
      </h1>
      <p className="mt-5 max-w-lg text-mist/80">Tražena stranica ne postoji ili je aranžman uklonjen.</p>
      <Link href="/putovanja" className="mt-8 w-fit rounded-[10px] bg-mist px-6 py-3.5 font-medium text-ink">
        Pogledaj aktuelna putovanja
      </Link>
    </PageHero>
  );
}
