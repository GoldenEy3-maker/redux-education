import { pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { users } from "./users";
import { teams } from "./teams";
import { relations } from "drizzle-orm";

export const usersToTeams = table(
  "users_to_teams",
  {
    userId: t
      .integer("user_id")
      .notNull()
      .references(() => users.id),
    teamId: t
      .integer("team_id")
      .notNull()
      .references(() => teams.id),
  },
  (table) => [t.primaryKey({ columns: [table.userId, table.teamId] })],
);

export const usersToTeamsRelations = relations(usersToTeams, ({ one }) => ({
  group: one(teams, {
    fields: [usersToTeams.teamId],
    references: [teams.id],
  }),
  user: one(users, {
    fields: [usersToTeams.userId],
    references: [users.id],
  }),
}));
