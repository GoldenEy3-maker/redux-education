import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginFormSchema, LoginFormSchema } from "../model/login-form-schema";
import { useLoginMutation } from "@/shared/auth/api-slice";
import { toast } from "sonner";
import { useAppDispatch } from "@/shared/lib/store-hooks";
import { setToken } from "@/shared/auth/slice";
import { useRouter } from "next/navigation";
import { ROUTES_MAP } from "@/shared/constants/routes";

export function useLoginForm() {
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const dispatch = useAppDispatch();
  const router = useRouter();
  const [login, { isLoading, error: mutationError }] = useLoginMutation();

  async function onSubmit(data: LoginFormSchema) {
    try {
      const response = await login(data).unwrap();
      toast.success("Вы успешно авторизовались");
      form.reset();
      dispatch(setToken(response.token));
      router.push(ROUTES_MAP.Home);
    } catch (_error) {
      if (mutationError && "status" in mutationError) {
        toast.error(mutationError.data as string);
      }
    }
  }

  return { form, onSubmit: form.handleSubmit(onSubmit), isLoading };
}
