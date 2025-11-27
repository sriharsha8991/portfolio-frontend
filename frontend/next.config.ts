import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [100, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
