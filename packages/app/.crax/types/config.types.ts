export interface ImageConfig {
  deviceSizes: number[];
  formats: string[];
  defaultProps: {
    sizes: string;
    loading: 'lazy' | 'eager';
    decoding: 'async' | 'sync' | 'auto';
  };
}

export interface SSGConfig {
  enabled: boolean;
  robots: {
    disallow: string[];
  };
}

export interface PWAConfig {
  enabled: boolean;
  themeColor: string;
  backgroundColor: string;
  iconPath: string;
  name: string;
  shortName: string;
  startUrl: string;
  display: 'standalone' | 'fullscreen' | 'minimal-ui' | 'browser';
}

export interface CraxConfig {
  siteUrl?: string; // optional but used for sitemap
  pagesDir: string;
  pageExtensions: string[];
  images: ImageConfig;
  ssg: SSGConfig;
  pwa?: PWAConfig;
}
