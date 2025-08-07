/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'], // ✅ allow external domain
  },
};

module.exports = nextConfig;
export default nextConfig;