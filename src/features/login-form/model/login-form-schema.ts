import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Неверный адрес электронной почты" }),
  password: z.string().min(8, {
    message: "Пароль должен содержать минимум 8 символов",
  }),
});

export interface LoginFormSchema extends z.infer<typeof loginFormSchema> {}
