import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import remarkSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    mdx({
      remarkPlugins: [remarkGfm, remarkSlug],
      rehypePlugins: [rehypeAutolinkHeadings, rehypeHighlight],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
