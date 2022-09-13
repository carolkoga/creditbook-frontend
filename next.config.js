/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['squadi-creditbook.s3.amazonaws.com'],
  },
};

module.exports = nextConfig;
