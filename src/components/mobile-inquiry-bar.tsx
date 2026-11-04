"use client";

import { useEffect, useState } from "react";

/** Bottom bar on phones that jumps to the inquiry form; hides while the form is on screen. */
export function MobileInquiryBar({ price }: { price: string }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const target = document.getElementById("upit");
    const footer = document.querySelector("footer");
    if (!target) return;
    const seen = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) seen.add(e.target);
        else seen.delete(e.target);
      }
      setHidden(seen.size > 0);
    });
    io.observe(target);
    if (footer) io.observe(footer);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div aria-hidden className="h-20 lg:hidden" />
      <div
        className={`fixed inset-x-3 bottom-3 z-30 flex items-center justify-between gap-3 rounded-xl border border-mist/10 bg-ink-2/95 py-2.5 pl-4 pr-2.5 shadow-[0_10px_30px_-10px_rgba(0,0,0,.8)] backdrop-blur transition duration-300 lg:hidden ${
          hidden ? "pointer-events-none translate-y-[130%] opacity-0" : ""
        }`}
      >
        <p className="text-sm text-fog">
          od <span className="text-lg font-semibold text-mist">{price}</span>
        </p>
        <a href="#upit" className="rounded-lg bg-mist px-5 py-2.5 text-sm font-semibold text-ink">
          Pošalji upit
        </a>
      </div>
    </>
  );
}
