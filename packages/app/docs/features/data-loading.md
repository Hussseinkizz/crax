# Data Loading

CRAX leverages React Router's powerful Data APIs to handle data fetching and mutations. This allows you to co-locate your data logic with your components, ensuring data is available before rendering and simplifying state management.

## `loader`

`loaders` are functions that fetch data for a route *before* the component renders. This ensures your component always has the data it needs.

### Example: Fetching Product Details

```tsx
// src/pages/products/[id].tsx
import { useLoaderData, useRouteError } from 'react-router-dom';

export async function loader({ params }) {
  const response = await fetch(`/api/products/${params.id}`);
  if (!response.ok) {
    throw new Response('Product not found', { status: 404 });
  }
  const product = await response.json();
  return { product };
}

export function ErrorBoundary() {
  const error = useRouteError();
  // You can render a custom error page here
  return <h1>Error: {error.statusText || error.message}</h1>;
}

export default function ProductPage() {
  const { product } = useLoaderData();

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
}
```

## `action`

`actions` are functions that handle data mutations, such as form submissions. They are triggered by forms or programmatically.

### Example: Submitting a Contact Form

```tsx
// src/pages/contact.tsx
import { Form, useNavigation, redirect } from 'react-router-dom';

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // Simulate an API call
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    // Handle API errors
    return { error: 'Failed to send message' };
  }

  return redirect('/contact?success=true'); // Redirect on success
}

export default function ContactPage() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Form method="post" className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input type="text" id="name" name="name" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" id="email" name="email" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
        <textarea id="message" name="message" rows={4} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
      </div>
      <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </Form>
  );
}
```