
# Crax for Large Language Models

This document provides a comprehensive overview of Crax, a modern web development framework, tailored for Large Language Models (LLMs) to understand and assist in development.

## What is Crax?

Crax is a lightweight, SPA-first (Single Page Application) web framework built on top of Vite, React 19, and Tailwind CSS. It is designed to be a simpler, more efficient alternative to heavier frameworks like Next.js, focusing on a streamlined developer experience and optimal performance for SPAs. Crax is open-source and community-driven.

## Core Principles

*   **Simplicity**: Crax aims to be minimal and easy to understand, avoiding unnecessary complexity and overhead.
*   **Speed**: Leveraging Vite, Crax offers a fast development server and optimized builds.
*   **SPA-First**: The primary focus is on building rich, interactive Single Page Applications.
*   **Convention over Configuration**: Crax uses file-based routing and other conventions to minimize the need for manual configuration.

## Main Features

*   **File-based Routing**: Pages are created by adding files to the `src/pages` directory. The file structure directly maps to the URL structure.
*   **Image Optimization**: Built-in image optimization for better performance.
*   **Rendering Modes**: Supports both Client-Side Rendering (CSR) and Static Site Generation (SSG).
*   **PWA Capabilities**: Comes with Progressive Web App features by default.
*   **Built-in UI Components**: Integrates with Shadcn UI for a set of pre-built, accessible components.
*   **TypeScript Support**: Full support for TypeScript out of the box.

## Tech Stack

*   **Vite**: The build tool and development server.
*   **React 19**: The core UI library.
*   **Tailwind CSS v4**: For styling.
*   **Shadcn UI**: A collection of UI components.
*   **TypeScript**: For static typing.

## Project Structure

The most important files and directories for an LLM to be aware of are:

*   `crax/`: The main project directory.
    *   `src/`: The source code for the application.
        *   `pages/`: This is where all the pages of the application are defined.
            *   `index.tsx`: The home page of the application.
            *   `about.tsx`: The about page, accessible at `/about`.
            *   `users/`: A directory that represents a route group.
                *   `index.tsx`: The page for `/users`.
                *   `[id].tsx`: A dynamic route for a single user, accessible at `/users/:id`.
        *   `components/`: Reusable React components.
        *   `lib/`: Utility functions.
        *   `main.tsx`: The entry point of the application.
    *   `public/`: Static assets that are publicly accessible.
    *   `crax.config.mjs`: The main configuration file for Crax.
    *   `package.json`: The project's dependencies and scripts.

## How it Works

### File-based Routing

Crax uses a file-based routing system. This means that the structure of the files in the `src/pages` directory determines the routes of the application.

*   **Static Routes**: A file like `src/pages/about.tsx` will create a route at `/about`.
*   **Index Routes**: A file named `index.tsx` will be the root of a directory. For example, `src/pages/index.tsx` is the home page (`/`), and `src/pages/blog/index.tsx` is the blog index (`/blog`).
*   **Dynamic Routes**: Files with square brackets in their names create dynamic routes. For example, `src/pages/blog/[slug].tsx` will match any URL like `/blog/my-first-post`. The `slug` parameter will be available in the component's props.

### Rendering Modes

*   **Client-Side Rendering (CSR)**: This is the default rendering mode. The entire application is rendered in the browser.
*   **Static Site Generation (SSG)**: Crax can pre-render pages at build time. This is useful for content-heavy sites like blogs and documentation. To enable SSG for a specific page, you can export a `getStaticProps` function from the page file.

### Image Optimization

Crax provides an `<Image>` component that automatically optimizes images. It handles resizing, compression, and serving images in modern formats like WebP.

### State Management and Data Fetching

Crax does not enforce a specific library for state management or data fetching. However, it provides built-in utilities and hooks to simplify these tasks. For example, there are hooks for fetching data on the client-side and for accessing data from `getStaticProps` in SSG pages.

## How to Contribute

Crax is an open-source project, and contributions are welcome. To contribute, you can:

*   **Report issues**: If you find a bug or have a feature request, you can open an issue on the GitHub repository.
*   **Submit pull requests**: If you want to contribute code, you can fork the repository and submit a pull request.

When contributing, please adhere to the project's coding style and conventions. The goal is to maintain the simplicity and lightweight nature of the framework.
