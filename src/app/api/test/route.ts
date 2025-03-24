import { db } from "@/shared/db";
import { tokenService } from "@/shared/lib/token-service";

export async function GET() {
  const TEST_EMAIL = "danil-danil-koroelv@bk.ru";
  const TEST_PASSWORD = "123";
  let id: string;
  let tokenVersion: number;

  const testUser = await db.user.findFirst({
    where: {
      email: TEST_EMAIL,
    },
  });

  if (!testUser) {
    const newUser = await db.user.create({
      data: {
        email: TEST_EMAIL,
        name: "Danil",
        password: TEST_PASSWORD,
        surname: "Korolev",
      },
    });

    id = newUser.id;
    tokenVersion = newUser.tokenVersion;
  } else {
    id = testUser.id;
    tokenVersion = testUser.tokenVersion;
  }

  const { accessToken, refreshToken } = await tokenService.generateTokens({
    email: TEST_EMAIL,
    id,
    remember: true,
    tokenVersion,
  });

  const responseRefreshCookie = await tokenService.sendRefreshToken(
    refreshToken,
    true,
  );

  return Response.json(
    { accessToken, refreshToken },
    { ...responseRefreshCookie },
  );
}
