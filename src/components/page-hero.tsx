import Image from "next/image";
import type { ReactNode } from "react";
import type { TripImage } from "@/data/types";
import { SiteHeader } from "./site-header";

/** Framed photographic header for inner pages – same language as the home hero. */
export function PageHero({
  image,
  children,
  size = "md",
}: {
  image: TripImage;
  children: ReactNode;
  size?: "md" | "lg";
}) {
  return (
    <section className="bg-ink p-2 sm:p-3 lg:p-5">
      <div
        className={`grain relative isolate flex flex-col overflow-hidden rounded-[18px] bg-petrol-2 lg:rounded-[22px] ${
          size === "lg" ? "min-h-[min(46rem,92svh)]" : "min-h-[30rem] lg:min-h-[34rem]"
        }`}
      >
        <Image
          src={image.src}
          alt=""
          fill
          preload
          sizes="100vw"
          quality={82}
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,17,21,.8)_0%,rgba(8,17,21,.45)_45%,rgba(8,17,21,.15)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-ink/80 to-transparent" />
        <SiteHeader />
        <div className="flex flex-1 flex-col justify-end px-5 pb-10 pt-16 sm:px-8 lg:px-12 lg:pb-14 lg:pl-[7.5rem] xl:pl-[9rem]">
          {children}
        </div>
      </div>
    </section>
  );
}
