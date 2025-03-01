import { pgTable as table, pgEnum } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

export const users = table(
  "users",
  {
    id: t.integer().generatedAlwaysAsIdentity().primaryKey(),
    name: t.varchar({ length: 256 }).notNull(),
    email: t.varchar({ length: 256 }).notNull().unique(),
  },
  (table) => [
    t.index("name_idx").on(table.name),
    t.uniqueIndex("email_idx").on(table.email),
  ],
);
