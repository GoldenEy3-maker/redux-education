"use server";

import { createProtectedApiServerInstance } from "@/shared/api/server";
import { TeamApi } from "../api/team-api";

export async function getTeamsAction() {
  const teamApi = await createProtectedApiServerInstance(TeamApi);
  return await teamApi.getTeams();
}
