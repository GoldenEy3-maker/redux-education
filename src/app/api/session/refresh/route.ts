import { db } from "@/shared/db";
import { tokenService } from "@/shared/server/services/token-service";
import { cookies } from "next/headers";

export async function GET() {
  const cookiesList = await cookies();
  const refreshTokenCookie = cookiesList.get("refresh");

  if (!refreshTokenCookie || typeof refreshTokenCookie !== "string")
    return new Response("Unauthorized", {
      status: 401,
    });

  const refreshTokenPayload =
    await tokenService.verifyRefreshToken(refreshTokenCookie);

  if (!refreshTokenPayload)
    return new Response("Unauthorized", {
      status: 401,
    });

  const { id, remember, tokenVersion } = refreshTokenPayload;

  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, id),
  });

  if (!user)
    return new Response("Unauthorized", {
      status: 401,
    });

  if (user.tokenVersion !== tokenVersion)
    return new Response("Unauthorized", {
      status: 401,
    });

  const { accessToken, refreshToken } = await tokenService.generateTokens({
    ...user,
    remember,
  });

  return Response.json("123");
}
