"use server";

import { createProtectedApiServerInstance } from "@/shared/api/server";
import { TeamId } from "../model/types";
import { TeamApi } from "../api/team-api";

export async function leaveTeamAction(id: TeamId) {
  const teamApi = await createProtectedApiServerInstance(TeamApi);
  return await teamApi.leaveTeam(id);
}
