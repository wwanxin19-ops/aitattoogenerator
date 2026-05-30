import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/generate",
        destination: "/ai-tattoo-generator",
        permanent: true,
      },
      {
        source: "/gallery",
        destination: "/",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
