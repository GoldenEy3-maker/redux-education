"use client";

import { useSession } from "next-auth/react";

export function AuthClientWatcher() {
  useSession({
    required: true,
    onUnauthenticated() {
      console.error("Unauthenticated");
    },
  });

  return null;
}
