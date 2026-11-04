"use client";

import { useState } from "react";
import { site } from "@/data/site";
import { Check, Copy, Message, Phone } from "./icons";
import { ChoiceList, Select, Stepper, TextArea, TextField } from "./ui/fields";

interface Props {
  tripTitle?: string;
  dates?: string[];
  departures?: string[];
}

type Errors = Partial<Record<"name" | "phone" | "term", string>>;

/**
 * Inquiry for an offer. There is no booking backend: the message is handed to
 * the agency's published channels – SMS to the mobile number on phones,
 * copy + Messenger or a call on desktop.
 */
export function InquiryForm({ tripTitle, dates = [], departures = [] }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [people, setPeople] = useState(2);
  const [term, setTerm] = useState(dates.length === 1 ? dates[0] : "");
  const [from, setFrom] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);

  const message = [
    tripTitle ? `Upit za aranžman: ${tripTitle}` : "Upit za putovanje",
    term && `Termin: ${term}`,
    from && `Polazak iz: ${from}`,
    `Broj putnika: ${people}`,
    note && `Napomena: ${note}`,
    `Ime: ${name.trim()}`,
    `Telefon: ${phone.trim()}`,
  ]
    .filter(Boolean)
    .join("\n");

  const smsHref = `sms:${site.phones[0].raw}?&body=${encodeURIComponent(message)}`;

  const validate = () => {
    const e: Errors = {};
    if (name.trim().length < 2) e.name = "Upišite ime i prezime.";
    if (phone.replace(/\D/g, "").length < 6) e.phone = "Upišite broj na koji vas agencija može nazvati.";
    if (dates.length > 1 && !term) e.term = "Odaberite termin.";
    setErrors(e);
    return e;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) {
      const first = document.querySelector<HTMLElement>("[aria-invalid=true], fieldset[aria-describedby] input");
      first?.focus();
      return;
    }
    setDone(true);
    // Phones can hand the prepared message straight to the SMS app.
    if (window.matchMedia("(pointer: coarse)").matches) window.location.href = smsHref;
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* clipboard unavailable – text stays visible for manual copy */
    }
  };

  if (done) {
    return (
      <div aria-live="polite">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-riho-green/20 text-riho-green">
            <Check className="size-4" />
          </span>
          <div>
            <p className="font-semibold text-mist">Upit je pripremljen</p>
            <p className="mt-1 text-sm leading-relaxed text-fog">
              Pošaljite ga agenciji jednim od kanala ispod. Na telefonu se SMS otvara automatski.
            </p>
          </div>
        </div>

        <pre className="mt-5 whitespace-pre-wrap rounded-lg border border-mist/10 bg-ink p-4 font-sans text-[0.85rem] leading-relaxed text-mist/85">
          {message}
        </pre>

        <div className="mt-5 grid gap-2.5">
          <a
            href={smsHref}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-mist font-semibold text-ink transition hover:bg-white"
          >
            <Message className="size-4" /> Pošalji SMS
          </a>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={copy}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-mist/20 text-sm font-medium text-mist transition hover:border-mist/50"
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied ? "Kopirano" : "Kopiraj tekst"}
            </button>
            <a
              href={site.social.messenger}
              target="_blank"
              rel="noreferrer"
              onClick={copy}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-mist/20 text-sm font-medium text-mist transition hover:border-mist/50"
            >
              Messenger
            </a>
          </div>
          <a
            href={site.phones[0].href}
            className="inline-flex h-11 items-center justify-center gap-2 text-sm text-mist/85 hover:text-mist"
          >
            <Phone className="size-4 text-sand-light" /> Nazovite {site.phones[0].display}
          </a>
        </div>
        <button
          type="button"
          onClick={() => setDone(false)}
          className="mt-2 text-sm text-fog underline underline-offset-4 hover:text-mist"
        >
          Izmijeni podatke
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      {dates.length > 1 && (
        <ChoiceList label="Termin" value={term} onChange={setTerm} options={dates} error={errors.term} />
      )}
      {dates.length === 0 && (
        <TextField label="Okvirni termin" value={term} onChange={setTerm} optional placeholder="npr. druga polovina decembra" />
      )}
      {dates.length === 1 && (
        <p className="rounded-lg bg-ink px-3.5 py-3 text-sm text-fog">
          Termin: <span className="font-medium text-mist">{dates[0]}</span>
        </p>
      )}

      <div className="grid grid-cols-[8.5rem_1fr] gap-4">
        <Stepper label="Broj putnika" value={people} onChange={setPeople} />
        {departures.length > 1 ? (
          <Select
            label="Polazak iz"
            value={from}
            onChange={setFrom}
            options={[{ value: "", label: "Odaberite" }, ...departures.map((d) => ({ value: d, label: d }))]}
          />
        ) : (
          <TextField label="Mjesto polaska" value={from} onChange={setFrom} optional placeholder="npr. Breza" />
        )}
      </div>

      <TextField label="Ime i prezime" value={name} onChange={setName} error={errors.name} autoComplete="name" />
      <TextField
        label="Telefon"
        type="tel"
        inputMode="tel"
        value={phone}
        onChange={setPhone}
        error={errors.phone}
        autoComplete="tel"
        placeholder="061 234 567"
      />
      <TextArea
        label={tripTitle ? "Napomena" : "Šta planirate?"}
        value={note}
        onChange={setNote}
        placeholder={tripTitle ? "Jednokrevetna soba, djeca, pitanja o programu…" : "Destinacija, broj osoba, okvirni termin i budžet"}
      />

      <button
        type="submit"
        className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-mist font-semibold text-ink transition hover:bg-white"
      >
        Pošalji upit
      </button>
      <p className="text-center text-xs leading-relaxed text-fog">
        Bez rezervacije i plaćanja. Agencija vam se javlja radnim danima od 8 do 16 h.
      </p>
    </form>
  );
}
