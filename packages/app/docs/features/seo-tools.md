# SEO Tools

CRAX provides built-in tools to help you improve your site's SEO.

## Sitemap Generation

CRAX can automatically generate a `sitemap.xml` file for your application. To generate a sitemap, run the following command:

```bash
npx crax generate sitemap
```

This will create a `sitemap.xml` file in your `public` directory.

## `robots.txt`

CRAX also generates a `robots.txt` file for your application. You can configure the `robots.txt` file in your `crax.config.mjs` file.

```javascript
// crax.config.mjs

export default {
  ssg: {
    robots: {
      disallow: ['/admin'],
    },
  },
};
```