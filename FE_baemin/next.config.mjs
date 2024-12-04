/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true, // Đặt là false nếu bạn muốn điều hướng tạm thời (HTTP 302)
      },
    ]
  },
  images: {
    domains: ['localhost'],
    dangerouslyAllowSVG: true, // Nếu dùng ảnh SVG
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/public/img/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/public/img/**',
      },
      {
        protocol: 'http',
        hostname: 'api-gateway',
        port: '8080',
        pathname: '/public/img/**',
      },
      {
        protocol: 'http',
        hostname: 'product-service',
        port: '3001',
        pathname: '/public/img/**',
      },
    ],
  },
  reactStrictMode: false,
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    return config
  },
};

export default nextConfig;
