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
          source: "/api/:path*",
          destination: "https://aitattoogenerator.wwanxin19.workers.dev/api/:path*",
        },
      ],
    };
  },
};

export default nextConfig;
