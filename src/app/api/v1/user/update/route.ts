import { editProfileFormSchema } from "@/entities/user";
import { ApiException } from "@/shared/api/api-exception";
// import { signIn } from "@/shared/auth";
import { db } from "@/shared/db";
import { protectedRoute } from "@/shared/lib/protected-route";
import { ZodError } from "zod";

export async function PUT(request: Request) {
  try {
    const payload = await protectedRoute();
    const body = await request.json();
    const parsedData = editProfileFormSchema.parse(body);

    const { tokenVersion, password, ...updatedUser } = await db.user.update({
      where: {
        id: payload.id,
      },
      data: {
        name: parsedData.name,
        surname: parsedData.surname,
        patronymic: parsedData.patronymic,
      },
    });

    return Response.json(updatedUser);
  } catch (error) {
    console.error(error);

    if (error instanceof ZodError) {
      return ApiException.BadRequest(error.message);
    }

    return ApiException.BadRequest("Произошла ошибка при обновлении профиля");
  }
}
