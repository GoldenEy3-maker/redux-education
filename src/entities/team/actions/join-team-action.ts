"use server";

import { createProtectedApiServerInstance } from "@/shared/api/server";
import { TeamApi } from "../api/team-api";
import { TeamId } from "../model/types";
import { revalidatePath } from "next/cache";
import { ROUTES_MAP } from "@/shared/constants/routes";

export async function joinTeamAction(id: TeamId) {
  const teamApi = await createProtectedApiServerInstance(TeamApi);
  const response = await teamApi.joinTeam(id);
  revalidatePath(ROUTES_MAP.Home);
  return response;
}
