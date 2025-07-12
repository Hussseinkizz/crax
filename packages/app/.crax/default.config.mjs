/** @typedef {import('./types/config.types.ts').CraxConfig} CraxConfig */

/** @type {CraxConfig} */
export default {
  pagesDir: 'src/pages',
  pageExtensions: ['tsx', 'mdx'],
  siteUrl: 'https://example.com', // sensible fallback

  images: {
    deviceSizes: [320, 640, 960, 1280],
    formats: ['webp', 'avif'],
    defaultProps: {
      sizes: '(max-width: 640px) 100vw, 640px',
      loading: 'lazy',
      decoding: 'async',
    },
  },

  ssg: {
    enabled: false,
    robots: {
      disallow: [],
    },
  },

  pwa: {
    enabled: false,
  },
};
