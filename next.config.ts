import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: ['./src/SCSS'],
  },
  async rewrites() {
    return [
      {
        source: '/api/openlibrary/:path*',
        destination: 'https://openlibrary.org/:path*',
      },
    ];
  },
};

export default nextConfig;
