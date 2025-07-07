/** @typedef {import('./types/config.types.ts').CraxConfig} */

/** @type {import('./types/config.types.ts').CraxConfig} */
const config = {
  pagesDir: 'src/pages',
  pageExtensions: ['tsx', 'mdx'],

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
    enabled: true,
    includedRoutes: ['/', '/about'],
  },
};

export default config;
