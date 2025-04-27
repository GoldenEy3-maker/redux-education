import { z } from "zod";

export const createTeamFormSchema = z.object({
  name: z.string().min(1, { message: "Название команды не может быть пустым" }),
});

export interface CreateTeamFormSchema
  extends z.infer<typeof createTeamFormSchema> {}
