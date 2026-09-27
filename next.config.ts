import type { NextConfig } from "next";
import { securityHeaders } from "./security-headers";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    if (!isProd) return [];
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
