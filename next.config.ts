import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/ai-tattoo-generator",
        destination: "/generate",
        permanent: true,
      },
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
    ];
  },
};

export default nextConfig;
