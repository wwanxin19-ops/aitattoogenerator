import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    // 核心页面
    { route: "/", priority: 1.0, changefreq: "weekly" },
    { route: "/generate", priority: 0.9, changefreq: "weekly" },
    { route: "/pricing", priority: 0.8, changefreq: "monthly" },
    
    // 内容中心
    { route: "/tattoo-ideas", priority: 0.9, changefreq: "weekly" },
    { route: "/tattoo-ideas/realism", priority: 0.8, changefreq: "monthly" },
    { route: "/tattoo-ideas/minimalist", priority: 0.8, changefreq: "monthly" },
    { route: "/tattoo-ideas/traditional", priority: 0.8, changefreq: "monthly" },
    { route: "/tattoo-ideas/watercolor", priority: 0.8, changefreq: "monthly" },
    { route: "/tattoo-ideas/geometric", priority: 0.8, changefreq: "monthly" },
    { route: "/tattoo-ideas/japanese", priority: 0.8, changefreq: "monthly" },
    
    // 部位指南
    { route: "/placement", priority: 0.9, changefreq: "weekly" },
    { route: "/placement/arm", priority: 0.8, changefreq: "monthly" },
    { route: "/placement/forearm", priority: 0.8, changefreq: "monthly" },
    { route: "/placement/sleeve", priority: 0.8, changefreq: "monthly" },
    { route: "/placement/chest", priority: 0.8, changefreq: "monthly" },
    { route: "/placement/back", priority: 0.8, changefreq: "monthly" },
    { route: "/placement/leg", priority: 0.8, changefreq: "monthly" },
    { route: "/placement/thigh", priority: 0.8, changefreq: "monthly" },
    { route: "/placement/wrist", priority: 0.8, changefreq: "monthly" },
    { route: "/placement/ankle", priority: 0.8, changefreq: "monthly" },
    { route: "/placement/shoulder", priority: 0.8, changefreq: "monthly" },
    { route: "/placement/neck", priority: 0.8, changefreq: "monthly" },
    
    // 指南
    { route: "/guides", priority: 0.8, changefreq: "weekly" },
    { route: "/guides/aftercare", priority: 0.7, changefreq: "monthly" },
    { route: "/guides/first-tattoo", priority: 0.7, changefreq: "monthly" },
    { route: "/guides/choosing-artist", priority: 0.7, changefreq: "monthly" },
    { route: "/guides/pain-levels", priority: 0.7, changefreq: "monthly" },
    { route: "/guides/cost-guide", priority: 0.7, changefreq: "monthly" },
    
    // 其他页面
    { route: "/blog", priority: 0.7, changefreq: "weekly" },
    { route: "/compare", priority: 0.6, changefreq: "monthly" },
    { route: "/about", priority: 0.5, changefreq: "monthly" },
    { route: "/contact", priority: 0.5, changefreq: "monthly" },
    { route: "/faq", priority: 0.6, changefreq: "monthly" },
    
    // 法律页面
    { route: "/privacy", priority: 0.3, changefreq: "yearly" },
    { route: "/terms", priority: 0.3, changefreq: "yearly" },
    { route: "/cookie-policy", priority: 0.3, changefreq: "yearly" },
  ];

  return pages.map(({ route, priority, changefreq }) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: changefreq as MetadataRoute.Sitemap[0]["changeFrequency"],
    priority,
  }));
}
