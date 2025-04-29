import { ApiException } from "@/shared/api/api-exception";
import { db } from "@/shared/db";
import { passwordService } from "@/shared/services/password";
import { tokenService } from "@/shared/services/token";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) {
    return ApiException.Unauthorized("Неверный email или пароль");
  }

  const isPasswordValid = passwordService.verifyPassword(
    password,
    user.password,
  );

  if (!isPasswordValid) {
    return ApiException.Unauthorized("Неверный email или пароль");
  }

  const { accessToken, refreshToken } = await tokenService.generateTokens({
    ...user,
    remember: true,
  });

  // await tokenService.sendRefreshToken(refreshToken, true);

  return Response.json({ accessToken, refreshToken, userInfo: user });
}
