"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/shared/ui/form";
import { useLoginForm } from "../lib/use-login-form";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { ROUTES_MAP } from "@/shared/constants/routes";

export function LoginForm() {
  const { form, onSubmit, isLoading } = useLoginForm();

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className="border-border flex w-full max-w-[30rem] flex-col gap-4 rounded-md border p-6"
      >
        <FormField
          control={form.control}
          name="email"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Загрузка..." : "Войти"}
        </Button>
        <Button asChild variant="link" className="w-full">
          <Link href={ROUTES_MAP.Register}>Еще нет аккаунта?</Link>
        </Button>
      </form>
    </Form>
  );
}
