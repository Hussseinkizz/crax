import fs from 'fs';
import path from 'path';
import crax from '../config.mjs';

// === Config ===
const STATIC_DIR = path.resolve('./src/pages/static');
const OUT_DIR = path.resolve('./public'); // or './dist'
const HOSTNAME = crax.siteUrl;

// === Discover Static Routes ===
function toRoute(file) {
  const name = file.replace(/\.(tsx|mdx)$/, '');
  return name === 'index' ? '/' : `/${name}`;
}

const files = fs
  .readdirSync(STATIC_DIR)
  .filter((file) => /\.(tsx|mdx)$/.test(file));
const routes = files.map(toRoute);

// === Build Sitemap ===
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

// === Build robots.txt ===
const disallowRules = (crax.ssg?.robots?.disallow || [])
  .map((path) => `Disallow: ${path}`)
  .join('\n');

const robots = `User-agent: *
Allow: /
${disallowRules ? disallowRules + '\n' : ''}
Sitemap: ${HOSTNAME}/sitemap.xml
`;

// === Write to Output ===
fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(path.join(OUT_DIR, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(OUT_DIR, 'robots.txt'), robots);

console.log('✅ sitemap.xml and robots.txt generated!');
console.log('Included routes:', routes);
console.log('Disallowed paths:', crax.ssg?.robots?.disallow || []);
console.log('Output directory:', OUT_DIR);
