# Project Configuration in CRAX

CRAX centralizes its core configurations in a single file: `crax.config.mjs`. This file, located at the root of your project, allows you to manage various aspects of your application, including site metadata, Static Site Generation (SSG) settings, and Progressive Web App (PWA) options.

## `crax.config.mjs` Structure

The `crax.config.mjs` file exports a default configuration object. It's a JavaScript module, allowing for dynamic values if needed.

```javascript
// crax.config.mjs

/** @typedef {import('.crax/types/config.types.ts').CraxConfig} CraxConfig */

/** @type {CraxConfig} */
const config = {
  // Your public site URL, used for sitemap generation and other metadata.
  // IMPORTANT: Change this to your actual deployment URL.
  siteUrl: 'https://your-domain.com',

  // Static Site Generation (SSG) settings
  ssg: {
    enabled: true, // Enable or disable SSG
    robots: {
      // Paths to disallow in the generated robots.txt file
      disallow: ['/admin', '/private-page'],
    },
  },

  // Progressive Web App (PWA) settings
  pwa: {
    enabled: true, // Enable or disable PWA features
    themeColor: '#ffffff', // Theme color for the browser UI
    backgroundColor: '#000000', // Background color for the splash screen
    iconPath: '/logo.png', // Path to your main application icon (relative to public/)
    name: 'My Awesome Crax App', // Full name of your application
    shortName: 'CraxApp', // Short name for the application icon
    startUrl: '/', // The URL that loads when the PWA is launched
    display: 'standalone', // How the PWA should be displayed (e.g., 'standalone', 'fullscreen')
  },

  // Image optimization settings (used by the <Image /> component)
  images: {
    // Default device widths for srcset generation
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Image formats to generate (e.g., webp for modern browsers, jpeg for fallback)
    formats: ['webp', 'jpeg'],
    defaultProps: {
      loading: 'lazy', // Default loading behavior for images
      decoding: 'async', // Default decoding behavior for images
      sizes: '100vw', // Default sizes attribute for responsive images
    },
  },

  // Add other configurations here as your project grows
};

export default config;
```

## Configuration Options Explained

### `siteUrl`

-   **Type:** `string`
-   **Description:** Your application's public URL. This is crucial for generating absolute URLs in the `sitemap.xml` and for PWA manifest settings. Make sure to update this when deploying your application.

### `ssg` (Static Site Generation)

-   **`enabled`:** `boolean`
    -   If `true`, CRAX will attempt to pre-render pages into static HTML files during the build process. This is great for SEO and performance.
-   **`robots`:** Object
    -   **`disallow`:** `string[]`
        -   An array of paths that you want to disallow search engine crawlers from accessing. These paths will be added to your generated `robots.txt` file.

### `pwa` (Progressive Web App)

-   **`enabled`:** `boolean`
    -   If `true`, CRAX will generate a `manifest.json` and register a service worker (via `vite-plugin-pwa`) to enable PWA features like offline support, installability, and splash screens.
-   **`themeColor`:** `string`
    -   The default theme color for the application. This affects the browser's UI elements (e.g., address bar color on mobile).
-   **`backgroundColor`:** `string`
    -   The background color for the application's splash screen when launched from the home screen.
-   **`iconPath`:** `string`
    -   The path to your main application icon, relative to the `public/` directory. This icon is used for the home screen shortcut and splash screen.
-   **`name`:** `string`
    -   The full name of your application, displayed to the user (e.g., on the splash screen).
-   **`shortName`:** `string`
    -   A shorter name for your application, used when space is limited (e.g., below the home screen icon).
-   **`startUrl`:** `string`
    -   The URL that loads when the PWA is launched from the home screen. Defaults to `/`.
-   **`display`:** `'standalone' | 'fullscreen' | 'minimal-ui' | 'browser'`
    -   Defines how your PWA should be displayed. `standalone` makes it look like a native app without browser UI.

### `images` (Image Optimization)

-   **`deviceSizes`:** `number[]`
    -   An array of pixel widths that the `<Image />` component will use to generate different image sizes for the `srcset` attribute. These are typically common device breakpoints.
-   **`formats`:** `string[]`
    -   An array of image formats (e.g., `'webp'`, `'jpeg'`) that CRAX will generate. Browsers will pick the most efficient format they support.
-   **`defaultProps`:** Object
    -   **`loading`:** `'lazy' | 'eager'`
        -   The default `loading` attribute for images. `lazy` defers loading until the image is near the viewport.
    -   **`decoding`:** `'sync' | 'async' | 'auto'`
        -   The default `decoding` attribute, suggesting how the browser should decode the image.
    -   **`sizes`:** `string`
        -   The default `sizes` attribute for responsive images, indicating the image's display size at different viewport widths.

By carefully configuring these options, you can tailor CRAX to meet the specific needs and performance goals of your application.
