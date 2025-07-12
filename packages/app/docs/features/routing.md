# Routing

CRAX uses a file-based routing system, which means your application's routes are determined by the structure of your `src/pages` directory.

## Conventions

-   **Basic Routes:** A file like `src/pages/about.tsx` maps to `/about`.
-   **Index Routes:** A file like `src/pages/blog/index.tsx` maps to `/blog`.
-   **Dynamic Routes:** Use square brackets for dynamic segments. `src/pages/users/[id].tsx` maps to `/users/:id`.
-   **Catch-all Routes:** Use three dots to catch all subsequent routes. `src/pages/shop/[...all].tsx` is useful for complex matching or 404 pages.

## Layouts

To create a shared layout for a section of your site, create a `_layout.tsx` file. This layout will wrap all sibling and nested routes.

### Example Layout Structure

Consider this file structure:

```
src/pages/
  ├── dashboard/
  │   ├── _layout.tsx
  │   ├── index.tsx       # Renders at /dashboard
  │   └── settings.tsx    # Renders at /dashboard/settings
  └── index.tsx           # Renders at /
```

Here, the `dashboard/_layout.tsx` component will wrap both `dashboard/index.tsx` and `dashboard/settings.tsx`, but not the root `index.tsx`.

### Layout Component Example

The layout component must render an `<Outlet />` from `react-router-dom` to display the active child route.

```tsx
// src/pages/dashboard/_layout.tsx
import { Outlet } from 'react-router-dom';

export default function DashboardLayout() {
  return (
    <div className="flex">
      <nav className="w-64 bg-gray-800 text-white p-4">
        {/* Sidebar navigation links */}
      </nav>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
```