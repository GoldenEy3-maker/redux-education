import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerFormSchema,
  RegisterFormSchema,
} from "../model/register-form-schema";
import { toast } from "sonner";
import { useTransition } from "react";
import { registerAction } from "../actions/register-action";

export function useRegisterForm() {
  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [isPending, startTransition] = useTransition();

  function onSubmit(formData: RegisterFormSchema) {
    startTransition(async () => {
      try {
        const { data, error } = await registerAction(formData);
        if (data) {
          toast.success("Вы успешно зарегистрировались");
          form.reset();
        }
        if (error) {
          toast.error(error);
        }
      } catch (error) {
        console.error(error);
      }
    });
  }

  return { form, onSubmit: form.handleSubmit(onSubmit), isPending };
}
