import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `output: "export"` is incompatible with Route Handlers (API), Auth.js, and Prisma.
  trailingSlash: true,
};

export default nextConfig;
