"use client";

import { useForm } from "react-hook-form";
import {
  EditProfileFormSchema,
  editProfileFormSchema,
} from "../model/edit-profile-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProfileAction } from "../actions/edit-profile-action";
import { toast } from "sonner";
import { useTransition } from "react";
import { useSession } from "next-auth/react";

interface UseEditProfileFormParams {
  onSuccess?: () => void;
}

export function useEditProfileForm(params?: UseEditProfileFormParams) {
  const { update, data: session } = useSession();

  const form = useForm<EditProfileFormSchema>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: {
      name: session?.user.name ?? "",
      surname: session?.user.surname ?? "",
      patronymic: session?.user.patronymic ?? "",
    },
  });

  const [isPending, startTransition] = useTransition();

  function onSubmit(formData: EditProfileFormSchema) {
    startTransition(async () => {
      const { data, error } = await editProfileAction(formData);
      if (error) toast.error(error.message);

      if (data) {
        toast.success("Профиль успешно обновлен");
        await update({ user: data });
        params?.onSuccess?.();
      }
    });
  }

  return { form, onSubmit: form.handleSubmit(onSubmit), isPending };
}
