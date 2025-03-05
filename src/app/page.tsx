import { ProductList } from "@/entities/product";

export default async function Home() {
  // const products = await db.query.products.findMany({
  //   with: {
  //     labels: true,
  //   },
  // });

  return (
    <main className="container mx-auto px-4 py-6">
      <ProductList
        data={[
          {
            id: 1,
            composition: ["Цинк", "Селен"],
            description: `Вода "Легенда жизни" 19л с цинком и селеном`,
            img: "/img/product-1.webp",
            price: 200,
            title: "Вода 19л",
            labels: [
              {
                id: 2,
                productId: 1,
                text: null,
                value: "Новинка",
              },
            ],
          },
          {
            id: 2,
            composition: ["Цинк", "Селен"],
            description: `Вода "Легенда жизни" 19л с цинком и селеном`,
            img: "/img/product-1.webp",
            price: 200,
            title: "Вода 19л",
            labels: [
              {
                id: 1,
                productId: 2,
                text: null,
                value: "Акция",
              },
            ],
          },
        ]}
      />
    </main>
  );
}
