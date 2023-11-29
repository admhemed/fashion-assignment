/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',

    images: {
          remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3-eu-west-1.amazonaws.com',
        pathname: '/fid-media-prod/*',
      },
      // ... add more patterns if needed
    ],
    },
    // Add any other Next.js configurations you may have below
    
  }
  
  module.exports = nextConfig
  