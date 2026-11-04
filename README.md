# Riho Tours – demo redizajn

Prezentacijski redizajn web stranice turističke agencije **Riho Tours** (Breza, BiH), izveden po kompoziciji VoyageX travel landing reference. **Ovo nije službena stranica agencije** – stranica je označena `noindex` (meta, `X-Robots-Tag`, `robots.txt`).

## Pokretanje

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS 4, Motion.

## Struktura

| Putanja | Sadržaj |
| --- | --- |
| `src/data/trips.ts` | 18 stvarnih aranžmana sa rihotours.ba (cijene, termini, program, uključeno/neuključeno, napomene) |
| `src/data/site.ts` | Kontakt, registarski podaci, usluge, kategorije, navigacija |
| `src/data/images.ts` | Biblioteka fotografija sa autorima |
| `src/components/home/*` | Hero carousel i sekcije početne stranice |
| `src/components/trips/trip-browser.tsx` | Pretraga i filteri (stanje u URL-u) |
| `src/components/inquiry-form.tsx` | Upit putem SMS-a / Messengera / telefona |
| `src/app/putovanja/[slug]` | Predložak stranice aranžmana (statički generisan) |

## Podaci

- Sve ponude su prenesene sa javnih objava na rihotours.ba (stanje 4. 11. 2026). Ništa nije procijenjeno; nejasnoće iz originalnih objava navedene su kao napomene na stranici aranžmana.
- Ljetovanja, Jadran hoteli, zimovanje i ekskurzije nemaju objavljene cijene u listingu, pa vode na originalne kategorije na rihotours.ba.
- Email agencije nije javno vidljiv (zaštićen), pa upiti idu kroz potvrđene kanale: telefon/SMS i Facebook stranicu.
- Nema rezervacije ni plaćanja.

## Fotografije

- Logo i dio fotografija preuzeti su iz objava Riho Toursa.
- Ostale fotografije su sa Unsplasha (Unsplash License), autori su navedeni u `src/data/images.ts` i ispod galerija na stranicama aranžmana.
