import { createTeamFormSchema } from "@/entities/team";
import { ApiException } from "@/shared/api/api-exception";
import { ZodError } from "zod";
import { db } from "@/shared/db";
import { protectedRoute } from "@/shared/lib/protected-route";

export async function POST(request: Request) {
  try {
    const payload = await protectedRoute();

    const tokenExpirationMs = payload.exp ? payload.exp * 1000 : 0;

    if (Date.now() >= tokenExpirationMs) throw ApiException.Unauthorized();

    const body = await request.json();

    const { name } = createTeamFormSchema.parse(body);

    const team = await db.team.create({
      data: {
        name,
        authorId: payload.id,
      },
    });

    return Response.json({ team });
  } catch (error) {
    if (error instanceof ApiException) {
      return error;
    }

    if (error instanceof ZodError) {
      return ApiException.BadRequest(error.message);
    }
    return ApiException.BadRequest();
  }
}

export async function GET() {
  try {
    await protectedRoute();

    const teams = await db.team.findMany({
      include: {
        members: {
          select: {
            id: true,
          },
        },
      },
    });

    return Response.json(teams);
  } catch (error) {
    if (error instanceof ApiException) {
      return error;
    }
    return ApiException.BadRequest();
  }
}
