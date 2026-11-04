export type Transport = "avio" | "bus";

export type CategoryId =
  | "adventi"
  | "praznici"
  | "istanbul"
  | "metropole"
  | "jednodnevni"
  | "balkan"
  | "primorje";

export interface PriceTier {
  /** e.g. "First minute", "Redovna cijena" */
  label: string;
  /** Amount in KM, exactly as published */
  amount: number;
  /** Condition attached to the tier, as published */
  condition?: string;
}

export interface ProgramDay {
  day: string;
  title: string;
  text: string;
}

export interface OptionalExtra {
  name: string;
  price: string;
}

export interface TripImage {
  src: string;
  alt: string;
  /** Photo credit (Unsplash) or "Riho Tours" for agency material */
  credit: string;
  creditUrl?: string;
}

export interface Trip {
  slug: string;
  title: string;
  /** Short name used on cards and in the hero */
  name: string;
  /** Second line under the name, e.g. "Advent na Dunavu" */
  tagline: string;
  region: string;
  country: string;
  transport: Transport;
  categories: CategoryId[];
  /** Human readable terms exactly as published */
  dates: string[];
  /** ISO date of the first published departure – used for sorting and month filtering */
  startDate: string;
  /** Extra departure ISO dates (multiple terms) */
  extraStartDates?: string[];
  duration: string;
  accommodation?: string;
  prices: PriceTier[];
  /** Lowest published package price in KM */
  priceFrom: number;
  departures: string[];
  departureNote?: string;
  summary: string;
  highlights: string[];
  program: ProgramDay[];
  included: string[];
  excluded: string[];
  optional?: OptionalExtra[];
  documents?: string;
  notes?: string[];
  image: TripImage;
  /** Wide, high-resolution photo for full-bleed hero backgrounds */
  heroImage?: TripImage;
  /** Secondary image used in editorial layouts */
  imageAlt?: TripImage;
  /** Original offer on rihotours.ba */
  sourceUrl: string;
}
