import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/styles/:slug",
        destination: "/tattoo-ideas/:slug",
        permanent: true,
      },
      {
        source: "/body-parts/:slug",
        destination: "/placement/:slug",
        permanent: true,
      },
      {
        source: "/ai-tattoo-generator",
        destination: "/generate",
        permanent: true,
      },
      {
        source: "/how-it-works",
        destination: "/guides",
        permanent: true,
      },
    ];
  },
  // 移除 trailingSlash 配置，让 Cloudflare Pages 处理
  // trailingSlash: false,
};

export default nextConfig;