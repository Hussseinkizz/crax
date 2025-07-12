# Building a Simple Blog Application with CRAX

This tutorial will guide you through building a basic blog application using CRAX, demonstrating key features like file-based routing, data loading, state management, and image optimization.

## 1. Project Setup

Assuming you have a CRAX project set up, let's start by creating the necessary files.

## 2. File-Based Routing for Blog Posts

CRAX uses file-based routing. We'll create a dynamic route for individual blog posts.

Create a new directory `src/pages/blog` and inside it, a file `[slug].tsx`:

```
src/pages/blog/[slug].tsx
```

This `[slug].tsx` file will handle individual blog post pages, where `slug` will be the unique identifier for each post.

## 3. Data Loading for Blog Posts

We'll use CRAX's `loader` function to fetch blog post data. For simplicity, we'll use a mock data source.

First, let's create a mock data file. Create `src/data/posts.ts`:

```typescript
// src/data/posts.ts
export const posts = [
  {
    slug: 'first-post',
    title: 'My First CRAX Blog Post',
    content: 'This is the content of my first blog post. It's exciting to be writing with CRAX!',
    imageUrl: '/bg.jpg',
  },
  {
    slug: 'second-post',
    title: 'Exploring CRAX Features',
    content: 'In this post, we'll dive deeper into the amazing features CRAX offers.',
    imageUrl: '/logo.png',
  },
];

export function getPostBySlug(slug: string) {
  return posts.find(post => post.slug === slug);
}
```

Now, modify `src/pages/blog/[slug].tsx` to use a `loader` to fetch the post data:

```typescript
// src/pages/blog/[slug].tsx
import { useLoaderData } from '@crax/router';
import { getPostBySlug } from '../../data/posts';
import { Image } from '@crax/image';

export function loader({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    throw new Response('Not Found', { status: 404 });
  }
  return { post };
}

export default function BlogPost() {
  const { post } = useLoaderData();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      {post.imageUrl && (
        <div className="mb-4">
          <Image src={post.imageUrl} alt={post.title} className="w-full h-64 object-cover rounded-lg" />
        </div>
      )}
      <p className="text-lg leading-relaxed">{post.content}</p>
    </div>
  );
}
```

## 4. Listing Blog Posts (Home Page)

Let's create a home page that lists all blog posts. Modify `src/pages/index.tsx`:

```typescript
// src/pages/index.tsx
import { Link } from '@crax/link';
import { posts } from '../data/posts';

export default function HomePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome to the CRAX Blog!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.slug} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.content.substring(0, 100)}...</p>
            <Link to={`/blog/${post.slug}`} className="text-blue-500 hover:underline">
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 5. State Management (Optional: Theme Switcher)

To demonstrate state management, let's add a simple theme switcher. We'll create a store and a component to toggle the theme.

Create `src/stores/theme.ts`:

```typescript
// src/stores/theme.ts
import { createStore } from '@crax/store';

interface ThemeState {
  theme: 'light' | 'dark';
}

const initialState: ThemeState = {
  theme: 'light',
};

export const themeStore = createStore(initialState);

export const toggleTheme = () => {
  themeStore.setState((state) => ({
    theme: state.theme === 'light' ? 'dark' : 'light',
  }));
};
```

Now, let's create a `ThemeSwitcher` component in `src/components/ThemeSwitcher.tsx`:

```typescript
// src/components/ThemeSwitcher.tsx
import { useStore } from '@crax/store';
import { themeStore, toggleTheme } from '../stores/theme';

export default function ThemeSwitcher() {
  const { theme } = useStore(themeStore);

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
    >
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
    </button>
  );
}
```

Finally, integrate the `ThemeSwitcher` into `src/main.tsx` (or a layout component if you have one) to apply the theme to the `body`:

```typescript
// src/main.tsx (add this to the top level of your App component)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Assuming your main App component
import './index.css';
import { useStore } from '@crax/store';
import { themeStore } from './stores/theme';

function Root() {
  const { theme } = useStore(themeStore);

  React.useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark' : '';
  }, [theme]);

  return <App />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
```

*(Note: You'll need to define `dark` styles in your `index.css` or a similar CSS file for the theme to have a visual effect.)*

## 6. Image Optimization

We've already used the `<Image />` component in `src/pages/blog/[slug].tsx`. This component automatically optimizes images by generating `srcset` attributes, improving performance and responsiveness.

Remember to configure image optimization settings in `crax.config.mjs` if needed.

## Conclusion

You've now built a simple blog application with CRAX, demonstrating key features. You can expand upon this by adding more complex data fetching, user authentication, or additional UI components.
