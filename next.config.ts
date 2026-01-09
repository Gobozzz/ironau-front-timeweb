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
    // remotePatterns: [
    //   {
    //     protocol: "http",
    //     hostname: "localhost",
    //     port: "8000",
    //     pathname: "/**",
    //   },
    // ],
  },
};

export default nextConfig;
