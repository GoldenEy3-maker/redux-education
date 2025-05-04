"use server";

import { createProtectedApiServerInstance } from "@/shared/api/server";
import { TeamId } from "../model/types";
import { TeamApi } from "../api/team-api";
import { revalidatePath } from "next/cache";
import { ROUTES_MAP } from "@/shared/constants/routes";

export async function leaveTeamAction(id: TeamId) {
  const teamApi = await createProtectedApiServerInstance(TeamApi);
  const response = await teamApi.leaveTeam(id);
  revalidatePath(ROUTES_MAP.Home);
  return response;
}
