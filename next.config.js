/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cms.schussfreude.ch',
            port: '',
            pathname: '/storage/uploads/**',
          },
        ],
      },
}

module.exports = nextConfig
