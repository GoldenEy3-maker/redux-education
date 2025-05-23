"use client";

import { Card, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { Team, TeamId } from "../model/types";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { ROUTES_MAP } from "@/shared/constants/routes";
import { ArrowRightIcon, TrashIcon } from "lucide-react";

import { useSession } from "next-auth/react";
import { leaveTeamAction } from "../actions/leave-team-action";
import { useTransition } from "react";
import { joinTeamAction } from "../actions/join-team-action";
import { deleteTeamAction } from "../actions/delete-team-action";
import { UserId } from "@/entities/user";

interface TeamCardProps extends Team {
  beforeDelete?: (id: TeamId) => void;
  beforeJoin?: (id: TeamId, userId: UserId) => void;
  beforeLeave?: (id: TeamId, userId: UserId) => void;
}

export function TeamCard({
  name,
  id,
  members,
  authorId,
  beforeDelete,
  beforeJoin,
  beforeLeave,
}: TeamCardProps) {
  const { data: session } = useSession();
  const isAuthor = session?.user.id === authorId;
  const isMember = members.some((member) => member.id === session?.user.id);

  const [isLeaving, startLeavingTransition] = useTransition();
  const [isJoining, startJoiningTransition] = useTransition();
  const [isDeleting, startDeletingTransition] = useTransition();

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
            onClick={() => {
              if (!session?.user) return;

              startLeavingTransition(() => {
                beforeLeave?.(id, session.user.id);
                leaveTeamAction(id);
              });
            }}
            disabled={isLeaving}
          >
            Выйти
          </Button>
        ) : !isAuthor ? (
          <Button
            onClick={() => {
              if (!session?.user) return;

              startJoiningTransition(() => {
                beforeJoin?.(id, session.user.id);
                joinTeamAction(id);
              });
            }}
            disabled={isJoining}
          >
            Вступить
          </Button>
        ) : null}
        {isAuthor && (
          <Button
            variant="destructive"
            onClick={() => {
              startDeletingTransition(() => {
                beforeDelete?.(id);
                deleteTeamAction(id);
              });
            }}
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
