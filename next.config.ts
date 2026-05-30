import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/api/auth/logout",
          destination: "/api/auth/logout",
        },
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
