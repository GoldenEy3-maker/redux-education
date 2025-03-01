import { products, productsLabels } from "@/shared/db/schema/products";
import { InferSelectModel } from "drizzle-orm";

export type ProductLabel = InferSelectModel<typeof productsLabels>;

export type ProductComposition = string[];

export type Product = InferSelectModel<typeof products> & {
  labels?: InferSelectModel<typeof productsLabels>[];
};
