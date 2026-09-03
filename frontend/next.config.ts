import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Vercel packages Next.js itself. Standalone output is only needed by the
  // Docker image used for self-hosted deployments.
  ...(process.env.VERCEL ? {} : { output: "standalone" as const }),
  turbopack: { root: process.cwd() },
};

export default nextConfig;
