#!/usr/bin/env node
import { program } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import ora from 'ora';
import * as kolorist from 'kolorist';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

program
  .name('create-crax-app')
  .description('Create a new CRAX project')
  .argument('[destination]', 'The destination directory', '.')
  .action(async (destination) => {
    const spinner = ora(kolorist.cyan('Creating your new CRAX app...')).start();

    try {
      const source = path.resolve(__dirname, '../../../app');
      const dest = path.resolve(process.cwd(), destination);

      await fs.copy(source, dest, {
        filter: (src) => {
          const excluded = ['node_modules', 'dist', 'pnpm-lock.yaml', '.turbo', '*.log'];
          return !excluded.some(ex => src.includes(ex));
        }
      });

      const packageJsonPath = path.join(dest, 'package.json');
      const packageJson = await fs.readJson(packageJsonPath);

      packageJson.name = path.basename(dest) === '.' ? 'crax-app' : path.basename(dest);
      packageJson.version = '0.1.0';
      const isDev = process.env.CRAX_DEV === 'true';
      const cliDependency = isDev ? 'file:../crax-cli-0.1.0.tgz' : 'latest';

      packageJson.devDependencies = {
        ...packageJson.devDependencies,
        '@crax/cli': cliDependency
      };

      await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });

      spinner.succeed(kolorist.green('Success! Your project is ready.'));

      console.log(kolorist.bold('\nNext steps:\n'));
      console.log(`  1. cd ${destination}`);
      console.log('  2. pnpm install');
      console.log('  3. pnpm dev');

    } catch (error) {
      spinner.fail(kolorist.red('An error occurred.'));
      console.error(error);
    }
  });

program.parse(process.argv);
