import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  server: {
    host: true,
    allowedHosts: [".trycloudflare.com"],
  },
  test: {
    environment: "node",
  },
  plugins: [
    react(),
    svgr(),
    VitePWA({
      registerType: "autoUpdate",

      pwaAssets: {
        config: true,
        integration: {
          baseUrl: "/icons/",
        },
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
        globIgnores: ["splash-iOS/**"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },

      manifest: {
        name: "MealJournal",
        id: "/",
        start_url: "/",
        short_name: "MealJournal",
        description: "Eating patterns journal",
        theme_color: "#A40628",
        background_color: "#ffffff",
        display: "standalone",
        screenshots: [
          {
            src: "/screenshots/desktop.png",
            sizes: "2944x1904",
            form_factor: "wide",
          },
          {
            src: "/screenshots/mobile.png",
            sizes: "750x1338",
            form_factor: "narrow",
          },
        ],
        icons: [
          { src: "/icons/pwa-64x64.png", sizes: "64x64", type: "image/png" },
          {
            src: "/icons/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
});
