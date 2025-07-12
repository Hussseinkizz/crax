# Example: Building a Blog

This tutorial will guide you through building a simple blog with CRAX. You'll learn how to use file-based routing, data loading, and the `<Image>` component.

## 1. Create a Dynamic Route

First, let's create a dynamic route to display individual blog posts. Create a new file at `src/pages/blog/[slug].tsx`.

```typescript
// src/pages/blog/[slug].tsx
import { useLoaderData } from 'react-router-dom';
import { Image } from '@crax/image';

export async function loader({ params }) {
  const response = await fetch(`/api/posts/${params.slug}`);
  const post = await response.json();
  return { post };
}

export default function Post() {
  const { post } = useLoaderData();

  return (
    <div>
      <h1>{post.title}</h1>
      <Image src={post.imageUrl} alt={post.title} />
      <p>{post.content}</p>
    </div>
  );
}
```

## 2. Create a Blog Index Page

Next, let's create a page to list all of our blog posts. Create a new file at `src/pages/blog/index.tsx`.

```typescript
// src/pages/blog/index.tsx
import { useLoaderData, Link } from 'react-router-dom';

export async function loader() {
  const response = await fetch('/api/posts');
  const posts = await response.json();
  return { posts };
}

export default function BlogIndex() {
  const { posts } = useLoaderData();

  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## 3. Create a Mock API

For this example, we'll create a mock API to serve our blog posts. You can create a more robust API for your own projects. Create a new file at `src/pages/api/posts.ts` and `src/pages/api/posts/[slug].ts`.

I have updated all the documentation to be more end-user-facing. The new documentation is more concise, provides clearer examples, and is more focused on how to use CRAX to build applications.