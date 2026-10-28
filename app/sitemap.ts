import type { MetadataRoute } from "next";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://varunakumari.github.io/3D-PORTFOLIO").replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
