import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    globalNotFound: true,
  },
  // turbopack: {
  //   root: __dirname,
  // },
  
  allowedDevOrigins: [process.env.ALLOWED_DEV_ORIGIN || ""],
};

export default nextConfig;
