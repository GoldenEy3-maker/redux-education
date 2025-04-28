import { db } from "@/shared/db";
import { passwordService } from "@/shared/services/password";

export async function POST(request: Request) {
  const { email, password, name, surname, patronymic } = await request.json();
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
