"use client";

import { Team } from "../model/types";
import { TeamCard } from "./team-card";
import { useTeamOptimisticActions } from "../lib/use-team-optimistic-actions";

interface TeamListProps {
  teams: Team[];
}

export function TeamList({ teams }: TeamListProps) {
  const { optimisticTeams, applyOptimisticAction } =
    useTeamOptimisticActions(teams);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {optimisticTeams.map((team) => (
        <TeamCard
          key={team.id}
          {...team}
          beforeDelete={(teamId) =>
            applyOptimisticAction({ type: "delete", teamId })
          }
          beforeJoin={(teamId, userId) =>
            applyOptimisticAction({
              type: "join",
              teamId,
              userId,
            })
          }
          beforeLeave={(teamId, userId) =>
            applyOptimisticAction({
              type: "leave",
              teamId,
              userId,
            })
          }
        />
      ))}
    </div>
  );
}
