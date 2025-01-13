/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // 在生产构建时忽略 ESLint 错误
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'your-domain.com',
        port: '',
        pathname: '/**',
      },
    ],
  }
}

module.exports = nextConfig 