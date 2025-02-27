import createNextIntlPlugin from "next-intl/plugin";

/** @type {import("next").NextConfig} */
const withNextIntl = createNextIntlPlugin();
const nextConfig = {
  output: "standalone",
  images: {
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "back.abai-ctm.kz",
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
  logging: {
    fetches: {
      fullUrl: true
    }
  }
};

export default withNextIntl(nextConfig);