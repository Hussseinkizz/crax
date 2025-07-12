# 🪶 CRAX - Create React App Xtended

CRAX is an experimental, Vite-powered framework for building modern Single Page Applications (SPAs) with React. It aims to provide a streamlined developer experience by combining the best parts of the React ecosystem into a simple, cohesive package. It's designed to be a lightweight alternative to heavier frameworks, focusing on simplicity and performance.

👾 This project is open source and community-driven.

## 🚔 Core Features

- **File-Based Routing:** No more manual route configuration.
- **Integrated Data Loading:** Fetch data for your routes with simple `loader` functions.
- **Automatic Image Optimization:** Serve perfectly sized images without the hassle.
- **Built-in State Management:** Simple and powerful global state management out of the box.
- **SEO Tools:** Automatic `sitemap.xml` and `robots.txt` generation.
- **PWA Ready:** Easily configure your app to be a Progressive Web App.

## 🛠️ The Stack

- **Vite:** For a lightning-fast development experience.
- **React 19:** Leveraging the latest React features.
- **React Router:** For robust routing and data loading.
- **TailwindCSS:** For utility-first styling.
- **Shadcn UI:** A pre-installed library of beautiful and accessible UI components.
- **TypeScript:** For a type-safe and scalable codebase.

---

## 📖 Documentation

For detailed information on CRAX features and usage, please refer to the official documentation:

-   [**Getting Started**](docs/getting-started.md): Installation and your first CRAX project.
-   [**File-Based Routing**](docs/features/routing.md): Learn how CRAX handles routing based on your file structure.
-   [**Data Loading (Loaders & Actions)**](docs/features/data-loading.md): Understand how to fetch and manage data for your routes.
-   [**Image Optimization**](docs/features/image-optimization.md): Optimize your images automatically with the `<Image />` component.
-   [**Global State Management**](docs/features/state-management.md): Simple and powerful global state management out of the box.
-   [**Project Configuration**](docs/features/configuration.md): Customize CRAX behavior via `crax.config.mjs`.
-   [**CLI Commands**](docs/features/cli-commands.md): Explore the available command-line interface tools.
-   [**SEO Tools (Sitemap & Robots)**](docs/features/seo-tools.md): Improve your site's search engine visibility.
-   [**PWA Capabilities**](docs/features/pwa.md): Make your application a Progressive Web App.

## 🚀 Example Application

-   [**Building a Simple Blog Application**](docs/examples/blog-app.md): A step-by-step tutorial demonstrating core CRAX features in a real-world scenario.

---

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

## 🤝 Contributing

This is a weekend project born from a desire for a simpler alternative to heavy frameworks. All contributions are welcome! Feel free to open an issue to discuss a new feature or submit a pull request. The main goal is to maintain simplicity while adding valuable features.
