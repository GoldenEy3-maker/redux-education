import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { CreateTeamFormSchema } from "../model/create-team-form-schema";
import { createTeamFormSchema } from "../model/create-team-form-schema";
import { useCreateTeamMutation } from "../api/api-slice";
import { toast } from "sonner";

export function useCreateTeamForm() {
  const form = useForm<CreateTeamFormSchema>({
    resolver: zodResolver(createTeamFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const [createTeam, { isLoading, error: mutationError }] =
    useCreateTeamMutation();

  async function onSubmit(data: CreateTeamFormSchema) {
    try {
      await createTeam(data);
      toast.success("Команда успешно создана");
      form.reset();
    } catch (_error) {
      if (mutationError && "status" in mutationError) {
        toast.error(mutationError.data as string);
      }
    }
  }

  return { form, isLoading, onSubmit: form.handleSubmit(onSubmit) };
}
