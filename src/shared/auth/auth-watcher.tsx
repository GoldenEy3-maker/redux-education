"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export function AuthWatcher() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "loading" && !session?.user) {
      signOut({ redirect: true });
    }
  }, [session, status]);

  return null;
}
