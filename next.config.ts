/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // @ts-ignore
  // webpack: (config, { isServer }) => {
  //   // Forcer Webpack
  //   if (isServer) {
  //     config.externals = [...config.externals, 'react-server-dom-webpack'];
  //   }
  //   return config;
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'boutique.pyiurs.com',
        port: '',
        pathname: '/**',
      },
    ],
  }
}

module.exports = nextConfig