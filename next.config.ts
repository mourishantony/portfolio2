import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "10.144.21.42",
    "169.254.56.117",
    "10.144.21.*",
    "192.168.*.*",
    "localhost",
  ],
};

export default nextConfig;
