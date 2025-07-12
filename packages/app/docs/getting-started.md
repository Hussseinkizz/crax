# Getting Started

Welcome to CRAX! This guide will walk you through creating and running your first CRAX application.

## Prerequisites

Before you start, make sure you have the following installed:

- **Node.js:** Version 18 or higher
- **pnpm:** A fast and efficient package manager

If you don't have pnpm, you can install it with:
```bash
npm install -g pnpm
```

## Create Your First CRAX App

To create a new CRAX project, open your terminal and run:

```bash
pnpm create crax-app my-awesome-app
```

This command will create a new directory called `my-awesome-app` and set up a new CRAX project inside it.

## Start the Development Server

Navigate to your new project's directory and start the development server:

```bash
cd my-awesome-app
pnpm dev
```

Your new CRAX app will be running at `http://localhost:5173`. Open it in your browser to see it in action!

## Next Steps

Now that you have your project running, here are a few things you might want to explore next:

- **Create a new page:** Add a new file to the `src/pages` directory to see file-based routing in action.
- **Explore the docs:** Learn more about CRAX's features, such as data loading, state management, and image optimization.
- **Build for production:** When you're ready to deploy, run `pnpm build` to create an optimized version of your app.