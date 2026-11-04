"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { categories } from "@/data/site";
import type { CategoryId, Transport, Trip } from "@/data/types";
import { aranzmanWord, monthLabel, tripMonths } from "@/lib/format";
import { defaultFilters, filterTrips, type Filters, type SortKey } from "@/lib/search";
import { Close, Search } from "../icons";
import { TripCard, TripRow } from "../trip-card";

const PRICE_STEPS = [100, 250, 500, 900];

function readFilters(sp: URLSearchParams): Filters {
  const kat = sp.get("kategorija") ?? "";
  const prevoz = sp.get("prevoz") ?? "";
  const sort = (sp.get("sort") ?? "datum") as SortKey;
  return {
    q: sp.get("q") ?? "",
    kategorija: kat in categories ? (kat as CategoryId) : "",
    prevoz: prevoz === "avio" || prevoz === "bus" ? (prevoz as Transport) : "",
    mjesec: sp.get("mjesec") ?? "",
    maxCijena: Number(sp.get("do")) || 0,
    sort: ["datum", "cijena-rastuce", "cijena-opadajuce"].includes(sort) ? sort : "datum",
  };
}

function toQuery(f: Filters) {
  const sp = new URLSearchParams();
  if (f.q) sp.set("q", f.q);
  if (f.kategorija) sp.set("kategorija", f.kategorija);
  if (f.prevoz) sp.set("prevoz", f.prevoz);
  if (f.mjesec) sp.set("mjesec", f.mjesec);
  if (f.maxCijena) sp.set("do", String(f.maxCijena));
  if (f.sort !== "datum") sp.set("sort", f.sort);
  const s = sp.toString();
  return s ? `?${s}` : "";
}

