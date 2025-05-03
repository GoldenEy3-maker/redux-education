import { ApiException } from "@/shared/api/api-exception";
import { db } from "@/shared/db";
import { tokenService } from "@/shared/services/token";

export async function POST(request: Request) {
  // const refreshTokenCookie = cookiesStore.get("refresh");
  // console.log("refresh", request.cookies.get("refresh"));

  // console.log("refreshTokenCookie", refreshTokenCookie);
  const body = (await request.json()) as { refreshToken: string };
  // const headerStore = await headers();
  // const headerRefreshToken = headerStore.get("Authorization")?.split(" ")[1];

  if (!body.refreshToken) return ApiException.Unauthorized("TokenNotDefined");

  const refreshTokenPayload = await tokenService.verifyRefreshToken(
    body.refreshToken,
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

  const { tokenVersion: currentUserTokenVersion } = user;

  if (currentUserTokenVersion !== recievedTokenVersion)
    return ApiException.Unauthorized("UserTokenVersionNotMatch");

  const { accessToken, refreshToken } = await tokenService.generateTokens({
    ...user,
    remember,
  });

  // await tokenService.sendRefreshToken(refreshToken, remember);

  return Response.json({ accessToken, refreshToken });
}
