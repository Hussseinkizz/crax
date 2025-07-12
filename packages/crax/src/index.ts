#!/usr/bin/env node
import { program } from 'commander';
import { execSync } from 'child_process';
import * as kolorist from 'kolorist';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { CraxConfig } from './types/config.types.js';

// Dynamically import to handle ES modules
const importDefault = async (modulePath: string): Promise<any> => {
    const module = await import(modulePath);
    return module.default;
};

async function loadConfig(): Promise<CraxConfig> {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const defaultConfigPath = path.resolve(__dirname, 'default.config.mjs');
    const userConfigPath = path.resolve(process.cwd(), 'crax.config.mjs');

    let defaultConfig: Partial<CraxConfig> = {};
    if (fs.existsSync(defaultConfigPath)) {
        defaultConfig = await importDefault(defaultConfigPath);
    }

    let userConfig: Partial<CraxConfig> = {};
    if (fs.existsSync(userConfigPath)) {
        userConfig = await importDefault(userConfigPath);
    }

    const mergedConfig = mergeDeep(defaultConfig, userConfig) as CraxConfig;
    return mergedConfig;
}

function mergeDeep(target: any, source: any) {
    const output = { ...target };
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
                if (!(key in target))
                    Object.assign(output, { [key]: source[key] });
                else
                    output[key] = mergeDeep(target[key], source[key]);
            } else {
                Object.assign(output, { [key]: source[key] });
            }
        });
    }
    return output;
}

function isObject(item: any) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

program
  .name('crax')
  .description('CRAX project toolkit');

program
  .command('dev')
  .description('Start the development server')
  .action(() => {
    console.log(kolorist.cyan('Starting development server...'));
    execSync('vite', { stdio: 'inherit' });
  });

program
  .command('build')
  .description('Build the project for production')
  .action(() => {
    console.log(kolorist.cyan('Building project...'));
    execSync('vite build', { stdio: 'inherit' });
  });

program
  .command('start')
  .description('Start the production server')
  .action(() => {
    console.log(kolorist.cyan('Starting production server...'));
    execSync('vite preview', { stdio: 'inherit' });
  });

import { generateSitemap } from './scripts/generate-sitemap.js';
import { generateIcons } from './scripts/generate-icons.js';

const generate = program.command('generate')
    .description('Generate assets for your project');

generate
    .command('sitemap')
    .description('Generate sitemap.xml and robots.txt')
    .option('--siteUrl <url>', 'Override the siteUrl from config')
    .action(async (options) => {
        const config = await loadConfig();
        if (options.siteUrl) {
            config.siteUrl = options.siteUrl;
        }
        await generateSitemap(config);
    });

generate
    .command('icons')
    .description('Generate PWA icons and manifest')
    .option('--iconPath <path>', 'Override the iconPath from config')
    .option('--themeColor <color>', 'Override the themeColor from config')
    .option('--backgroundColor <color>', 'Override the backgroundColor from config')
    .option('--name <name>', 'Override the name from config')
    .option('--shortName <name>', 'Override the shortName from config')
    .option('--startUrl <url>', 'Override the startUrl from config')
    .option('--display <display>', 'Override the display from config')
    .action(async (options) => {
        const config = await loadConfig();
        if (config.pwa) {
            if (options.iconPath) config.pwa.iconPath = options.iconPath;
            if (options.themeColor) config.pwa.themeColor = options.themeColor;
            if (options.backgroundColor) config.pwa.backgroundColor = options.backgroundColor;
            if (options.name) config.pwa.name = options.name;
            if (options.shortName) config.pwa.shortName = options.shortName;
            if (options.startUrl) config.pwa.startUrl = options.startUrl;
            if (options.display) config.pwa.display = options.display;
        }
        console.log(kolorist.cyan('Generating PWA icons...'));
        generateIcons(config);
    });

program.parse(process.argv);




