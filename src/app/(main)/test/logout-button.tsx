"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/shared/ui/button";
import { useTransition } from "react";

export function LogOutButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      onClick={() => startTransition(() => signOut({ redirect: true }))}
      disabled={isPending}
    >
      Log out
    </Button>
  );
}
