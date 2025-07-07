interface ImageConfig {
  deviceSizes: number[];
  formats: string[];
  defaultProps: {
    sizes: string;
    loading: 'lazy' | 'eager';
    decoding: 'async' | 'sync' | 'auto';
  };
}

interface SSGConfig {
  enabled: boolean;
  includedRoutes: string[];
}

interface CraxConfig {
  pagesDir: string;
  pageExtensions: string[];
  images: ImageConfig;
  ssg: SSGConfig;
}

const config: CraxConfig = {
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
