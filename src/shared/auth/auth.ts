"use server";

import { cookies } from "next/headers";
import { Session } from "./types";

export const auth = async (): Promise<Session | null> => {
  const cookiesStore = await cookies();
  let accessToken = cookiesStore.get("accessToken")?.value;
  const refreshToken = cookiesStore.get("refresh")?.value;

  if (!refreshToken) {
    return null;
  }

  if (!accessToken) {
    const response = await fetch("http://localhost:3000/api/auth/refresh", {
      headers: {
        "x-refresh-token": refreshToken,
      },
    });

    if (response.ok) {
      const data = await response.json();
      accessToken = data.accessToken;
    }
  }

  let response = await fetch("http://localhost:3000/api/auth/session", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 401) {
    const refreshResponse = await fetch(
      "http://localhost:3000/api/auth/refresh",
      {
        headers: {
          "x-refresh-token": refreshToken,
        },
      },
    );
    if (refreshResponse.ok) {
      const data = await refreshResponse.json();
      accessToken = data.accessToken;
      response = await fetch("http://localhost:3000/api/auth/session", {
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
        },
      });
    }
  }
  const user = response.ok ? await response.json() : null;

  return { token: accessToken ?? null, user };
};
