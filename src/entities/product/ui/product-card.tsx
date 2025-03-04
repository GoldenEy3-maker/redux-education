import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import Image from "next/image";
import { Heart, Share2, ShoppingBag, ShoppingCart } from "lucide-react";
import { Product } from "../model/types";
import { ProductLabel } from "./product-label";
import { ProductCompositionBadge } from "./product-composition-badge";
import { formatPrice } from "@/shared/lib/format-price";
import { DotPattern } from "@/shared/magicui/dot-pattern";

type ProductCardProps = {} & Product;

export function ProductCard({
  id,
  img,
  price,
  title,
  composition,
  description,
  labels,
}: ProductCardProps) {
  return (
    <Card className="relative overflow-hidden pt-0">
      <div className="absolute inset-x-4 top-3 z-10 flex justify-between">
        <Button variant="ghost">
          <Share2 className="size-5" />
        </Button>
        <Button variant="ghost">
          <Heart className="size-5" />
        </Button>
      </div>
      <CardHeader className="bg-secondary/40 change-theme-transition py-4">
        <div className="relative flex h-80 flex-col justify-center overflow-hidden">
          <DotPattern className="[mask-image:radial-gradient(200px_circle_at_center,white,transparent)]" />
          <Image
            src={img}
            alt="Фото товара"
            fill
            className="object-cover"
            priority
            sizes="(min-width: 768px) 30vw, 50vw"
          />
          {composition ? (
            <div className="relative z-10 mt-auto flex flex-wrap items-center gap-2">
              {composition.map((value, index) => (
                <ProductCompositionBadge key={index}>
                  {value}
                </ProductCompositionBadge>
              ))}
            </div>
          ) : null}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <CardTitle className="mb-2 text-3xl">{formatPrice(price)}</CardTitle>
          {labels ? (
            <div className="mb-1 flex flex-wrap items-center gap-2">
              {labels.map((label) => (
                <ProductLabel key={label.value} {...label} />
              ))}
            </div>
          ) : null}
        </div>
        {description ? (
          <CardDescription className="text-lg text-pretty">
            {description}
          </CardDescription>
        ) : null}
      </CardContent>
      <CardFooter className="mt-auto items-center justify-between gap-4">
        <Button variant="ghost">
          <ShoppingCart />
        </Button>
        <Button className="min-w-40 text-base">
          <span>В один клик</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
