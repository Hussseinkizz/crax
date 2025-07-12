# CLI Commands

The CRAX CLI provides a set of commands to help you manage your project throughout the development lifecycle.

### `dev`

Starts the development server with Hot Module Replacement (HMR) enabled.

```bash
npx crax dev
```

### `build`

Builds your application for production, creating an optimized bundle in the `dist` directory.

```bash
npx crax build
```

### `start`

Starts a local server to preview your production build.

```bash
npx crax start
```

### `generate sitemap`

Generates a `sitemap.xml` and `robots.txt` file for your application, helping search engines index your site.

```bash
npx crax generate sitemap
```

### `generate icons`

Generates PWA icons and updates your web manifest, ensuring your app looks great on all devices.

```bash
npx crax generate icons
```