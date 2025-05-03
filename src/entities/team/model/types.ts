import { Team as ApiTeam } from "@/__generated__/Api";

export interface Team extends ApiTeam {}

export type TeamId = Pick<Team, "id">["id"];
