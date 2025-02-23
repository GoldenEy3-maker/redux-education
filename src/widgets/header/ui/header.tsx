"use client";

import { selectCount } from "@/features/counter";
import { useAppSelector } from "@/shared/lib/store-hooks";

export function Header() {
  const count = useAppSelector(selectCount);

  return (
    <header className="container py-2 mx-auto px-4">
      <h3>Untitled UI</h3>
      <span>counter value: {count}</span>
    </header>
  );
}
