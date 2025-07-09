import { Link } from 'react-router-dom';

export default function DefaultPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold">Welcome to CRAX</h1>
      <Link
        to="/home"
        className="bg-sky-600 text-white px-4 py-2 rounded-b-lg shadow hover:bg-sky-700 transition duration-300 active:scale-95">
        Navigate around
      </Link>
    </main>
  );
}
