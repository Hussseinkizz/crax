# File-Based Routing in CRAX

CRAX simplifies routing by adopting a file-system-based approach. This means your application's routes are automatically generated based on the structure of your files within the `src/pages` directory. This convention eliminates the need for manual route configuration, making it intuitive to manage your application's navigation.

## How it Works

CRAX leverages `vite-plugin-pages` to scan your `src/pages` directory. Each `.tsx` file found within this directory (and its subdirectories) is automatically mapped to a corresponding URL path.

### Basic Routes

-   `src/pages/index.tsx` maps to the root URL: `http://localhost:3000/`
-   `src/pages/about.tsx` maps to: `http://localhost:3000/about`
-   `src/pages/contact.tsx` maps to: `http://localhost:3000/contact`

### Nested Routes

Folders within `src/pages` create nested URL structures:

-   `src/pages/dashboard/index.tsx` maps to: `http://localhost:3000/dashboard`
-   `src/pages/dashboard/settings.tsx` maps to: `http://localhost:3000/dashboard/settings`

### Dynamic Routes

To create routes that accept dynamic parameters (like a user ID or a post slug), use square brackets `[]` in the filename. The value inside the brackets becomes a parameter accessible via React Router's `useParams` hook.

-   `src/pages/users/[id].tsx` maps to: `/users/1`, `/users/john-doe`, etc.

    In your `[id].tsx` component, you can access the `id` parameter:

    ```tsx
    // src/pages/users/[id].tsx
    import { useParams } from 'react-router-dom';

    export default function UserProfilePage() {
      const { id } = useParams();

      return (
        <div>
          <h1>User Profile: {id}</h1>
          {/* Fetch user data based on ID */}
        </div>
      );
    }
    ```

### Catch-all Routes

To handle routes that don't match any specific file, you can create a catch-all route using `[...]`:

-   `src/pages/[...all].tsx` maps to: `/any/path/that/does/not/match`

    This is useful for creating 404 (Not Found) pages.

    ```tsx
    // src/pages/[...all].tsx
    import { useParams } from 'react-router-dom';

    export default function NotFoundPage() {
      const { all } = useParams(); // `all` will be an array of segments

      return (
        <div>
          <h1>404 - Page Not Found</h1>
          <p>The path `/{all?.join('/')}` does not exist.</p>
        </div>
      );
    }
    ```

## Under the Hood

CRAX uses `vite-plugin-pages` to generate a virtual module (`virtual:generated-pages-react`) that contains the route configuration. This configuration is then processed by `@crax/utils/enhance-router.ts`, which converts it into a format compatible with React Router's Data APIs (e.g., enabling `loader`, `action`, and `ErrorBoundary` exports from your page components). Finally, `react-router-dom`'s `createBrowserRouter` is used to set up the routing for your application.
