import { relations } from "drizzle-orm";
import { pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { usersToTeams } from "./usersToTeams";

export const teams = table(
  "teams",
  {
    id: t.integer().generatedAlwaysAsIdentity().primaryKey(),
    name: t.varchar({ length: 256 }).notNull(),
  },
  (table) => [t.index("teams_name_idx").on(table.name)],
);

export const teamsRelations = relations(teams, ({ many }) => ({
  usersToTeams: many(usersToTeams),
}));
