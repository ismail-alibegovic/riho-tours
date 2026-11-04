import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { img } from "@/data/images";

export default function NotFound() {
  return (
    <PageHero image={img.zlatibor} size="lg">
      <p className="text-sm font-medium text-sand-light">Greška 404</p>
      <h1 className="mt-3 text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-mist">Stranica nije pronađena</h1>
      <p className="mt-5 max-w-lg text-mist/80">Tražena stranica ne postoji ili je aranžman uklonjen.</p>
      <Link href="/putovanja" className="mt-8 w-fit rounded-lg bg-mist px-6 py-3.5 font-semibold text-ink">
        Pogledaj aktuelna putovanja
      </Link>
    </PageHero>
  );
}
