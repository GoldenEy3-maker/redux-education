import { Counter } from "@/features/counter";

export default function Home() {
  return (
    <main className="container mx-auto flex flex-1 flex-col items-center justify-center px-4">
      <h1>Counter</h1>
      <Counter />
    </main>
  );
}
