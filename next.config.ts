import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // i18n: {
  //   locales: ["en", "ja"],
  //   defaultLocale: "ja",
  // },
  images: {
    domains: ["images.microcms-assets.io"],
  },
};

module.exports = nextConfig;
