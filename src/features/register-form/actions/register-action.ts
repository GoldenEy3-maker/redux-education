"use server";

import {
  registerFormSchema,
  RegisterFormSchema,
} from "../model/register-form-schema";
import { RegisterApi } from "../api/register-api";
import { ZodError } from "zod";
import { createApiServerInstance } from "@/shared/api/server";

export async function registerAction(data: RegisterFormSchema) {
  try {
    const parsedData = registerFormSchema.parse(data);

    const registerApi = createApiServerInstance(RegisterApi);

    return await registerApi.register(parsedData);
  } catch (error) {
    console.error(error);

    if (error instanceof ZodError) {
      return { data: undefined, error: error.message, errorFields: undefined };
    }

    return {
      data: undefined,
      error: "Ошибка при регистрации",
      errorFields: undefined,
    };
  }
}
