import { pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { teams } from "./teams";
import { relations } from "drizzle-orm";

export const projects = table(
  "projects",
  {
    id: t.integer().generatedAlwaysAsIdentity().primaryKey(),
    title: t.varchar({ length: 256 }).notNull(),
    teamId: t.integer().notNull(),
  },
  (table) => [t.index("projects_title_idx").on(table.title)],
);

export const projectsRelation = relations(projects, ({ one }) => ({
  team: one(teams, {
    fields: [projects.teamId],
    references: [teams.id],
  }),
}));
