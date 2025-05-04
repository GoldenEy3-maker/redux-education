import { z } from "zod";

export const editProfileFormSchema = z.object({
  name: z.string().min(1, { message: "Имя обязательно" }),
  surname: z.string().min(1, { message: "Фамилия обязательна" }),
  patronymic: z.string().optional(),
});

export type EditProfileFormSchema = z.infer<typeof editProfileFormSchema>;
