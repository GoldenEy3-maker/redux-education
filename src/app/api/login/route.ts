import { ApiException } from "@/shared/api/api-exception";
import { db } from "@/shared/db";
import { passwordService } from "@/shared/services/password";
import { tokenService } from "@/shared/services/token";

export async function POST(request: Request) {
  const body = await request.json();
  const user = await db.user.findUnique({
    where: { email: body.email },
  });

  if (!user) {
    return ApiException.BadRequest("Неверный email или пароль");
  }

  const isPasswordValid = passwordService.verifyPassword(
    body.password,
    user.password,
  );

  if (!isPasswordValid) {
    return ApiException.BadRequest("Неверный email или пароль");
  }

  const { accessToken, refreshToken } = await tokenService.generateTokens({
    ...user,
    remember: true,
  });

  const { password, tokenVersion, ...userInfo } = user;

  return Response.json({ accessToken, refreshToken, userInfo });
}
