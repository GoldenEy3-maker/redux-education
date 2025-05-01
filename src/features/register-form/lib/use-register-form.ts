import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerFormSchema,
  RegisterFormSchema,
} from "../model/register-form-schema";
import { toast } from "sonner";
import { register } from "../actions/register";
import { useTransition } from "react";

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

  function onSubmit(data: RegisterFormSchema) {
    startTransition(async () => {
      try {
        const { success, error } = await register(data);
        if (success) {
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

  return { form, onSubmit: form.handleSubmit(onSubmit), isLoading: isPending };
}
