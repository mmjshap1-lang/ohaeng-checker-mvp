import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES == "true";
const basePath = isGitHubPages ? process.env.BASE_PATH || "" : "";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["172.30.1.12"],
  output: "export",
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  ...(basePath
    ? {
        basePath,
        assetPrefix: basePath,
      }
    : {}),
};

export default nextConfig;
