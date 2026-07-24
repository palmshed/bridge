import type { NextConfig } from "next";

const isCapacitor = process.env.CAPACITOR === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isCapacitor ? undefined : "/bridge",
  assetPrefix: isCapacitor ? undefined : "/bridge",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
