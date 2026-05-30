import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Local auth routes - bypass Worker
        {
          source: "/api/auth/me",
          destination: "/api/auth/me-local",
        },
        {
          source: "/api/auth/logout",
          destination: "/api/auth/logout-local",
        },
        // All other API routes go to Worker
        {
          source: "/api/:path*",
          destination: "https://aitattoogenerator.wwanxin19.workers.dev/api/:path*",
        },
      ],
    };
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "https://aitattoogenerator.cc" },
        ],
      },
    ];
  },
};

export default nextConfig;
