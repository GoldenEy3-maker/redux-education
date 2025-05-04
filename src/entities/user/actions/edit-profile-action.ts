"use server";

import { createProtectedApiServerInstance } from "@/shared/api/server";
import { EditProfileFormSchema } from "../model/edit-profile-form-schema";
import { UserApi } from "../api/user-api";

export async function editProfileAction(data: EditProfileFormSchema) {
  try {
    const userApi = await createProtectedApiServerInstance(UserApi);
    return await userApi.updateUser(data);
  } catch (error) {
    console.error(error);
    return {
      data: undefined,
      error: {
        message: "Произошла ошибка при обновлении профиля",
      },
    };
  }
}
