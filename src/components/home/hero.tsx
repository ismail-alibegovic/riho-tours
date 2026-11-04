"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Trip } from "@/data/types";
import { formatKM, pad2 } from "@/lib/format";
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from "../icons";
import { SiteHeader } from "../site-header";

const EASE = [0.22, 1, 0.36, 1] as const;
const AUTOPLAY_MS = 7000;

type Slide = Pick<
  Trip,
  "slug" | "name" | "tagline" | "country" | "region" | "image" | "dates" | "priceFrom" | "transport" | "duration"
> & { heroImage: Trip["image"]; cardImage: Trip["image"] };

export function Hero({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const reduce = useReducedMotion();
  const total = slides.length;
  const active = slides[index];
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback(
    (next: number) => {
      setIndex(((next % total) + total) % total);
    },
    [total],
  );
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  const running = !paused && !hovering && !reduce;

  useEffect(() => {
    if (!running) return;
    timer.current = setTimeout(next, AUTOPLAY_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [running, next, index]);

  // order of floating cards: active first, then the following slides
  const order = Array.from({ length: Math.min(4, total) }, (_, k) => slides[(index + k) % total]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Izdvojena putovanja"
      onKeyDown={onKeyDown}
      className="relative bg-ink p-2 sm:p-3 lg:p-5"
    >
      <div
        className="grain relative isolate flex min-h-[calc(100svh-1rem)] flex-col overflow-hidden rounded-[18px] bg-petrol-2 sm:min-h-[calc(100svh-1.5rem)] lg:min-h-[max(44rem,calc(100svh-2.5rem))] lg:rounded-[22px]"
        onPointerEnter={() => setHovering(true)}
        onPointerLeave={() => setHovering(false)}
        onFocusCapture={() => setHovering(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setHovering(false);
        }}
      >
        {/* Background photography */}
        <div className="absolute inset-0 -z-10">
          <AnimatePresence initial={false} mode="sync">
            <motion.div
              key={active.slug}
              className="absolute inset-0"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: reduce ? 0.2 : 1.2, ease: "easeInOut" },
                scale: { duration: 7.5, ease: EASE },
              }}
            >
              <Image
                src={active.heroImage.src}
                alt=""
                fill
                preload={index === 0}
                sizes="100vw"
                quality={82}
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
          {/* legibility layers – kept subtle, photo stays dominant */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,17,21,.84)_0%,rgba(8,17,21,.58)_36%,rgba(8,17,21,.12)_64%,rgba(8,17,21,.2)_100%)]" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/55 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-ink/70 to-transparent" />
        </div>

        <SiteHeader />

        {/* Vertical section rail (desktop) */}
        <div className="pointer-events-none absolute bottom-10 left-6 top-32 z-20 hidden w-6 flex-col items-center lg:flex xl:left-9">
          <span className="w-px flex-1 bg-mist/25" />
          <ol className="pointer-events-auto my-5 flex flex-col items-center gap-7" aria-label="Slajdovi">
            {slides.map((s, i) => (
              <li key={s.slug}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Slajd ${i + 1}: ${s.name}`}
                  aria-current={i === index ? "true" : undefined}
                  className="group relative grid size-6 place-items-center"
                >
                  <span
                    className={`block rounded-full transition-all duration-500 ${
                      i === index
                        ? "size-2.5 bg-mist ring-[5px] ring-mist/20"
                        : "size-1.5 bg-mist/50 group-hover:bg-mist"
                    }`}
                  />
                </button>
              </li>
            ))}
          </ol>
          <span className="w-px flex-1 bg-mist/25" />
          <span className="mt-5 -rotate-90 whitespace-nowrap font-sans text-[0.68rem] tracking-[0.25em] text-mist/70">
            {pad2(index + 1)}/{pad2(total)}
          </span>
        </div>

        {/* Content */}
        <div className="relative flex flex-1 flex-col px-5 pb-6 pt-10 sm:px-8 lg:grid lg:grid-cols-[minmax(0,46%)_minmax(0,1fr)] lg:items-center lg:gap-6 lg:px-0 lg:pb-20 lg:pl-[7.5rem] lg:pt-0 xl:pl-[9rem]">
          <div className="max-w-xl lg:max-w-none lg:-translate-y-4">
            <div className="mb-6 h-5 overflow-hidden" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={active.slug}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.55, ease: EASE }}
                  className="flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-sand-light"
                >
                  <span className="inline-block h-px w-8 bg-sand-light/70" />
                  {active.country} · {active.dates[0]}
                </motion.p>
              </AnimatePresence>
            </div>

            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
              className="font-sans text-[clamp(3.1rem,13.5vw,4.6rem)] font-normal uppercase leading-[0.92] tracking-[0.015em] text-mist sm:text-[clamp(4rem,10vw,6rem)] lg:text-[clamp(4rem,5.6vw,6.6rem)]"
            >
              <span className="block">Otkrijte</span>
              <span className="mt-1 block whitespace-nowrap">
                <span className="mr-[0.18em] font-serif text-[1.08em] font-normal normal-case italic tracking-normal">
                  ljepotu
                </span>
                svijeta
              </span>
            </motion.h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.35 }}
              className="mt-7 max-w-[30rem] text-[1.02rem] font-light leading-relaxed text-mist/85 sm:text-[1.08rem]"
            >
              Riho Tours iz Breze organizuje grupna i individualna putovanja – adventske
              izlete, Istanbul, evropske metropole i praznična putovanja, krojena po vašoj
              mjeri.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
              className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4"
            >
              <Link
                href="/putovanja"
                className="group inline-flex items-center gap-3 rounded-[10px] bg-petrol px-6 py-3.5 text-[0.98rem] font-medium text-mist shadow-[0_10px_30px_-12px_rgba(0,0,0,.7)] ring-1 ring-mist/10 transition hover:bg-[#2f5156]"
              >
                Istraži putovanja
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href={`/putovanja/${active.slug}`}
                className="group inline-flex items-center gap-2 text-sm text-mist/80 underline-offset-[6px] transition hover:text-mist hover:underline"
              >
                <span className="sr-only">Aranžman: </span>
                {active.name}, od {formatKM(active.priceFrom)}
                <ArrowUpRight className="size-4" />
              </Link>
            </motion.div>
          </div>

          {/* Floating destination cards */}
          <div className="relative mt-10 lg:mt-0 lg:self-center lg:pt-16">
            <ul
              className="no-scrollbar -mx-5 flex snap-x snap-mandatory items-end gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:snap-none lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0"
              aria-label="Destinacije u ponudi"
            >
              {order.map((s, k) => {
                const isActive = k === 0;
                const slideIndex = slides.indexOf(s);
                return (
                  <motion.li
                    key={s.slug}
                    layout={!reduce}
                    initial={false}
                    transition={{ layout: { duration: 0.9, ease: EASE } }}
                    className={`relative shrink-0 snap-start ${
                      isActive
                        ? "w-[15.5rem] sm:w-[16rem] lg:w-[clamp(13rem,17vw,17.5rem)]"
                        : "w-[13rem] lg:w-[clamp(11.5rem,15vw,15.5rem)]"
                    }`}
                  >
                    <div className="mb-3 flex items-center justify-between pr-1">
                      <span className="font-sans text-[1.05rem] font-medium text-mist">
                        {s.name}
                      </span>
                      <span className="flex gap-1" aria-hidden>
                        {slides.map((_, d) => (
                          <span
                            key={d}
                            className={`size-1 rounded-full ${d === slideIndex ? "bg-mist" : "bg-mist/35"}`}
                          />
                        ))}
                      </span>
                    </div>
                    <CardBody slide={s} active={isActive} onSelect={() => go(slideIndex)} />
                  </motion.li>
                );
              })}
            </ul>

            <div className="mt-6 flex items-center gap-3 lg:mt-8 lg:justify-start lg:pl-[calc(clamp(13rem,17vw,17.5rem)/2+2.2rem)]">
              <button
                type="button"
                onClick={prev}
                aria-label="Prethodna destinacija"
                className="grid size-11 place-items-center rounded-full border border-mist/35 bg-white/5 text-mist backdrop-blur-md transition hover:border-mist hover:bg-white/15"
              >
                <ArrowLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Sljedeća destinacija"
                className="grid size-11 place-items-center rounded-full border border-mist/35 bg-white/5 text-mist backdrop-blur-md transition hover:border-mist hover:bg-white/15"
              >
                <ArrowRight className="size-4" />
              </button>
              <span className="ml-3 text-xs tracking-[0.22em] text-mist/70 lg:hidden">
                {pad2(index + 1)} / {pad2(total)}
              </span>
            </div>
          </div>
        </div>

        {/* Counter + progress (desktop) */}
        <div className="absolute bottom-8 right-10 z-20 hidden items-center gap-4 text-[0.72rem] tracking-[0.2em] text-mist/75 lg:flex">
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Pokreni automatsku izmjenu" : "Pauziraj automatsku izmjenu"}
            className="grid size-8 place-items-center rounded-full text-mist/70 transition hover:bg-white/10 hover:text-mist"
          >
            {paused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
          </button>
          <span>{pad2(index + 1)}</span>
          <span className="relative h-px w-16 overflow-hidden bg-mist/25">
            <motion.span
              key={`${index}-${running}`}
              className="absolute inset-y-0 left-0 bg-mist"
              initial={{ width: running ? "0%" : "100%" }}
              animate={{ width: "100%" }}
              transition={{ duration: running ? AUTOPLAY_MS / 1000 : 0, ease: "linear" }}
            />
          </span>
          <span>{pad2(total)}</span>
        </div>

        <span className="sr-only" aria-live="polite">
          {`Slajd ${index + 1} od ${total}: ${active.name}`}
        </span>
      </div>
    </section>
  );
}

function CardBody({
  slide,
  active,
  onSelect,
}: {
  slide: Slide;
  active: boolean;
  onSelect: () => void;
}) {
  const inner = (
    <>
      <Image
        src={slide.cardImage.src}
        alt=""
        fill
        sizes="(min-width:1024px) 18vw, 260px"
        quality={75}
        className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-editorial)] group-hover:scale-[1.06]"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
      <span className="absolute left-3 top-3 rounded-full bg-ink/45 px-2.5 py-1 text-[0.68rem] font-medium tracking-[0.08em] text-mist backdrop-blur-md">
        od {formatKM(slide.priceFrom)}
      </span>
      {active && (
        <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-ink/45 text-mist backdrop-blur-md transition group-hover:bg-mist group-hover:text-ink">
          <ArrowUpRight className="size-4" />
        </span>
      )}
      <span className="absolute inset-x-0 bottom-0 block p-4">
        <span className="block text-[0.66rem] font-medium uppercase tracking-[0.2em] text-mist/80">
          {slide.country}
        </span>
        <span
          className={`mt-1 block font-sans font-semibold uppercase leading-[1.02] tracking-[0.02em] text-mist ${
            active ? "text-[1.45rem]" : "text-[1.2rem]"
          }`}
        >
          {slide.name}
        </span>
        <span className="mt-1.5 block truncate text-[0.82rem] text-mist/80">{slide.tagline}</span>
      </span>
    </>
  );

  const cls = `group relative block overflow-hidden rounded-[14px] bg-petrol shadow-[0_24px_50px_-24px_rgba(0,0,0,.85)] ring-1 ring-white/10 transition-[height] duration-700 ${
    active ? "h-[21rem] lg:h-[clamp(19rem,26vw,24rem)]" : "h-[18rem] lg:h-[clamp(16.5rem,22.5vw,21rem)]"
  }`;

  if (active) {
    return (
      <Link href={`/putovanja/${slide.slug}`} className={cls} aria-label={`${slide.name} – ${slide.tagline}, detalji aranžmana`}>
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onSelect} className={`${cls} w-full text-left`} aria-label={`Prikaži ${slide.name}`}>
      {inner}
    </button>
  );
}
