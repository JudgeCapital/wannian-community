/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // 在生产构建时忽略 ESLint 错误
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['your-domain.com'], // 如果需要的话添加图片域名
  }
}

module.exports = nextConfig 