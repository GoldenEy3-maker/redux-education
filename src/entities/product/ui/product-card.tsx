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
import { Heart, Share2, ShoppingCart } from "lucide-react";
import { Badge } from "@/shared/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/tooltip";
import Link from "next/link";

export function ProductCard() {
  return (
    <Card className="relative overflow-hidden pt-0">
      <div className="absolute inset-x-3 top-3 z-10 flex justify-between">
        <Button variant="ghost">
          <Share2 className="size-5" />
        </Button>
        <Button variant="ghost">
          <Heart className="size-5" />
        </Button>
      </div>
      <CardHeader className="bg-secondary/40 p-4">
        <div className="relative h-80">
          <Image
            src="/img/product-1.webp"
            alt="Фото товара"
            fill
            objectFit="cover"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge>+70 бонусов</Badge>
              </TooltipTrigger>
              <TooltipContent className="max-w-64 text-base">
                <p>
                  При покупке на сайте воды «Легенда жизни» с цинком и селеном,
                  19л. Вам начисляться 70 бонусов.{" "}
                  <Link className="font-medium" href="#">
                    Подробнее
                  </Link>
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Badge>Новинка</Badge>
          <Badge>Акция</Badge>
        </div>
        <CardTitle className="mb-1 text-2xl">Вода 19л</CardTitle>
        <CardDescription className="text-xl text-pretty">
          Вода "Легенда жизни" 19л с цинком и селеном
        </CardDescription>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="text-base">
            Цинк
          </Badge>
          <Badge variant="outline" className="text-base">
            Селен
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="mt-auto items-end justify-between">
        <div className="flex flex-col">
          <span className="text-sm leading-none">Цена:</span>
          <b className="text-2xl">
            {new Intl.NumberFormat("ru-RU", {
              style: "currency",
              currency: "RUB",
              maximumFractionDigits: 0,
            }).format(200)}
          </b>
        </div>
        <Button size="lg" className="min-w-40 text-base">
          <ShoppingCart className="size-5" />
          <span>В корзину</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
