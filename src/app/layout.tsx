import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/data/site";
import "./globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://riho-tours-demo.vercel.app"),
  title: {
    default: "Riho Tours – putovanja po vašoj mjeri | Breza, BiH",
    template: "%s | Riho Tours",
  },
  description:
    "Riho Tours iz Breze: organizovana grupna i individualna putovanja – adventi, Istanbul, evropske metropole, praznici i ljetovanja. Demo redizajn.",
  applicationName: site.name,
  // Demo redesign – keep it out of search indexes.
  robots: { index: false, follow: false, nocache: true },
  openGraph: {
    type: "website",
    locale: "bs_BA",
    siteName: site.name,
    title: "Riho Tours – otkrijte ljepotu svijeta",
    description:
      "Grupna i individualna putovanja iz BiH: adventi, Istanbul, evropske metropole i praznici.",
    images: [{ url: "/images/dest/boka-kotorska.jpg", width: 2600, height: 1463 }],
  },
  icons: { icon: "/brand/favicon.png" },
};

export const viewport: Viewport = {
  themeColor: "#081115",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="bs" className={`${jost.variable} ${cormorant.variable} antialiased`}>
      <body className="min-h-dvh bg-ink text-mist">
        <a
          href="#sadrzaj"
          className="sr-only z-[100] rounded-full bg-mist px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Preskoči na sadržaj
        </a>
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
