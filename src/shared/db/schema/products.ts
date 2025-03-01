import { relations } from "drizzle-orm";
import * as t from "drizzle-orm/pg-core";
import { pgTable as table } from "drizzle-orm/pg-core";

export const products = table(
  "products",
  {
    id: t.integer().generatedAlwaysAsIdentity().primaryKey(),
    img: t.text().notNull(),
    title: t.varchar({ length: 256 }).notNull(),
    description: t.varchar({ length: 256 }),
    price: t.integer().notNull(),
    composition: t.json().$type<string[]>().default([]),
  },
  (table) => [t.index("title_idx").on(table.title)],
);

export const productsRelations = relations(products, ({ many }) => ({
  labels: many(productsLabels),
}));

export const productsLabels = table("products_labels", {
  id: t.integer().generatedAlwaysAsIdentity().primaryKey(),
  productId: t.integer("product_id"),
  value: t.varchar({ length: 256 }).notNull(),
  text: t.text(),
});

export const productsLabelsRelations = relations(productsLabels, ({ one }) => ({
  product: one(products, {
    fields: [productsLabels.productId],
    references: [products.id],
  }),
}));
