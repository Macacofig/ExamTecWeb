import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: ['./src/SCSS'],
    prependData: ``
  }
};

export default nextConfig;
