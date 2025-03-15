import { relations } from "drizzle-orm";
import { pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { usersToTeams } from "./users-to-teams";
import { users } from "./users";
import { projects } from "./project";

export const teams = table(
  "teams",
  {
    id: t.integer().generatedAlwaysAsIdentity().primaryKey(),
    name: t.varchar({ length: 256 }).notNull(),
    authorId: t
      .integer("author_id")
      .references(() => users.id)
      .notNull(),
  },
  (table) => [t.index("teams_name_idx").on(table.name)],
);

export const teamsRelations = relations(teams, ({ many, one }) => ({
  members: many(usersToTeams),
  projects: many(projects),
  author: one(users, {
    fields: [teams.authorId],
    references: [users.id],
  }),
}));
