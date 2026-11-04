import Image from "next/image";
import Link from "next/link";

/**
 * Original Riho Tours logo, unmodified. Because the blue/green artwork was
 * drawn for light backgrounds, it sits on a soft light plate when placed over
 * photography.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Riho Tours – početna"
      className={`inline-flex shrink-0 items-center rounded-[10px] bg-[#f7faf9]/95 px-2.5 py-1.5 shadow-[0_6px_24px_-12px_rgba(0,0,0,.6)] ring-1 ring-white/40 transition-colors hover:bg-white ${className}`}
    >
      <Image
        src="/brand/riho-tours-logo.png"
        alt="Riho Tours – Travel and events agency"
        width={296}
        height={75}
        className="h-7 w-auto sm:h-8"
        preload
      />
    </Link>
  );
}
