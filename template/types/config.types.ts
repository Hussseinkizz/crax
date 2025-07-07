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
  includedRoutes: string[];
}

export interface CraxConfig {
  pagesDir: string;
  pageExtensions: string[];
  images: ImageConfig;
  ssg: SSGConfig;
}
