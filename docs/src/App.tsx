import IndexPage from "./pages/index.mdx";

function App() {
  return (
    <main className="w-full dark dark:bg-black dark:text-indigo-300">
      <section className="flex w-full justify-center dark items-center dark:bg-black/90 dark:text-indigo-300">
        <article className="prose prose-lg --max-w-none dark:prose-invert  px-8 mx-auto py-16">
          <IndexPage />
        </article>
      </section>
    </main>
  );
}

export default App;
