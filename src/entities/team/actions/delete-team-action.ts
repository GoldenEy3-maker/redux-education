"use server";

import { createProtectedApiServerInstance } from "@/shared/api/server";
import { TeamApi } from "../api/team-api";
import { TeamId } from "../model/types";
import { revalidatePath } from "next/cache";
import { ROUTES_MAP } from "@/shared/constants/routes";

export async function deleteTeamAction(id: TeamId) {
  const teamApi = await createProtectedApiServerInstance(TeamApi);
  const response = await teamApi.deleteTeam(id);
  revalidatePath(ROUTES_MAP.Home);
  return response;
}
