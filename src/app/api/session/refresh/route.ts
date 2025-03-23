import { db } from "@/shared/db";
import { tokenService } from "@/shared/services/token-service";
import { cookies } from "next/headers";

export async function GET() {
  const cookiesStore = await cookies();
  const refreshTokenCookie = cookiesStore.get("refresh");

  if (!refreshTokenCookie)
    return new Response("TokenNotDefined", {
      status: 401,
    });

  const refreshTokenPayload = await tokenService.verifyRefreshToken(
    refreshTokenCookie.value,
  );

  if (!refreshTokenPayload)
    return new Response("TokenNotValid", {
      status: 401,
    });

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

  if (!user)
    return new Response("UserByTokenNotFound", {
      status: 401,
    });

  const { tokenVersion: currentUserTokenVersion, password, ...session } = user;

  if (currentUserTokenVersion !== recievedTokenVersion)
    return new Response("UserTokenVersionNotMatch", {
      status: 401,
    });

  const { accessToken, refreshToken } = await tokenService.generateTokens({
    ...user,
    remember,
  });

  cookiesStore.set("refresh", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    path: "/",
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });

  return Response.json(
    { token: accessToken, user: session },
    {
      headers: { "Set-Cookie": `refresh=${refreshToken}` },
    },
  );
}