export function TripBrowser({ trips }: { trips: Trip[] }) {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [, startTransition] = useTransition();
  const [filters, setFilters] = useState<Filters>(() => readFilters(new URLSearchParams(sp.toString())));
  const inputRef = useRef<HTMLInputElement>(null);
  const [showFilters, setShowFilters] = useState(false);

  // keep state in sync with back/forward navigation
  const spString = sp.toString();
  const [lastSp, setLastSp] = useState(spString);
  if (spString !== lastSp) {
    setLastSp(spString);
    setFilters(readFilters(new URLSearchParams(spString)));
  }

  useEffect(() => {
    if (window.location.hash === "#pretraga") inputRef.current?.focus({ preventScroll: true });
  }, []);

  const update = (patch: Partial<Filters>) => {
    const next = { ...filters, ...patch };
    setFilters(next);
    startTransition(() => {
      router.replace(`${pathname}${toQuery(next)}`, { scroll: false });
    });
  };

  const months = useMemo(
    () => Array.from(new Set(trips.flatMap(tripMonths))).sort(),
    [trips],
  );
  const results = useMemo(() => filterTrips(trips, filters), [trips, filters]);
  const active =
    !!filters.q || !!filters.kategorija || !!filters.prevoz || !!filters.mjesec || !!filters.maxCijena;

  const chip = (on: boolean) =>
    `shrink-0 rounded-full border px-4 py-2 text-[0.85rem] transition ${
      on
        ? "border-mist bg-mist text-ink"
        : "border-mist/20 text-mist/85 hover:border-mist/60 hover:text-mist"
    }`;

  const selectCls =
    "w-full appearance-none rounded-[10px] border border-mist/15 bg-ink-2 px-3.5 py-3 pr-9 text-base text-mist sm:px-4 sm:text-[0.92rem] outline-none transition focus:border-mist/60 bg-[url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239FB0BA' stroke-width='2'><path d='M6 9l6 6 6-6'/></svg>\")] bg-[length:12px] bg-[right_14px_center] bg-no-repeat";

  return (
    <div id="pretraga" className="scroll-mt-6">
      <div className="rounded-[18px] border border-mist/10 bg-ink-2/60 p-3 sm:p-6">
        <form
          role="search"
          onSubmit={(e) => e.preventDefault()}
          className="grid gap-3 lg:grid-cols-[minmax(0,1.6fr)_repeat(4,minmax(0,1fr))]"
        >
          <div className="flex gap-2 lg:contents">
          <label className="relative block flex-1">
            <span className="sr-only">Pretraži putovanja</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-fog" />
            <input
              ref={inputRef}
              type="search"
              value={filters.q}
              onChange={(e) => update({ q: e.target.value })}
              placeholder="Gdje želite putovati?"
              className="w-full rounded-[10px] border border-mist/15 bg-ink-2 py-3 pl-11 pr-4 text-base text-mist placeholder:text-fog/70 outline-none transition focus:border-mist/60 sm:text-[0.95rem]"
            />
          </label>
          <button
            type="button"
            onClick={() => setShowFilters((v) => !v)}
            aria-expanded={showFilters}
            aria-controls="filteri"
            className={`relative shrink-0 rounded-[10px] border px-4 text-[0.88rem] transition lg:hidden ${
              showFilters ? "border-mist bg-mist text-ink" : "border-mist/15 bg-ink-2 text-mist"
            }`}
          >
            Filteri
            {(filters.prevoz || filters.mjesec || filters.maxCijena || filters.sort !== "datum") && (
              <span className="absolute -right-1 -top-1 size-2.5 rounded-full bg-sand-light" aria-label="aktivni filteri" />
            )}
          </button>
          </div>
          <div id="filteri" className={`${showFilters ? "grid" : "hidden"} grid-cols-2 gap-2 sm:gap-3 lg:contents`}>
          <label>
            <span className="sr-only">Prevoz</span>
            <select
              value={filters.prevoz}
              onChange={(e) => update({ prevoz: e.target.value as Transport | "" })}
              className={selectCls}
            >
              <option value="">Prevoz: svi</option>
              <option value="bus">Autobusom</option>
              <option value="avio">Avionom</option>
            </select>
          </label>
          <label>
            <span className="sr-only">Mjesec polaska</span>
            <select
              value={filters.mjesec}
              onChange={(e) => update({ mjesec: e.target.value })}
              className={selectCls}
            >
              <option value="">Mjesec: svi</option>
              {months.map((m) => (
                <option key={m} value={m}>
                  {monthLabel(m)}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="sr-only">Najviša cijena</span>
            <select
              value={filters.maxCijena}
              onChange={(e) => update({ maxCijena: Number(e.target.value) })}
              className={selectCls}
            >
              <option value={0}>Cijena: sve</option>
              {PRICE_STEPS.map((p) => (
                <option key={p} value={p}>
                  do {p} KM
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="sr-only">Sortiranje</span>
            <select
              value={filters.sort}
              onChange={(e) => update({ sort: e.target.value as SortKey })}
              className={selectCls}
            >
              <option value="datum">Po datumu</option>
              <option value="cijena-rastuce">Cijena: od najniže</option>
              <option value="cijena-opadajuce">Cijena: od najviše</option>
            </select>
          </label>
          </div>
        </form>

        <div
          className="no-scrollbar -mx-3 mt-3 flex gap-2 overflow-x-auto px-3 sm:-mx-6 sm:mt-4 sm:px-6 lg:flex-wrap"
          role="group"
          aria-label="Kategorije"
        >
          <button
            type="button"
            className={chip(!filters.kategorija)}
            aria-pressed={!filters.kategorija}
            onClick={() => update({ kategorija: "" })}
          >
            Sve kategorije
          </button>
          {(Object.keys(categories) as CategoryId[]).map((id) => (
            <button
              key={id}
              type="button"
              className={chip(filters.kategorija === id)}
              aria-pressed={filters.kategorija === id}
              onClick={() => update({ kategorija: filters.kategorija === id ? "" : id })}
            >
              {categories[id].label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 sm:mt-10">
        <p className="text-[0.95rem] text-fog" aria-live="polite">
          <span className="font-serif text-[1.6rem] italic text-mist">{results.length}</span>{" "}
          {aranzmanWord(results.length)}
          {filters.kategorija && <> · {categories[filters.kategorija].label}</>}
        </p>
        {active && (
          <button
            type="button"
            onClick={() => update({ ...defaultFilters, sort: filters.sort })}
            className="inline-flex items-center gap-2 rounded-full border border-mist/20 px-4 py-2 text-[0.85rem] text-mist transition hover:border-mist/60"
          >
            <Close className="size-3.5" /> Poništi filtere
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <div className="mt-10 rounded-[18px] border border-dashed border-mist/20 px-6 py-16 text-center">
          <p className="font-serif text-[1.8rem] italic text-mist">Nema aranžmana za odabrane filtere.</p>
          <p className="mx-auto mt-3 max-w-md text-fog">
            Promijenite kriterije ili nam pošaljite upit – rado ćemo pripremiti individualnu ponudu.
          </p>
          <button
            type="button"
            onClick={() => update(defaultFilters)}
            className="mt-6 rounded-full bg-mist px-5 py-2.5 text-sm font-medium text-ink"
          >
            Prikaži sva putovanja
          </button>
        </div>
      ) : (
        <ul className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-14 lg:grid-cols-3">
          <AnimatePresence initial={false} mode="popLayout">
            {results.map((t) => (
              <motion.li
                key={t.slug}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <TripRow trip={t} className="sm:hidden" />
                <TripCard
                  trip={t}
                  variant="landscape"
                  className="hidden sm:block"
                  sizes="(min-width:1024px) 30vw, (min-width:640px) 48vw, 100vw"
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}

/** Static fallback rendered during prerendering (no URL data). */
export function TripGridFallback({ trips }: { trips: Trip[] }) {
  const sorted = [...trips].sort((a, b) => a.startDate.localeCompare(b.startDate));
  return (
    <div>
      <div className="h-[8.5rem] rounded-[18px] border border-mist/10 bg-ink-2/60" />
      <ul className="mt-[6.5rem] grid gap-3 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-14 lg:grid-cols-3">
        {sorted.map((t) => (
          <li key={t.slug}>
            <TripRow trip={t} className="sm:hidden" />
            <TripCard trip={t} variant="landscape" className="hidden sm:block" sizes="(min-width:1024px) 30vw, (min-width:640px) 48vw, 100vw" />
          </li>
        ))}
      </ul>
    </div>
  );
}
