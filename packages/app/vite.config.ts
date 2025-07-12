import fs from 'fs';
import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import Pages from 'vite-plugin-pages';
import { imagetools } from 'vite-imagetools';
import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import { VitePWA } from 'vite-plugin-pwa';

// Dynamically loading crax config
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const crax = await import(path.resolve(__dirname, '.crax/config.mjs')).then(
  (mod) => mod.default
);

const iconsPath = path.resolve(__dirname, '.crax/icons.generated.json');

const manifestIcons = fs.existsSync(iconsPath)
  ? JSON.parse(fs.readFileSync(iconsPath, 'utf-8'))
  : [];

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    Pages({
      dirs: crax.pagesDir,
      extensions: crax.pageExtensions,
      importMode: 'async',
      extendRoute(route) {
        if (route.path?.startsWith('/static')) {
          return {
            ...route,
            path: route.path.replace(/^\/static/, '') || '/',
          };
        }
        return route;
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt'],
      manifest: {
        name: crax.pwa.name,
        short_name: crax.pwa.shortName,
        start_url: crax.pwa.startUrl,
        display: crax.pwa.display,
        background_color: crax.pwa.backgroundColor,
        theme_color: crax.pwa.themeColor,
        icons: manifestIcons,
      },
    }),
    imagetools(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@crax': path.resolve(__dirname, './.crax'),
    },
  },
});
