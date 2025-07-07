import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import Pages from 'vite-plugin-pages';
import { imagetools } from 'vite-imagetools';
import { defineConfig } from 'vite';
import crax from './crax.config.mjs';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    // 1. File-based routing
    Pages({
      dirs: crax.pagesDir,
      extensions: crax.pageExtensions,
    }),
    // 2. Image optimization (e.g. <img src="/img.jpg?w=400;800&format=webp&as=srcset">)
    imagetools(),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
