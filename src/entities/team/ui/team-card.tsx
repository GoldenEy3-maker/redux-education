import { Card, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { Team } from "../model/types";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { ROUTES_MAP } from "@/shared/constants/routes";
import { ArrowRightIcon } from "lucide-react";

interface TeamCardProps extends Team {}

export function TeamCard({ name, id }: TeamCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{name}</CardTitle>
      </CardHeader>
      <CardFooter>
        <Button asChild variant="ghost">
          <Link href={ROUTES_MAP.TeamDetail(id)}>
            Перейти
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
