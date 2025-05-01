import "server-only";

import { tokenService } from "../services/token";
import { ApiException } from "../api/api-exception";

export async function protectedRoute(request: Request) {
  const accessToken = request.headers.get("Authorization")?.split(" ")[1];
  if (!accessToken) throw ApiException.Unauthorized();

  const payload = await tokenService.verifyAccessToken(accessToken);
  if (!payload) throw ApiException.Unauthorized();

  const tokenExpirationMs = payload.exp ? payload.exp * 1000 : 0;

  if (Date.now() >= tokenExpirationMs) throw ApiException.Unauthorized();

  return payload;
}
