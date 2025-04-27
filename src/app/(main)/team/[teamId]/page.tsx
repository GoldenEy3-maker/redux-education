import { ROUTES_MAP } from "@/shared/constants/routes";
import { db } from "@/shared/db";
import { Button } from "@/shared/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default async function TeamDetailPage({
  params,
}: {
  params: Promise<{ teamId: string }>;
}) {
  const { teamId } = await params;

  const team = await db.team.findUnique({
    where: {
      id: teamId,
    },
  });

  return (
    <>
      <Button asChild className="mb-6" variant="link">
        <Link href={ROUTES_MAP.Home}>
          <ArrowLeftIcon className="h-4 w-4" />
          Вернуться назад
        </Link>
      </Button>
      <h1 className="mb-6 text-2xl font-bold">{team?.name}</h1>
    </>
  );
}
