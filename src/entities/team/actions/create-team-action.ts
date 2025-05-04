"use server";

import { createProtectedApiServerInstance } from "@/shared/api/server";
import { TeamApi } from "../api/team-api";
import { CreateTeamFormSchema } from "../model/create-team-form-schema";
import { ROUTES_MAP } from "@/shared/constants/routes";
import { revalidatePath } from "next/cache";

export async function createTeamAction(data: CreateTeamFormSchema) {
  const teamApi = await createProtectedApiServerInstance(TeamApi);
  const response = await teamApi.createTeam(data);
  revalidatePath(ROUTES_MAP.Home);
  return response;
}
