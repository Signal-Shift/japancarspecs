import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // S3/CloudFront serve `/path/index.html` for `/path/` — avoids404 on direct URLs.
  trailingSlash: true,
};

export default nextConfig;
