import { UserId } from "@/entities/user";
import { Team, TeamId } from "../model/types";
import { useOptimistic } from "react";

type OptimisticAction =
  | { type: "delete"; teamId: TeamId }
  | { type: "join"; teamId: TeamId; userId: UserId }
  | { type: "leave"; teamId: TeamId; userId: UserId };

export function useTeamOptimisticActions(teams: Team[]) {
  const [optimisticTeams, applyOptimisticAction] = useOptimistic<
    Team[],
    OptimisticAction
  >(teams, (state, action) => {
    switch (action.type) {
      case "delete":
        return state.filter((team) => team.id !== action.teamId);
      case "join":
        return state.map((team) =>
          team.id === action.teamId
            ? { ...team, members: [...team.members, { id: action.userId }] }
            : team,
        );
      case "leave":
        return state.map((team) =>
          team.id === action.teamId
            ? {
                ...team,
                members: team.members.filter(
                  (member) => member.id !== action.userId,
                ),
              }
            : team,
        );
      default:
        return state;
    }
  });

  return { optimisticTeams, applyOptimisticAction };
}
