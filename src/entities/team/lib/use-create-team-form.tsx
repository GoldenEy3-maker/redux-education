import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { CreateTeamFormSchema } from "../model/create-team-form-schema";
import { createTeamFormSchema } from "../model/create-team-form-schema";
import { useCreateTeamMutation } from "../api/api-slice";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

interface UseCreateTeamFormParams {
  onSuccess?: () => void;
}

export function useCreateTeamForm(params?: UseCreateTeamFormParams) {
  const form = useForm<CreateTeamFormSchema>({
    resolver: zodResolver(createTeamFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const { data: session } = useSession();

  const [createTeam, { isLoading, error: mutationError }] =
    useCreateTeamMutation();

  async function onSubmit(data: CreateTeamFormSchema) {
    if (!session?.user.id) return;

    try {
      await createTeam({ ...data, authorId: session?.user.id });
      toast.success("Команда успешно создана");
      form.reset();
      params?.onSuccess?.();
    } catch (_error) {
      if (mutationError && "status" in mutationError) {
        toast.error(mutationError.data as string);
      }
    }
  }

  return { form, isLoading, onSubmit: form.handleSubmit(onSubmit) };
}
