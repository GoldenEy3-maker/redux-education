import "server-only";

import { headers } from "next/headers";
import { tokenService } from "../services/token";

export async function getApiSession() {
  const headersStore = await headers();
  const authorization = headersStore.get("Authorization");
  if (!authorization) return null;
  const token = authorization.split(" ")[1];
  if (!token) return null;
  const session = await tokenService.verifyAccessToken(token);
  return session;
}
