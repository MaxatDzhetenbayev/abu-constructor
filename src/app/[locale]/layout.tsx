import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { AccessibilityProvider, QueryProvider } from "@/shared/providers";
import { Toaster } from "@/shared/ui";

import "../globals.css";

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <Script src="https://maps.api.2gis.ru/2.0/loader.js?pkg=full" />
        <Script src="../../shared/lib/map.js" />
        <Script
          defer
          src="https://dev.ispark.kz/analytics/script.js"
          data-website-id="7aae9a7f-fdaf-4211-8fe7-3576e9966a15"
        ></Script>
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>
            <AccessibilityProvider>{children}</AccessibilityProvider>
          </QueryProvider>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
