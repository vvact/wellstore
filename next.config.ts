/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',          // add port if your image URL has one
        pathname: '/media/**', // glob pattern for allowed paths
      },
      // Add more patterns if needed
    ],
  },
};

module.exports = nextConfig;
export default nextConfig;