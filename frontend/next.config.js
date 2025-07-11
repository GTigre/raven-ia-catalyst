/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Docker deployment
  output: 'standalone',
  // Configure trailing slash
  trailingSlash: false,
  // Configure image optimization
  images: {
    unoptimized: false,
  },
  // Disable telemetry
  experimental: {
    telemetry: false,
  },
};

module.exports = nextConfig;
