import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { CreateTeamFormSchema } from "../model/create-team-form-schema";
import { createTeamFormSchema } from "../model/create-team-form-schema";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { createTeamAction } from "../actions/create-team-action";
import { useTransition } from "react";

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

  const [isPending, startTransition] = useTransition();

  function onSubmit(formData: CreateTeamFormSchema) {
    if (!session?.user.id) return;

    startTransition(async () => {
      try {
        const { error } = await createTeamAction(formData);
        if (error) {
          toast.error(error.message);
        } else {
          toast.success("Команда успешно создана");
          form.reset();
          params?.onSuccess?.();
        }
      } catch (_error) {
        console.error(_error);
        toast.error("Ошибка при создании команды");
      }
    });
  }

  return { form, isPending, onSubmit: form.handleSubmit(onSubmit) };
}
