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
        hostname: 'xn--80aaf7asgim.xn--80ae0bp6d.xn--p1ai'
      }
    ]
  },
  optimizeFonts: true,
  productionBrowserSourceMaps: false
}

module.exports = nextConfig
