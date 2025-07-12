import { execSync } from 'child_process';
import path from 'node:path';
import fs from 'node:fs';
import * as kolorist from 'kolorist';
import { CraxConfig } from '../types/config.types.js';

export function generateIcons(config: CraxConfig) {
    if (!config.pwa) {
        console.log(kolorist.yellow('PWA config not found. Skipping icon generation.'));
        return;
    }
    const { pwa } = config;
    const publicDir = path.join(process.cwd(), 'public');
    const logoPath = path.join(publicDir, pwa.iconPath || 'logo.png');
    const manifestPath = path.join(publicDir, 'manifest.webmanifest');

    if (!fs.existsSync(logoPath)) {
        console.log(kolorist.red(`Error: ${logoPath} not found in public directory.`));
        process.exit(1);
    }

    if (!fs.existsSync(manifestPath)) {
        console.log(kolorist.yellow('manifest.webmanifest not found in public directory. Creating a default one.'));
        const defaultManifest = {
            name: pwa.name || "CRAX App",
            short_name: pwa.shortName || "CRAX",
            start_url: pwa.startUrl || ".",
            display: pwa.display || "standalone",
            background_color: pwa.backgroundColor || "#ffffff",
            theme_color: pwa.themeColor || "#000000",
            icons: []
        };
        fs.writeFileSync(manifestPath, JSON.stringify(defaultManifest, null, 2));
    }

    console.log(kolorist.cyan('Generating PWA icons...'));
    execSync(`pwa-asset-generator ${logoPath} ${publicDir} -m ${manifestPath} -i index.html`, { stdio: 'inherit' });
    console.log(kolorist.green('✅ PWA icons and manifest generated!'));
}
