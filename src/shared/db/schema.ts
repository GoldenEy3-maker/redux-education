import {
  text,
  pgTable,
  integer,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const user = pgTable(
  "users",
  {
    id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
    name: text("name").notNull(),
    email: text("email").unique(),
  },
  (table) => [
    index("name_idx").on(table.name),
    uniqueIndex("email_idx").on(table.email),
  ]
);
