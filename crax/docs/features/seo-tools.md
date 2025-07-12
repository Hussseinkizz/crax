# SEO Tools: Sitemap and Robots.txt Generation

CRAX provides built-in tools to help you improve your application's Search Engine Optimization (SEO) by automatically generating `sitemap.xml` and `robots.txt` files. These files are crucial for search engines to efficiently crawl and index your website.

## `sitemap.xml`

A sitemap is an XML file that lists the URLs of a site. It tells search engines about the organization of your site content, making it easier for them to discover and crawl all your important pages.

### How CRAX Generates Your Sitemap

CRAX automates the creation of your `sitemap.xml` based on the static pages defined in your project.

1.  **Static Pages:** The sitemap generator primarily scans files within the `src/pages/static` directory. Each `.tsx` or `.mdx` file in this directory is considered a static route.
2.  **Command:** You trigger the generation process using a simple CLI command:
    ```bash
    pnpm generate:sitemap
    ```
3.  **Output:** The generated `sitemap.xml` file will be placed in the `public/` directory of your project (e.g., `public/sitemap.xml`).

### Example `sitemap.xml` Entry

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://your-domain.com/</loc>
    <lastmod>2025-07-09T12:00:00.000Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://your-domain.com/about</loc>
    <lastmod>2025-07-09T12:00:00.000Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <!-- ... other static pages ... -->
</urlset>
```

*Note: The `lastmod` date will reflect the time of generation, and `changefreq`/`priority` are default values that can be adjusted if needed in the sitemap generation script itself.*

## `robots.txt`

`robots.txt` is a file at the root of your site that tells web robots (like search engine crawlers) which pages or files the crawler can or can't request from your site. It's a way to manage crawler traffic and prevent crawling of certain areas of your site.

### How CRAX Generates Your `robots.txt`

CRAX generates a `robots.txt` file alongside your sitemap, and allows you to configure disallow rules directly from your project's configuration.

1.  **Command:** The `robots.txt` is generated as part of the `pnpm generate:sitemap` command.
2.  **Configuration:** You can specify paths that search engine crawlers should *not* access within your `crax.config.mjs` file.

### Example `robots.txt` Configuration in `crax.config.mjs`

```javascript
// crax.config.mjs
const config = {
  siteUrl: 'https://your-domain.com',
  ssg: {
    enabled: true,
    robots: {
      // Paths to disallow in robots.txt
      disallow: ['/admin', '/private-data', '/temp/'],
    },
  },
  // ... other configurations
};

export default config;
```

### Example Generated `robots.txt`

```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /private-data
Disallow: /temp/

Sitemap: https://your-domain.com/sitemap.xml
```

This ensures that search engines are aware of your sitemap and respect your preferences for which parts of your site should not be crawled.

## Under the Hood

The `pnpm generate:sitemap` command executes the `.crax/scripts/generate-sitemap.mjs` script. This script uses Node.js's file system module to read your static page files, constructs the XML for the sitemap, and builds the `robots.txt` content based on the `siteUrl` and `ssg.robots.disallow` properties from your `crax.config.mjs`. Finally, it writes these files to your `public/` directory, making them accessible to web crawlers.
