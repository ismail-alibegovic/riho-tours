import type { ReactNode } from "react";

/** Small label above a section title. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-sm font-medium text-sand-light">{children}</p>;
}

/** Section title – plain sentence case; the serif is reserved for the hero and pull quotes. */
export function SectionTitle({
  children,
  as: Tag = "h2",
  className = "",
}: {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <Tag
      className={`text-[clamp(1.85rem,3.6vw,3rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-mist ${className}`}
    >
      {children}
    </Tag>
  );
}

/** Consistent section header: label + title on the left, optional action/intro on the right. */
export function SectionHeader({
  label,
  title,
  intro,
  action,
}: {
  label?: string;
  title: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
      <div className="max-w-2xl">
        {label && <Eyebrow>{label}</Eyebrow>}
        <SectionTitle className={label ? "mt-3" : ""}>{title}</SectionTitle>
        {intro && <p className="mt-4 max-w-xl text-[0.98rem] leading-relaxed text-fog">{intro}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
