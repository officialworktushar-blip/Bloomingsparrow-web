import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      fallback: [
        {
          source: '/images/:path*',
          destination: `${process.env.NEXT_PUBLIC_API_URL || 'https://api.bloomingsparrow.com'}/images/:path*`,
        },
      ],
    };
  },
};

export default nextConfig;
