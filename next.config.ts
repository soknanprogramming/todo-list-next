import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    globalNotFound: true,
  },
  allowedDevOrigins: ["172.25.144.1"],
};

export default nextConfig;
