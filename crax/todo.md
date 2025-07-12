# Documentation Overhaul Plan for CRAX

This document outlines the plan for creating comprehensive, organized, and high-quality documentation for the CRAX framework. Each task will be updated upon completion.

## Phase 1: Setup and Structure

- [x] **Task 1.1: Create `todo.md` (Current Task)**
- [x] Task 1.2: Create `docs/` directory.
- [x] Task 1.3: Create `docs/SUMMARY.md` for navigation.
- [x] Task 1.4: Create `docs/introduction.md` (High-level overview).
- [x] Task 1.5: Create `docs/getting-started.md` (Installation and first run).

## Phase 2: Core Features Documentation

- [x] **Task 2.1: Document File-Based Routing**
    - [x] Task 2.1.1: Create `docs/features/routing.md`.
    - [x] Task 2.1.2: Explain conventions (e.g., `index.tsx`, `[id].tsx`).
    - [x] Task 2.1.3: Provide code examples.
    - [x] Task 2.1.4: Briefly explain `vite-plugin-pages` and `enhance-router.ts`.
- [x] **Task 2.2: Document Data Loading (Loaders & Actions)**
    - [x] Task 2.2.1: Create `docs/features/data-loading.md`.
    - [x] Task 2.2.2: Explain `loader` and `action` functions.
    - [x] Task 2.2.3: Provide code examples for both.
    - [x] Task 2.2.4: Explain `useLoaderData` and `useActionData`.
- [x] **Task 2.3: Document Image Optimization Component**
    - [x] Task 2.3.1: Create `docs/features/image-optimization.md`.
    - [x] Task 2.3.2: Explain `<Image />` component usage.
    - [x] Task 2.3.3: Provide code examples.
    - [x] Task 2.3.4: Detail how it generates `srcset` and links to `crax.config.mjs`.
- [x] **Task 2.4: Document Global State Management**
    - [x] Task 2.4.1: Create `docs/features/state-management.md`.
    - [x] Task 2.4.2: Explain `createStore` and `useStore`.
    - [x] Task 2.4.3: Provide a simple real-world example (e.g., theme switcher).
    - [x] Task 2.4.4: Briefly explain `useSyncExternalStore` and `getChanges`.
- [x] **Task 2.5: Document Project Configuration**
    - [x] Task 2.5.1: Create `docs/features/configuration.md`.
    - [x] Task 2.5.2: Detail `crax.config.mjs` structure.
    - [x] Task 2.5.3: Explain `siteUrl`, `ssg`, `pwa` settings.
    - [x] Task 2.5.4: Provide comprehensive example.
- [x] **Task 2.6: Document CLI Commands/Scripts**
    - [x] Task 2.6.1: Create `docs/features/cli-commands.md`.
    - [x] Task 2.6.2: List and explain commands from `package.json` (e.g., `dev`, `build`, `generate:sitemap`, `generate:ssg`, `generate:icons`, `clean`).
    - [x] Task 2.6.3: Explain their purpose and usage.
- [x] **Task 2.7: Document SEO Tools (Sitemap & Robots)**
    - [x] Task 2.7.1: Create `docs/features/seo-tools.md`.
    - [x] Task 2.7.2: Explain `generate:sitemap` script in detail.
    - [x] Task 2.7.3: Explain `robots.txt` configuration.
- [x] **Task 2.8: Document PWA Capabilities**
    - [x] Task 2.8.1: Create `docs/features/pwa.md`.
    - [x] Task 2.8.2: Explain PWA configuration in `crax.config.mjs`.
    - [x] Task 2.8.3: Briefly explain what PWA provides (offline, installability).

## Phase 3: Example Application

- [x] **Task 3.1: Plan Real-World Example App**
    - [x] Task 3.1.1: Define scope (Simple blog application).
    - [x] Task 3.1.2: Identify features to demonstrate (File-based routing, data loading, state management, image optimization).
- [x] **Task 3.2: Create Example App Tutorial**
    - [x] Task 3.2.1: Create `docs/examples/blog-app.md`.
    - [x] Task 3.2.2: Walk through building the app step-by-step.
    - [x] Task 3.2.3: Integrate all documented features.

## Phase 4: README.md Update

- [x] **Task 4.1: Rewrite Root `README.md`**
    - [x] Task 4.1.1: Keep existing high-level overview.
    - [x] Task 4.1.2: Remove detailed feature explanations.
    - [x] Task 4.1.3: Add clear links to `docs/` for detailed information.
    - [x] Task 4.1.4: Ensure it's a broad perspective of the framework.

## Phase 5: Review and Finalization

- [ ] Task 5.1: Review all documentation for clarity, accuracy, and consistency.
- [x] Task 5.2: Ensure all links are correct.
- [x] Task 5.3: Verify code snippets are correct and idiomatic.
