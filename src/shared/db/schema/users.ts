import { relations } from "drizzle-orm";
import { pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { usersToTeams } from "./users-to-teams";
import { teams } from "./teams";

export const users = table(
  "users",
  {
    id: t.integer().generatedAlwaysAsIdentity().primaryKey(),
    name: t.varchar({ length: 256 }).notNull(),
    surname: t.varchar({ length: 256 }).notNull(),
    patronymic: t.varchar({ length: 256 }),
    email: t.varchar({ length: 256 }).notNull().unique(),
    password: t.text().notNull(),
  },
  (table) => [
    t.index("users_name_idx").on(table.name),
    t.uniqueIndex("users_email_idx").on(table.email),
  ],
);

export const usersRelations = relations(users, ({ many, one }) => ({
  teams: many(usersToTeams),
}));
