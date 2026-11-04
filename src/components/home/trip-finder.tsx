"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { categories } from "@/data/site";
import type { CategoryId, Transport, Trip } from "@/data/types";
import { aranzmanWord, monthLabel, tripMonths } from "@/lib/format";
import { filterTrips, defaultFilters } from "@/lib/search";
import { Bus, Plane, Search } from "../icons";
import { Select } from "../ui/fields";

const BUDGETS = [100, 250, 500, 900];

/** Homepage trip picker – narrows the published offers and opens the filtered list. */
export function TripFinder({ trips }: { trips: Trip[] }) {
  const router = useRouter();
  const [kategorija, setKategorija] = useState<CategoryId | "">("");
  const [mjesec, setMjesec] = useState("");
  const [prevoz, setPrevoz] = useState<Transport | "">("");
  const [budzet, setBudzet] = useState(0);

  const months = useMemo(() => Array.from(new Set(trips.flatMap(tripMonths))).sort(), [trips]);
  const count = filterTrips(trips, {
    ...defaultFilters,
    kategorija,
    mjesec,
    prevoz,
    maxCijena: budzet,
  }).length;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const sp = new URLSearchParams();
    if (kategorija) sp.set("kategorija", kategorija);
    if (mjesec) sp.set("mjesec", mjesec);
    if (prevoz) sp.set("prevoz", prevoz);
    if (budzet) sp.set("do", String(budzet));
    const q = sp.toString();
    router.push(`/putovanja${q ? `?${q}` : ""}`);
  };

  const transportBtn = (value: Transport | "", label: string, icon?: React.ReactNode) => (
    <button
      type="button"
      onClick={() => setPrevoz(value)}
      aria-pressed={prevoz === value}
      className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition ${
        prevoz === value ? "bg-mist text-ink" : "text-mist/80 hover:text-mist"
      }`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <section aria-labelledby="pronadji" className="relative z-10 mx-auto max-w-[1440px] px-2 sm:px-3 lg:-mt-12 lg:px-12">
      <form
        onSubmit={submit}
        className="rounded-2xl border border-mist/10 bg-[#0e1d22] p-5 shadow-[0_30px_60px_-30px_rgba(0,0,0,.8)] sm:p-6 lg:p-7"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h2 id="pronadji" className="text-lg font-semibold text-mist">
            Pronađite putovanje
          </h2>
          <p className="text-sm text-fog" aria-live="polite">
            {count} {aranzmanWord(count)} odgovara odabiru
          </p>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.2fr_1fr_auto] lg:items-end">
          <Select
            label="Vrsta putovanja"
            value={kategorija}
            onChange={(v) => setKategorija(v as CategoryId | "")}
            options={[
              { value: "", label: "Sve ponude" },
              ...(Object.keys(categories) as CategoryId[]).map((id) => ({
                value: id,
                label: categories[id].label,
              })),
            ]}
          />
          <Select
            label="Mjesec polaska"
            value={mjesec}
            onChange={setMjesec}
            options={[
              { value: "", label: "Bilo kada" },
              ...months.map((m) => ({ value: m, label: monthLabel(m) })),
            ]}
          />
          <div>
            <span className="mb-2 block text-sm font-medium text-fog">Prevoz</span>
            <div className="flex rounded-lg border border-mist/15 bg-ink p-1" role="group" aria-label="Prevoz">
              {transportBtn("", "Svi")}
              {transportBtn("bus", "Bus", <Bus className="size-4" />)}
              {transportBtn("avio", "Avion", <Plane className="size-4" />)}
            </div>
          </div>
          <Select
            label="Budžet po osobi"
            value={String(budzet)}
            onChange={(v) => setBudzet(Number(v))}
            options={[
              { value: "0", label: "Bez ograničenja" },
              ...BUDGETS.map((b) => ({ value: String(b), label: `do ${b} KM` })),
            ]}
          />
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-mist px-6 font-semibold text-ink transition hover:bg-white disabled:opacity-50 sm:col-span-2 lg:col-span-1"
            disabled={count === 0}
          >
            <Search className="size-4" />
            {count === 0 ? "Nema termina" : "Prikaži putovanja"}
          </button>
        </div>
      </form>
    </section>
  );
}
