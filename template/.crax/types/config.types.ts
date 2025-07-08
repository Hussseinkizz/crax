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

export interface CraxConfig {
  siteUrl?: string; // optional but used for sitemap
  pagesDir: string;
  pageExtensions: string[];
  images: ImageConfig;
  ssg: SSGConfig;
}
