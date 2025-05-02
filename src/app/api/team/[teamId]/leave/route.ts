import { ApiException } from "@/shared/api/api-exception";
import { db } from "@/shared/db";
import { protectedRoute } from "@/shared/lib/protected-route";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ teamId: string }> },
) {
  const { teamId } = await params;
  const payload = await protectedRoute(request);

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
        disconnect: { id: payload.id },
      },
    },
  });

  return Response.json(updatedTeam);
}
