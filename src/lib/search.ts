import { categories } from "@/data/site";
import type { CategoryId, Transport, Trip } from "@/data/types";
import { tripMonths } from "./format";

export const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/đ/g, "dj")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();

const haystack = (t: Trip) =>
  normalize(
    [
      t.title,
      t.name,
      t.tagline,
      t.country,
      t.region,
      t.accommodation ?? "",
      ...t.categories.map((c) => categories[c].label),
      ...t.highlights,
      ...t.program.map((p) => p.title),
    ].join(" "),
  );

export type SortKey = "datum" | "cijena-rastuce" | "cijena-opadajuce";

export interface Filters {
  q: string;
  kategorija: CategoryId | "";
  prevoz: Transport | "";
  mjesec: string;
  maxCijena: number | 0;
  sort: SortKey;
}

export const defaultFilters: Filters = {
  q: "",
  kategorija: "",
  prevoz: "",
  mjesec: "",
  maxCijena: 0,
  sort: "datum",
};

export function filterTrips(all: Trip[], f: Filters) {
  const terms = normalize(f.q).split(/\s+/).filter(Boolean);
  const out = all.filter((t) => {
    if (f.kategorija && !t.categories.includes(f.kategorija)) return false;
    if (f.prevoz && t.transport !== f.prevoz) return false;
    if (f.mjesec && !tripMonths(t).includes(f.mjesec)) return false;
    if (f.maxCijena && t.priceFrom > f.maxCijena) return false;
    if (terms.length) {
      const h = haystack(t);
      if (!terms.every((term) => h.includes(term))) return false;
    }
    return true;
  });
  return out.sort((a, b) => {
    if (f.sort === "cijena-rastuce") return a.priceFrom - b.priceFrom;
    if (f.sort === "cijena-opadajuce") return b.priceFrom - a.priceFrom;
    return a.startDate.localeCompare(b.startDate);
  });
}
