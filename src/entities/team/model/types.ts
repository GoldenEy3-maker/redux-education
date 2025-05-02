import { Team as DBTeam, Prisma } from "@prisma/client";
import { EntityState } from "@reduxjs/toolkit";

export interface Team
  extends DBTeam,
    Prisma.TeamGetPayload<{ include: { members: { select: { id: true } } } }> {}

export type TeamId = Pick<Team, "id">["id"];

export interface EntityTeam extends EntityState<Team, TeamId> {}
