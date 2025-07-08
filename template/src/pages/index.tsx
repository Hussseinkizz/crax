import { Image } from '@crax/image';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold">Welcome to CRAX</h1>
      <Image src="/bg.jpg" alt="Hero" />
    </main>
  );
}
