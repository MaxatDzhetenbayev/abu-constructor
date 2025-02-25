import {withSentryConfig} from "@sentry/nextjs";
import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const withNextIntl = createNextIntlPlugin();
const nextConfig = {
    output: "standalone",
    images: {
        formats: ["image/webp"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "backnew.abu.edu.kz",
                pathname: "/uploads/**",
            },
            {
                protocol: "https",
                hostname: "back.abu.foxminded.space",
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

export default withSentryConfig(withNextIntl(nextConfig), {
// For all available options, see:
// https://github.com/getsentry/sentry-webpack-plugin#options

    org: "bedroom-developers",
    project: "abu-frontend",

// Only print logs for uploading source maps in CI
// For all available options, see:
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

// Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

// Automatically annotate React components to show their full name in breadcrumbs and session replay
    reactComponentAnnotation: {
        enabled: true,
    },

// Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
// This can increase your server load as well as your hosting bill.
// Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
// side errors will fail.
    tunnelRoute: "/monitoring",

// Hides source maps from generated client bundles
    hideSourceMaps: true,

// Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

// Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
// See the following for more information:
// https://docs.sentry.io/product/crons/
// https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
});