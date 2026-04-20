import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'octo.vn',
        pathname: '/**', // Cho phép tất cả các đường dẫn con của octo.vn
      },
    ],
  },
};

export default nextConfig;
