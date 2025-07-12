# CLI Commands and Scripts in CRAX

CRAX provides a set of convenient command-line interface (CLI) scripts to help you manage your development workflow, from starting the development server to building for production and generating assets. These scripts are defined in the `scripts` section of your `package.json` file and are executed using `pnpm run <script-name>`.

## Available Commands

Here's a breakdown of the most commonly used CRAX CLI commands:

### `pnpm dev`

-   **Purpose:** Starts the development server.
-   **Usage:** `pnpm dev`
-   **Details:** This command leverages Vite to provide a fast development experience with features like Hot Module Replacement (HMR). Your application will typically be accessible at `http://localhost:3000`.

### `pnpm start`

-   **Purpose:** Starts the development server after generating icons.
-   **Usage:** `pnpm start`
-   **Details:** This is a convenience script that first runs `pnpm generate:icons` to ensure your application icons are up-to-date, and then starts the development server using `vite --port 3000`.

### `pnpm build`

-   **Purpose:** Creates an optimized production build of your application.
-   **Usage:** `pnpm build`
-   **Details:** This command uses Vite to bundle, minify, and optimize all your application's assets (JavaScript, CSS, images, etc.) into the `dist/` directory. The output is ready for deployment to a static hosting service.

### `pnpm generate:sitemap`

-   **Purpose:** Generates `sitemap.xml` and `robots.txt` files for SEO.
-   **Usage:** `pnpm generate:sitemap`
-   **Details:** This script scans your static pages (in `src/pages/static`) and creates a `sitemap.xml` file listing all your public routes. It also generates a `robots.txt` file based on your `crax.config.mjs` settings, instructing search engine crawlers on how to index your site. Both files are placed in the `public/` directory.

### `pnpm generate:ssg`

-   **Purpose:** Performs Static Site Generation (SSG) for your application.
-   **Usage:** `pnpm generate:ssg`
-   **Details:** This command uses `react-snap` (configured via `.crax/react-snap.config.mjs`) to pre-render your application's pages into static HTML files. This is beneficial for SEO and initial page load performance, as users receive fully rendered content directly from the server.

### `pnpm generate:icons`

-   **Purpose:** Generates various icon sizes and formats for PWA and favicons.
-   **Usage:** `pnpm generate:icons`
-   **Details:** This script (located at `.crax/scripts/generate-icons.mjs`) automates the creation of different icon sizes and formats required for Progressive Web Apps (PWA) and browser favicons, based on a source image (typically `public/logo.png`). It ensures your app looks good on all devices and platforms.

### `pnpm package`

-   **Purpose:** A comprehensive script to prepare your application for deployment.
-   **Usage:** `pnpm package`
-   **Details:** This command orchestrates multiple build and generation steps:
    1.  `vite build`: Creates the production build.
    2.  `pnpm generate:sitemap`: Generates SEO files.
    3.  `pnpm generate:ssg`: Performs static site generation.
    4.  `pnpm generate:icons`: Generates all necessary icons.
    This script is ideal for your CI/CD pipeline or when you need a complete, deployable package.

### `pnpm clean`

-   **Purpose:** Removes generated build artifacts and temporary files.
-   **Usage:** `pnpm clean`
-   **Details:** This command deletes the `dist/` directory, `public/sitemap.xml`, `public/robots.txt`, and `.crax/icons.generated.json`, providing a clean slate for new builds.

### `pnpm lint`

-   **Purpose:** Runs code linting to enforce code style and catch potential errors.
-   **Usage:** `pnpm lint`
-   **Details:** This command uses ESLint (configured via `eslint.config.js`) to analyze your codebase and report any issues related to code quality, style, and potential bugs.

### `pnpm test`

-   **Purpose:** Runs unit and integration tests.
-   **Usage:** `pnpm test`
-   **Details:** This command executes your tests using Vitest. It's crucial for ensuring the correctness and reliability of your code.

### `pnpm test:ui`

-   **Purpose:** Runs tests with a graphical user interface.
-   **Usage:** `pnpm test:ui`
-   **Details:** Provides a web-based UI for running and debugging your Vitest tests, offering a more interactive testing experience.

### `pnpm preview`

-   **Purpose:** Serves the production build locally for testing.
-   **Usage:** `pnpm preview`
-   **Details:** After running `pnpm build`, this command allows you to preview the optimized production version of your application in a local server environment, simulating how it would behave once deployed.

These CLI commands form the backbone of your development and deployment workflow with CRAX, providing powerful tools to manage your project efficiently.
