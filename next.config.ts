import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["nmi-devops-shared-components"],
  output: process.env.GITHUB_PAGES === "true" ? "export" : undefined,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
