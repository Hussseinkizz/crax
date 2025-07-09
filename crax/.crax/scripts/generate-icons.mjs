import { generateImages } from 'pwa-asset-generator';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp'; // For image size check

console.log('🔥 Generating PWA icons...');
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..', '..');
console.log('rootDir:', rootDir, 'dirname:', __dirname);

const configPath = path.join(rootDir, '/.crax/config.mjs');
const craxConfig = await import(configPath).then((m) => m.default);

const pwa = craxConfig.pwa;

if (!pwa?.enabled) {
  console.log('❌ PWA is disabled in crax config. Skipping icon generation.');
  process.exit(0);
}

const outputDir = path.join(rootDir, 'public');
const logoPath = path.join(outputDir, 'logo.png');

if (!fs.existsSync(logoPath)) {
  console.error(`
🚫 Missing required logo image at: public/logo.png

To use PWA features, please add a 512x512 PNG logo at that path.

Or disable PWA in your crax.config.mjs:
   pwa: { enabled: false }

Exiting.
`);
  process.exit(1);
}

// Check logo size using sharp
const metadata = await sharp(logoPath).metadata();
if (metadata.width !== 512 || metadata.height !== 512) {
  console.error(`
🚫 Logo image must be exactly 512x512 pixels.
Current size: ${metadata.width}x${metadata.height}

Please resize your logo.png and try again.

Exiting.
`);
  process.exit(1);
}

console.log(`🎨 Using logo: ${logoPath}`);
console.log(`🚀 Generating PWA icons into: ${outputDir}`);

try {
  await generateImages(logoPath, outputDir, {
    log: true,
    scrape: false,
    background: pwa.backgroundColor || '#ffffff',
    type: 'png',
    path: '/',
    preferMaskable: true,
    manifest: path.join(outputDir, 'manifest.webmanifest'),
  });

  console.log('✅ PWA icons and manifest generated!');
} catch (error) {
  console.error('❌ Failed to generate PWA icons:', error);
  process.exit(1);
}
