import { Link } from 'react-router-dom';
import { Image } from '@crax/image';

export default function DefaultPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Image src="/logo.png" alt="Crax Logo" className="w-48 h-48 mb-8" />
      <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">
        Welcome to Crax
      </h1>
      <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
        A modern React framework for building web applications at the speed of
        vite.
      </p>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Get started by editing{' '}
        <code className="bg-gray-200 dark:bg-gray-800 rounded px-2 py-1 font-mono">
          src/pages/index.tsx
        </code>
      </p>
      <div className="flex space-x-4">
        <Link
          to="/home"
          className="bg-sky-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-sky-700 transition duration-300 active:scale-95">
          Get Started
        </Link>
        <Link
          to="/counter"
          className="bg-sky-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-sky-700 transition duration-300 active:scale-95">
          Counter
        </Link>
        <a
          href="https://github.com/Hussseinkizz/crax"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-gray-900 transition duration-300">
          GitHub
        </a>
      </div>
    </main>
  );
}
