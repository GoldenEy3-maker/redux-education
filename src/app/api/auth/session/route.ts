import { ApiException } from "@/shared/api/api-exception";
import { db } from "@/shared/db";
import { tokenService } from "@/shared/services/token";
import { headers } from "next/headers";

export async function GET() {
  const headerStore = await headers();
  const token = headerStore.get("Authorization")?.split(" ")[1];
  if (!token) return ApiException.Unauthorized();
  const payload = await tokenService.verifyAccessToken(token);
  if (!payload) return ApiException.Unauthorized();
  const user = await db.user.findFirst({
    where: {
      id: payload.id,
    },
    select: {
      id: true,
      email: true,
      name: true,
      surname: true,
      patronymic: true,
    },
  });
  if (!user) return ApiException.Unauthorized();
  return Response.json(user);
}
