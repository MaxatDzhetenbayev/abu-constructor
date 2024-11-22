import { QueryProvider } from "@/shared/providers";
import { Toaster } from "@/shared/ui";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Montserrat, Raleway } from "next/font/google";
import Script from "next/script";
import "react-quill/dist/quill.snow.css";
import "../globals.css";

// const inter = Montserrat({ subsets: ["latin"] });
const raleway = Raleway({
  weight: ["400"],
  variable: "--font-raleway",
  subsets: ["cyrillic", "latin"],
});
const montserrat = Montserrat({
  weight: ["400", "700", "900"],
  variable: "--font-montserrat",
  subsets: ["cyrillic", "latin"],
});

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
      <body className={`${raleway.className}`}>
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>{children}</QueryProvider>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
