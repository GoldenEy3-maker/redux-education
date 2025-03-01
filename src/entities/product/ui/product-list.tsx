import { Product } from "../model/types";
import { ProductCard } from "./product-card";

type ProductListProps = { data: Product[] };

export function ProductList({ data }: ProductListProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-6">
      {data.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
