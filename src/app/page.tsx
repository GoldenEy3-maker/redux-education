import { Counter } from "@/features/counter";

export default function Home() {
  return (
    <main className="flex container mx-auto px-4 flex-1 flex-col items-center justify-center">
      <h1>Counter</h1>
      <Counter />
    </main>
  );
}
