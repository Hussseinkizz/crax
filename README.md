<div align="center">
  <a href="https://crax.js.org">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/craxjs/crax/main/assets/Icon-192-dark-bg-circle.png">
      <img alt="CRAX logo" src="https://raw.githubusercontent.com/craxjs/crax/main/assets/Icon-192-white-bg-circle.png" height="128">
    </picture>
  </a>

  <h1>CRAX - Create React App Xtended</h1>

  <a href="https://github.com/craxjs/crax"><img alt="GitHub stars" src="https://img.shields.io/github/stars/craxjs/crax?style=for-the-badge&labelColor=000000&logo=github"></a>
  <a href="https://www.npmjs.com/package/create-crax-app"><img alt="NPM version" src="https://img.shields.io/npm/v/create-crax-app.svg?style=for-the-badge&labelColor=000000&logo=npm"></a>
  <a href="https://github.com/craxjs/crax/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/npm/l/crax.svg?style=for-the-badge&labelColor=000000"></a>
  <a href="https://github.com/craxjs/crax/discussions"><img alt="Join the Community" src="https://img.shields.io/badge/Join%20the%20Community-blueviolet.svg?style=for-the-badge&logo=React&labelColor=000000&logoWidth=20"></a>
</div>

---

## Built for speed, simplicity, and SPA-first experiences.

**CRAX** is a lightweight, fast, and simple framework for building SPA-first experiences with React.

You can get started by running:

```bash
npx create-crax-app your-cool-app
```

> 👾 **Purely Open Source & Community Driven. No Big Influence!**



## 🚔 Main Features

- ⚡️ SPA & PWA Capabilities by Default
- ✨ View Transitions *(optional & coming soon)*
- 🗂️ File-based Routing
- 🖼️ Image Optimization
- 🧠 Rendering Modes *(CSR & SSG)*
- 🧩 Built-in Utilities *(State Management, Data Fetching, etc.)*
- 🚔 SEO Ready!



## 🛠️ Main Stack

- Vite
- Vite Plugins
- React 19
- Tailwind V4
- Shadcn UI
- TypeScript



## 🧭 Roadmap

- [x] Initial Setup
- [x] Markdown Support (only under docs for now)
- [x] File-based Routing
- [x] Image Optimization
- [x] PWA Capabilities
- [x] Rendering Modes (SSG)
- [x] SEO Tools (Sitemap, Robots)
- [x] Built-in State Management
- [x] Data Fetching (Loaders & Actions)
- [x] CLI Tooling
- [x] Documentation
- [x] Make This LLM Friendly via llms.md file
- [ ] Beta Release
- [ ] Testing via Vitest
- [ ] Docker Image
- [ ] View Transitions

## 📖 Documentation

For detailed information on CRAX features and usage, please refer to the official documentation:

-   [**Getting Started**](./packages/app/docs/getting-started.md): Installation and your first CRAX project.
-   [**File-Based Routing**](./packages/app/docs/features/routing.md): Learn how CRAX handles routing based on your file structure.
-   [**Data Loading (Loaders & Actions)**](./packages/app/docs/features/data-loading.md): Understand how to fetch and manage data for your routes.
-   [**Image Optimization**](./packages/app/docs/features/image-optimization.md): Optimize your images automatically with the `<Image />` component.
-   [**Global State Management**](./packages/app/docs/features/state-management.md): Simple and powerful global state management out of the box.
-   [**Project Configuration**](./packages/app/docs/features/configuration.md): Customize CRAX behavior via `crax.config.mjs`.
-   [**CLI Commands**](./packages/app/docs/features/cli-commands.md): Explore the available command-line interface tools.
-   [**SEO Tools (Sitemap & Robots)**](./packages/app/docs/features/seo-tools.md): Improve your site's search engine visibility.
-   [**PWA Capabilities**](./packages/app/docs/features/pwa.md): Make your application a Progressive Web App.

## 🚀 Example Application

-   [**Building a Todo App**](./packages/app/docs/examples/todo-app.md): A step-by-step tutorial demonstrating core CRAX features in a real-world scenario.



## ⚙️ Development

To get started with development:

1.  **Install dependencies:**
    ```bash
    pnpm install
    ```
2.  **Start the development server:**
    ```bash
    pnpm dev
    ```
    Your site will be available at `http://localhost:3000`.

## ⚙️ Contributing

This is a passion project — started out of frustration with Next.js’ heaviness during dev, slow reloads, and general overhead.

> Want something lightweight and productive? This might be it.

Feel free to hit the **issues** tab, drop feedback, or open a **PR**.
No strict rules — just don’t ruin the simplicity. ❤️



## 📜 License

[MIT](./LICENSE)