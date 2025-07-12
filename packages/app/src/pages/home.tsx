import { Image } from '@crax/image';
export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold">Welcome to CRAX</h1>
      <Image
        src="/bg.jpg"
        alt="Hero"
        width={500}
        height={500}
        className="rounded-md w-4/5 h-48 mx-auto"
      />
      <p className="mt-4 text-lg">Home sweet home.</p>
    </main>
  );
}
