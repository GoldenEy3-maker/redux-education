import { pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

export const tasks = table(
  "tasks",
  {
    id: t.integer().generatedAlwaysAsIdentity().primaryKey(),
    title: t.varchar({ length: 256 }).notNull(),
    text: t.text(),
    createdAt: t
      .timestamp("created_at", { mode: "date" })
      .defaultNow()
      .notNull(),
    updatedAt: t
      .timestamp("updated_at", { mode: "date" })
      .$onUpdate(() => new Date()),
  },
  (table) => [t.index("tasks_title_idx").on(table.title)],
);
