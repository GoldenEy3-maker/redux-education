"use client";

import { useSession } from "next-auth/react";

export function SomeClientComp() {
  const { data: session, status } = useSession();
  if (status === "loading") return <div>Loading...</div>;
  return <div>{JSON.stringify(session)}</div>;
}
