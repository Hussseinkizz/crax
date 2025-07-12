# Getting Started with CRAX

This guide will help you set up your first CRAX project and get it running.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js:** Version 18 or higher. You can download it from [nodejs.org](https://nodejs.org/).
- **pnpm:** CRAX uses `pnpm` for package management. If you don't have it, install it globally:
  ```bash
  npm install -g pnpm
  ```

## 1. Create a New CRAX Project

Currently, CRAX is designed to be cloned directly. In the future, a `create-crax-app` utility might be available.

To get started, clone the CRAX repository:

```bash
git clone <CRAX_REPOSITORY_URL> my-crax-app
cd my-crax-app
```

*(Replace `<CRAX_REPOSITORY_URL>` with the actual URL of the CRAX repository.)*

## 2. Install Dependencies

Once you're in your project directory, install the necessary dependencies using `pnpm`:

```bash
pnpm install
```

This command will download and install all the packages required for your CRAX application.

## 3. Start the Development Server

After installing dependencies, you can start the development server:

```bash
pnpm dev
```

This will:
- Compile your application.
- Start a local development server (usually at `http://localhost:3000`).
- Provide Hot Module Replacement (HMR) for a fast development loop.

Open your browser and navigate to `http://localhost:3000` (or the port indicated in your terminal) to see your CRAX application running!

## 4. Build for Production

When you're ready to deploy your application, you can create an optimized production build:

```bash
pnpm build
```

This command will:
- Bundle your application's code.
- Optimize assets (e.g., minify JavaScript, CSS).
- Place the production-ready files in the `dist/` directory.

## 5. Preview Production Build

To test your production build locally before deploying:

```bash
pnpm preview
```

This will serve the contents of your `dist/` directory, allowing you to verify the optimized build.
