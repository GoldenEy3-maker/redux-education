import { ApiException } from "@/shared/api/api-exception";
import { db } from "@/shared/db";
import { tokenService } from "@/shared/lib/token-service";
import { cookies } from "next/headers";

export async function GET() {
  const cookiesStore = await cookies();
  const refreshTokenCookie = cookiesStore.get("refresh");

  if (!refreshTokenCookie) return ApiException.Unauthorized("TokenNotDefined");

  const refreshTokenPayload = await tokenService.verifyRefreshToken(
    refreshTokenCookie.value,
  );

  if (!refreshTokenPayload) return ApiException.Unauthorized("TokenIsInvalid");

  const {
    id,
    remember,
    tokenVersion: recievedTokenVersion,
  } = refreshTokenPayload;

  const user = await db.user.findFirst({
    where: {
      id,
    },
  });

  if (!user) return ApiException.Unauthorized("UserByTokenNotFound");

  const { tokenVersion: currentUserTokenVersion, password, ...session } = user;

  if (currentUserTokenVersion !== recievedTokenVersion)
    return ApiException.Unauthorized("UserTokenVersionNotMatch");

  const { accessToken, refreshToken } = await tokenService.generateTokens({
    ...user,
    remember,
  });

  const responseRefreshTokenCookie = await tokenService.sendRefreshToken(
    refreshToken,
    remember,
  );

  return Response.json(
    { token: accessToken, user: session },
    {
      ...responseRefreshTokenCookie,
    },
  );
}
