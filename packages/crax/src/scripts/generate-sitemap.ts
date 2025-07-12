import fs from 'fs';
import path from 'path';
import { CraxConfig } from '../types/config.types.js';

export function generateSitemap(config: CraxConfig) {
  const { siteUrl, ssg, pagesDir } = config;

  const STATIC_DIR = path.resolve(pagesDir, 'static');
  const OUT_DIR = path.resolve('./public');
  const HOSTNAME = siteUrl;

  if (!fs.existsSync(STATIC_DIR)) {
    console.warn(`Directory not found: ${STATIC_DIR}. Skipping sitemap generation.`);
    return;
  }

  const files = fs
    .readdirSync(STATIC_DIR)
    .filter((file) => /\.(tsx|mdx)$/.test(file));
  const routes = files.map(toRoute);

  function toRoute(file: string) {
    const name = file.replace(/\.(tsx|mdx)$/, '');
    return name === 'index' ? '/' : `/${name}`;
  }

  const now = new Date().toISOString();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `
  <url>
    <loc>${HOSTNAME}${route}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  const disallowRules = (ssg?.robots?.disallow || [])
    .map((path: string) => `Disallow: ${path}`)
    .join('\n');

  const robots = `User-agent: *
Allow: /
${disallowRules ? disallowRules + '\n' : ''}Sitemap: ${HOSTNAME}/sitemap.xml
`;

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, 'sitemap.xml'), sitemap);
  fs.writeFileSync(path.join(OUT_DIR, 'robots.txt'), robots);

  console.log('✅ sitemap.xml and robots.txt generated!');
}