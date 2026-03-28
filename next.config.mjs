/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable Turbopack to fix module resolution
  webpack: (config, { isServer }) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
      ignored: ['**/node_modules', '**/.next'],
    };
    return config;
  },
};

export default nextConfig;