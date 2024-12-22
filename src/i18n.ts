import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

// Can be imported from a shared config

export type LocaleType = ["ru", "kz", "en"];
export type LocaleRecordType<T> = Record<LocaleType[number], T>;

export const locales: LocaleType = ["ru", "kz", "en"];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as LocaleType[number])) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
