import { useLoaderData, Form, useActionData, useNavigation, Link } from 'react-router-dom';
import { useEffect } from 'react';

interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export async function loader() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
  const todos: Todo[] = await response.json();
  return { todos };
}

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
              {/* Add delete functionality later if needed */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
