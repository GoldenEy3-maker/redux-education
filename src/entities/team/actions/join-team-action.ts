"use server";

import { createProtectedApiServerInstance } from "@/shared/api/server";
import { TeamApi } from "../api/team-api";
import { TeamId } from "../model/types";

export async function joinTeamAction(id: TeamId) {
  const teamApi = await createProtectedApiServerInstance(TeamApi);
  return await teamApi.joinTeam(id);
}
