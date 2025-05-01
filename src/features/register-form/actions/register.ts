"use server";

import { db } from "@/shared/db";
import {
  registerFormSchema,
  RegisterFormSchema,
} from "../model/register-form-schema";
import { passwordService } from "@/shared/services/password";

export async function register(data: RegisterFormSchema) {
  try {
    const { email, password, name, surname, patronymic } =
      registerFormSchema.parse(data);

    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return { error: "Пользователь уже существует" };
    }

    await db.user.create({
      data: {
        email,
        password: passwordService.hashPassword(password),
        name,
        surname,
        patronymic,
      },
    });

    return { success: "Пользователь успешно зарегистрирован" };
  } catch (_error) {
    return { error: "Ошибка при регистрации" };
  }
}
