import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Only proxy non-auth API routes to Worker
        // Auth routes (/api/auth/*) are handled by Next.js API Routes
        {
          source: "/api/ai/:path*",
          destination: "https://aitattoogenerator.wwanxin19.workers.dev/api/ai/:path*",
        },
        {
          source: "/api/user/:path*",
          destination: "https://aitattoogenerator.wwanxin19.workers.dev/api/user/:path*",
        },
        {
          source: "/api/generate/:path*",
          destination: "https://aitattoogenerator.wwanxin19.workers.dev/api/generate/:path*",
        },
        {
          source: "/api/webhook/:path*",
          destination: "https://aitattoogenerator.wwanxin19.workers.dev/api/webhook/:path*",
        },
      ],
    };
  },
};

export default nextConfig;
