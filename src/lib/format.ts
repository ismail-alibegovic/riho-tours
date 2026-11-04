import type { Trip } from "@/data/types";

export const formatKM = (amount: number) =>
  `${new Intl.NumberFormat("bs-BA", { maximumFractionDigits: 0 }).format(amount)} KM`;

const MONTHS = [
  "januar",
  "februar",
  "mart",
  "april",
  "maj",
  "juni",
  "juli",
  "august",
  "septembar",
  "oktobar",
  "novembar",
  "decembar",
];

export const monthKey = (iso: string) => iso.slice(0, 7);

export const monthLabel = (key: string) => {
  const [y, m] = key.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}.`;
};

export const tripMonths = (t: Trip) =>
  Array.from(new Set([t.startDate, ...(t.extraStartDates ?? [])].map(monthKey)));

export const pad2 = (n: number) => String(n).padStart(2, "0");

export const transportLabel = (t: Trip["transport"]) =>
  t === "avio" ? "Avionom" : "Autobusom";

/** "1 aranžman", "21 aranžman", otherwise "aranžmana" */
export const aranzmanWord = (n: number) =>
  n % 10 === 1 && n % 100 !== 11 ? "aranžman" : "aranžmana";
