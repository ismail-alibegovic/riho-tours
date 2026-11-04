"use client";

import { useEffect, useState } from "react";

/** Sticky in-page navigation for the offer page; highlights the section in view. */
export function SectionNav({ items, price }: { items: { id: string; label: string }[]; price: string }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-90px 0px -60% 0px" },
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [items]);

  return (
    <div className="sticky top-0 z-30 border-b border-mist/10 bg-ink/90 backdrop-blur-lg">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
        <nav aria-label="Sadržaj aranžmana" className="no-scrollbar -mx-1 flex overflow-x-auto">
          {items.map((it) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              aria-current={active === it.id ? "true" : undefined}
              className="relative shrink-0 px-3 py-4 text-sm font-medium text-fog transition hover:text-mist aria-[current=true]:text-mist"
            >
              {it.label}
              <span
                className={`absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-sand-light transition-opacity ${
                  active === it.id ? "opacity-100" : "opacity-0"
                }`}
              />
            </a>
          ))}
        </nav>
        <div className="hidden shrink-0 items-center gap-4 lg:flex">
          <p className="text-sm text-fog">
            od <span className="text-base font-semibold text-mist">{price}</span>
          </p>
          <a href="#upit" className="rounded-lg bg-mist px-4 py-2 text-sm font-semibold text-ink transition hover:bg-white">
            Pošalji upit
          </a>
        </div>
      </div>
    </div>
  );
}
