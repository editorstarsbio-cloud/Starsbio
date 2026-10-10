/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: every page is pre-rendered to HTML in /out and can be hosted on any static host.
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
