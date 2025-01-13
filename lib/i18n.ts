import { redirect } from "next/navigation";

export const locales = ["ja", "en"] as const;
export type Locale = (typeof locales)[number];

export function getCurrentLocale(pathname: string): Locale {
  const locale = pathname.split("/")[1] as Locale;
  return locales.includes(locale) ? locale : "ja";
}

export function switchLocale(pathname: string) {
  const currentLocale = getCurrentLocale(pathname);
  const newLocale = currentLocale === "ja" ? "en" : "ja";
  const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);

  redirect(newPath);
}
