import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/ai-tattoo-generator/:path*",
        destination: "/generate/:path*",
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
  trailingSlash: false,
};

export default nextConfig;
