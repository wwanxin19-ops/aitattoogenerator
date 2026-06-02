import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/generator",
        destination: "/ai-tattoo-generator",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
