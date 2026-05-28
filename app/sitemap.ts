import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/ai-tattoo-generator", "/pricing", "/styles/realism", "/styles/minimalist", "/body-parts/arm"];
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8
  }));
}
