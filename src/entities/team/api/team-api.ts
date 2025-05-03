import { ApiService } from "@/shared/api/api-service";
import { CreateTeamFormSchema } from "../model/create-team-form-schema";
import { TeamId } from "../model/types";

export class TeamApi {
  constructor(private readonly api: ApiService) {}

  async getTeams() {
    const response = await this.api.v1.getTeams();
    return response.data;
  }

  async getTeam(id: TeamId) {
    const response = await this.api.v1.getTeam(id);
    return response.data;
  }

  async createTeam(data: CreateTeamFormSchema) {
    const response = await this.api.v1.createTeam(data);
    return { data: response.data, error: response.error };
  }

  async deleteTeam(id: TeamId) {
    const response = await this.api.v1.deleteTeam(id);
    return { data: response.data, error: response.error };
  }

  async joinTeam(id: TeamId) {
    const response = await this.api.v1.joinTeam(id);
    return { data: response.data, error: response.error };
  }

  async leaveTeam(id: TeamId) {
    const response = await this.api.v1.leaveTeam(id);
    return { data: response.data, error: response.error };
  }
}
