import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerFormSchema,
  RegisterFormSchema,
} from "../model/register-form-schema";
import { useRegisterMutation } from "@/shared/auth/api-slice";
import { toast } from "sonner";

export function useRegisterForm() {
  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [register, { isLoading, error: mutationError }] = useRegisterMutation();

  async function onSubmit(data: RegisterFormSchema) {
    try {
      await register(data).unwrap();
      toast.success("Вы успешно зарегистрировались");
      form.reset();
    } catch (_error) {
      if (mutationError && "status" in mutationError) {
        toast.error(mutationError.data as string);
      }
    }
  }

  return { form, onSubmit: form.handleSubmit(onSubmit), isLoading };
}
