/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  crossOrigin: 'anonymous',
  images: {
    domains: ['xn--80aaf7asgim.xn--80ae0bp6d.xn--p1ai'],
    remotePatterns: [
      {
        // The `src` property hostname must end with `.example.com`,
        // otherwise the API will respond with 400 Bad Request.
        protocol: 'https',
        hostname: 'xn--80aaf7asgim.xn--80ae0bp6d.xn--p1ai',
      },
      {
        // The `src` property hostname must end with `.example.com`,
        // otherwise the API will respond with 400 Bad Request.
        protocol: 'https',
        hostname: 'sellerapi.iavto.team',
      },
    ],
    disableStaticImages: false
  },
  optimizeFonts: true,
  productionBrowserSourceMaps: false,
  async rewrites() {
    return [
      {
        source: '/referrals',
        destination: '/referrals/index.html',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/search',
        destination: '/in_dev',
        permanent: false,
      },
      // {
      //   source: '/chat',
      //   destination: '/in_dev',
      //   permanent: false,
      // },
    ];
  },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);
