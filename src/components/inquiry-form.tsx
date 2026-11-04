"use client";

import { useId, useState } from "react";
import { site } from "@/data/site";
import { Check, Copy, Message, Phone } from "./icons";

interface Props {
  tripTitle?: string;
  dates?: string[];
  departures?: string[];
  compact?: boolean;
}

/**
 * Builds an inquiry and hands it to the agency's existing channels
 * (SMS to the published mobile number, Facebook Messenger, phone call).
 * Nothing is stored or sent by this demo itself.
 */
export function InquiryForm({ tripTitle, dates, departures, compact }: Props) {
  const id = useId();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [people, setPeople] = useState("2");
  const [term, setTerm] = useState(dates?.length === 1 ? dates[0] : "");
  const [from, setFrom] = useState("");
  const [note, setNote] = useState("");
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const message = [
    "Poštovani, šaljem upit putem web stranice.",
    tripTitle && `Aranžman: ${tripTitle}`,
    term && `Termin: ${term}`,
    from && `Polazak iz: ${from}`,
    `Broj putnika: ${people}`,
    note && `Napomena: ${note}`,
    `Ime i prezime: ${name}`,
    `Kontakt telefon: ${phone}`,
  ]
    .filter(Boolean)
    .join("\n");

  const smsHref = `sms:${site.phones[0].raw}?&body=${encodeURIComponent(message)}`;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (name.trim().length < 2) next.name = "Unesite ime i prezime.";
    if (phone.replace(/\D/g, "").length < 6) next.phone = "Unesite broj telefona za povratni poziv.";
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(`${id}-${next.name ? "name" : "phone"}`)?.focus();
      return;
    }
    setReady(true);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const field =
    "w-full rounded-[10px] border border-mist/15 bg-ink px-4 py-3 text-base text-mist sm:text-[0.95rem] placeholder:text-fog/60 outline-none transition focus:border-mist/60 aria-[invalid=true]:border-[#d98c7a]";
  const label = "mb-1.5 block text-[0.72rem] font-medium uppercase tracking-[0.18em] text-fog";

  if (ready) {
    return (
      <div className="space-y-5" aria-live="polite">
        <div>
          <p className="font-serif text-[1.7rem] italic leading-tight text-mist">Upit je spreman.</p>
          <p className="mt-2 text-[0.92rem] leading-relaxed text-fog">
            Odaberite kako ga želite poslati agenciji. Demo stranica ne pohranjuje podatke –
            poruka se šalje iz vaše aplikacije.
          </p>
        </div>
        <pre className="max-h-56 overflow-auto whitespace-pre-wrap rounded-[10px] border border-mist/10 bg-ink p-4 font-sans text-[0.85rem] leading-relaxed text-mist/85">
          {message}
        </pre>
        <div className="grid gap-2.5">
          <a
            href={smsHref}
            className="inline-flex items-center justify-center gap-2.5 rounded-[10px] bg-mist px-5 py-3.5 text-[0.95rem] font-medium text-ink transition hover:bg-white"
          >
            <Message className="size-4" /> Pošalji SMS na {site.phones[0].display}
          </a>
          <div className="grid gap-2.5 sm:grid-cols-2">
            <button
              type="button"
              onClick={copy}
              className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-mist/25 px-4 py-3 text-[0.9rem] text-mist transition hover:border-mist"
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied ? "Kopirano" : "Kopiraj tekst"}
            </button>
            <a
              href={site.social.messenger}
              target="_blank"
              rel="noreferrer"
              onClick={copy}
              className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-mist/25 px-4 py-3 text-[0.9rem] text-mist transition hover:border-mist"
            >
              <Message className="size-4" /> Messenger
            </a>
          </div>
          <a
            href={site.phones[0].href}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-[0.9rem] text-mist/85 transition hover:text-mist"
          >
            <Phone className="size-4 text-sand-light" /> Ili nazovite {site.phones[0].display}
          </a>
        </div>
        <button
          type="button"
          onClick={() => setReady(false)}
          className="text-[0.85rem] text-fog underline underline-offset-4 hover:text-mist"
        >
          Izmijeni upit
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <div className={compact ? "space-y-4" : "grid gap-4 sm:grid-cols-2"}>
        <div>
          <label htmlFor={`${id}-name`} className={label}>
            Ime i prezime *
          </label>
          <input
            id={`${id}-name`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${id}-name-err` : undefined}
            className={field}
          />
          {errors.name && (
            <p id={`${id}-name-err`} className="mt-1.5 text-[0.8rem] text-[#e7a493]">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className={label}>
            Telefon *
          </label>
          <input
            id={`${id}-phone`}
            type="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
            placeholder="06x xxx xxx"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? `${id}-phone-err` : undefined}
            className={field}
          />
          {errors.phone && (
            <p id={`${id}-phone-err`} className="mt-1.5 text-[0.8rem] text-[#e7a493]">
              {errors.phone}
            </p>
          )}
        </div>
      </div>
      <div className={compact ? "grid grid-cols-2 gap-4" : "grid gap-4 sm:grid-cols-3"}>
        <div>
          <label htmlFor={`${id}-people`} className={label}>
            Putnika
          </label>
          <select id={`${id}-people`} value={people} onChange={(e) => setPeople(e.target.value)} className={field}>
            {Array.from({ length: 10 }, (_, i) => String(i + 1)).map((n) => (
              <option key={n}>{n}</option>
            ))}
            <option value="više od 10">10+</option>
          </select>
        </div>
        {dates && dates.length > 0 ? (
          <div>
            <label htmlFor={`${id}-term`} className={label}>
              Termin
            </label>
            <select id={`${id}-term`} value={term} onChange={(e) => setTerm(e.target.value)} className={field}>
              {dates.length > 1 && <option value="">Odaberite</option>}
              {dates.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>
        ) : (
          <div>
            <label htmlFor={`${id}-term`} className={label}>
              Željeni termin
            </label>
            <input id={`${id}-term`} value={term} onChange={(e) => setTerm(e.target.value)} placeholder="npr. decembar" className={field} />
          </div>
        )}
        {departures && departures.length > 1 && (
          <div className={compact ? "col-span-2" : ""}>
            <label htmlFor={`${id}-from`} className={label}>
              Polazak iz
            </label>
            <select id={`${id}-from`} value={from} onChange={(e) => setFrom(e.target.value)} className={field}>
              <option value="">Odaberite</option>
              {departures.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>
        )}
      </div>
      <div>
        <label htmlFor={`${id}-note`} className={label}>
          {tripTitle ? "Napomena" : "Šta planirate?"}
        </label>
        <textarea
          id={`${id}-note`}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={compact ? 3 : 4}
          placeholder={tripTitle ? "Jednokrevetna soba, djeca, pitanja…" : "Destinacija, broj osoba, budžet, posebne želje…"}
          className={`${field} resize-y`}
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-[10px] bg-mist px-5 py-3.5 text-[0.95rem] font-medium text-ink transition hover:bg-white"
      >
        Pripremi upit
      </button>
      <p className="text-[0.78rem] leading-relaxed text-fog">
        Upit šaljete putem SMS-a, Messengera ili telefona – bez rezervacije i plaćanja na
        ovoj stranici.
      </p>
    </form>
  );
}
