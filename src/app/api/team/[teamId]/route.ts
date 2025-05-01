import { ApiException } from "@/shared/api/api-exception";
import { db } from "@/shared/db";
import { NextRequest } from "next/server";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ teamId: string }> },
) {
  const { teamId } = await params;

  if (!teamId) return ApiException.BadRequest("id is not provided");

  const team = await db.team.delete({
    where: { id: teamId },
  });

  if (!team) return ApiException.NotFound("team not found");

  return Response.json(team);
}
