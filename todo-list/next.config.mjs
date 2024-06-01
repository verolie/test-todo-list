/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["mongodb"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
