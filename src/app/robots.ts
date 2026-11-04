import type { MetadataRoute } from "next";

// Demo redesign – disallow all crawling so it never competes with rihotours.ba.
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", disallow: "/" }] };
}
