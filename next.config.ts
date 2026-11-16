import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'thumb.wikimedia.org' },
      { protocol: 'https', hostname: '**.wikimedia.org' },
      { protocol: 'https', hostname: '**.wikipedia.org' },
      { protocol: 'https', hostname: 'www.famousbirthdays.com' },
      { protocol: 'https', hostname: 'famousbirthdays.com' },
      // Self-hosted R2 images
      { protocol: 'https', hostname: 'images.starsbio.co.uk' },
    ],
  },
  async redirects() {
    return [
      // P0-2 Fix: Lil Boosie → Boosie Badazz (same person, duplicate URLs)
      {
        source: '/people/lil-boosie',
        destination: '/people/boosie-badazz',
        permanent: true,
      },
      // P0-2: Add other known duplicate stage-name/real-name pairs here as discovered
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      {
        // Global HTML pages: Cache on CDN for 30 days (2,592,000s)
        source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=2592000, stale-while-revalidate=86400',
          },
        ],
      },
      {
        // Static assets, sitemaps, and creator images: 30 days CDN cache
        source: '/api/celebrity-image/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, s-maxage=2592000, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/sitemap/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, s-maxage=2592000, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
