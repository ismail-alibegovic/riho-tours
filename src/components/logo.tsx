import Image from "next/image";
import Link from "next/link";

/**
 * Riho Tours logo – light variant for dark/photographic backgrounds.
 * Same artwork as the original (public/brand/riho-tours-logo.png) with the
 * wordmark set in light tone and the cloud details filled, on transparency.
 */
export function Logo({ className = "", onPhoto = true }: { className?: string; onPhoto?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Riho Tours – početna"
      className={`inline-flex shrink-0 items-center transition-opacity hover:opacity-85 ${className}`}
    >
      <Image
        src="/brand/riho-tours-logo-light.png"
        alt="Riho Tours – Travel and events agency"
        width={592}
        height={150}
        className={`h-9 w-auto sm:h-10 lg:h-11 ${onPhoto ? "drop-shadow-[0_1px_3px_rgba(8,17,21,.5)]" : ""}`}
        preload
      />
    </Link>
  );
}
