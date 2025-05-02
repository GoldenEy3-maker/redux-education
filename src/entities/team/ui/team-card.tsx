"use client";

import { Card, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { Team } from "../model/types";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { ROUTES_MAP } from "@/shared/constants/routes";
import { ArrowRightIcon, TrashIcon } from "lucide-react";
import {
  useDeleteTeamMutation,
  useJoinTeamMutation,
  useLeaveTeamMutation,
} from "../api/api-slice";
import { useSession } from "next-auth/react";

interface TeamCardProps extends Team {}

export function TeamCard({ name, id, members, authorId }: TeamCardProps) {
  const { data: session } = useSession();
  const isAuthor = session?.user.id === authorId;
  const isMember = members.some((member) => member.id === session?.user.id);

  const [deleteTeam, { isLoading: isDeleting }] = useDeleteTeamMutation();
  const [joinTeam, { isLoading: isJoining }] = useJoinTeamMutation();
  const [leaveTeam, { isLoading: isLeaving }] = useLeaveTeamMutation();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{name}</CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Button asChild variant="ghost">
          <Link href={ROUTES_MAP.TeamDetail(id)}>
            Перейти
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </Button>
        {isMember ? (
          <Button
            variant="outline"
            onClick={() =>
              leaveTeam({ teamId: id, userId: session?.user.id ?? "" })
            }
            disabled={isLeaving}
          >
            Выйти
          </Button>
        ) : !isAuthor ? (
          <Button
            onClick={() =>
              joinTeam({ teamId: id, userId: session?.user.id ?? "" })
            }
            disabled={isJoining}
          >
            Вступить
          </Button>
        ) : null}
        {isAuthor && (
          <Button
            variant="destructive"
            onClick={() => deleteTeam(id)}
            disabled={isDeleting}
            size="icon"
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
