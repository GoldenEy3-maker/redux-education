"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { useCreateTeamForm } from "../lib/use-create-team-form";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";

interface CreateTeamFormProps {
  onSuccess?: () => void;
}

export function CreateTeamForm({ onSuccess }: CreateTeamFormProps) {
  const { form, isPending, onSubmit } = useCreateTeamForm({ onSuccess });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название команды</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Создание..." : "Создать"}
        </Button>
      </form>
    </Form>
  );
}
