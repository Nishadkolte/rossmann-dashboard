/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable strict mode for better error detection
  reactStrictMode: true,

  // Enable SWC minification for faster builds
  swcMinify: true,

  // Headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
