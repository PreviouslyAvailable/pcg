import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  async redirects() {
    return [
      { source: '/insights', destination: '/news', permanent: true },
      { source: '/insights/:slug', destination: '/news/:slug', permanent: true },
      { source: '/strategies', destination: '/investors', permanent: true },
      { source: '/our-people', destination: '/about#team', permanent: true },
      { source: '/people', destination: '/about#team', permanent: true },
      { source: '/team', destination: '/about#team', permanent: true },
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/funds', destination: '/investors', permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;
