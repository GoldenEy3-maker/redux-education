import { ApiException } from "@/shared/api/api-exception";
import { db } from "@/shared/db";
import { passwordService } from "@/shared/services/password";

export async function POST(request: Request) {
  const { email, password, name, surname, patronymic } = await request.json();

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser)
    return ApiException.BadRequest("Пользователь уже существует");

  await db.user.create({
    data: {
      email,
      password: passwordService.hashPassword(password),
      name,
      surname,
      patronymic,
    },
  });
  return Response.json({
    message: "Пользователь успешно зарегистрирован",
  });
}
