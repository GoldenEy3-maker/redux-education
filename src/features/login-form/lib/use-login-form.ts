import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginFormSchema, LoginFormSchema } from "../model/login-form-schema";
import { useLoginMutation } from "@/shared/auth/api-slice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ROUTES_MAP } from "@/shared/constants/routes";
import { useSession } from "@/shared/auth/context";
import Cookies from "js-cookie";

export function useLoginForm() {
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const { setSession } = useSession();
  const [login, { isLoading, error: mutationError }] = useLoginMutation();

  async function onSubmit(data: LoginFormSchema) {
    try {
      const response = await login(data).unwrap();
      toast.success("Вы успешно авторизовались");
      form.reset();
      setSession(response.user);
      Cookies.set("accessToken", response.token);
      router.push(ROUTES_MAP.Home);
    } catch (_error) {
      if (mutationError && "status" in mutationError) {
        toast.error(mutationError.data as string);
      }
    }
  }

  return { form, onSubmit: form.handleSubmit(onSubmit), isLoading };
}
