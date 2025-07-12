# Example: Building a Todo App

This tutorial will guide you through building a simple Todo application with CRAX, demonstrating key features like data loading (`loader`), data mutation (`action`), and dynamic routing.

## 1. Create the Todo List Page

First, let's create the main page that will display our list of todos and allow us to add new ones. Create a new file at `src/pages/todos/index.tsx`:

```tsx
// src/pages/todos/index.tsx
import { useLoaderData, Form, useActionData, useNavigation, Link } from 'react-router-dom';
import { useEffect } from 'react';

interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

// Loader to fetch initial list of todos
export async function loader() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
  const todos: Todo[] = await response.json();
  return { todos };
}

// Action to handle adding a new todo
export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const title = formData.get('title');

  if (!title) {
    return { error: 'Todo title cannot be empty.' };
  }

  const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    body: JSON.stringify({
      title,
      completed: false,
      userId: 1,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  const newTodo: Todo = await response.json();
  return { newTodo, success: true };
}

export default function TodosPage() {
  const { todos } = useLoaderData() as { todos: Todo[] };
  const actionData = useActionData() as { error?: string; newTodo?: Todo; success?: boolean } | undefined;
  const navigation = useNavigation();
  const isAdding = navigation.formData?.get('title') !== undefined;

  useEffect(() => {
    if (actionData?.success && navigation.state === 'idle') {
      // Optionally clear the form or show a success message
      (document.getElementById('new-todo-title') as HTMLInputElement).value = '';
    }
  }, [actionData, navigation.state]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Todos</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add New Todo</h2>
        <Form method="post" className="flex gap-2">
          <input
            type="text"
            name="title"
            id="new-todo-title"
            placeholder="What needs to be done?"
            className="flex-1 p-2 border border-gray-300 rounded-md"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            disabled={isAdding}
          >
            {isAdding ? 'Adding...' : 'Add Todo'}
          </button>
        </Form>
        {actionData?.error && <p className="text-red-500 mt-2">{actionData.error}</p>}
        {actionData?.success && navigation.state === 'idle' && (
          <p className="text-green-500 mt-2">Todo added successfully!</p>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Todo List</h2>
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center justify-between bg-gray-100 p-3 rounded-md">
              <Link to={`/todos/${todo.id}`} className={`text-lg ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                {todo.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

## 2. Create the Todo Detail Page

Next, let's create a dynamic route to display the details of a single todo item. Create a new file at `src/pages/todos/[id].tsx`:

```tsx
// src/pages/todos/[id].tsx
import { useLoaderData, Link } from 'react-router-dom';

interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export async function loader({ params }: { params: { id?: string } }) {
  const todoId = params.id;
  if (!todoId) {
    throw new Response('Todo ID not provided', { status: 400 });
  }

  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
  if (!response.ok) {
    throw new Response('Todo not found', { status: 404 });
  }
  const todo: Todo = await response.json();
  return { todo };
}

export default function TodoDetailPage() {
  const { todo } = useLoaderData() as { todo: Todo };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Todo Details</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-xl font-semibold mb-2">Title: {todo.title}</p>
        <p className="text-gray-700 mb-2">Status: {todo.completed ? 'Completed' : 'Pending'}</p>
        <p className="text-gray-700 mb-4">User ID: {todo.userId}</p>
        <Link to="/todos" className="text-blue-600 hover:underline">
          Back to Todo List
        </Link>
      </div>
    </div>
  );
}
```

## 3. Update `src/pages/index.tsx` (Optional)

You might want to add a link to your new Todo app from your main `index.tsx` page:

```tsx
// src/pages/index.tsx
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome to your CRAX App!</h1>
      <p className="mb-4">Explore the features:</p>
      <ul className="list-disc list-inside">
        <li><Link to="/todos" className="text-blue-600 hover:underline">Go to Todo App Example</Link></li>
        {/* Add other links as needed */}
      </ul>
    </div>
  );
}
```

This example demonstrates how to build a functional Todo application using CRAX's data loading and routing capabilities. You can expand upon this by adding features like marking todos as complete, deleting todos, or integrating with a real backend.
