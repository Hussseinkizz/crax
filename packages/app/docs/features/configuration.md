# Configuration

CRAX provides a centralized configuration file, `crax.config.mjs`, located at the root of your project. This file allows you to customize various aspects of your application, from site-wide metadata to advanced image optimization settings.

## `crax.config.mjs` Structure

The `crax.config.mjs` file exports a default configuration object. It's a JavaScript module, allowing for dynamic values if needed.

```javascript
// crax.config.mjs

/** @typedef {import('@crax/cli').CraxConfig} CraxConfig */

/** @type {CraxConfig} */
const config = {
  siteUrl: 'https://your-domain.com', // Your public site URL

  ssg: {
    enabled: true,
    robots: {
      disallow: ['/admin', '/private-page'],
    },
  },

  pwa: {
    enabled: true,
    themeColor: '#ffffff',
    backgroundColor: '#000000',
    iconPath: '/logo.png',
    name: 'My Awesome Crax App',
    shortName: 'CraxApp',
    startUrl: '/',
    display: 'standalone',
  },

  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    formats: ['webp', 'jpeg'],
    defaultProps: {
      loading: 'lazy',
      decoding: 'async',
      sizes: '100vw',
    },
  },
};

export default config;
```

## Configuration Options Explained

### `siteUrl`

-   **Type:** `string`
-   **Description:** Your application's public URL. This is crucial for generating absolute URLs in the `sitemap.xml` and for PWA manifest settings. **Remember to update this when deploying your application.**

### `ssg` (Static Site Generation)

-   **`enabled`:** `boolean`
    -   If `true`, CRAX will pre-render pages into static HTML files during the build process, which is great for SEO and performance.
-   **`robots`:** Object
    -   **`disallow`:** `string[]`
        -   An array of paths that you want to disallow search engine crawlers from accessing. These paths will be added to your generated `robots.txt` file.

### `pwa` (Progressive Web App)

-   **`enabled`:** `boolean`
    -   If `true`, CRAX will generate a `manifest.json` and register a service worker to enable PWA features like offline support, installability, and splash screens.
-   **`themeColor`:** `string`
    -   The default theme color for the application, affecting browser UI elements.
-   **`backgroundColor`:** `string`
    -   The background color for the application's splash screen.
-   **`iconPath`:** `string`
    -   The path to your main application icon (relative to `public/`).
-   **`name`:** `string`
    -   The full name of your application.
-   **`shortName`:** `string`
    -   A shorter name for your application, used when space is limited.
-   **`startUrl`:** `string`
    -   The URL that loads when the PWA is launched from the home screen.
-   **`display`:** `'standalone' | 'fullscreen' | 'minimal-ui' | 'browser'`
    -   Defines how your PWA should be displayed.

### `images` (Image Optimization)

-   **`deviceSizes`:** `number[]`
    -   An array of pixel widths used to generate different image sizes for the `srcset` attribute.
-   **`formats`:** `string[]`
    -   An array of image formats (e.g., `'webp'`, `'jpeg'`) that CRAX will generate.
-   **`defaultProps`:** Object
    -   **`loading`:** `'lazy' | 'eager'`
        -   The default `loading` attribute for images.
    -   **`decoding`:** `'sync' | 'async' | 'auto'`
        -   The default `decoding` attribute.
    -   **`sizes`:** `string`
        -   The default `sizes` attribute for responsive images.