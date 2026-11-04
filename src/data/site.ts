import type { CategoryId } from "./types";

/** Company information as published on rihotours.ba (O nama / Kontakt). */
export const site = {
  name: "Riho Tours",
  legalName: "Riho Tours d.o.o.",
  tagline: "Travel and events agency",
  url: "https://rihotours.ba",
  address: {
    street: "Alije Izetbegovića bb",
    city: "Breza",
    country: "Bosna i Hercegovina",
  },
  phones: [
    { display: "+387 61 010 085", href: "tel:+38761010085", raw: "+38761010085" },
    { display: "+387 61 935 785", href: "tel:+38761935785", raw: "+38761935785" },
  ],
  complaints: { display: "061 935 785 (Anel)", href: "tel:+38761935785" },
  hours: "Ponedjeljak – petak, 08:00 – 16:00",
  social: {
    facebook: "https://www.facebook.com/rihotours/",
    instagram: "https://www.instagram.com/rihotours/",
    messenger: "https://m.me/rihotours",
  },
  terms: "https://rihotours.ba/o-nama/opsti-uslovi-putovanja/",
  registry: {
    id: "4219059410004",
    vat: "219059410004",
    court: "043-0-Reg-24-001023",
    license: "0008; 04-18-03544-1/23",
    membership: "Član UTABIH",
  },
  bank: {
    account: "134-662-10070078-16",
    iban: "BA391341201200069418",
    swift: "IXBZBA2X",
  },
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Alije+Izetbegovi%C4%87a+bb%2C+Breza",
} as const;

export const nav = [
  { label: "Početna", href: "/" },
  { label: "Putovanja", href: "/putovanja" },
  { label: "Destinacije", href: "/#destinacije" },
  { label: "O nama", href: "/o-nama" },
  { label: "Kontakt", href: "/kontakt" },
] as const;

export const categories: Record<
  CategoryId,
  { label: string; description: string }
> = {
  adventi: {
    label: "Adventi",
    description: "Božićni sajmovi Srednje Evrope",
  },
  praznici: {
    label: "Praznici",
    description: "Nova godina, Valentinovo, mimoze i 1. maj",
  },
  istanbul: {
    label: "Istanbul",
    description: "Avionom iz Sarajeva",
  },
  metropole: {
    label: "Evropske metropole",
    description: "Budimpešta, Beč, Prag, Milano",
  },
  jednodnevni: {
    label: "Jednodnevni izleti",
    description: "Polazak noću, povratak istog dana",
  },
  balkan: {
    label: "Balkan",
    description: "Ohrid, Tirana, Skoplje, Zlatibor",
  },
  primorje: {
    label: "Crnogorsko primorje",
    description: "Boka Kotorska, Herceg Novi, Budva",
  },
};

/** Services listed on rihotours.ba (O nama). */
export const services = [
  {
    title: "Organizovana grupna putovanja",
    text: "Autobusom i avionom – od jednodnevnih adventskih izleta do višednevnih tura po Evropi i Balkanu, uz pratioca agencije.",
  },
  {
    title: "Individualna putovanja",
    text: "Putovanja krojena po vašoj mjeri – destinacija, termin i smještaj prema vašim željama.",
  },
  {
    title: "Bračna putovanja",
    text: "Medeni mjesec i romantični bijeg, organizovan od prvog do posljednjeg dana.",
  },
  {
    title: "Poslovna putovanja i teambuilding",
    text: "Poslovna putovanja prilagođena potrebama klijenta i teambuilding programi za vaš tim.",
  },
  {
    title: "Ljetovanja",
    text: "Turska (Antalijska regija, Bodrum, Marmaris, Kušadasi, Sarımsaklı), Egipat, Tunis, Jadran, Crna Gora i Albanija.",
  },
  {
    title: "Wellness, spa i zimovanja",
    text: "Spa odmori u BiH, Hrvatskoj i drugim destinacijama te zimovanja na Bjelašnici, Jahorini, Vlašiću, Kopaoniku i Zlatiboru.",
  },
  {
    title: "Avio karte i putno osiguranje",
    text: "Avio karte za sve destinacije svijeta i putno zdravstveno osiguranje na jednom mjestu.",
  },
] as const;

/** Offer groups on the original site that are not modelled as trips in this demo. */
export const externalCollections = [
  {
    title: "Avio ljetovanja",
    text: "Turska, Egipat, Tunis, Grčka i Španija",
    href: "https://rihotours.ba/category/ljetovanje-avio-ljetovanja/",
  },
  {
    title: "Jadran hoteli",
    text: "Hrvatska, Crna Gora, BiH i Albanija",
    href: "https://rihotours.ba/category/jadran-hoteli",
  },
  {
    title: "Zimovanje",
    text: "Bjelašnica, Igman, Jahorina, Vlašić, Kopaonik, Zlatibor",
    href: "https://rihotours.ba/category/zimovanje/",
  },
  {
    title: "Ekskurzije",
    text: "Školske i grupne ekskurzije",
    href: "https://rihotours.ba/category/ekskurzije/",
  },
] as const;
