"use client";

import { Input } from "@/shared/ui/input";
import { useRegisterForm } from "../lib/use-register-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { ROUTES_MAP } from "@/shared/constants/routes";

export function RegisterForm() {
  const { form, onSubmit, isLoading } = useRegisterForm();

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className="border-border flex w-full max-w-[30rem] flex-col gap-4 rounded-md border p-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="surname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Фамилия</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="patronymic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Отчество</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="email"
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Подтвердите пароль</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Загрузка..." : "Зарегистрироваться"}
        </Button>
        <Button variant="link" asChild>
          <Link href={ROUTES_MAP.Login}>Уже есть аккаунт?</Link>
        </Button>
      </form>
    </Form>
  );
}
