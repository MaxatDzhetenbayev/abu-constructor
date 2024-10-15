import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const withNextIntl = createNextIntlPlugin();
const nextConfig = {
  output: "standalone",
  images: {
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "77.243.80.138",
        port: "3003",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "https://backnew.abu.edu.kz",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "2.134.68.196",
        port: "3003",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "195.210.47.167",
        port: "3003",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "3003",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3003",
        pathname: "/uploads/**",
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default withNextIntl(nextConfig);
