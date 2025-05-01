import { createTeamFormSchema } from "@/entities/team";
import { auth } from "@/features/auth";
import { ApiException } from "@/shared/api/api-exception";
import { db } from "@/shared/db";
import { ZodError } from "zod";

export async function POST(request: Request) {
  const session = await auth();

  if (!session) return ApiException.Unauthorized();

  const body = await request.json();

  try {
    const { name } = createTeamFormSchema.parse(body);

    const team = await db.team.create({
      data: {
        name,
        authorId: session?.user.id,
      },
    });

    return Response.json({ team });
  } catch (error) {
    if (error instanceof ZodError) {
      return ApiException.BadRequest(error.message);
    }
    return ApiException.BadRequest();
  }
}

export async function GET() {
  const session = await auth();

  if (!session) return ApiException.Unauthorized();

  const teams = await db.team.findMany({
    where: {
      authorId: session.user.id,
    },
  });

  return Response.json(teams);
}
