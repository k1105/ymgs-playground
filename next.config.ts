import { RouteHandlerCallbackOptions } from "workbox-core/types.js";

const withPWA = require("next-pwa")({
  dest: "public", // Service Workerの出力先
  register: true, // 自動登録
  skipWaiting: true, // 即時適用
  disable: process.env.NODE_ENV === "development", // 開発時は無効化
  runtimeCaching: [
    {
      // すべてのページをキャッシュ（オフライン対応）
      urlPattern: ({ request }: RouteHandlerCallbackOptions) =>
        request.mode === "navigate",
      handler: "CacheFirst",
      options: {
        cacheName: "pages-cache",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7日間保持
        },
      },
    },
    {
      // Next.jsのデータ取得用JSONファイルをキャッシュ
      urlPattern: /^https:\/\/moritaasuka\.vercel\.app\/_next\/data\/.*\.json$/,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "next-data-cache",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7日間保持
        },
      },
    },
    {
      // 静的リソース（JS, CSS, フォント, 画像など）をキャッシュ
      urlPattern: /\.(?:js|css|woff2|woff|ttf|png|jpg|jpeg|svg|gif|webp)$/,
      handler: "CacheFirst",
      options: {
        cacheName: "static-assets",
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30日間保持
        },
      },
    },
    {
      // APIレスポンスをキャッシュ（microCMSのデータなど）
      urlPattern: /^https:\/\/images\.microcms-assets\.io\/.*$/,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "api-cache",
        expiration: {
          maxEntries: 30,
          maxAgeSeconds: 60 * 60, // 1時間
        },
      },
    },
  ],
});

module.exports = withPWA({
  reactStrictMode: true,
  // i18n: {
  //   locales: ["en", "ja"],
  //   defaultLocale: "ja",
  // },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.microcms-assets.io" },
    ],
  },
});
