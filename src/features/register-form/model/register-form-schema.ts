import { z } from "zod";

export const registerFormSchema = z
  .object({
    name: z.string({ required_error: "Имя обязательно" }),
    surname: z.string({ required_error: "Фамилия обязательна" }),
    patronymic: z.string().optional(),
    email: z.string().email({ message: "Неверный адрес электронной почты" }),
    password: z
      .string()
      .min(8, { message: "Пароль должен содержать минимум 8 символов" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Пароль должен содержать минимум 8 символов" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Пароли не совпадают",
  });

export interface RegisterFormSchema
  extends z.infer<typeof registerFormSchema> {}
