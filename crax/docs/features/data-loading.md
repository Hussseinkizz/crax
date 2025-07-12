# Data Loading with Loaders and Actions

CRAX integrates seamlessly with React Router's powerful Data APIs, allowing you to manage data fetching and mutations directly within your route components. This approach ensures that data is available *before* your component renders, leading to a better user experience and simpler data flow.

## Loaders: Fetching Data for Your Routes

`loaders` are functions that you export from your route components (e.g., `src/pages/users/[id].tsx`). They are responsible for fetching the data required by that route *before* the component is rendered. This means your component can always assume the data it needs is present.

### How to Use a Loader

1.  **Export a `loader` function:** In your page component file, export an `async` function named `loader`.
2.  **Access Route Parameters:** The `loader` function receives an object with properties like `params` (for dynamic route segments), `request` (the incoming request), and `context`.
3.  **Return Data:** The `loader` function should return the data it fetches. This data will be automatically made available to your component.
4.  **Access Data in Component:** Use the `useLoaderData` hook from `react-router-dom` within your component to access the data returned by the `loader`.

**Example: Fetching User Profile Data**

Let's say you have a dynamic route `src/pages/users/[id].tsx` to display a user's profile:

```tsx
// src/pages/users/[id].tsx
import { useLoaderData, type LoaderFunctionArgs } from 'react-router-dom';

// 1. Export an async loader function
export async function loader({ params }: LoaderFunctionArgs) {
  const userId = params.id; // Access the dynamic 'id' from the URL
  if (!userId) {
    throw new Response("Not Found", { status: 404 });
  }
  
  try {
    const response = await fetch(`https://api.example.com/users/${userId}`);
    if (!response.ok) {
      throw new Response("Failed to fetch user", { status: response.status });
    }
    const user = await response.json();
    return { user }; // 3. Return the fetched data
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Response("Internal Server Error", { status: 500 });
  }
}

// Your React component
export default function UserProfilePage() {
  // 4. Access the data using useLoaderData
  const { user } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <div>
      <h1>User Profile: {user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Bio: {user.bio}</p>
    </div>
  );
}
```

### Error Handling with Loaders

If a `loader` throws an error (e.g., network issue, 404 not found), React Router will catch it. You can define an `ErrorBoundary` component in your route file to gracefully handle these errors:

```tsx
// src/pages/users/[id].tsx (continued)
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

// ... (loader and default export component as above)

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops! {error.status}</h1>
        <p>{error.statusText}</p>
        {error.data?.message && <p>{error.data.message}</p>}
      </div>
    );
  }

  return <h1>Something went wrong.</h1>;
}
```

## Actions: Handling Data Mutations

`actions` are functions that you export from your route components to handle data mutations (e.g., form submissions, creating, updating, or deleting data). They are triggered by form submissions or programmatically using `useSubmit` or `fetcher.submit`.

### How to Use an Action

1.  **Export an `action` function:** In your page component file, export an `async` function named `action`.
2.  **Access Form Data:** The `action` function receives an object with `request` (containing form data), `params`, and `context`.
3.  **Perform Mutation:** Use the `request` object to get form data (e.g., `await request.formData()`) and perform your API call.
4.  **Return Response/Redirect:** The `action` can return data, an error, or a `redirect` to another URL.
5.  **Access Action Data:** Use `useActionData` to get the data returned by the action, or `useNavigation` to track its state.

**Example: Submitting a Contact Form**

Let's create a contact form on `src/pages/contact.tsx`:

```tsx
// src/pages/contact.tsx
import { Form, useActionData, useNavigation, redirect } from 'react-router-dom';

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  // Simulate API call
  const response = await new Promise(resolve => setTimeout(() => {
    console.log('Form Data:', { name, email, message });
    // Simulate success or failure
    if (name && email && message) {
      resolve({ success: true, message: 'Message sent successfully!' });
    } else {
      resolve({ success: false, message: 'Please fill all fields.' });
    }
  }, 1000));

  if (response.success) {
    return redirect('/contact?success=true'); // Redirect on success
  } else {
    return response; // Return error message to the component
  }
}

export default function ContactPage() {
  const actionData = useActionData() as { success: boolean; message: string } | undefined;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div>
      <h1>Contact Us</h1>
      <Form method="post">
        <p>
          <label>Name: <input type="text" name="name" /></label>
        </p>
        <p>
          <label>Email: <input type="email" name="email" /></label>
        </p>
        <p>
          <label>Message: <textarea name="message"></textarea></label>
        </p>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </Form>
      {actionData && !actionData.success && <p style={{ color: 'red' }}>{actionData.message}</p>}
      {actionData && actionData.success && <p style={{ color: 'green' }}>{actionData.message}</p>}
    </div>
  );
}
```

## Under the Hood

CRAX's `enhance-router.ts` utility plays a crucial role here. It intercepts the route configuration generated by `vite-plugin-pages` and modifies it to recognize and correctly register `loader`, `action`, and `ErrorBoundary` exports from your page components with React Router's Data APIs. This allows you to co-locate your data logic directly with your UI components, simplifying development and improving maintainability.
