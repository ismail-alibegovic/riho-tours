import type { TripImage } from "./types";

const u = (
  file: string,
  alt: string,
  author: string,
  username: string,
): TripImage => ({
  src: `/images/dest/${file}`,
  alt,
  credit: `${author} / Unsplash`,
  creditUrl: `https://unsplash.com/@${username}`,
});

const riho = (file: string, alt: string): TripImage => ({
  src: `/images/riho/${file}`,
  alt,
  credit: "Riho Tours",
  creditUrl: "https://rihotours.ba/",
});

/**
 * Photo library.
 * Unsplash photos are used under the Unsplash License (free commercial use).
 * "riho" photos are taken from the agency's own published offers on rihotours.ba.
 */
export const img = {
  bokaKotorska: u(
    "boka-kotorska.jpg",
    "Panorama Bokokotorskog zaliva okruženog strmim planinama",
    "Sergei Shershen",
    "mackgreeb",
  ),
  kotorZaljev: u(
    "kotor-zaljev.jpg",
    "Pogled na Kotor i zaliv sa puta prema Lovćenu",
    "Eline Vanstraelen",
    "elinevanstraelen",
  ),
  budva: u(
    "budva.jpg",
    "Stari grad Budva i ostrvo Sveti Nikola",
    "Dean Milenkovic",
    "deanmilenkovic",
  ),
  istanbulBosfor: u(
    "istanbul-bosfor.jpg",
    "Ortaköy džamija na obali Bosfora u zalazak sunca",
    "Spenser Sembrat",
    "spensersembrat",
  ),
  istanbulEminonu: u(
    "istanbul-eminonu.jpg",
    "Trajekt na Bosforu ispred siluete Eminönüa",
    "Engin Yapici",
    "yapici",
  ),
  istanbulLale: u(
    "istanbul-lale.jpg",
    "Lale u parku Emirgan u Istanbulu",
    "Aslı Yaren Peker Kaya",
    "asliyarenpekerkaya",
  ),
  venecijaKanal: u(
    "venecija-kanal.jpg",
    "Gondola na kanalu u Veneciji",
    "Damiano Baschiera",
    "damiano_baschiera",
  ),
  venecijaZima: u(
    "venecija-zima.jpg",
    "Veliki kanal u Veneciji u zimskom svjetlu",
    "Philipp Düsel",
    "philipp_dice",
  ),
  venecijaSalute: u(
    "venecija-salute.jpg",
    "Bazilika Santa Maria della Salute na Velikom kanalu u Veneciji",
    "Claudio Schwarz",
    "purzlbaum",
  ),
  budimpestaNoc: u(
    "budimpesta-noc.jpg",
    "Osvijetljen Parlament u Budimpešti noću, odraz u Dunavu",
    "Jason Mavrommatis",
    "jasonblackeye",
  ),
  budimpestaParlament: u(
    "budimpesta-parlament.jpg",
    "Mađarski parlament na obali Dunava",
    "Ervin Lukacs",
    "lukerv4",
  ),
  ohridKaneo: u(
    "ohrid-kaneo.jpg",
    "Crkva Sv. Jovana Kaneo iznad Ohridskog jezera u zalazak",
    "Kristijan Arsov",
    "aarsoph",
  ),
  ohridPortret: u(
    "ohrid-portret.jpg",
    "Crkva Sv. Jovana Kaneo i Ohridsko jezero",
    "Martin Koloski",
    "martinkoloski",
  ),
  comoJezero: u(
    "como-jezero.jpg",
    "Gradić na obali jezera Como i Alpe u pozadini",
    "Miriana Dorobanțu",
    "mirianaa_",
  ),
  becSchonbrunn: u(
    "bec-schonbrunn.jpg",
    "Dvorac Schönbrunn u Beču",
    "Joshi Milestoner",
    "joshimilestoner",
  ),
  pragAdvent: u(
    "prag-advent.jpg",
    "Božićna jelka ispred Tinske crkve na Staromjestskom trgu u Pragu",
    "Natalia Marcelewicz",
    "nataliila",
  ),
  zlatibor: u(
    "zlatibor.jpg",
    "Zelene padine planine Zlatibor",
    "goxy bgd",
    "goranab",
  ),
  veronaArena: u(
    "verona-arena.jpg",
    "Rimska Arena u Veroni",
    "Gabriel Castles",
    "gabrielcastles",
  ),
  graz: u(
    "graz-sahovski-toranj.jpg",
    "Sahat-kula Uhrturm iznad starog grada Graza",
    "Anna Wilhelm",
    "anna_c_wilhelm",
  ),
  temisvar: u(
    "temisvar-trg.jpg",
    "Trg Unirii u Temišvaru",
    "Bogdan Vlad",
    "bogdanvlad",
  ),
  // Agency material from rihotours.ba
  rihoOsijek: riho("osijek-advent.jpg", "Adventski sajam u Tvrđi, Osijek"),
  rihoBudimpestaAdvent: riho(
    "budimpesta-advent.jpg",
    "Adventski sajam i jelka u Budimpešti",
  ),
  rihoMimoze: riho(
    "praznik-mimoze-1.jpeg",
    "Šetalište u Herceg Novom sa rascvjetalim mimozama",
  ),
  rihoKarneval: riho(
    "venecijanski-karneval.jpg",
    "Maske na Venecijanskom karnevalu",
  ),
  rihoMilano: riho("milano-duomo.jpg", "Katedrala Duomo u Milanu"),
  rihoIstanbulNG: riho(
    "istanbul-nova-godina.jpg",
    "Vatromet iznad Ortaköy džamije na Bosforu",
  ),
} satisfies Record<string, TripImage>;
