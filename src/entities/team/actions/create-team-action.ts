"use server";

import { createProtectedApiServerInstance } from "@/shared/api/server";
import { TeamApi } from "../api/team-api";
import { CreateTeamFormSchema } from "../model/create-team-form-schema";

export async function createTeamAction(data: CreateTeamFormSchema) {
  const teamApi = await createProtectedApiServerInstance(TeamApi);
  return await teamApi.createTeam(data);
}
