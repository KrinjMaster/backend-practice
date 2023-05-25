/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/auth',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
