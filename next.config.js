/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'avatar.tobi.sh',
      'cloudflare-ipfs.com',
      'loremflickr.com'
    ]
  },
  experimental: {
    legacyBrowsers: false,
    browsersListForSwc: true
  },
  // Add environment variables for the build process
  env: {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/mongodb-vercel',
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'https://mongodb-vercel-roan-seven.vercel.app',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'supersecret',
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID || 'dummy_client_id',
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET || 'dummy_client_secret'
  }
};

module.exports = nextConfig;
