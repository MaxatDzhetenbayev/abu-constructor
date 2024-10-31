import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import type { Metadata } from "next";
import { Montserrat, PT_Mono, Raleway } from "next/font/google";
import "../globals.css";
import { QueryProvider } from "@/shared/providers";
import { Toaster } from "@/shared/ui";
import "react-quill/dist/quill.snow.css";
import Script from "next/script";

// const inter = Montserrat({ subsets: ["latin"] });
const inter = Raleway({ weight: ["400"], subsets: ["cyrillic"] });

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
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>{children}</QueryProvider>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
