import { ApiException } from "@/shared/api/api-exception";
import { db } from "@/shared/db";

import { protectedRoute } from "@/shared/lib/protected-route";
import { revalidatePath } from "next/cache";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ teamId: string }> },
) {
  const { teamId } = await params;
  const payload = await protectedRoute();

  const team = await db.team.findUnique({
    where: { id: teamId },
  });

  if (!team) {
    return ApiException.NotFound();
  }

  const updatedTeam = await db.team.update({
    where: { id: teamId },
    data: {
      members: {
        connect: { id: payload.id },
      },
    },
  });

  revalidatePath("/");

  return Response.json(updatedTeam);
}
