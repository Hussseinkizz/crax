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
