"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginFormSchema, LoginFormSchema } from "../model/login-form-schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ROUTES_MAP } from "@/shared/constants/routes";
import { signIn } from "next-auth/react";
import { useState } from "react";

export function useLoginForm() {
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  // const { setSession } = useSession();
  // const [login, { isLoading, error: mutationError }] = useLoginMutation();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: LoginFormSchema) {
    setIsLoading(true);

    try {
      // const response = await login(data).unwrap();
      const response = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (response.ok && !response.error) {
        toast.success("Вы успешно авторизовались");
        form.reset();
        router.push(ROUTES_MAP.Home);
      } else if (response.error) {
        toast.error("Не удалось авторизоваться");
      }
    } catch (_error) {
      toast.error("Не удалось авторизоваться");
    } finally {
      setIsLoading(false);
    }
  }

  return { form, onSubmit: form.handleSubmit(onSubmit), isLoading };
}
