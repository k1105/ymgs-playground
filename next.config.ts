const withPWA = require("next-pwa")({
  dest: "public", // Output directory for service worker
  register: true, // Automatically register service worker
  skipWaiting: true, // Activate service worker immediately
  scope: "/app",
  sw: "service-worker.js",
  disable: process.env.NODE_ENV === "development", // Disable in development mode
});

module.exports = withPWA({
  reactStrictMode: true,
  // i18n: {
  //   locales: ["en", "ja"],
  //   defaultLocale: "ja",
  // },
  images: {
    domains: ["images.microcms-assets.io"],
  },
});
