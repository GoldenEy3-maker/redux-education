import { Team as DBTeam } from "@prisma/client";
import { EntityState } from "@reduxjs/toolkit";

export interface Team extends DBTeam {}

export type TeamId = Pick<Team, "id">["id"];

export interface EntityTeam extends EntityState<Team, TeamId> {}
