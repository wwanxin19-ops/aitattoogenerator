import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Auth routes handled locally by Next.js (cookie setting required)
        {
          source: "/api/auth/:path*",
          destination: "/api/auth/:path*",
        },
        // All other API routes proxy to Worker
        {
          source: "/api/:path*",
          destination: "https://aitattoogenerator.wwanxin19.workers.dev/api/:path*",
        },
      ],
    };
  },
};

export default nextConfig;
