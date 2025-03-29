import { Metadata } from "next";
import { Raleway } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { QueryProvider } from "@/shared/providers";
import { Toaster } from "@/shared/ui";

import "../globals.css";

// const inter = Montserrat({ subsets: ["latin"] });
const raleway = Raleway({
  weight: ["400"],
  variable: "--font-raleway",
  subsets: ["cyrillic", "latin"],
});
// const montserrat = Montserrat({
//   weight: ["400", "700", "900"],
//   variable: "--font-montserrat",
//   subsets: ["cyrillic", "latin"],
// });

export const metadata: Metadata = {
  title: "Web Constructor v2(Demo Azina)",
};

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
      <body className={`${raleway.className}`}>
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>{children}</QueryProvider>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
