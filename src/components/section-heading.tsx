import type { ReactNode } from "react";

export function Eyebrow({ children, index }: { children: ReactNode; index?: string }) {
  return (
    <p className="flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-sand-light">
      {index && <span className="text-fog">{index}</span>}
      <span aria-hidden className="inline-block h-px w-8 bg-sand-light/60" />
      {children}
    </p>
  );
}

/**
 * Mirrors the hero headline: uppercase sans with one italic serif word.
 * Pass the emphasised word through `em`.
 */
export function DisplayTitle({
  before,
  em,
  after,
  as: Tag = "h2",
  className = "",
}: {
  before?: string;
  em: string;
  after?: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <Tag
      className={`font-sans text-[clamp(2.1rem,5.4vw,4.4rem)] font-normal uppercase leading-[0.98] tracking-[0.01em] text-mist ${className}`}
    >
      {before && <>{before} </>}
      <span className="font-serif text-[1.1em] normal-case italic tracking-normal">{em}</span>
      {after && <> {after}</>}
    </Tag>
  );
}
