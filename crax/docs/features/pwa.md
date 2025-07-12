# PWA Capabilities

This document explains how to configure Progressive Web App (PWA) features in CRAX.

## PWA Configuration in `crax.config.mjs`

CRAX allows you to easily configure PWA settings through the `pwa` object in your `crax.config.mjs` file. This configuration is used to generate the `manifest.webmanifest` file and integrate PWA functionalities into your application.

Here's an example of the `pwa` configuration:

```javascript
// crax.config.mjs
const config = {
  // ... other configurations
  pwa: {
    enabled: true,
    themeColor: '#ffffff',
    backgroundColor: '#ffffff',
    iconPath: '/logo.png',
    name: 'Crax App',
    shortName: 'Crax',
    startUrl: '/',
    display: 'standalone',
  },
};
```

### Configuration Options:

-   `enabled`: A boolean indicating whether PWA features are enabled for your application. Set to `true` to enable PWA.
-   `themeColor`: Defines the default theme color for the application. This color is often used by the operating system to tint the title bar or task switcher.
-   `backgroundColor`: Defines the background color of the splash screen when the PWA is launched.
-   `iconPath`: The path to your application's icon. This icon is used for the home screen shortcut and splash screen. It should be a high-resolution image (e.g., 512x512 pixels).
-   `name`: The full name of your application. This is displayed to the user when they are prompted to install the PWA.
-   `shortName`: A shorter version of your application's name, used when space is limited (e.g., on the home screen).
-   `startUrl`: The URL that loads when the user launches the PWA from their home screen. Typically, this is the root path (`/`).
-   `display`: Defines the preferred display mode for the web application. Common values include:
    -   `standalone`: The application will look and feel like a standalone application, opening in its own window, independent of the browser.
    -   `fullscreen`: The application will open in fullscreen mode, taking up the entire display.
    -   `minimal-ui`: The application will open in a browser-like window, but with a minimal set of UI elements for navigation (e.g., back/forward buttons).
    -   `browser`: The application will open in a regular browser tab.

## What PWA Provides

Progressive Web Apps combine the best of web and app experiences. By enabling PWA capabilities in CRAX, your application can benefit from:

-   **Offline Access:** Users can access your application even when they are offline or have an unreliable network connection, thanks to service workers caching resources.
-   **Installability:** Users can "install" your web application to their device's home screen, making it easily accessible like a native application, without going through an app store.
-   **Native App-like Experience:** PWAs can offer features like push notifications, background synchronization, and access to device hardware (where supported), providing a more integrated and engaging user experience.
-   **Faster Loading:** Caching strategies employed by PWAs can significantly reduce load times on subsequent visits.
-   **Discoverability:** As web applications, PWAs are discoverable through search engines.