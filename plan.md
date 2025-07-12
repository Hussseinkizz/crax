# CRAX CLI Debugging Plan: Sitemap Generation

## Goal
To understand why `pagesDir` is `undefined` when `generateSitemap` is called, and to fix the underlying configuration loading/merging issue. The immediate goal is to get the `console.log` messages to appear, confirming the execution flow.

## First Principles Trace
1.  **Entry Point:** `pnpm exec crax generate sitemap` executed from `/home/kizz/Code~Vault/CRAX/crax-js/packages/app`.
2.  **`pnpm exec crax` resolution:** `pnpm` finds `packages/crax/package.json`'s `bin` field, which points to `dist/index.js`.
3.  **`dist/index.js` execution context:**
    *   `process.cwd()` should be `/home/kizz/Code~Vault/CRAX/crax-js/packages/app`.
    *   `__dirname` (for `dist/index.js`) should be `/home/kizz/Code~Vault/CRAX/crax-js/packages/crax/dist`.
4.  **`loadConfig()` function flow:**
    *   `defaultConfigPath` calculation: Should resolve to `/home/kizz/Code~Vault/CRAX/crax-js/packages/crax/dist/default.config.mjs`.
    *   `userConfigPath` calculation: Should resolve to `/home/kizz/Code~Vault/CRAX/crax-js/packages/app/crax.config.mjs`.
    *   `importDefault` calls: Are these successfully importing the content of the `.mjs` files?
    *   `mergeDeep` logic: Is it correctly merging `defaultConfig` (which has `pagesDir`) and `userConfig` (which does not), ensuring `pagesDir` is preserved?

## Step-by-Step Execution & Verification

### Phase 1: Verify Execution Context & Basic Logging

1.  **Clean up:**
    *   `rm -rf node_modules pnpm-lock.yaml` (root)
    *   `find . -name "node_modules" -type d -exec rm -rf {} +`
    *   `find . -name "pnpm-lock.yaml" -type f -exec rm -f {} +`
    *   `rm -rf packages/crax/dist`
    *   `rm -f pnpm-workspace.yaml` (root)
    *   `rm -f packages/app/pnpm-workspace.yaml`
    *   `rm -f packages/docs/pnpm-workspace.yaml`
2.  **Restore `pnpm-workspace.yaml` files:**
    *   Create `pnpm-workspace.yaml` in the root with:
        ```yaml
        packages:
          - 'packages/*'
        ```
    *   Create `packages/app/pnpm-workspace.yaml` with:
        ```yaml
        packages:
          - '.crax/*'
        ```
    *   Create `packages/docs/pnpm-workspace.yaml` with:
        ```yaml
        packages:
          - 'src/*'
        ```
3.  **Reinstall dependencies:** `pnpm install` (from root)
4.  **Rebuild `@crax/cli`:** `pnpm --filter @crax/cli build`
5.  **Modify `packages/crax/src/index.ts`:**
    *   Add `console.log(kolorist.yellow('CLI entry point reached.'));` at the very beginning of the `action` for the `sitemap` command.
    *   Add `console.log('process.cwd():', process.cwd());`
    *   Add `console.log('__dirname (index.ts):', __dirname);`
    *   Add `console.log('defaultConfigPath:', defaultConfigPath);`
    *   Add `console.log('userConfigPath:', userConfigPath);`
    *   Add `console.log('defaultConfig loaded:', defaultConfig);` (inside `if (fs.existsSync(defaultConfigPath))`)
    *   Add `console.log('userConfig loaded:', userConfig);` (inside `if (fs.existsSync(userConfigPath))`)
    *   Add `console.log('Merged config:', mergedConfig);` (before `return mergedConfig;`)
6.  **Rebuild `@crax/cli`:** `pnpm --filter @crax/cli build`
7.  **Execute `sitemap` command:** `pnpm exec crax generate sitemap` (from `packages/app`)
8.  **Verify Output:** Check if all `console.log` messages appear. This is crucial. If they don't, the problem is with `pnpm exec` or Node.js execution, not my code logic.

### Phase 2: Debugging `mergeDeep` (if Phase 1 logs appear)

1.  **Inspect `Merged config` output:** Check if `pagesDir` is present and correct in the logged `mergedConfig`.
2.  **If `pagesDir` is missing/incorrect in `mergedConfig`:**
    *   Add `console.log` statements inside `mergeDeep` to trace its execution.
    *   Rebuild and re-run.
    *   Analyze `mergeDeep`'s behavior to identify why `pagesDir` is not being preserved from `defaultConfig`.

### Phase 3: Debugging `generateSitemap` (if `mergedConfig` is correct)

1.  **Inspect `config` object passed to `generateSitemap`:** Add `console.log('Config passed to generateSitemap:', config);` at the very beginning of `generateSitemap` function in `packages/crax/src/scripts/generate-sitemap.ts`.
2.  **Rebuild and re-run.**
3.  **Analyze output:** If `pagesDir` is correct in `mergedConfig` but `undefined` in `generateSitemap`, it points to a module import/export issue or a type casting problem.

## Post-Fix Cleanup
Once the issue is resolved, remove all debugging `console.log` statements and ensure the code adheres to project conventions.
