"use client";

import { useSession } from "@/shared/auth/context";

export function SomeClientComp() {
  const { session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;

  return <div>{session?.user?.email}</div>;
}
