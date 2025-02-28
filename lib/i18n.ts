import { redirect } from "next/navigation";

export const locales = ["ja", "en"] as const;
export type Locale = (typeof locales)[number];

export function getCurrentLocale(pathname: string): Locale {
  // セグメントを / で区切って空文字を除去
  const segments = pathname.split("/").filter(Boolean); // 例："/en/hoge" → ["en", "hoge"]
  // 最初のセグメントが "en" なら英語、それ以外は "ja" にする
  if (segments[0] === "en") {
    return "en";
  }
  return "ja";
}

export function switchLocale(pathname: string) {
  const currentLocale = getCurrentLocale(pathname);
  const newLocale = currentLocale === "ja" ? "en" : "ja";

  // jaからenへ切り替え
  if (currentLocale === "ja") {
    // ルートパスが "/" の場合 → "/en" にする
    if (pathname === "/") {
      redirect("/en");
      return;
    }
    // ルート以外("/foo")の場合 → "/en/foo" にする
    redirect("/en" + pathname);
    return;
  }

  // enからjaへ切り替え
  if (currentLocale === "en") {
    // "/en" → "/"
    if (pathname === "/en") {
      redirect("/");
      return;
    }
    // "/en/foo" → "/foo"
    redirect(pathname.replace(/^\/en/, ""));
    return;
  }
}
