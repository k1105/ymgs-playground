/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "ja"], // 言語の定義
    defaultLocale: "ja", // デフォルトの言語
  },
};

module.exports = nextConfig;
