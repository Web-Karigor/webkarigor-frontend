/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    // Fix for React 19 streaming issues
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
}

export default nextConfig 