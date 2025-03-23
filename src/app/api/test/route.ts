import { db } from "@/shared/db";
import { tokenService } from "@/shared/services/token-service";
import { cookies } from "next/headers";

export async function GET() {
  const cookiesStore = await cookies();
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

  const responseRefreshCookie = cookiesStore.set({
    name: "refresh",
    value: refreshToken,
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return Response.json(
    { accessToken, refreshToken },
    { ...responseRefreshCookie },
  );
}
