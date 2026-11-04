"use client";

import { useId, type ReactNode } from "react";

const control =
  "w-full rounded-lg border border-mist/15 bg-ink text-base text-mist outline-none transition placeholder:text-fog/60 hover:border-mist/30 focus:border-sand-light focus:ring-2 focus:ring-sand-light/25 aria-[invalid=true]:border-[#e08f7d] sm:text-[0.95rem]";

function Label({ htmlFor, children, optional }: { htmlFor?: string; children: ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 flex items-baseline justify-between text-sm font-medium text-fog">
      {children}
      {optional && <span className="text-xs font-normal text-fog/70">neobavezno</span>}
    </label>
  );
}

function ErrorText({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-1.5 text-[0.82rem] text-[#eba795]">
      {children}
    </p>
  );
}

export function TextField({
  label,
  value,
  onChange,
  error,
  optional,
  type = "text",
  ...rest
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  optional?: boolean;
  type?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  placeholder?: string;
  id?: string;
}) {
  const auto = useId();
  const id = rest.id ?? auto;
  return (
    <div>
      <Label htmlFor={id} optional={optional}>
        {label}
      </Label>
      <input
        {...rest}
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className={`${control} h-12 px-3.5`}
      />
      <ErrorText id={`${id}-err`}>{error}</ErrorText>
    </div>
  );
}

export function TextArea({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  const id = useId();
  return (
    <div>
      <Label htmlFor={id} optional>
        {label}
      </Label>
      <textarea
        id={id}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`${control} resize-y px-3.5 py-3 leading-relaxed`}
      />
    </div>
  );
}

export function Select({
  label,
  value,
  onChange,
  options,
  hideLabel,
}: {
  hideLabel?: boolean;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  const id = useId();
  return (
    <div>
      {hideLabel ? (
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
      ) : (
        <Label htmlFor={id}>{label}</Label>
      )}
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${control} h-12 cursor-pointer appearance-none truncate pl-3.5 pr-10`}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-fog"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

export function Stepper({
  label,
  value,
  onChange,
  min = 1,
  max = 50,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  const id = useId();
  const btn =
    "grid size-10 shrink-0 place-items-center rounded-md text-xl leading-none text-mist transition hover:bg-mist/10 disabled:opacity-30";
  return (
    <div>
      <span id={id} className="mb-2 block text-sm font-medium text-fog">
        {label}
      </span>
      <div role="group" aria-labelledby={id} className="flex h-12 items-center justify-between rounded-lg border border-mist/15 bg-ink px-1">
        <button type="button" className={btn} onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label="Manje putnika">
          −
        </button>
        <output aria-live="polite" className="text-base font-semibold text-mist">
          {value}
        </output>
        <button type="button" className={btn} onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label="Više putnika">
          +
        </button>
      </div>
    </div>
  );
}

/** Radio-style choice list – used for travel dates so long terms are never truncated. */
export function ChoiceList({
  label,
  value,
  onChange,
  options,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  error?: string;
}) {
  const id = useId();
  return (
    <fieldset aria-describedby={error ? `${id}-err` : undefined}>
      <legend className="mb-2 text-sm font-medium text-fog">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = value === o;
          return (
            <label
              key={o}
              className={`cursor-pointer rounded-lg border px-3.5 py-2.5 text-[0.9rem] transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-sand-light ${
                on ? "border-sand-light bg-sand-light/10 text-mist" : "border-mist/15 text-mist/85 hover:border-mist/35"
              }`}
            >
              <input type="radio" name={id} value={o} checked={on} onChange={() => onChange(o)} className="sr-only" />
              {o}
            </label>
          );
        })}
      </div>
      <ErrorText id={`${id}-err`}>{error}</ErrorText>
    </fieldset>
  );
}
