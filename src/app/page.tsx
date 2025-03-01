import { ProductList } from "@/entities/product";
import { db } from "@/shared/db";

export default async function Home() {
  const products = await db.query.products.findMany({
    with: {
      labels: true,
    },
  });

  return (
    <main className="container mx-auto px-4 py-6">
      <ProductList data={products} />
    </main>
  );
}
