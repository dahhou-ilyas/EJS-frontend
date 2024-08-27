import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "localhost",
        port: "7000",
        pathname: '*'
      },
      {
        protocol: "https",
        hostname: "itsocial.fr",
      },
      {
        protocol: "https",
        hostname: "www.ciao.ch",
      },
      {
        protocol: "https",
        hostname: "resize.elle.fr",
      },
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
      },
      {
        protocol: "https",
        hostname: "blog.reseau-morphee.fr",
      },
      {
        protocol: "https",
        hostname: "cdn-icons-png.freepik.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default withNextIntl(nextConfig);
