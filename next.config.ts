import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.front-test.ru",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
