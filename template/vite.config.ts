import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import Pages from 'vite-plugin-pages';
import { imagetools } from 'vite-imagetools';
import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';

// Dynamically loading crax config
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const crax = await import(path.resolve(__dirname, '.crax/config.mjs')).then(
  (mod) => mod.default
);

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    Pages({
      dirs: crax.pagesDir,
      extensions: crax.pageExtensions,
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
    imagetools(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@crax': path.resolve(__dirname, './.crax'),
    },
  },
});
