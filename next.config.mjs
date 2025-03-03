import createNextIntlPlugin from "next-intl/plugin";

/** @type {import("next").NextConfig} */
const withNextIntl = createNextIntlPlugin();
const nextConfig = {
  output: "standalone",
  experimental: {
    outputFileTracing: true
  },
  images: {
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "backnew.abu.edu.kz",
        pathname: "/uploads/**"
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3003",
        pathname: "/uploads/**"
      }
    ]
  },
  productionBrowserSourceMaps: false,
  logging: {
    fetches: {
      fullUrl: true
    }
  }
};

export default withNextIntl(nextConfig);